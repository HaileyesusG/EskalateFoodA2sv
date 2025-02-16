const model = require("../Model/Book");
const Technician = require("../Model/Technician");
const Customers = require("../Model/Customer");
const haversine = require("haversine-distance");
const getSocketClient = require("../socketClient");
// const io = require("socket.io-client");
// const backEndUrl = process.env.VITE_API_BASE_URL;
// const socket = io(backEndUrl, {
//   transports: ["websocket"],
// });
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
const maxDistance = 7; // Maximum allowed distance in km
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
      const Customer_locationN = customerBody.locationN.coordinates;
      const Customer_locationN2 = customerBody.locationN;
      const Customer_location = customerBody.location;
      const Customer_email = customerBody.email;
      const Customer_status = customerBody.status;
      let notytimeout;
      let slat;
      let slon;

      // const [longitude, latitude] = Customer_location;
      // const customerCoords = {
      //   latitude: latitude,
      //   longitude: longitude,
      // };

      //tech
      const tech2 = await Technician.find({
        department: { $in: departmentArray },
        status: "free",
        status2: "not",
        locationN: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: Customer_locationN,
            },
            $maxDistance: 7000, // 5 km
          },
        },
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

      let db;
      try {
        db = await model.create({
          Customer_firstname,
          Customer_phonenumber,
          typeOfProblem,
          department,
          Customer_location: Customer_location,
          Customer_locationN: Customer_locationN2,
          customer_id,
        });

        //res.status(200).json(db);
        //console.log(db);
      } catch (error) {
        res.status(400).json({ message: error.message });
        return;
      }
      for (const driver of newTech2) {
        const minperson45 = await Technician.findByIdAndUpdate(
          { _id: driver._id },
          { status2: "loading" },
          { new: true }
        );
      }
      // console.log("the aba wde ", db);
      const socket = getSocketClient();
      console.log("the nearest newTech2 ", newTech2);
      let latestMember = [...newTech2];
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
        for (const tech of newTech2) {
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
    const socket = getSocketClient();
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
      let Customer_locationN;
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
            locationN: {
              $near: {
                $geometry: {
                  type: "Point",
                  coordinates: Pend.Customer_locationN.coordinates,
                },
                $maxDistance: 7000, // 7 km
              },
            },
          });
          filter3.push(filter);
        }
        if (Pend.department == "DISH") {
          const filter = await Technician.find({
            department: { $in: Pend.department.split(",") },
            status: status,
            status2: "not",
            deposit: { $gte: 50 },
            locationN: {
              $near: {
                $geometry: {
                  type: "Point",
                  coordinates: Pend.Customer_locationN.coordinates,
                },
                $maxDistance: 7000, // 7 km
              },
            },
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

      console.log("the nearestfilter3  ", filter3);

      for (const personGroup of filter3) {
        for (const driver of personGroup) {
          const minperson45 = await Technician.findByIdAndUpdate(
            { _id: driver._id },
            { status2: "loading" },
            { new: true }
          );
        }
      }

      //Assign All
      for (const Pend of bookers) {
        Customer_firstname = Pend.Customer_firstname;
        Customer_lastname = Pend.Customer_lastname;
        Customer_phonenumber = Pend.Customer_phonenumber;
        Customer_location = Pend.Customer_location;
        Customer_locationN = Pend.Customer_locationN;
        customer_id = Pend.customer_id;
        department = Pend.department;

        typeOfProblem = Pend.typeOfProblem;

        const db = {
          Customer_firstname,
          Customer_lastname,
          Customer_phonenumber,
          Customer_location,
          Customer_locationN,
          customer_id,
          department,
          typeOfProblem,
        };
        latestMember = [...filter3.flat()];
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
        for (const personGroup of filter3) {
          for (const driver of personGroup) {
            if (driver.status == "free") {
              await Technician.updateOne(
                { _id: driver._id },
                { $set: { status2: "not" } }
              );
            }
          }
        }
        console.log("he did not accept too 2", RequestId);
        await addToAssignQueue(RequestId);
      }, 30000);
    } catch (err) {
      console.log("Error during driver reassignment:", err);
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
  const socket = getSocketClient();
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
