const model = require("../Model/Book");
const Technician = require("../Model/Technician");
const Customers = require("../Model/Customer");
const haversine = require("haversine-distance");
const io = require("socket.io-client");
const backEndUrl = process.env.VITE_API_BASE_URL;
const socket = io(backEndUrl);
const { Mutex } = require("async-mutex");
const technicianMutex = new Mutex();
const assignOtherMutex = new Mutex();
let counter = 0;
let continueBooking = true;
const requestTimeouts = {};
let assignQueue = [];
let assignQueue2 = [];
let isProcessingQueue = false;
let isProcessingQueue2 = false;
let Counter = 0;
let addToAssignQueue;
let addToAssignQueue2;
//Create
const BookCreate = async (req, res) => {
  // Acquire the lock before proceeding
  const release = await technicianMutex.acquire();
  continueBooking = true;
  Counter++;
  let nearestDriver = [];

  try {
    const { typeOfProblem, department } = req.body;
    const departmentArray = department.split(","); // Convert the string to an array
    const requestBody = req.body;
    const customerBody = req.customer;

    const BookFunction = async (RequestId2) => {
      const {
        departmentArray,
        requestBody,
        department,
        customerBody,
      } = RequestId2;
      const { typeOfProblem } = requestBody;
      let nearestDistance = Infinity;
      let leastWork = Infinity;
      let leastTime = Infinity;
      const customer_id = customerBody._id;
      const Customer_firstname = customerBody.firstname;
      const Customer_lastname = customerBody.lastname;
      const Customer_phonenumber = customerBody.phonenumber;
      const Customer_location = customerBody.location;
      const Customer_email = customerBody.email;
      const Customer_status = customerBody.status;
      let notytimeout;
      let slat;
      let slon;

      try {
        const response = await fetch(
          `https://us1.locationiq.com/v1/search.php?key=pk.c5e06b64f368498929045de583b10a7c&q=${encodeURIComponent(
            Customer_location
          )}&format=json`
        );
        //console.log("Abebe", response.json);
        const data = await response.json();
        if (!response.ok) {
          console.log("The error response is", data);
          return res.status(200).json({ message: "No Internet Connection1" });
        }

        if (data.length > 0) {
          const { lat, lon } = data[0];
          slat = parseFloat(lat);
          slon = parseFloat(lon);
          console.log("slat", slat);
          console.log("slon", slon);
        } else {
          console.log("No results found");
        }
      } catch (error) {
        return res.status(400).json({ message: "No Internet Connection2" });
      }
      const customerCoords = {
        latitude: slat,
        longitude: slon,
      };

      //tech
      const tech2 = await Technician.find({
        department: { $in: departmentArray },
        status: "free",
        status2: "not",
        __v: { $eq: 0 },
      });
      let newTech2;
      if (
        department === "TV" ||
        department === "FRIDGE" ||
        department === "WASHING" ||
        department === "PAINTING"
      ) {
        newTech2 = tech2.filter((d) => d.deposit >= 200);
      }
      if (department === "DISH") {
        newTech2 = tech2.filter((d) => d.deposit >= 50);
      }
      if (
        department === "STOVE" ||
        department === "MITAD" ||
        department === "PLUMBING"
      ) {
        newTech2 = tech2.filter((d) => d.deposit >= 100);
      }

      try {
        if (newTech2.length === 0) {
          throw Error("NO Technician found");
          //return
        }
      } catch (error) {
        res.status(400).json({ message: error.message });
        return;
      }

      for (const person of newTech2) {
        try {
          const response2 = await fetch(
            ` https://us1.locationiq.com/v1/search.php?key=pk.c5e06b64f368498929045de583b10a7c&q=${encodeURIComponent(
              person.location
            )}&format=json`
          );

          const data2 = await response2.json();
          if (data2.length > 0) {
            const { lat, lon } = data2[0];
            const driverCoords = {
              latitude: parseFloat(lat),
              longitude: parseFloat(lon),
            };
            console.log("lat", lat);
            console.log("lon", lon);

            const distance = haversine(customerCoords, driverCoords);
            if (distance < nearestDistance) {
              nearestDistance = distance;
              nearestDriver = [person];
            } else if (distance === nearestDistance) {
              nearestDriver.push(person); // Add this driver to the list of nearest drivers
            }
          } else {
            console.log("No results found");
          }
        } catch (error) {
          res.status(400).json({ message: "No Internet Connection3" });
          return;
        }
      }
      if (nearestDriver.length == 0) {
        res.status(404).send({ error: "NO Technician found" });
        return;
      }

      let db;
      try {
        db = await model.create({
          Customer_firstname,
          Customer_phonenumber,
          typeOfProblem,
          department,
          Customer_location,
          customer_id,
        });

        //res.status(200).json(db);
        //console.log(db);
      } catch (error) {
        res.status(400).json({ error: error.message });
        return;
      }
      for (const driver of nearestDriver) {
        const minperson45 = await Technician.findByIdAndUpdate(
          { _id: driver._id },
          { status2: "loading" },
          { new: true }
        );
      }
      console.log("the aba wde ", db);

      console.log("the nearestDriver ", nearestDriver);
      let latestMember = [...nearestDriver];
      socket.emit("booking1", { db, latestMember });
      //

      const minperson9 = await model.findByIdAndUpdate(
        { _id: db._id },
        { Status: "pending" }
      );

      ////
      const Request = await model.findOne({
        customer_id: customer_id,
        Status: "pending",
      });
      const RequestId = Request._id;
      //Timeout
      requestTimeouts[RequestId] = setTimeout(async () => {
        for (const tech of nearestDriver) {
          if (tech.status == "free") {
            await Technician.updateOne(
              { _id: tech._id },
              { $set: { status2: "not" } }
            );
          }
        }
        await addToAssignQueue(RequestId);
      }, 30000);
      addToAssignQueue = async (RequestId) => {
        if (continueBooking == false) {
          console.log("Booking process stopped.");
          return; // Stop booking process
        }
        assignQueue.push(RequestId);
        if (!isProcessingQueue) {
          await processAssignQueue();
        }
      };
      const processAssignQueue = async () => {
        if (assignQueue.length === 0) {
          isProcessingQueue = false;
          return;
        }

        isProcessingQueue = true;

        const RequestId = assignQueue.shift();

        try {
          await AssignOther(RequestId);
        } catch (error) {
          console.log("Error in AssignOther:", error);
          return;
        } finally {
          await processAssignQueue();
        }
      };
    };
    addToAssignQueue2 = async (RequestId) => {
      assignQueue2.push(RequestId);
      if (!isProcessingQueue2) {
        await processAssignQueue2();
      }
    };
    const processAssignQueue2 = async () => {
      if (assignQueue2.length === 0) {
        isProcessingQueue2 = false;
        return;
      }

      isProcessingQueue2 = true;

      const RequestId = assignQueue2.shift();

      try {
        await BookFunction(RequestId);
      } catch (error) {
        console.log("Error in AssignOther:", error);
      } finally {
        await processAssignQueue2();
      }
    };
    await addToAssignQueue2({
      departmentArray,
      requestBody,
      department,
      customerBody,
    });
  } catch (err) {
    console.log("Error during driver reassignment:", err);
  } finally {
    // const result = await Technician.updateMany(
    //   { status: "free", status2: { $ne: "not" } }, // Additional condition to check status2
    //   { $set: { status2: "not" } }
    // );
    // Release the lock
    release();
  }

  // Lock variable to ensure AssignOther runs sequentially
  let AssignOther = async (RequestId) => {
    // Acquire the lock before proceeding
    const release2 = await assignOtherMutex.acquire();
    let nearestDistance = Infinity;
    let leastTime = Infinity;
    let leastWork = Infinity;
    let nearestDriver = [];

    try {
      let bookers = await model.find({ _id: RequestId, Status: "pending" });
      if (bookers.length === 0) {
        return;
      }
      console.log("request booker", bookers);
      let num;
      let phone;
      let latestMember = null;
      let latestDate = null;

      let st = "free";
      let numd;

      let Customer_firstname;
      let Customer_lastname;
      let Customer_phonenumber;
      let Customer_location;
      let customer_id;
      let department;
      let typeOfProblem;

      const status = "free";
      let filter3 = [];
      for (const Pend of bookers) {
        if (
          Pend.department == "TV" ||
          Pend.department == "FRIDGE" ||
          Pend.department == "PAINTING"
        ) {
          const filter = await Technician.find({
            department: { $in: Pend.department.split(",") },
            status: status,
            status2: "not",
            deposit: { $gte: 200 },
          });
          filter3.push(filter);
        }
        if (Pend.department == "DISH") {
          const filter = await Technician.find({
            department: { $in: Pend.department.split(",") },
            status: status,
            status2: "not",
            deposit: { $gte: 50 },
          });
          filter3.push(filter);
        }
      }
      try {
        if (filter3.length === 0) {
          await model.findByIdAndDelete(RequestId);
          console.log("NO Technician found n");
          throw Error("NO Technician found");
          //return
        }
      } catch (error) {
        res.status(400).json({ message: error.message });
        return;
      }

      let slat;
      let slon;
      let customerCor = [];
      for (const Pend of bookers) {
        try {
          const response = await fetch(
            `https://us1.locationiq.com/v1/search.php?key=pk.c5e06b64f368498929045de583b10a7c&q=${encodeURIComponent(
              Pend.Customer_location
            )}&format=json`
          );
          const data = await response.json();
          if (!response.ok) {
            console.log({ message: "No Internet Connection4" });
          }

          if (data.length > 0) {
            const { lat, lon } = data[0];
            slat = parseFloat(lat);
            slon = parseFloat(lon);
            console.log("slat", slat);
            console.log("slon", slon);
          } else {
            console.log("No results found");
          }
        } catch (error) {
          //return res.status(400).json({ message: "No Internet Connection5" });
        }
        const customerCoords = {
          latitude: slat,
          longitude: slon,
        };
        customerCor.push(customerCoords);
      }

      for (const person of filter3) {
        for (const p of person) {
          try {
            const response2 = await fetch(
              `https://us1.locationiq.com/v1/search.php?key=pk.c5e06b64f368498929045de583b10a7c&q=${encodeURIComponent(
                p.location
              )}&format=json`
            );
            const data2 = await response2.json();
            console.log("the person location is ", person);
            console.log("the data2 is ", data2);
            if (data2.length > 0) {
              const { lat, lon } = data2[0];
              slat = parseFloat(lat);
              slon = parseFloat(lon);
              console.log("slat", slat);
              console.log("slon", slon);
              const driverCoords = {
                latitude: lat,
                longitude: lon,
              };
              for (const custCord of customerCor) {
                const distance = haversine(custCord, driverCoords);
                if (distance < nearestDistance) {
                  nearestDistance = distance;
                  nearestDriver = [p];
                } else if (distance === nearestDistance) {
                  nearestDriver.push(p); // Add this driver to the list of nearest drivers
                }
              }
            } else {
              console.log("No results found2");
            }
          } catch (error) {
            console.log({ message: "No Internet Connection5" });
            return;
          }
        }
      }
      if (nearestDriver.length == 0) {
        await model.findByIdAndDelete(RequestId);
        res.status(404).send({ error: "NO Technician found" });
        console.log({ error: "NO Technician found" });
        return;
      }

      console.log("the nearestDriver 2 ", nearestDriver);
      for (const driver of nearestDriver) {
        const minperson45 = await Technician.findByIdAndUpdate(
          { _id: driver._id },
          { status2: "loading" },
          { new: true }
        );
      }

      //Assign All
      for (const Pend of bookers) {
        Customer_firstname = Pend.Customer_firstname;
        Customer_lastname = Pend.Customer_lastname;
        Customer_phonenumber = Pend.Customer_phonenumber;
        Customer_location = Pend.Customer_location;
        customer_id = Pend.customer_id;
        department = Pend.department;
        typeOfProblem = Pend.typeOfProblem;

        const db = {
          Customer_firstname,
          Customer_lastname,
          Customer_phonenumber,
          Customer_location,
          customer_id,
          department,
          typeOfProblem,
        };
        latestMember = [...nearestDriver];
        console.log("the target customer", db);
        socket.emit("booking1", { db, latestMember });
        console.log("end of Assign Other");
      }

      if (requestTimeouts[RequestId]) {
        clearTimeout(requestTimeouts[RequestId]);
        console.log("Timeout cleared for request ID:", RequestId);
      }
      requestTimeouts[RequestId] = setTimeout(async () => {
        // socket.emit("UnAccept", phone);
        for (const tech of nearestDriver) {
          if (tech.status == "free") {
            await Technician.updateOne(
              { _id: tech._id },
              { $set: { status2: "not" } }
            );
          }
        }

        console.log("he did not accept too 2", RequestId);
        await addToAssignQueue(RequestId);
      }, 30000);
    } catch (err) {
      console.error("Error during driver reassignment:", err);
    } finally {
      // const result = await Technician.updateMany(
      //   { status: "free", status2: { $ne: "not" } }, // Additional condition to check status2
      //   { $set: { status2: "not" } }
      // );
      // Release the lock
      release2();
    }

    socket.once("Finished", async (msg) => {
      let email = msg.user.email;
      let Custid = msg.CustId;
      let id = await Technician.findOne({ email }).select("_id");

      socket.emit("Respon", Respon);
      //
    });
    socket.on("Decline", async (msg) => {
      const status = "busy";
      if (msg === "Declined") {
        console.log("rejected");

        socket.on("info", async (msg) => {
          console.log("the email", msg.email);

          console.log("i am to start");
          const email = msg.email;
          const id = await Technician.find({ email }).select("_id");

          const minperson4 = await Technician.findById(id);
          console.log("the id", minperson4._id);
          const minperson3 = await Technician.findByIdAndUpdate(
            { _id: minperson4._id },
            { status }
          );
          socket.on("custId", async (msg) => {
            let status2 = "tobook";
            let minperson9 = await Customers.findByIdAndUpdate(
              { _id: msg },
              { status2 }
            );
            console.log("the customer id ", msg);
          });
        });
      }
    });
    //console.log("minperson 91", minperson912);
  };
  /////////////////////////////////
};
//Update Tech

