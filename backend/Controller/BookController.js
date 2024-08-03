const model = require("../Model/Book");
const Technician = require("../Model/Technician");
const Customers = require("../Model/Customer");
const haversine = require("haversine-distance");
const io = require("socket.io-client");
const socket = io("http://localhost:5001");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

let counter = 0;
const requestTimeouts = {};
let assignQueue = [];
let assignQueue2 = [];
let isProcessingQueue = false;
let isProcessingQueue2 = false;
let ProviderId = [];
let Counter = 0;
let addToAssignQueue;
let addToAssignQueue2;
//Create
const BookCreate = async (req, res) => {
  const result = await Technician.updateMany(
    { status: "free" },
    { $set: { status2: "not" } }
  );
  Counter++;
  let nearestDriver = [];
  if (Counter > 1) {
    ProviderId = [];
  }
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
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            Customer_location
          )}&key=9ddcd8b5269349368ef7069e700d9e77`
        );
        //console.log("Abebe", response.json);
        const data = await response.json();
        if (!response.ok) {
          console.log("the error response is", data);
          return res.status(200).json({ message: "No Internet Connection" });
        }

        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry;
          slat = lat;
          slon = lng;
          console.log("slat", slat);
          console.log("slon", slon);
        } else {
          console.log("No results found");
        }
      } catch (error) {
        return res.status(400).json({ message: "No Internet Connection" });
      }
      const customerCoords = {
        latitude: slat,
        longitude: slon,
      };

      //tech
      const tech2 = await Technician.find({
        _id: { $nin: ProviderId },
        department: { $in: departmentArray },
        status: "free",
        status2: "not",
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
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
              person.location
            )}&key=9ddcd8b5269349368ef7069e700d9e77`
          );
          const data2 = await response2.json();
          if (data2.results.length > 0) {
            const { lat, lng } = data2.results[0].geometry;
            const driverCoords = {
              latitude: lat,
              longitude: lng,
            };
            console.log("lat", lat);
            console.log("lng", lng);

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
          res.status(400).json({ message: "No Internet Connection" });
          return;
        }
      }
      if (nearestDriver.length == 0) {
        res.status(404).send({ error: "NO Technician found" });
      }

      for (const person of nearestDriver) {
        if (person.numberOfworks < leastWork) {
          leastWork = person.numberOfworks;
        }
      }
      const newTech4 = nearestDriver.filter(
        (t) => t.numberOfworks <= leastWork
      );
      for (const person of newTech4) {
        if (person.numberOftimes < leastTime) {
          leastTime = person.numberOftimes;
        }
      }
      const newTech5 = newTech4.filter((t) => t.numberOftimes <= leastTime);
      //console.log("the newtech4", newTech4);
      console.log("the shortest distance D", nearestDistance);
      console.log("the shortest distance W", leastWork);
      console.log("the shortest distance T", leastTime);
      const minperson = [...newTech5];

      try {
        if (minperson.length === 0) {
          // let minperson444 = await Customers.findByIdAndUpdate(
          //   { _id: customer_id },
          //   { status2: "tobook" }
          // );
          const minperson45 = await Technician.updateMany({ status2: "not" });
          throw Error("No  Technician Found");
          //return
        }
      } catch (error) {
        res.status(400).json({ message: error.message });
        return;
      }

      let latestMember = null;
      let latestDate = null;
      for (const key in minperson) {
        if (minperson.hasOwnProperty(key)) {
          const member = minperson[key];
          if (!latestDate || member.createdAt < latestDate) {
            latestMember = member;
            latestDate = member.createdAt;
          }
        }
      }
      console.log("the latest member ", latestMember);
      const minperson45 = await Technician.findByIdAndUpdate(
        { _id: latestMember._id },
        { status2: "loading" },
        { new: true }
      );
      const numberOftimes = latestMember.numberOftimes + 1;
      ProviderId.push(latestMember._id);
      const minperson4 = await Technician.findByIdAndUpdate(
        { _id: latestMember._id },
        { numberOftimes }
      );
      const Technician_id = minperson4._id;
      const Technician_firstname = minperson4.firstname;
      const Technician_lastname = minperson4.lastname;
      const Technician_email = minperson4.email;

      let db;
      try {
        db = await model.create({
          Customer_firstname,
          Customer_phonenumber,
          typeOfProblem,
          department,
          Customer_location,
          customer_id,
          Technician_id,
          Technician_firstname,
          Technician_lastname,
          Technician_email,
        });

        //res.status(200).json(db);
        //console.log(db);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      console.log("the aba wde ", db);
      socket.emit("booking1", { db, latestMember });
      //

      const minperson9 = await model.findByIdAndUpdate(
        { _id: db._id },
        { Status: "pending" }
      );

      ////
      const Request = await model.find({
        customer_id: customer_id,
        Status: "pending",
      });
      const RequestId = Request[0]._id;
      const num = minperson4._id;
      let _id = num;
      phone = await Technician.find({ _id }).select("phonenumber");
      //Timeout
      requestTimeouts[RequestId] = setTimeout(async () => {
        socket.emit("UnAccept", phone);
        await addToAssignQueue(num, RequestId);
      }, 30000);
      addToAssignQueue = async (num, RequestId) => {
        assignQueue.push(RequestId);
        if (!isProcessingQueue) {
          await processAssignQueue(num);
        }
      };
      const processAssignQueue = async (num) => {
        if (assignQueue.length === 0) {
          isProcessingQueue = false;
          return;
        }

        isProcessingQueue = true;

        const RequestId = assignQueue.shift();

        try {
          await AssignOther(num, RequestId);
        } catch (error) {
          console.log("Error in AssignOther:", error);
        } finally {
          await processAssignQueue(num);
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
    console.error("Error during driver reassignment:", err);
  }

  // Lock variable to ensure AssignOther runs sequentially
  let AssignOther = async (id, RequestId) => {
    let nearestDistance = Infinity;
    let leastTime = Infinity;
    let leastWork = Infinity;
    let nearestDriver = [];

    // const minperson45 = await Technician.findByIdAndUpdate(
    //   { _id: id },
    //   { status2: "not" }
    // );

    try {
      let bookers = await model.find({ _id: RequestId, Status: "pending" });
      if (bookers.length === 0) {
        const techniciansToUpdate = await Technician.find({
          status: "free",
          status2: "loading",
        });
        // Update the status2 field for matched technicians to 'stop'
        await Promise.all(
          techniciansToUpdate.map(async (technician) => {
            technician.status2 = "not";
            await technician.save();
          })
        );
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
      let filter3;
      if (
        bookers[0].department == "TV" ||
        bookers[0].department == "FRIDGE" ||
        bookers[0].department == "PAINTING"
      ) {
        filter3 = await Technician.find({
          _id: { $nin: ProviderId },
          department: { $in: bookers[0].department.split(",") },
          status: status,
          status2: "not",
          deposit: { $gte: 200 },
        });
      }
      if (bookers[0].department == "DISH") {
        filter3 = await Technician.find({
          _id: { $nin: ProviderId },
          department: { $in: bookers[0].department.split(",") },
          status: status,
          status2: "not",
          deposit: { $gte: 50 },
        });
      }
      try {
        if (filter3.length === 0) {
          let minperson444 = await Technician.findByIdAndUpdate(
            { _id: id },
            { status2: "not" }
          );
          await model.findByIdAndDelete(RequestId);
          await Technician.updateMany({ status2: "not" });
          throw Error("No  Technician Found");
          //return
        }
      } catch (error) {
        res.status(400).json({ message: error.message });
        return;
      }

      let slat;
      let slon;
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            mminn.Customer_location
          )}&key=9ddcd8b5269349368ef7069e700d9e77`
        );
        const data = await response.json();
        if (!response.ok) {
          console.log({ message: "No Internet Connection" });
        }

        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry;
          slat = lat;
          slon = lng;
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
      for (const person of filter3) {
        try {
          const response2 = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
              person.location
            )}&key=9ddcd8b5269349368ef7069e700d9e77`
          );
          const data2 = await response2.json();

          if (data2.results.length > 0) {
            const { lat, lng } = data2.results[0].geometry;
            console.log("lat", lat);
            console.log("lng", lng);
            const driverCoords = {
              latitude: lat,
              longitude: lng,
            };
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
          console.log({ message: "No Internet Connection" });
          return;
        }
      }
      if (nearestDriver.length == 0) {
        console.log({ error: "NO Technician found" });
      }

      for (const person of filter3) {
        if (person.numberOfworks < leastWork) {
          leastWork = person.numberOfworks;
        }
      }

      const filter4 = filter3.filter((w) => w.numberOfworks <= leastWork);

      for (const person of filter4) {
        if (person.numberOftimes < leastTime) {
          leastTime = person.numberOftimes;
        }
      }
      console.log("leasFilter4tT", leastTime);
      const filter5 = filter4.filter((w) => w.numberOftimes <= leastTime);
      //console.log("filter 5", filter5);
      const minperson8 = [...filter5];

      for (let key in minperson8) {
        if (minperson8.hasOwnProperty(key)) {
          let member = minperson8[key];
          if (!latestDate || member.createdAt < latestDate) {
            latestMember = member;
            latestDate = member.createdAt;
          }
        }
      }
      console.log("the latest member 2 ", latestMember);
      const minperson45 = await Technician.findByIdAndUpdate(
        { _id: latestMember._id },
        { status2: "loading" },
        { new: true }
      );
      if (latestMember == null) {
        await model.findByIdAndDelete(RequestId);
        const minperson45 = await Technician.findByIdAndUpdate(
          { _id: latestMember._id },
          { status2: "not" },
          { new: true }
        );

        console.log("NO Technician found");
        return;
      }

      //console.log("his name is", Technician_email);
      let numberOftimes = latestMember.numberOftimes + 1;
      let minperson4 = await Technician.findByIdAndUpdate(
        { _id: latestMember._id },
        { numberOftimes }
      );
      ProviderId.push(minperson4._id);

      ////////
      //console.log("the mminn is", mmin);

      let updated = await Technician.find({});

      //res.status(200).json(db);

      numd = minperson4._id;
      let _id = numd;
      phone = await Technician.find({ _id }).select("phonenumber");
      //Assign All
      Customer_firstname = bookers[0].Customer_firstname;
      Customer_lastname = bookers[0].Customer_lastname;
      Customer_phonenumber = bookers[0].Customer_phonenumber;
      Customer_location = bookers[0].Customer_location;
      customer_id = bookers[0].customer_id;
      department = bookers[0].department;
      typeOfProblem = bookers[0].typeOfProblem;

      const db = {
        Customer_firstname,
        Customer_lastname,
        Customer_phonenumber,
        Customer_location,
        customer_id,
        department,
        typeOfProblem,
      };
      console.log("My name is Fkade , abebe, haile");
      console.log("the target customer", db);
      socket.emit("booking1", { db, latestMember });
      console.log("end of Assign Other");
      if (requestTimeouts[RequestId]) {
        clearTimeout(requestTimeouts[RequestId]);
        console.log("Timeout cleared for request ID:", RequestId);
      }
      requestTimeouts[RequestId] = setTimeout(async () => {
        socket.emit("UnAccept", phone);
        const minperson45 = await Technician.findByIdAndUpdate(
          { _id: numd },
          { status2: "not" }
        );
        console.log("he did not accept too 2", RequestId);
        await addToAssignQueue(numd, RequestId);
      }, 30000);
    } catch (err) {
      console.error("Error during driver reassignment:", err);
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
  const { email } = req.body;
  try {
    const Techid = await Technician.find({ email: email });
    const data = await Technician.findByIdAndUpdate(
      { _id: Techid[0]._id },
      { status: "busy" },
      { new: true }
    );
    const book = await model
      .findOne({
        customer_id: id,
        Technician_id: data._id,
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
    const Technicians = await Technician.findById(Techid[0]._id);
    const AcceptObject = { MyCustomer, Technicians };
    socket.emit("IsAccept", AcceptObject);
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
    .findOne({ customer_id: Customer__id, Technician_id: _id })
    .sort({ createdAt: -1 });
  if (sv.Status != "completed") {
    const update = await model.findByIdAndUpdate(
      { _id: sv._id },
      { Status: "canceled" },
      { new: true }
    );
  }

  const tech = await Technician.findById(_id);
  if (tech.status !== "free") {
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

module.exports = {
  BookCreate,
  GetBook,
  GetOneBook,
  UpdateBook,
  DeleteBook,
  UpdateTechBook,
  updateBooking,
};
