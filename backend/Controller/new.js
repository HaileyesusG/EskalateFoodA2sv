const model = require("../Model/Book");
const Technician = require("../Model/Technician");
const Customers = require("../Model/Customer");
const Accepted = require("../Model/Accepted");
const io = require("socket.io-client");
const socket = io("http://localhost:5001");
const { Server } = require("socket.io");
let emptyArray = [];

let array2 = [];
let nearestProvider = null;

let calculatedDistance;

let counter = 0;
let receiver;
socket.on("myemail", (msg) => {
  receiver = msg;
});
//Create
const BookCreate = async (req, res) => {
  //let minperson = [];
  let notytimeout;

  let array = [];
  let nearestDistance = Infinity;
  let leastWork = Infinity;
  let leastTime = Infinity;
  const customer_id = req.customer._id;
  const Customer_firstname = req.customer.firstname;
  const Customer_lastname = req.customer.lastname;
  const Customer_phonenumber = req.customer.phonenumber;
  const Customer_location = req.customer.location;
  const Customer_email = req.customer.email;
  const Customer_status = req.customer.status;

  if (Customer_status === "ongoing") {
    let status = "dormant";
    let minperson9 = await Customers.findByIdAndUpdate(
      { _id: customer_id },
      { status }
    );
  }

  console.log("Name of the sim", Customer_firstname);
  if (receiver === Customer_email) {
    counter++;
  }
  console.log("the counter when update", counter);

  const { typeOfProblem, department, listOfProblem, startTime } = req.body;

  if (!typeOfProblem) {
    emptyArray.push("typeOfProblem");
  }
  if (!department) {
    emptyArray.push("department");
  }

  if (!listOfProblem) {
    emptyArray.push("listOfProblem");
  }
  if (!startTime) {
    emptyArray.push("startTime");
  }

  if (emptyArray.length > 0) {
    return res.status(400).json({ error: "Please fill the form", emptyArray });
  }

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
      console.log("Abebe", data);
      return res.status(200).json({ message: "no internet connection1" });
    }

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      slat = lat;
      slon = lng;
      console.log("slat", slat);
      console.log("slon", slon);
    } else {
      console.log("No results found2");
    }
  } catch (error) {
    return res.status(400).json({ message: "no internet connection2" });
  }
  const fif = "free";
  const tech = await Technician.find({
    department: department,
    status: fif,
    status2: "not",
  });

  try {
    if (tech.length === 0) {
      throw Error("no technician found in your area");
      //return
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  for (const person of tech) {
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
        const toRad = (value) => (value * Math.PI) / 180;
        const earthRadius = 6371; // in kilometers

        const latDiff = toRad(lat - slat);
        const lngDiff = toRad(lng - slon);

        const a =
          Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
          Math.cos(toRad(slat)) *
            Math.cos(toRad(lat)) *
            Math.sin(lngDiff / 2) *
            Math.sin(lngDiff / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        if (lat == slat && lng == slon) {
          calculatedDistance = earthRadius * c;
          let distance = calculatedDistance;
          let minperson444 = await Technician.findByIdAndUpdate(
            { _id: person._id },
            { distance }
          );
        } else {
          calculatedDistance = earthRadius * c + 3.48;

          let distance = calculatedDistance;

          let minperson444 = await Technician.findByIdAndUpdate(
            { _id: person._id },
            { distance }
          );
        }
      } else {
        console.log("No results found");
      }
    } catch (error) {
      res.status(400).json({ message: "no internet connection3" });
      return;
    }
  }

  //console.log("adis yeweta", newTech);
  const st = "free";
  const tech2 = await Technician.find({
    department: department,
    status: st,
    status2: "not",
  });
  let newTech2;
  if (department === "TV") {
    newTech2 = tech2.filter((d) => d.deposit >= 200);
  }
  if (department === "DISH") {
    newTech2 = tech2.filter((d) => d.deposit >= 30);
  }

  for (const person of newTech2) {
    if (person.distance < nearestDistance) {
      nearestDistance = person.distance;
    }
  }

  const newTech3 = newTech2.filter((w) => w.distance <= nearestDistance);
  for (const person of newTech3) {
    if (person.numberOfworks < leastWork) {
      leastWork = person.numberOfworks;
    }
  }
  const newTech4 = newTech3.filter((t) => t.numberOfworks <= leastWork);

  const minperson = [...newTech4];
  console.log("the shortest distance ", minperson);
  try {
    if (minperson.length === 0) {
      throw Error("no technician found");
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

  const minperson4 = await Technician.findById(latestMember._id);

  const Technician_id = minperson4._id;
  const Technician_firstname = minperson4.firstname;
  const Technician_lastname = minperson4.lastname;
  const Technician_email = minperson4.email;
  let db;
  try {
    db = await model.create({
      Customer_firstname,
      Customer_lastname,
      Customer_phonenumber,
      typeOfProblem,
      department,
      Customer_location,
      listOfProblem,
      startTime,
      customer_id,
      Technician_id,
      Technician_firstname,
      Technician_lastname,
      Technician_email,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  socket.emit("booking1", db);
  console.log("the booking", db);

  const num = minperson4._id;
  const status2 = "loading";
  let _id = num;
  phone = await Technician.find({ _id }).select("phonenumber");
  let minperson4e = await Technician.findByIdAndUpdate(
    { _id: num },
    { status2 }
  );
  const acceptedServiceProviders = new Map();
  const serviceProvider = async (
    Tec_id,
    customer_id,
    Customer_location,
    requestId
  ) => {
    const serviceProviders = Tec_id;
    const customerTimeouts = new Map();

    const generateRequestId = () => {
      return Math.random().toString(36).substring(2, 15);
    };

    const createRequest = async (customerId) => {
      const requestId = generateRequestId();

      customerTimeouts.set(
        requestId,
        setTimeout(() => {
          // Timeout action for the request
          closeRequest(customerId, requestId);
        }, 30000)
      );

      //customerTimeouts.set(requestId, timeout);

      // Handle the creation of the request (e.g., store it in the database)
      // Your implementation here

      res.json({ requestId });
    };

    const closeRequest = async (customerId, requestId) => {
      const timeout = customerTimeouts.get(requestId);

      // Clear the timeout only if it hasn't been cleared already
      if (timeout) {
        clearTimeout(timeout);
        customerTimeouts.delete(requestId);

        // Perform any necessary actions to close the request
        // For example, update the request status in a database or send a notification to the customer
        let minperson4e = await Technician.findByIdAndUpdate(
          { _id: Tec_id },
          { status2: "not" }
        );

        // Update the request status to "closed" in the database
        // Your implementation here

        // Send a notification to the customer
        // Your implementation here

        console.log(
          `Request ${requestId} for customer ${customerId} has been closed.`
        );
      }
    };
    const assignmentIntervals = new Map();
    const handleAcceptedNotification = (serviceProvider) => {
      // Add the accepted service provider to the set
      if (!acceptedServiceProviders.has(requestId)) {
        acceptedServiceProviders.set(requestId, new Set());
      }
      acceptedServiceProviders.get(requestId).add(serviceProvider);

      // Perform any necessary actions when a service provider accepts the request
      // Your implementation here
      clearTimeout(customerTimeouts.get(requestId));
      customerTimeouts.delete(requestId);
      if (assignmentIntervals.has(requestId)) {
        clearInterval(assignmentIntervals.get(requestId));
        assignmentIntervals.delete(requestId);
      }
      console.log(`Accepted notification received from ${serviceProvider}.`);

      // If the accepted service provider is the specific one you're waiting for, close the request

      closeRequest(customer_id, requestId);

      // If none of the deserving service providers have accepted the request, close it
    };

    const AssignOther = async (id, cus_id, Customer_location) => {
      // Logic for assigning other tasks or performing actions every 30 seconds
      // Your implementation here
      const acceptedProviders = acceptedServiceProviders.get(requestId);
      if (acceptedProviders && acceptedProviders.size > 0) {
        // Stop calling AssignOther for the specific request
        if (assignmentIntervals.has(requestId)) {
          clearInterval(assignmentIntervals.get(requestId));
          assignmentIntervals.delete(requestId);
        }
        return;
      }
      const Mylocation = Customer_location;
      let nearestDistance = Infinity;
      let leastTime = Infinity;
      let leastWork = Infinity;
      const status2 = "booker";
      let minperson99 = await Customers.findById(cus_id);
      let FinalArray = [];
      FinalArray.push(minperson99);

      let bookers = await Customers.find({});
      let myarray = [];
      let num;
      let phone;
      let latestMember = null;
      let latestDate = null;
      for (let rit of bookers) {
        if (rit.status2 === "booker" && rit.status === "dormant") {
          myarray.push(rit);
        }
      }
      let st = "free";
      let filtered;
      filtered = await Technician.find({ _id: id });
      let deep = filtered[0].department;

      let assigned = false; // Variable to track if a technician is assigned

      while (FinalArray.length > 0 && !assigned) {
        const mminn = FinalArray.shift();
        let Customer_firstname;
        let Customer_lastname;
        let Customer_phonenumber;
        let Customer_location;
        let customer_id;
        let stat = "free";

        const status = "free";
        let filter3;
        if (deep === "TV") {
          filter3 = await Technician.find({
            _id: { $ne: id },
            department: deep,
            status: status,
            status2: "not",
            deposit: { $gte: 200 },
            //distance: filtered[0].distance,
          });
        }
        if (deep === "DISH") {
          filter3 = await Technician.find({
            _id: { $ne: id },
            department: deep,
            status: status,
            status2: "not",
            deposit: { $gte: 30 },
            //distance: filtered[0].distance,
          });
        }
        try {
          if (filter3.length === 0) {
            throw Error("no technician found");
            //return
          }
        } catch (error) {
          console.log("error is", error);
          // res.status(400).json({ message: error.message });
          return;
        }

        let slat;
        let slon;
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
              Mylocation
            )}&key=9ddcd8b5269349368ef7069e700d9e77`
          );
          const data = await response.json();
          if (!response.ok) {
            return res.status(200).json({ message: "no internet connection4" });
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
          //return res.status(400).json({ message: "no internet connection5" });
        }

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
              const toRad = (value) => (value * Math.PI) / 180;
              const earthRadius = 6371; // in kilometers

              const latDiff = toRad(lat - slat);
              const lngDiff = toRad(lng - slon);

              const a =
                Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
                Math.cos(toRad(slat)) *
                  Math.cos(toRad(lat)) *
                  Math.sin(lngDiff / 2) *
                  Math.sin(lngDiff / 2);
              const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              console.log("the distance is teh", c);
              if (lat == slat && lng == slon) {
                calculatedDistance = earthRadius * c;
                let distance = calculatedDistance;

                let minperson444 = await Technician.findByIdAndUpdate(
                  { _id: person._id },
                  { distance }
                );
              } else {
                calculatedDistance = earthRadius * c + 3.48;

                let distance = calculatedDistance;

                let minperson444 = await Technician.findByIdAndUpdate(
                  { _id: person._id },
                  { distance }
                );
              }
            } else {
              console.log("No results found");
            }
          } catch (error) {
            // res.status(400).json({ message: "no internet connection6" });
            console.log("Errorr", error);

            return;
          }
        }
        const st = "free";
        let filter33;
        if (deep === "TV") {
          filter33 = await Technician.find({
            _id: { $ne: id },
            department: deep,
            status: st,
            status2: "not",
            deposit: { $gte: 200 },
            //distance: filtered[0].distance,
          });
        }
        if (deep === "DISH") {
          filter33 = await Technician.find({
            _id: { $ne: id },
            department: deep,
            status: st,
            status2: "not",
            deposit: { $gte: 30 },
            //distance: filtered[0].distance,
          });
        }
        for (const person of filter33) {
          if (person.distance < nearestDistance) {
            nearestDistance = person.distance;
          }
        }

        if (deep === "TV") {
          filter33 = await Technician.find({
            _id: { $ne: id },
            department: deep,
            status: st,
            status2: "not",
            deposit: { $gte: 200 },
            distance: nearestDistance,
          });
        }
        if (deep === "DISH") {
          filter33 = await Technician.find({
            _id: { $ne: id },
            department: deep,
            status: st,
            status2: "not",
            deposit: { $gte: 30 },
            distance: nearestDistance,
          });
        }

        for (const person of filter33) {
          if (person.numberOfworks < leastWork) {
            leastWork = person.numberOfworks;
          }
        }

        const filter4 = filter33.filter((w) => w.numberOfworks <= leastWork);

        //console.log("filter 5", filter5);
        const minperson8 = [...filter4];
        // if (minperson8.length === 0) {
        //   return res.status(200).json({ message: "no technician found too" });
        // }

        // let minperson2 = minperson8.reduce((sn, cp) => {
        //   return cp.numberOftimes < sn.numberOftimes ? cp : sn;
        // });

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

        let Technician_id = latestMember._id;
        let Technician_firstname = latestMember.firstname;
        let Technician_lastname = latestMember.lastname;
        let Technician_email = latestMember.email;
        //console.log("his name is", Technician_email);

        ////////

        customer_id = mminn._id;
        Customer_firstname = mminn.firstname;
        Customer_lastname = mminn.lastname;
        Customer_location = mminn.location;
        Customer_phonenumber = mminn.phonenumber;
        let db;
        try {
          db = await model.create({
            Customer_firstname,
            Customer_lastname,
            Customer_phonenumber,
            typeOfProblem,
            department,
            Customer_location,
            listOfProblem,
            startTime,
            customer_id,
            Technician_id,
            Technician_firstname,
            Technician_lastname,
            Technician_email,
          });

          let updated = await Technician.find({});

          //res.status(200).json(db);
        } catch (error) {
          //res.status(400).json({ error: error.message });
        }

        let numd = minperson4._id;
        let _id = numd;
        const status2 = "loading";
        phone = await Technician.find({ _id }).select("phonenumber");
        socket.emit("booking1", db);
        console.log("the booking", db);

        let minperson4e = await Technician.findByIdAndUpdate(
          { _id: latestMember._id },
          { status2 }
        );

        console.log("booking1", db);
      }

      try {
        if (!assigned) {
          let minperson4e = await Technician.findByIdAndUpdate(
            { _id: latestMember._id },
            { status2: "not" }
          );
          throw Error("no technician foundd");

          //return
        }
      } catch (error) {
        console.log("message:", error.message);
        //res.status(400).json({ message: error.message });
        return;
      }

      // Update the status of the customer
      let minperson444 = await Technician.findByIdAndUpdate(
        { _id: latestMember._id },
        { status2: "not" }
      );

      console.log("AssignOther function called.");
    };

    await createRequest(customer_id);

    // Simulating accepted notifications from service providers
    socket.once("Accept2", async (msg) => {
      //clearTimeout(notytimeout);
      if (msg === "Accepted") {
        let MainId;
        let deposit;
        socket.once("info", async (msg) => {
          console.log("the email", msg.email);
          let status = "busy";
          console.log("i am to start");
          let email = msg.email;
          let id = await Technician.find({ email }).select("_id");

          let minperson4 = await Technician.findById(id);
          const numberOfworks = minperson4.numberOfworks + 1;
          const percentage = minperson4.deposit * 0.2;

          if (minperson4.department === "TV") {
            minperson4;
            deposit = minperson4.deposit - 200;
          }
          if (minperson4.department === "DISH") {
            deposit = minperson4.deposit - 30;
          }

          //console.log("the id", minperson4._id);
          MainId = minperson4._id;
          const minperson45 = await Technician.findByIdAndUpdate(
            { _id: minperson4._id },
            { numberOfworks, deposit, status }
          );

          const Respon = await Technician.find({ email });

          //console.log("the console in the", Respon);
          socket.emit("Respon", Respon);
        });

        socket.once("custId", async (msg) => {
          console.log("HOW MANY TIMES DOES");
          const email = msg[1];
          const Custo_id = msg[0];

          //helper1.push(msg)

          const id = await Technician.find({ email: email }).select("_id");
          console.log("the idddddddddddddd", id);
          const finalPerson = await Technician.findById(id);
          const status2 = "tobook";
          const status = "ongoing";
          const minperson9 = await Customers.findByIdAndUpdate(
            { _id: Custo_id },
            { status, status2 }
          );
          const Customer_firstname = minperson9.firstname;
          const Customer_lastname = minperson9.lastname;
          const Customer_id = minperson9._id;
          const Technician_id = finalPerson._id;
          const Technician_firstname = finalPerson.firstname;
          const Technician_lastname = finalPerson.lastname;
          const Technician_email = finalPerson.email;
          const department = finalPerson.department;
          const Customer_phonenumber = minperson9.phonenumber;
          const Customer_location = minperson9.location;
          const report = await Accepted.create({
            Customer_id,
            Customer_firstname,
            Customer_lastname,
            Technician_id,
            Technician_firstname,
            Technician_lastname,
            Technician_email,
            department,
            Customer_phonenumber,
            Customer_location,
          });
          if (minperson4.department === "TV") {
            if (deposit <= 200) {
              const tosend = await Accepted.find({
                Technician_id: Technician_id,
              })
                .sort({ _id: -1 })
                .limit(5);
              console.log("the tosend value", tosend);

              socket.emit("warning", tosend);
            }
          }
          if (minperson4.department === "DISH") {
            if (deposit <= 60) {
              const tosend = await Accepted.find({
                Technician_id: Technician_id,
              })
                .sort({ _id: -1 })
                .limit(5)
                .toArray();

              socket.emit("warning", tosend);
            }
          }

          socket.emit("U_id", Custo_id);
          handleAcceptedNotification(Technician_id);
        });
      } else {
      }
    });

    // Call AssignOther function after 30 seconds
    assignmentIntervals.set(
      requestId,
      setInterval(() => {
        AssignOther(Tec_id, customer_id, Customer_location);
      }, 30000)
    );
  };
  await serviceProvider(num, customer_id, Customer_location);

  /////////////////////////////////

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
};

//Get all

const GetBook = async (req, res) => {
  const customer_id = req.customer._id;

  const db = await model.find({ customer_id }).sort({ createdAt: -1 });

  res.status(200).json(db);
};
// Get one
const GetOneBook = async (req, res) => {
  const { id } = req.params;
  const sv = await model.findById(id);
  if (!sv) {
    return res.status(400).json({ msg: "no id found" });
  }

  res.status(200).json(sv);
};
//Update
const UpdateBook = async (req, res) => {
  const customer_id = req.customer._id;
  const {
    typeOfProblem,
    department,
    phonenumber,
    location,
    listOfProblem,
    startTime,
  } = req.body;
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
      listOfProblem,
      startTime,
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

module.exports = {
  BookCreate,
  GetBook,
  GetOneBook,
  UpdateBook,
  DeleteBook,
};
