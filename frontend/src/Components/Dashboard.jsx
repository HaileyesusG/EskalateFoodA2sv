import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
let socket = io("https://africadeploybackend.onrender.com");
import { useLocation, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { FaAddressBook } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { useUserContextC } from "../Hooks/useUserContextC";
import { useCustomerForm } from "../Hooks/useCustomerForm";
import { FaSatelliteDish } from "react-icons/fa";
import { PiTelevisionFill } from "react-icons/pi";
import { MdOutlinePlumbing } from "react-icons/md";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { GiCampCookingPot } from "react-icons/gi";
import { FaPaintRoller } from "react-icons/fa6";
import { MdRoofing } from "react-icons/md";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";
import { FaUser } from "react-icons/fa6";
import SignUpC from "./SignUpC";
import { IoMdClose } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GiGasStove } from "react-icons/gi";
import hiloe6 from "../assets/Ai_6.jfif";
import { MdEditLocationAlt } from "react-icons/md";
import { ImLocation } from "react-icons/im";
let array3 = [];
const Dashboard = () => {
  const mapRef = useRef(null);
  const [typeOfProblem, setProblem] = useState("");
  const [department, setDepartment] = useState("");
  const [signup, setSignup] = useState(false);
  const [signup2, setSignup2] = useState(true);
  const [signup3, setSignup3] = useState(true);
  const [refereshKey, setRefereshKey] = useState(0);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocationName] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError] = useState("");
  const [Customer, setCustomer] = useState("");
  const [query, setQuery] = useState("");
  const [disp, setdisplay] = useState("visible");
  const [disp2, setdisplay2] = useState("hidden");
  const [disp3, setdisplay3] = useState("visible");
  const [isAccept, setIsAccept] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonHidden, setIsButtonHidden] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [techEmail, setTechEmail] = useState("");
  const [_id, setId] = useState(null);
  const [phonenumber, setPhone] = useState(null);
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
  useEffect(() => {
    GPS();
    const interval = setInterval(() => {
      GPS();
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  let { customer, dispatch2 } = useUserContextC();
  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");
    if (storedCustomer) {
      const Customer = JSON.parse(storedCustomer);
      setId(Customer._id);
      setPhone(Customer.phonenumber);
      customer = Customer;
      dispatch2({ type: "LOGIN", payload: Customer });

      if (Customer) {
        const response2 = fetch(
          `${API_BASE_URL}/api/Customer/${Customer._id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ location: location }),
          }
        );
      }

      setCustomer(Customer);
    } else {
      customer = customer[0];
      console.log("not found2U", customer);
    }
  }, [location, refereshKey]);

  const token = customer ? "Bearer " + customer.token : "";

  let [json, setJson] = useState([]);

  const handleDivClick = (divIndex) => {
    setSelectedDiv(divIndex);
    if (divIndex === 0) setDepartment("DISH");
    if (divIndex === 1) setDepartment("TV");
    if (divIndex === 2) setDepartment("FRIDGE");
  };

  const { CustomerForm, isLoading, error, who } = useCustomerForm();
  let featcher = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/Accepted/GetOneCustomer/${_id}`
    );
    const c = await response.json();
    setJson(c);
  };
  useEffect(() => {
    if (isLoading) setIsLoading2(true);
    if (!isLoading) setIsLoading2(false);
    console.log("in loading");
  }, [isLoading]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <iframe
          style="border:0; border-radius: 0.5rem; width: 100%; height: 100%;"
          src="https://maps.google.com/maps?q=${latitude},${longitude}&amp;z=15&amp;output=embed"
          allowfullscreen
        ></iframe>`;
    }
  }, [latitude, longitude]);

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

    let slat;
    let slon;
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          event
        )}&key=3f6fbb502a5f47d4b45b5b3673b4e788`
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
  const red = useNavigate();
  const handleOrder = () => {
    red("/signupC");
  };
  const handlesignup2 = () => {
    setSignup(!signup);
    setSignup2(!signup2);
    setSignup3(!signup3);
    const myDiv2 = document.getElementById("map");
    myDiv2.classList.toggle("hidden");
    setRefereshKey((prev) => prev + 1);
  };
  const handlesignup = () => {
    setSignup(!signup);
    setSignup2(!signup2);
    setSignup3(!signup3);
    const myDiv2 = document.getElementById("map");
    myDiv2.classList.toggle("hidden");
  };
  const handleCancelOrder = () => {
    console.log("emmting", _id);
    setIsOpen(false);
    setIsLoading2(false);
    setIsAccept(false);
    setIsButtonHidden(false);
    const _idd = _id;
    const IDS = { _idd, techEmail };
    socket.emit("cancel", IDS);
  };
  //
  const handleCancelOrder2 = () => {
    setIsOpen(false);
    setIsLoading2(false);
    setIsAccept(false);
    setIsButtonHidden(false);
  };
  const handleOrderNow = async (e) => {
    e.preventDefault();
    if (department == "") {
      console.log("please select dep");
      return;
    }
    setIsLoading2(true);
    setIsOpen(true);
    setIsButtonHidden(true);

    //return;
    socket.emit("loggedIn", customer);
    await CustomerForm(typeOfProblem, department);
    //Backend Logic
  };
  useEffect(() => {
    socket.on("IsAccept", (msg) => {
      const { MyCustomer, Technicians } = msg;
      console.log("the phone", MyCustomer);
      console.log("the Technicians", Technicians);
      if (phonenumber === MyCustomer.phonenumber) {
        setIsAccept(true);
        setIsLoading2(false);
        setTechEmail(Technicians.email);
        console.log("the is loading2 is", isLoading2);
        array3.push(Technicians);
      }
    });
    return () => {
      socket.off("IsAccept");
    };
  }, [socket, phonenumber]);
  return (
    <div key={refereshKey}>
      <div className="absolute mt-5 ml-8 sm:mt-11 flex">
        <div>
          <ImLocation className="text-[30px] text-pink-600 shadow font-bold" />
          <p className="text-[10px] ">ይህ የGPS </p>
          <p className="text-[10px] "> ግምታዊ </p>
          <p className="text-[10px] ">አድራሻዎት </p>
          <p className="ml-4 text-[10px] ">ነው</p>
        </div>
        <div className="w-[90px] md:w-[400px] ml-3">
          <h3>{location}</h3>
        </div>
        <div className="ml-12 sm:ml-[600px]">
          <div className={disp2}>
            <div className="flex mr-10">
              <input
                type="text"
                onChange={handleInputChange}
                onFocus={() => setdisplay("visible")}
                value={query}
                placeholder="Location"
                className="bg-transparent h-[35px] w-[300px] border-2 block focus:outline-none focus:border-white rounded-2xl px-4 placeholder-white"
              />
              <ImLocation className="mt-2 absolute ml-[270px]" />
            </div>
          </div>

          <ul id="mylist" className={disp}>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                onClick={() => handleChoiceChange(suggestion.display_name)}
              >
                <div className="flex">
                  <ImLocation className="text-2xl p-1" />
                  {suggestion.display_name}
                </div>
              </li>
            ))}
          </ul>
          {error3 && <p>Error: {error3}</p>}
          <div className={"ml-[60px]  " + disp3}>
            <MdEditLocationAlt
              onClick={makeVisible}
              className="text-[30px] ml-3 text-pink-600 shadow font-bold cursor-pointer"
            />
            <h4>አድራሻዎትን </h4>
            <h4 className="ml-2">ያስተካክሉ</h4>
          </div>
        </div>
      </div>
      <div className="mt-10 ml-2 sm:flex absolute">
        <div className="ml-7 w-16 h-16 mt-[140px] sm:ml-[40px] rounded-full overflow-hidden">
          <img src={hiloe6} alt="" className="rounded-full" />
        </div>
        <h2 className="ml-4 sm:ml-3 sm:mt-[145px] text-[10px] sm:text-[20px]">
          Africa Customer Service
        </h2>
        <div className="h-[50px] w-[50px] rounded-full border-2 border-gray-300 ml-72 sm:ml-[620px] mt-[-70px] sm:mt-[135px] xs:ml-80 xs2:ml-[520px] md:ml-[950px]">
          {Customer ? (
            <FaUser className="text-[20px] ml-3 mt-3" />
          ) : (
            <IoPersonAdd
              className="text-[20px] ml-3 mt-3 cursor-pointer"
              onClick={handlesignup}
            />
          )}
        </div>
      </div>
      <div className="xs2:ml-60 absolute flex mt-[260px] ml-24 sm:ml-[555px] bg-opacity-50 backdrop-filter backdrop-blur-lg text-[35px] rounded-2xl">
        <h4 className="ml-5 sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          Booking
        </h4>
      </div>
      {signup && (
        <div className="h-screen w-screen bg-black bg-opacity-80 backdrop-filter backdrop-blur-none">
          <div className="cursor-pointer">
            <IoMdClose
              className="absolute ml-[1290px] text-white text-2xl mt-10"
              onClick={handlesignup}
            />
            <SignUpC onConfirm={handlesignup2} onCancel={handlesignup} />
          </div>
        </div>
      )}
      {((signup2 && !isButtonHidden) || error) && (
        <div className="xs:ml-[70px] xs2:ml-40 absolute mt-[320px] ml-[25px] sm:ml-[230px] bg-opacity-50 backdrop-filter backdrop-blur-lg text-[10px] font-bold rounded-2xl md:ml-[380px]">
          <div className="flex flex-wrap justify-center w-[300px] sm:w-[480px]">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((divIndex) => (
              <div key={divIndex}>
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center m-4 cursor-pointer ${
                    selectedDiv === divIndex
                      ? "border-2 border-orange-500 hover:border-orange-500"
                      : "border-2 hover:border-orange-500"
                  }`}
                  onClick={() => handleDivClick(divIndex)}
                >
                  {divIndex == 0 ? (
                    <FaSatelliteDish className="w-10 h-10 sm:w-14 sm:h-14 rounded-full mt-2 ml-1 text-green-700" />
                  ) : divIndex == 1 ? (
                    <PiTelevisionFill className="w-10 h-10 sm:w-14 sm:h-14 rounded-full mt-2 ml-1 text-green-700" />
                  ) : divIndex == 2 ? (
                    <CgSmartHomeRefrigerator className="w-10 h-10 sm:w-14 sm:h-14 rounded-full mt-2 ml-1 text-green-700" />
                  ) : divIndex == 3 ? (
                    <GiGasStove className="w-10 h-10 sm:w-14 sm:h-14 rounded-full mt-2 ml-1 text-green-700" />
                  ) : divIndex == 4 ? (
                    <GiCampCookingPot className="w-10 h-10 sm:w-14 sm:h-14 rounded-full mt-2 ml-1 text-green-700" />
                  ) : divIndex == 5 ? (
                    <MdOutlinePlumbing className="w-10 h-10 sm:w-14 sm:h-14 rounded-full mt-2 ml-1 text-green-700" />
                  ) : divIndex == 6 ? (
                    <FaPaintRoller className="w-10 h-10 sm:w-14 sm:h-14 rounded-full mt-2 ml-1 text-green-700" />
                  ) : divIndex == 7 ? (
                    <MdRoofing className="w-10 h-10 sm:w-14 sm:h-14 rounded-full mt-2 ml-1 text-green-700" />
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={`mt-2 ${
                    selectedDiv === divIndex ? "text-orange-500 ml-10" : "ml-10"
                  }`}
                >
                  {divIndex == 0
                    ? "DISH"
                    : divIndex == 1
                    ? "TV"
                    : divIndex == 2
                    ? "Fridge"
                    : divIndex == 3
                    ? "Stove"
                    : divIndex == 4
                    ? "Injera Pan"
                    : divIndex == 5
                    ? "Plumbing"
                    : divIndex == 6
                    ? "Painting"
                    : divIndex == 7
                    ? "Roofing"
                    : ""}
                </div>
              </div>
            ))}
          </div>
          <div id="Div7" className="w-56">
            <form className="mt-2">
              <textarea
                cols={55}
                rows={10}
                value={typeOfProblem}
                placeholder="Try to explain about the problem that you are facing"
                onChange={(e) => setProblem(e.target.value)}
                className="xs:ml-2 mt-3 ml-1  sm:ml-14 w-72 sm:w-96 h-20 placeholder:font-semibold placeholder:text-[13px] border-2 border-gray-200 p-3"
              ></textarea>
              {error == "No Internet Connection" ? (
                <div className="text-white absolute mt-[60px] sm:ml-28 ml-8">
                  <div className="h-6 w-40 bg-red-600 rounded-full ml-11">
                    <div className="ml-5 mt-1 absolute">{error}</div>
                  </div>
                  <br />
                </div>
              ) : error == "No  Technician Found" ||
                error == "NO Technician found" ? (
                <div className="text-white absolute mt-[60px] sm:ml-28 ml-8">
                  <div className="h-6 w-40 bg-red-600 rounded-full ml-11">
                    <div className="ml-5 mt-1 absolute">{error}</div>
                  </div>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      )}
      {signup3 &&
        (!signup2 || Customer !== "" ? (
          (!isButtonHidden || error) && (
            <button
              className="xs:ml-[120px] xs2:ml-[211px] bg-green-500 hover:bg-green-400 text-white h-[48px] w-48 border-2 rounded-3xl font-semibold transition delay-200 absolute mt-[760px] flex ml-[98px] sm:mt-[680px] md:ml-[530px] sm:ml-[370px]"
              onClick={handleOrderNow}
            >
              <div className="flex justify-center items-center ml-[30px]">
                <FaAddressBook className="mt-3 ml-5" />
                <h1 className="ml-2 mt-2">BOOK</h1>
              </div>
            </button>
          )
        ) : (
          <button
            className="bg-yellow-400 hover:bg-yellow-300 h-[48px] w-80 sm:w-96 border-2 rounded-3xl font-semibold transition delay-200 mt-[760px] absolute flex ml-7 sm:mt-[665px] sm:ml-[450px]"
            onClick={handlesignup}
          >
            <div className="flex justify-center items-center ml-[45px] sm:ml-[70px]">
              <BsFillTelephoneFill className="mt-3 ml-5" />
              <h1 className="ml-2 mt-2">ADD PHONE NUMBER</h1>
            </div>
          </button>
        ))}
      {isLoading2 && (
        <div className="h-56 w-full absolute mt-80 ml-28 sm:ml-[548px]">
          <BeatLoader color="#A0E713" loading={true} size={60} />
          <h1>Looking For A Provider... </h1>
        </div>
      )}
      {isAccept && (
        <div>
          {array3.map((p) => (
            <div key={p.id} className="absolute mt-96 ml-6 sm:ml-[548px] flex">
              <div className="h-24 w-24 rounded-full">
                <img
                  src={"/images/" + p.image}
                  alt=""
                  className="h-24 w-24 rounded-full"
                />
              </div>
              <div className="flex space-x-2 mt-10 ml-3 font-bold">
                <p>{p.firstname}</p>
                <p>{p.lastname}</p>
                <BsFillTelephoneFill />
                <p>{p.phonenumber}</p>
              </div>
              <div>
                <h1>Calling For You...</h1>
              </div>
            </div>
          ))}
        </div>
      )}
      {(isLoading2 || isAccept) && (
        <div className="flex ml-28 sm:ml-0 ">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute mt-[500px]  sm:ml-[520px]"
            onClick={handleCancelOrder}
          >
            Cancel Order
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute mt-[500px] ml-36 sm:ml-[720px]"
            onClick={handleCancelOrder2}
          >
            Close
          </button>
        </div>
      )}
      <div
        id="map"
        ref={mapRef}
        className=" xs:w-[410px] absolute xs2:ml-10 xs2:w-[550px] mt-[850px] sm:mt-[750px] w-[360px] sm:w-[780px] h-80 sm:ml-[80px] rounded-xl md:w-[1110px] md:h-[400px] overflow-hidden "
      />
      <div className="absolute hidden">
        <button onClick={featcher}>
          <h1>Hiso</h1>
        </button>
        {json && (
          <div>
            {json.map((r, index) => (
              <div key={index}>{r.Technician_firstname}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
