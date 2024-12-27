import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaTools } from "react-icons/fa";
import ToggleButton from "./Toggle";
import { AiFillPhone } from "react-icons/ai";
import { MdEditLocationAlt } from "react-icons/md";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { PiGenderFemaleDuotone } from "react-icons/pi";
import { IoMdNotifications } from "react-icons/io";
import { BiSolidMessageDetail } from "react-icons/bi";
import { RiChatHistoryFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { updateTech, setTech, logOut } from "../features/tech/techSlice";
import { useDispatch } from "react-redux";
import { ImLocation } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import ChatTech from "./ChatTech";
const socket = io(API_BASE_URL);
let array3 = [];
let timeoutId = null;
const Home = ({ user3 }) => {
  const toastify = (message) => {
    toast.error(message, {
      position: "top-right",
      style: { backgroundColor: "#EEEEEE", color: "black", fontWeight: "bold" },
    });
  };
  const mapRef = useRef(null);
  const dispatch2 = useDispatch();
  const todo = useSelector((state) => state.tech.tech);
  //dispatch2(setTech(todo));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // let { user, dispatch } = useUserContext();
  const [notify, setNotify] = useState(0);
  const [notify2, setNotify2] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [Json, setJson] = useState([]);
  let user = todo;
  user = user[0];
  const token = user ? "Bearer " + user.token : "";
  const Department2 = user ? [...user.department] : "";

  const Department = user ? user.department : "";

  const Lastname = user ? user.lastname : "";
  const Gender = user ? user.gender : "";
  const Phonenumber = user ? user.phonenumber : "";
  const status = user ? user.status : "";
  const status2 = user ? user.status2 : "";
  const [Email, setEmail] = useState(user ? user.email : "");
  useEffect(() => {
    setEmail(user ? user.email : "");
  }, [user]);

  const Location = user ? user.location : "";
  const _id = user ? user._id : "";
  const profile = user ? user.image : "";
  const Firstname = user ? user.firstname : "";
  const Deposite = user ? user.deposit : "";
  const Id = user ? user.id : "";
  //critical
  let user4;
  if (user3 !== "") {
    user4 = user3;
  }
  const [isTaskAccepted, setIsTaskAccepted] = useState(false);

  // Function to handle task acceptance
  const handleTaskAccept = () => {
    setIsTaskAccepted(true); // Update state to show modal to other technicians
  };
  let response;
  let [viewer, setViwer] = useState(null);
  let [CustomerList, setCustomerList] = useState([]);
  const [tosend, setTosend] = useState("");
  const [Customer__id, setCustomer_id] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocationName] = useState("");
  const [error2, setError2] = useState("");
  const [query, setQuery] = useState("");
  const [disp, setdisplay] = useState("visible");
  const [disp2, setdisplay2] = useState("hidden");
  const [disp3, setdisplay3] = useState("visible");
  const [disp4, setdisplay4] = useState("hidden");
  const [disp5, setdisplay5] = useState("hidden");
  const [disp6, setdisplay6] = useState("visible");
  const [disp7, setdisplay7] = useState("hidden");
  const [disp8, setdisplay8] = useState("hidden");
  const [disp10, setdisplay10] = useState("visible");
  const [technicians, setTechnicians] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const red = useNavigate();
  const handleLogOutA = () => {
    localStorage.removeItem("user");
    dispatch2(logOut([]));
    red("/FrontPage");
  };
  const handleP = () => {
    setdisplay7("visible");
    setdisplay6("hidden");
    setdisplay4("hidden");
    setdisplay5("hidden");
    const History = document.getElementById("MyHistory");
    History.classList.toggle("hidden");
  };
  let featcher = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = "Bearer " + user.token;
    response = await fetch(`${API_BASE_URL}/api/Accepted/GetOneTech`, {
      headers: { authorization: token },
    });
    const d = await response.json();
    setJson(d);
    const History = document.getElementById("MyHistory");
    History.classList.toggle("hidden");
    setdisplay7("hidden");
    setdisplay6("hidden");
    setdisplay5("hidden");
  };

  useEffect(() => {
    socket.on("booking", async (msg) => {
      const { db, latestMember } = msg;

      // Flattening the array of arrays into a single array of objects
      const flattenedArray = latestMember.flat();
      setTechnicians(flattenedArray);
      console.log("flattenedArray ", flattenedArray);
      // Check if Email exists in any of the objects
      const emailExists = flattenedArray.some((member) => {
        return member.email === Email;
      });

      if (emailExists) {
        setCustomer_id(db.customer_id);
        array3.push(db);
        setNotify(array3.length);
        setViwer(null);
        setDisabled(false);
        // Clear the existing timeout and set a new one to empty array3 after 30 seconds
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          array3 = [];
          setNotify(0); // Reset the notification count
          setViwer(false);
          setdisplay8("hidden");
          console.log("array3 cleared after 30 seconds");
        }, 30000);
      }
    });

    return () => {
      socket.off("booking");
    };
  }, [socket, Email]);
  //
  useEffect(() => {
    socket.on("cancelR", async (msg) => {
      const { techEmail, _idd } = msg;
      if (techEmail == "") {
        const response = await fetch(`${API_BASE_URL}/api/book/beforeBooking`, {
          method: "POST",
          body: JSON.stringify({
            _idd,
          }),
          headers: { "Content-Type": "application/json" },
        });
        return;
      }
      const Customer__id = _idd;
      console.log("in the out", Email, techEmail);
      if (Email == techEmail) {
        console.log("in the", Email, techEmail);
        const response = await fetch(`${API_BASE_URL}/api/book/updateBooking`, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            Customer__id,
            _id,
          }),
        });
        if (response.ok) {
          const json = await response.json();
          const {
            department,
            firstname,
            lastname,
            gender,
            phonenumber,
            deposit,
            email,
            image,
            location,
            status,
            status2,
            _id,
          } = json;
          dispatch2(
            updateTech({
              id: Id,
              department: department,
              firstname: firstname,
              lastname: lastname,
              gender: gender,
              phonenumber: phonenumber,
              deposit: deposit,
              email: email,
              image: image,
              status: status,
              status2: status2,
              location: location,
              _id: _id,
            })
          );

          setdisplay10("visible");
        }
      }
    });

    return () => {
      socket.off("cancelR");
    };
  }, [socket, Email]);

  const accepted = async (Customer) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setDisabled(true);
    setdisplay10("hidden");
    try {
      const response1 = await fetch(
        `${API_BASE_URL}/api/Accepted/toBeFinished/${_id}`,
        {
          method: "POST",
          body: JSON.stringify({
            department: Customer.department,
            customerId: Customer.customer_id,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const response = await fetch(
        `${API_BASE_URL}/api/book/UpdateTechBook/${Customer.customer_id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: "busy",
            email: user.email,
            technicians: technicians,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const json = await response.json();

        const {
          department,
          firstname,
          lastname,
          gender,
          phonenumber,
          deposit,
          email,
          image,
          location,
          status,
          status2,
          _id,
        } = json;
        dispatch2(
          updateTech({
            id: Id,
            department: department,
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            phonenumber: phonenumber,
            deposit: deposit,
            email: email,
            image: image,
            status: status,
            status2: status2,
            location: location,
            _id: _id,
          })
        );
      }
    } catch (err) {
      console.log("The error is", err);
    }
  };
  useEffect(() => {
    socket.on("warning", (msg) => {
      console.log("the warning email", msg[0].Technician_email);
      setTosend(msg[0].Technician_email);
      if (msg[0].Technician_email === user3.email) {
        console.log("YES AM I YES AM I", tosend);
        setCustomerList(msg);
      }
      setNotify2((prev) => prev + 1);
    });
    return () => {
      socket.off("warning");
    };
  }, [socket]);
  const Finished = async () => {
    try {
      setLoading(true);
      const response1 = await fetch(
        `${API_BASE_URL}/api/Accepted/GetLatestAccept/${_id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const json = await response1.json();
      const departmentt = json.department;
      const myId = json.customerId;
      const work = { myId };
      const response = await fetch(
        `${API_BASE_URL}/api/tech/updateFinish/${_id}`,
        {
          headers: { "Content-Type": "application/json" },
          method: "PATCH",
          body: JSON.stringify({
            work,
            departmentt,
          }),
        }
      );
      if (response.ok) {
        const json = await response.json();
        const {
          department,
          firstname,
          lastname,
          gender,
          phonenumber,
          deposit,
          email,
          image,
          location,
          status,
          status2,
          _id,
        } = json;
        dispatch2(
          updateTech({
            id: Id,
            department: department,
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            phonenumber: phonenumber,
            deposit: deposit,
            email: email,
            image: image,
            status: status,
            status2: status2,
            location: location,
            _id: _id,
          })
        );
      } else {
        const json = await response.json();
        toastify(json.message);
      }
      setdisplay10("visible");
      const resp = await fetch(
        `${API_BASE_URL}/api/Accepted/DeleteLatestAccept/${_id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err) {
      console.log("Failed to update status:", err);
    } finally {
      setLoading(false);
    }
  };
  const declined = () => {
    // socket.emit("Decline", "Declined");
    // socket.emit("info", user);
    // socket.emit("custId", Customer__id);
    array3 = [];
    setNotify(0); // Reset the notification count
    setViwer(false);
    setdisplay8("hidden");
  };

  let calculateDistance = () => {
    setNotify(0);
    setViwer(true);
  };
  let calculateDistance2 = () => {
    setNotify2(0);
    setNotify3(0);
    const timer = setTimeout(() => {
      setNotify2(1);
      setNotify3(1);
    }, 20000);
    setViwer2(true);
  };

  socket.on("UnAccept2", (msg) => {
    if (msg[0].phonenumber === Phonenumber) {
      setDisabled(true);
      console.log("yes true");
    } else {
      console.log("not correct", Email);
      console.log(msg);
    }
  });
  const GPS = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);

          try {
            const apiKey = "3f6fbb502a5f47d4b45b5b3673b4e788";
            const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${apiKey}`;
            const response = await axios.get(geocodeUrl);
            const { results } = response.data;
            const address = results[0].formatted;
            setLocationName(address);
          } catch (error) {
            setError2("Error retrieving location name.");
          }
        },
        (error) => {
          setError2(error.message);
        }
      );
    } else {
      setError2("Geolocation is not supported by this browser.");
    }
  };
  //techList
  useEffect(() => {
    socket.on("techList", async (msg) => {
      const { technicians, Technicians } = msg;

      // Filter out all technicians whose email does not match Technicians.email
      const filteredTechnicians = technicians.filter((member) => {
        return member.email !== Technicians.email;
      });
      const emailExists = filteredTechnicians.some((member) => {
        return member.email === Email;
      });

      if (emailExists) {
        handleTaskAccept();
      }
    });

    return () => {
      socket.off("booking");
    };
  }, [socket, Email]);
  useEffect(() => {
    GPS();
    const interval = setInterval(() => {
      GPS();
    }, 2 * 60 * 1000); // 5 minutes in milliseconds

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    response2();
    socket.emit("locationChange", "change");
    dispatch2(
      updateTech({
        id: Id,
        department: Department,
        firstname: Firstname,
        lastname: Lastname,
        gender: Gender,
        phonenumber: Phonenumber,
        deposit: Deposite,
        email: Email,
        image: profile,
        status: status,
        status2: status2,
        location: location,
        _id: _id,
      })
    );
  }, [location]);
  const response2 = () =>
    fetch(`${API_BASE_URL}/api/Tech/${_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location: location }),
    });

  useEffect(() => {
    map.innerHTML =
      '<iframe border-radius="50%" overflow="hidden"  width="1330" height="800" src="https://maps.google.com/maps?q=' +
      latitude +
      "," +
      longitude +
      '&amp;z=15&amp;output=embed"></iframe>';
  });

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    fetchSuggestions(inputValue);
  };
  const handleChoiceChange = async (event) => {
    setQuery(event);
    setdisplay("hidden");
    setdisplay2("hidden");
    setdisplay3("visible");
    setLocationName(event);
    const response2 = fetch(`${API_BASE_URL}/api/Tech/${_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event }),
    });

    let slat;
    let slon;
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          event
        )}&key=d8ef50e3e7d946cfa6c0e208e47dddb3`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        slat = lat;
        slon = lng;
        setLatitude(slat);
        setLongitude(slon);
        console.log("slat", slat);
        console.log("slon", slon);
      } else {
        console.log("No results found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const makeVisible = () => {
    setdisplay2("visible");
    setdisplay3("hidden");
    setdisplay("hidden");
  };

  const fetchSuggestions = async (inputValue) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${inputValue}&format=json&limit=5`;
      const response = await axios.get(url);
      setSuggestions(response.data);
    } catch (error) {
      setError("Error fetching suggestions.");
    }
  };
  const handleChoiceChange2 = async (event) => {
    setdisplay2("hidden");
    setdisplay3("visible");
    setdisplay8("hidden");
    array3 = [];
  };
  const handleChoiceChange3 = () => {
    setdisplay4("visible");
    setdisplay8("hidden");
    array3 = [];
  };
  const handleChoiceChange4 = () => {
    setdisplay4("hidden");
    setdisplay8("hidden");
    array3 = [];
  };
  const handleChoiceChange5 = () => {
    setdisplay5("visible");
    setdisplay6("hidden");
    setdisplay7("hidden");
    const History = document.getElementById("MyHistory");
    History.classList.toggle("hidden");
  };
  const handleChoiceChange6 = () => {
    const MyMoney = document.getElementById("MyMoney");
    MyMoney.classList.toggle("hidden");
  };
  const handleChoiceChange7 = () => {
    setdisplay5("hidden");
    setdisplay6("visible");
    setdisplay7("hidden");
    setdisplay4("hidden");
    const History = document.getElementById("MyHistory");
    History.classList.toggle("hidden");
  };
  const handleChoiceChange8 = () => {
    setdisplay8("visible");
    calculateDistance();
  };
  return (
    <div className={""}>
      {
        <div>
          {isTaskAccepted && (
            <div className=" App p-4">
              {/* Modal that shows if task is accepted */}

              {<TaskAcceptedModal />}
            </div>
          )}
          <div className=" overflow-y-auto   m-3 absolute  w-[1010px] h-[470px] mt-[138px] ml-72">
            <div className={disp7}>
              <ChatTech user={user4} />
            </div>
            <div
              id="map"
              ref={mapRef}
              className={
                "  absolute   mt-[50px] sm:mt-[150px] w-full sm:w-[580px] h-[700px] sm:ml-[50px] rounded-xl md:w-[780px] md:h-[400px] overflow-hidden " +
                disp6
              }
            />
            <div className={"hidden "} id="MyHistory">
              {" "}
              {Json && (
                <div className="ml-36">
                  <h1 className="ml-56 text-3xl font-bold">
                    Your Work History
                  </h1>
                  {Json.map((r, index) => (
                    <div
                      key={index}
                      className=" bg-gray-200 space-y-9 cursor-pointer hover:bg-cyan-300 border-[1px] border-y-black text-2xl font-mono"
                    >
                      <ul>
                        <li>{r.Customer_firstname}</li>
                        <li>{r.Customer_phonenumber}</li>
                        <li>{r.Customer_location}</li>
                        <li>{r.department}</li>
                        <li>{r.createdAt}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={disp5}>
              <div className="flex ">
                <div className="flex w-60  border-r-gray-200 h-[740px]">
                  <div className="mt-[120px] ml-3 font-bold flex">
                    <MdAccountCircle className=" ml-24 text-[65px] hover:text-green-200 text-green-500 " />
                    <div className="mt-2 ml-2">Personal Informations</div>
                  </div>
                  <div className="flex">
                    <div className=" ml-28  w-96 mt-10 ">
                      <div className=" border-b-gray-300 ml-10  h-16">
                        <h1 className="text-2xl font-bold">
                          Personal Information's
                        </h1>
                      </div>
                      <div>
                        <div className="flex ml-10">
                          <FaTools className="text-2xl text-green-500" />
                          <h1 className="text-[18] font-semibold ml-2">
                            Department
                          </h1>
                        </div>
                        <div className=" border-b-gray-300 ml-10  h-16 mt-7 overflow-y-scroll">
                          {Department2 != "" &&
                            Department2.map((p) => (
                              <div className="font-bold">{p}</div>
                            ))}
                        </div>
                      </div>
                      <div className=" border-b-gray-300 ml-10  h-16 mt-7">
                        <div className="flex">
                          <FaUser className="text-2xl text-green-500" />
                          <h1 className="text-[18] font-semibold ml-2">
                            First Name
                          </h1>
                        </div>
                        {Firstname}
                      </div>
                      <div className=" border-b-gray-300 ml-10  h-16 mt-7">
                        <div className="flex">
                          <FaUser className="text-2xl text-green-500" />
                          <h1 className="text-[18] font-semibold ml-2">
                            Lastname
                          </h1>
                        </div>
                        {Lastname}
                      </div>

                      <div className=" border-b-gray-300 ml-10  h-16 mt-7">
                        <div className="flex">
                          <PiGenderFemaleDuotone className="text-2xl text-green-500" />
                          <h1 className="text-[18] font-semibold ml-2">
                            Gender
                          </h1>
                        </div>
                        {Gender}
                      </div>
                      <div className=" border-b-gray-300 ml-10  h-16 mt-7">
                        <div className="flex">
                          <AiFillPhone className="text-2xl text-green-500" />
                          <h1 className="text-[18] font-semibold ml-2">
                            Phonenumber
                          </h1>
                        </div>
                        {Phonenumber}
                      </div>
                      <div className=" border-b-gray-300 ml-10  h-16 mt-7">
                        <div className="flex">
                          <MdEmail className="text-2xl text-green-500" />
                          <h1 className="text-[18] font-semibold ml-2">
                            Email
                          </h1>
                        </div>
                        {Email}
                      </div>
                      <div className=" border-b-gray-300 ml-10  h-16 mt-7">
                        <div className="flex">
                          <ImLocation className="text-2xl text-green-500" />
                          <h1 className="text-[18] font-semibold ml-2">
                            Location
                          </h1>
                        </div>
                        {Location}
                      </div>
                    </div>
                    <div className="  w-96">
                      <div className="ml-24 mt-5 text-[18px]">
                        Update Profile
                      </div>
                      <div className="absolute mt-44 ml-48  ">
                        <FaPen className="absolute ml-2 mt-2 text-white text-[13px]" />
                        <FaCircle className="text-green-500 text-3xl" />
                      </div>
                      <div className="mt-14 ml-24">
                        <img
                          src={profile}
                          className="w-[150px] h-[150px] rounded-full "
                          onClick={handleChoiceChange3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex mt-7 ">
            <div
              className={" w-[1400px]  absolute  " + disp4}
              onClick={handleChoiceChange4}
            >
              <div className="bg-gray-200 mt-32 ml-[1000px] w-80 h-96  text-2xl space-y-4 rounded-lg">
                <div className="absolute space-y-4">
                  <div
                    className="flex ml-3 mt-11 cursor-pointer bg-gray-200 hover:bg-white w-72 h-12 rounded-lg"
                    onClick={handleChoiceChange5}
                  >
                    <CgProfile className="mt-3 ml-3" />
                    <p className="text-[15px] ml-3 mt-2">My Profile</p>
                  </div>
                  <div
                    className="flex ml-3 mt-11 cursor-pointer bg-gray-200 hover:bg-white w-72 h-12 rounded-lg "
                    onClick={handleP}
                  >
                    <BiSolidMessageDetail className="mt-3 ml-3" />
                    <p className="text-[15px] ml-3 mt-1 ">Inbox</p>
                  </div>
                  <div
                    className="flex text-green-500 ml-3 mt-11 cursor-pointer bg-gray-200 hover:bg-white w-72 h-12 rounded-lg"
                    onClick={handleLogOutA}
                  >
                    <RiLogoutCircleLine className="mt-3 ml-3" />
                    <p className="text-[15px] ml-3 mt-2 font-bold">Logout</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex ml-6  w-[500px] mt-3 ">
              <div>
                <ImLocation className=" text-[40px]    font-bold text-green-500 " />
                <h3>ይህ የGPS </h3>
                <h3>ግምታዊ</h3>
                <h3>አድራሻዎት</h3>
                <h3 className="ml-4">ነው</h3>
              </div>

              {location}
            </div>
            <div className="mt-3">
              {" "}
              <div className={disp3}>
                <MdEditLocationAlt
                  onClick={makeVisible}
                  className=" text-[40px] text-green-500   hover:text-pink-600  font-bold cursor-pointer"
                />
                <h3>አድራሻዎትን </h3>
                <h3 className="ml-2">ያስተካክሉ</h3>
                <ToastContainer />
              </div>
            </div>

            <div
              className={
                " w-96 h-[450px] absolute mt-24 ml-[576px] rounded-lg border-2 bg-slate-100 " +
                disp8
              }
            >
              <div className="mt-5 ml-8 text-2xl ">Notifications</div>
              {array3.map((d, index) => (
                <div className="w-96 h-28 hover:bg-yellow-100 mt-8" key={index}>
                  {notify == 0 ? (
                    <div className="text-[15px] font-bold" key={index}>
                      <p className="text-[15px] font-bold" key={index}>
                        {d.Customer_firstname}
                      </p>
                      <p className="text-[15px] font-bold" key={index}>
                        {d.Customer_lastname}
                      </p>
                      <p className="text-[15px] font-bold" key={index}>
                        {d.Customer_location}
                      </p>
                      <p className="text-[15px] font-bold" key={index}>
                        {d.Customer_phonenumber}
                      </p>
                      <p className="text-[15px] font-bold" key={index}>
                        {d.department}
                      </p>
                      <p className="text-[15px] font-bold" key={index}>
                        {d.typeOfProblem}
                      </p>
                    </div>
                  ) : null}
                  {viewer && (
                    <div className="flex space-x-4">
                      {" "}
                      <button
                        onClick={() => accepted(d)}
                        disabled={disabled}
                        className=" text-[12px] w-20 h-6 bg-green-400 rounded-lg hover:bg-green-300"
                      >
                        Accept
                      </button>
                      <button
                        onClick={declined}
                        disabled={disabled}
                        className="text-[12px] w-20 h-6 bg-red-500 rounded-lg hover:bg-red-400"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className=" w-[300px]">
              <div className=" ">
                <div className={disp2}>
                  <div className="flex mr-10">
                    <input
                      type="text"
                      onChange={handleInputChange}
                      onFocus={() => setdisplay("visible")}
                      value={query}
                      placeholder="Location"
                      className="bg-transparent   h-[35px] w-[300px]  border-2 block focus:outline-none focus:border-black  rounded-2xl   px-4 placeholder-black "
                    />
                    <ImLocation className=" mt-2 absolute ml-[270px] text-green-500" />
                  </div>
                </div>

                <ul id="mylist" className={disp}>
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.place_id}
                      onClick={() =>
                        handleChoiceChange(suggestion.display_name)
                      }
                      className=" "
                    >
                      <div className="flex">
                        <ImLocation className="text-2xl p-1 text-green-500 " />
                        {suggestion.display_name}
                      </div>
                    </li>
                  ))}
                </ul>
                {/* {error && <p>Error: {error}</p>} */}
              </div>
              <div
                className="  h-32 w-[313px] mt-7  "
                onClick={handleChoiceChange2}
              ></div>
            </div>

            <div className=" flex space-x-3 text-3xl  mt-3 text-black  ">
              <div
                className={
                  " h-96 w-[500px] relative mt-6 overflow-y-scroll hidden"
                }
                id="MyMoney"
              >
                <div className="bg-red-600">
                  <label className="ml-14 text-[20px] ">
                    Your Balace is Low!
                  </label>
                </div>

                <div className="text-[20px] space-y-3">
                  {CustomerList.length !== 0 ? (
                    <h3>
                      These are the last {CustomerList.length} places that you
                      have worked
                    </h3>
                  ) : null}
                  {CustomerList.length !== 0
                    ? CustomerList.map((r, index) => (
                        <div
                          key={index}
                          className="bg-gray-200  cursor-pointer hover:bg-pink-500 text-[13px] "
                        >
                          {" "}
                          {
                            <ul>
                              <li>First_Name: {r.Customer_firstname}</li>
                              <li>Last_Name: {r.Customer_lastname}</li>
                              <li>Phone_Number: {r.Customer_phonenumber}</li>
                              <li>Location: {r.Customer_location}</li>
                              <li>Date: {r.createdAt}</li>
                            </ul>
                          }
                        </div>
                      ))
                    : null}
                </div>
              </div>
              <div
                className={
                  status2 == "offline"
                    ? "bg-red-600 w-28 h-14 rounded-md"
                    : "bg-green-600 w-28 h-14 rounded-md"
                }
              >
                <p className="mt-3 text-white text-[15px] ml-2">
                  <strong>
                    {status2 == "offline" ? "You areOffline" : "You are Online"}
                  </strong>
                </p>
              </div>
              <div className=" w-36 h-12    cursor-pointer ">
                <ToggleButton nanoId={Id} userId={_id} state={status2} />
              </div>

              {(status == "free" || status == "") &&
              (status2 == "not" || status2 == "" || status2 == "offline") ? (
                <div className=" w-14 h-14 border-[1px] rounded-xl border-green-400 cursor-pointer">
                  <div
                    className={
                      notify == 0
                        ? "hidden"
                        : "absolute text-[19px] ml-6 mt-3 text-red-600 flex"
                    }
                  >
                    <FaCircle />
                  </div>
                  <div
                    className="absolute text-white ml-7 mt-1 text-[14px] font-bold  "
                    onClick={handleChoiceChange8}
                  >
                    {notify == 0 ? null : notify}
                  </div>

                  <div>
                    {" "}
                    <IoMdNotifications className={"ml-2 mt-3 " + disp10} />
                  </div>
                </div>
              ) : (
                <div className="text-center mt-1">
                  <button
                    onClick={() => Finished()}
                    disabled={loading}
                    className={`px-6 py-2 text-lg font-semibold text-white rounded-md transition-colors ${"bg-green-500 hover:bg-green-600"} ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Updating..." : "Done"}
                  </button>
                </div>
              )}
              <div
                className=" w-14 h-14 border-[1px] rounded-xl border-green-400 cursor-pointer"
                onClick={handleP}
              >
                <BiSolidMessageDetail className="ml-2 mt-3" />
              </div>

              <div
                className={
                  (Deposite <= 200 &&
                    (Department2.includes("TV") ||
                      Department2.includes("FRIDGE"))) ||
                  (Deposite <= 30 && Department2.includes("DISH")) ||
                  (Deposite <= 200 &&
                    Department2.includes("DISH") &&
                    Department2.includes("TV")) ||
                  (Deposite <= 200 &&
                    Department2.includes("STOVE") &&
                    Department2.includes("TV")) ||
                  (Deposite <= 100 && Department2.includes("STOVE")) ||
                  Department2.includes("MITAD")
                    ? "flex bg-red-600 animate-pulse w-24 h-11 mt-1 rounded-lg cursor-pointer"
                    : "flex bg-green-500 w-24 h-11 mt-1 rounded-lg"
                }
                onClick={notify2 == 0 ? null : handleChoiceChange6}
              >
                {/* {deposite} */}
                <p className="text-[20px] text-white mt-1 ml-1">
                  {Deposite}Birr
                </p>
              </div>
              <div className="rounded-2xl ml-2 ">
                <img
                  src={profile}
                  className="w-[70px] h-[70px] rounded-2xl cursor-pointer"
                  onClick={handleChoiceChange3}
                />
              </div>
            </div>

            <div>
              <button onClick={calculateDistance2}>
                {<div>{CustomerList.length == 0 ? notify2 : null}</div>}
              </button>
            </div>
          </div>
          <div className="mt-12  w-32 sm:w-full">
            <div className="border-[1px] sm:w-72 w-32">
              <h2 className="ml-16">Menu</h2>
            </div>
            <div className="ml-14 mt-8 space-y-4">
              <div
                className="flex cursor-pointer"
                onClick={handleChoiceChange7}
              >
                <FaHome className="text-3xl text-green-500" />
                <h1 className="text-[20px] ml-2">Home</h1>
              </div>
              <div className="flex cursor-pointer" onClick={handleP}>
                <IoMdNotifications className="text-3xl text-green-500" />
                <h1 className="text-[20px] ml-2">Inbox</h1>
              </div>
              <div className="flex">
                <RiChatHistoryFill className="text-3xl text-green-500" />
                <h1 className="text-[20px] ml-2" onClick={featcher}>
                  History
                </h1>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};
// Modal component
function TaskAcceptedModal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-full sm:max-w-md mx-4 sm:mx-auto">
        <h2 className="text-lg sm:text-2xl font-bold mb-4 text-center">
          Task Already Accepted
        </h2>
        <p className="text-gray-700 mb-4 text-center text-sm sm:text-base">
          Another technician has already accepted this task.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={() => window.location.reload()}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default Home;