const UpdateTechBook = async (req, res) => {
  const { id } = req.params;
  const { email, technicians } = req.body;
  console.log("the id is becase ", id);
  console.log("the email becase ", email);
  try {
    const Techid = await Technician.findOne({ email: email });
    const data = await Technician.findByIdAndUpdate(
      { _id: Techid._id },
      { status: "busy" },
      { new: true }
    );
    const book = await model
      .findOne({
        customer_id: id,
        Status: "pending",
      })
      .sort({ createdAt: -1 });

    const Status = "accepted";

    console.log("the book id", book);

    const minperson45 = await model.findByIdAndUpdate(
      { _id: book._id },
      { Status },
      { new: true }
    );
    const MyCustomer = await model.findById(book._id);
    const Technicians = await Technician.findById(Techid._id);
    const AcceptObject = { MyCustomer, Technicians };
    const AcceptObject2 = { technicians, Technicians };
    socket.emit("IsAccept", AcceptObject);
    socket.emit("techList", AcceptObject2);
    res.status(200).json(data);
  } catch (err) {
    console.log("the difficult error", err);
  }
  console.log("In UpdateCustWithTech");

  console.log("In UpdateTechBook");
};
//Update Customer with Tech

//Get all

const GetBook = async (req, res) => {
  const customer_id = req.customer._id;

  const db = await model.find({ customer_id }).sort({ createdAt: -1 });

  res.status(200).json(db);
};
// Get one
const GetOneBook = async (req, res) => {
  const { id } = req.params;
  const sv = await model.findOne({ Technician_id: id });
  if (!sv) {
    return res.status(400).json({ msg: "no id found" });
  }

  res.status(200).json(sv);
};
//Update
const UpdateBook = async (req, res) => {
  const customer_id = req.customer._id;
  const { typeOfProblem, department, phonenumber, location } = req.body;
  const { id } = req.params;
  const sv = await model.findById(id);
  if (!sv) {
    return res.status(400).json({ msg: "no id found" });
  }
  const updated = await model.findByIdAndUpdate(
    { _id: id },
    {
      typeOfProblem,
      department,
      phonenumber,
      location,
      customer_id: customer_id,
    }
  );

  const updated_2 = await model.findById(id);

  res.status(200).json(updated_2);
};
//Delete

