import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useUserContextC } from "../Hooks/useUserContextC";
import { useCustomerForm } from "../Hooks/useCustomerForm";
import { MdEditLocationAlt } from "react-icons/md";
import { FaSatelliteDish } from "react-icons/fa";
import { RiComputerFill } from "react-icons/ri";
import { FaPeopleRoof } from "react-icons/fa6";
import { MdCarpenter } from "react-icons/md";
import { MdOutlinePlumbing } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import hiloe5 from "../assets/A_15.jpeg";
import hiloe6 from "../assets/A_16.avif";
import hiloe7 from "../assets/A_17.jpg";
import hiloe8 from "../assets/A_19.avif";
import hiloe9 from "../assets/A_21.jpg";
import { ImHappy2 } from "react-icons/im";
import axios from "axios";
const Dashboard2 = () => {
  let { customer, dispatch } = useUserContextC();
  customer = customer[0];
  const token = "Bearer " + customer.token;
  const _id = customer._id;
  let socket = io("http://localhost:5001");
  let [json, setJson] = useState([]);
  let response;
  const [typeOfProblem, setProblem] = useState("");
  const [department, setDepartment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [success2, setSuccess2] = useState("");
  const [success3, setSuccess3] = useState("");
  const [imogi, setImogi] = useState("");
  const [time, setTime] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocationName] = useState("");
  const [error2, setError2] = useState("");

  const [disp, setdisplay] = useState("visible");

  const [disp2, setdisplay2] = useState("visible");
  const [disp3, setdisplay3] = useState("visible");
  const [disp4, setdisplay4] = useState("visible");
  const [disp5, setdisplay5] = useState("visible");
  const [disp6, setdisplay6] = useState("hidden");
  const [disp7, setdisplay7] = useState("hidden");
  const [disp8, setdisplay8] = useState("hidden");

  const [disp9, setdisplay9] = useState("hidden");
  const [disp10, setdisplay10] = useState("visible");

  const { CustomerForm, error, TaskDelete } = useCustomerForm();
  let featcher = async () => {
    response = await fetch("/api/Accepted/GetOneCustomer", {
      headers: { authorization: token },
    });
    setJson(await response.json());
  };
  socket.once("U_id", (msg) => {
    if (customer._id.toString() === msg.toString()) {
      console.log("Your Request has been Accepted!!!");
      setIsLoading(false);
      setdisplay("hidden");
      setdisplay2("hidden");
      setdisplay3("hidden");
      setdisplay4("hidden");
      setdisplay5("hidden");
      setdisplay6("hidden");
      const Div7 = document.getElementById("Div7");
      Div7.classList.toggle("hidden");
      setImogi(<ImHappy2 />);
      setSuccess("Your Request has been Accepted!!!");
      setSuccess2("We will Calling You in a few minutes");
      setSuccess3("Thank You !");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    socket.emit("myemail", customer.email);
    socket.emit("loggedIn", customer);

    setIsLoading(true);

    //setdisplay6("visible");
    // const Div7 = document.getElementById("Div7");
    // Div7.classList.toggle("hidden");
    await CustomerForm(typeOfProblem, department);
    socket.on("Error", (msg) => {
      if (msg === "error") {
        setIsLoading(false);
        // const myDiv2 = document.getElementById("myDiv2");
        // // myDiv2.classList.toggle("ml-36");
        // myDiv2.classList.toggle("hidden");
        // setdisplay6("visible");
        // setdisplay2("visible");
      }
      if (msg === "noterror") {
        console.log("the msg", msg);
      }
    });
  };
  useEffect(() => {
    if (isLoading) {
      setdisplay("hidden");
      setdisplay2("hidden");
      setdisplay3("hidden");
      setdisplay4("hidden");
      setdisplay5("hidden");
    }
    if (isLoading) {
      setdisplay("visible");
      setdisplay2("visible");
      setdisplay3("visible");
      setdisplay4("visible");
      setdisplay5("visible");
    }
  }, [isLoading]);
  useEffect(() => {
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
  }, []);

  const response2 = fetch("/api/Customer/" + _id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ location }),
  });
  const changeSize = () => {
    const myDiv1 = document.getElementById("myDiv1");
    setDepartment("DISH");
    myDiv1.classList.toggle("ml-72");
    const myDiv2 = document.getElementById("myDiv2");
    myDiv2.classList.toggle("ml-36");
    myDiv2.classList.toggle("hidden");
    const myDiv3 = document.getElementById("myDiv3");
    myDiv3.classList.toggle("hidden");
    const myDiv4 = document.getElementById("myDiv4");
    myDiv4.classList.toggle("hidden");
    const myDiv5 = document.getElementById("myDiv5");
    myDiv5.classList.toggle("hidden");
    const Div7 = document.getElementById("Div7");
    Div7.classList.toggle("hidden");
  };
  const changeSize2 = () => {
    const myDiv1 = document.getElementById("myDiv1");
    setDepartment("TV");
    myDiv1.classList.toggle("hidden");
    const myDiv2 = document.getElementById("myDiv2");
    myDiv2.classList.toggle("ml-[470px]");
    const myDiv3 = document.getElementById("myDiv3");
    myDiv3.classList.toggle("hidden");
    const myDiv4 = document.getElementById("myDiv4");
    myDiv4.classList.toggle("hidden");
    const myDiv5 = document.getElementById("myDiv5");
    myDiv5.classList.toggle("hidden");
    // const Div7 = document.getElementById("Div7");
    // Div7.classList.toggle("hidden");
    setdisplay6("visible");
  };

  return (
    <div id="body" className="h-[1200px] w-[1350px]">
      {isLoading ? (
        <div id="load" className="text-3xl space-y-3">
          <div>G</div>
          <div>N</div>
          <div>I</div>
          <div>D</div>
          <div>A</div>
          <div>O</div>
          <div>L</div>
        </div>
      ) : null}
      <div className="text-white text-[130px] ml-[600px] mt-16 absolute animate-pulse">
        {imogi}
      </div>
      <div className="text-white text-[60px] ml-60 mt-52 absolute animate-pulse">
        {success}
      </div>
      <div className="text-white text-[60px] ml-60 mt-80 absolute animate-pulse transition-all duration-1000">
        {success2}
      </div>
      <div className="text-white text-[60px] ml-[550px] mt-[400px] absolute animate-pulse transition-all duration-1000">
        {success3}
      </div>

      <div>
        <div className="flex  ">
          <div
            id="myDiv1"
            className={
              "w-[810px]  h-80  mt-11 ml-9 cursor-pointer transition-all duration-500 bg-black " +
              disp
            }
            onClick={changeSize}
          >
            <div className="mt-[250px] ml-7 absolute text-3xl font-bold text-white cursor-pointer hover:text-yellow-500 transition-all duration-400 ">
              Satellite Dish Installation and Maintainance
            </div>
            <div className="w-[810px] h-80  hover:bg-black transition-all duration-500 hover:opacity-60 ">
              <div className="mt-40 ml-7 absolute text-3xl cursor-pointer h-[70px] w-[70px] bg-yellow-400 rounded-full hover:bg-white  ">
                <FaSatelliteDish className="ml-5 mt-4 " />
              </div>

              <img
                src={hiloe5}
                alt=""
                className="w-full h-full    transition-all duration-500 "
              />
            </div>
          </div>
          <div
            id="myDiv2"
            className={
              "w-[430px] h-80 bg-black mt-11 ml-9 cursor-pointer transition-all duration-500 " +
              disp2
            }
            onClick={changeSize2}
          >
            <div className="mt-[250px] ml-7 absolute text-3xl font-bold text-white cursor-pointer">
              Television Reparing
            </div>
            <div className="w-[430px] h-80  hover:bg-black transition-all duration-500 hover:opacity-60 ">
              <div className="mt-40 ml-7 absolute text-3xl h-[70px] w-[70px] bg-yellow-400 rounded-full">
                <RiComputerFill className="ml-5 mt-4" />
              </div>
              <img
                src={hiloe6}
                alt=""
                className="w-full h-full    transition-all duration-500 "
              />
            </div>
          </div>
        </div>
        <div className="flex">
          <div
            id="myDiv3"
            className={
              "w-96 h-80 bg-black mt-9 ml-[38.5px] cursor-pointer " + disp3
            }
          >
            <div className="mt-[255px] ml-7 absolute text-3xl font-bold text-white cursor-pointer">
              Roofing Services
            </div>
            <div className="w-96 h-80  hover:bg-black transition-all duration-500 hover:opacity-60 ">
              <div className="mt-[187px] ml-7 absolute text-3xl cursor-pointer h-[70px] w-[70px] bg-yellow-400 rounded-full">
                <FaPeopleRoof className="ml-5 mt-4" />
              </div>
              <img
                src={hiloe7}
                alt=""
                className="w-full h-full    transition-all duration-500 "
              />
            </div>
            <div className=" w-[365px] h-32 mt-[193px] ml-5"></div>
          </div>
          <div
            id="myDiv4"
            className={
              "w-96 h-80 bg-black mt-9 ml-[38.5px] cursor-pointer " + disp4
            }
          >
            <div className="mt-[255px] ml-7 absolute text-3xl font-bold text-white cursor-pointer">
              Carpentry Services
            </div>
            <div className="w-96 h-80  hover:bg-black transition-all duration-500 hover:opacity-60 ">
              <div className="mt-[187px] ml-7 absolute text-3xl cursor-pointer h-[70px] w-[70px] bg-yellow-400 rounded-full">
                <MdCarpenter className="ml-5 mt-4" />
              </div>
              <img
                src={hiloe8}
                alt=""
                className="w-full h-full    transition-all duration-500 "
              />
            </div>
          </div>
          <div
            id="myDiv5"
            className={
              "w-[430px] h-80 bg-black mt-9 ml-[38.5px] cursor-pointer " + disp5
            }
          >
            <div className="mt-[255px] ml-7 absolute text-3xl font-bold text-white cursor-pointer">
              Plumbing Services
            </div>
            <div className="w-[430px] h-80  hover:bg-black transition-all duration-500 hover:opacity-60 ">
              <div className="mt-[187px] ml-7 absolute text-3xl cursor-pointer h-[70px] w-[70px] bg-yellow-400 rounded-full">
                <MdOutlinePlumbing className="ml-5 mt-4" />
              </div>
              <img
                src={hiloe9}
                alt=""
                className="w-full h-full    transition-all duration-500 "
              />
            </div>
          </div>
        </div>
      </div>
      {/* <h2>{location}</h2> */}
      <button onClick={featcher}>
        <h1>H</h1>
      </button>
      {json && (
        <div>
          {json.map((r, index) => (
            <div key={index}>
              {r.Technician_firstname}
              {r.Technician_email}
              {r.createdAt}
            </div>
          ))}
        </div>
      )}
      <div id="Div7" className={"w-56 ml-[430px] " + disp6}>
        <div className="ml-6  w-[450px] justify-center flex space-x-3">
          <div className="bg-green-500 rounded-full w-10 h-10">
            <FaPen className="text-2xl mt-2 text-white ml-2  " />
          </div>
          <div className="border-2 border-b-pink-600 rounded-full bg-pink-600 w-[430px] ml-4">
            <label className="text-2xl font-semibold text-white ml-4">
              Problem Description(Optional)
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-2">
          <textarea
            cols={55}
            rows={10}
            value={typeOfProblem}
            placeholder="Try to explain about the problem that you are facing"
            onChange={(e) => setProblem(e.target.value)}
            className="mt-3 ml-16 h-20 placeholder:font-semibold  placeholder:ml-3"
          ></textarea>

          <button className="mt-2 ml-16 bg-gradient-to-b hover:text-cyan-400 h-[48px] text-white w-96 border-2  from-yellow-400 rounded-3xl font-semibold hover:to-purple-800 transition delay-200   absolute flex     ">
            <h1 className="ml-36 mt-2 font-bold">Confirm Order</h1>
          </button>
          {error == "No Internet Connection" ? (
            <div className="text-white text-2xl absolute mt-[70px] ml-28">
              <div className="h-14 w-72 bg-red-600 rounded-full">
                <div className="ml-5 mt-2 absolute">{error}</div>
              </div>

              <br />
              <h1 className="text-[17px]">Try:</h1>

              <h1 className="text-[17px]">
                Checking the network cables, modem, and router
              </h1>
              <h1 className="text-[17px]">Reconnecting to Wi-Fi</h1>
              <h1 className="text-[17px]">
                Running Windows Network Diagnostics
              </h1>
            </div>
          ) : error == "No  Technician Found" ? (
            <div className="text-white text-2xl absolute mt-[70px] ml-28">
              <div className="h-14 w-72 bg-red-600 rounded-full">
                <div className="ml-5 mt-2 absolute">{error}</div>
              </div>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Dashboard2;