const DeleteBook = async (req, res) => {
  const customer_id = req.customer._id;
  const sv = await model.findOneAndDelete({ customer_id });
  if (!sv) {
    return res.status(400).json({ msg: "No id found" });
  }
  res.status(200).json(sv);
};

//
const updateBooking = async (req, res) => {
  const { Customer__id, _id } = req.body;
  const sv = await model
    .findOne({ customer_id: Customer__id })
    .sort({ createdAt: -1 });
  if (sv.Status != "completed") {
    const update = await model.findByIdAndUpdate(
      { _id: sv._id },
      { Status: "canceled" },
      { new: true }
    );
  }

  const tech = await Technician.findById(_id);
  if (tech.status !== "free" || tech.status2 !== "not") {
    const tech = await Technician.findByIdAndUpdate(
      { _id: _id },
      { status: "free" },
      { status2: "not" },
      { new: true }
    );
    const tech2 = await Technician.findById(_id);
    res.status(200).json(tech2);
  }
};
//
const beforeBooking = async (req, res) => {
  const { _idd } = req.body;
  console.log("in before booking");
  continueBooking = false;
  const result = await Technician.updateMany(
    { status2: "loading" },
    { $set: { status2: "not" } }
  );
  const result2 = await model.updateMany(
    { customer_id: _idd, Status: "pending" },
    { $set: { Status: "canceled" } }
  );
  console.log("gebtenal");
  return;
};
//
const killBooking = async (req, res) => {
  console.log("i am in kill booking");
  const { id } = req.params;
  try {
    const updateBook = await model.updateMany(
      { customer_id: id, Status: "pending" },
      { $set: { Status: "failed" } }
    );
    if (updateBook.modifiedCount > 0) throw Error("NO Technician found");
    else {
      return;
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = {
  BookCreate,
  GetBook,
  GetOneBook,
  UpdateBook,
  DeleteBook,
  UpdateTechBook,
  updateBooking,
  beforeBooking,
  killBooking,
};
