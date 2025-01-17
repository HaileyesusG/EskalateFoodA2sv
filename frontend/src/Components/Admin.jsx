import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useUserContextA } from "../Hooks/useUserContextA";
import { useRegister } from "../Hooks/useRegister";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const socket = io(API_BASE_URL);
import { FaCheckCircle } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { FaMoon, FaPerson } from "react-icons/fa6";
import { AiFillPhone } from "react-icons/ai";
import { GoXCircleFill } from "react-icons/go";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IoSearchSharp } from "react-icons/io5";
import { PiGenderFemaleDuotone } from "react-icons/pi";
import { IoMdNotifications } from "react-icons/io";
import { BiSolidMessageDetail } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdEmojiPeople } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import AdminChat from "./AdminChat";
import AdminDashboard from "./TechFetch";
import RechargeModal from "./RechargeModal";
import AssignModal from "./AssignModal";
{
  /* <AdminChat />; */
}

//let array3 = [];
const Admin = ({ user3 }) => {
  const dispatch2 = useDispatch();
  const todo = useSelector((state) => state.admin.admin);
  const [achat, setAchat] = useState("");
  //setAchat(user3);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenA, setIsModalOpenA] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [Customer_firstname, setCustomer_firstname] = useState("");
  const [Customer_phonenumber, setCustomer_phonenumber] = useState("");
  const [department2, setDepartment2] = useState("");
  const [Customer_location, setCustomer_location] = useState("");

  const openRechargeModal = (id) => {
    setSelectedCustomerId(id);
    setIsModalOpen(true);
  };

  const openAssignModal = (id) => {
    setSelectedCustomerId(id);
    setIsModalOpenA(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalOpenA(false);
    setRechargeAmount("");
    setIsLoading(false); // Reset loading state when modal closes
  };
  //Recharge
  const handleRecharge = async () => {
    if (rechargeAmount == "") {
      alert("Please insert amount");
      return;
    }
    setIsLoading(true); // Show loading
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/Admin/RechargeBalance/${selectedCustomerId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            amount: rechargeAmount,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setJson(data);
        alert("Recharge successful!");
      }
      closeModal();
    } catch (err) {
      console.log("Recharge failed:", err);
      alert("Recharge failed:", err);
    }
  };
  //Assign
  const handleAssign = async () => {
    if (department2 == "") {
      alert("Please insert department");
      return;
    }
    if (Customer_firstname == "") {
      alert("Please insert Customer_firstname");
      return;
    }
    if (Customer_location == "") {
      alert("Please insert Customer_location");
      return;
    }
    if (Customer_phonenumber == "") {
      alert("Please insert Customer_phonenumber");
      return;
    }
    setIsLoading(true); // Show loading
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/tech/techBba/${selectedCustomerId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            Customer_firstname,
            department2,
            Customer_phonenumber,
            Customer_location,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setJson(data);
        alert("Assign successful!");
      }
      closeModal();
    } catch (err) {
      console.log("Assign failed:", err);
      alert("Assign failed:", err);
    }
  };

  const [notify, setNotify] = useState(0);
  const [array3, setArray3] = useState([]);
  const [iView, setIView] = useState(false);
  const [iView2, setIView2] = useState(false);
  const [iView3, setIView3] = useState(false);
  const [iView4, setIView4] = useState(false);
  const [ApplicantId, setApplicantId] = useState("");
  let admin = todo;
  admin = admin[0];

  const token = admin ? "Bearer " + admin.token : "";
  //let deposit = admin.deposit;
  //const [token2, setToken] = useState(token);
  const Department = admin ? admin.department : "";
  const Firstname = admin ? admin.firstname : "";
  const Lastname = admin ? admin.lastname : "";
  const Gender = admin ? admin.gender : "";
  const Phonenumber = admin ? admin.phonenumber : "";
  const Email = admin ? admin.email : "";
  const Location = admin ? admin.location : "";
  const _id = admin ? admin._id : "";
  const profile = admin ? admin.image : "";
  //critical
  let user4;
  if (user3 !== "") {
    user4 = user3;
  }
  const { register, error } = useRegister();
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState(null);
  let response;

  const [title, setTitle] = useState("");
  const [isCustomer, setIsCustomer] = useState(false);
  const [department, setDepartment] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [amount2, setAmount2] = useState([]);
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  let [CustomerList, setCustomerList] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [disp2, setdisplay2] = useState("visible");
  const [disp3, setdisplay3] = useState("visible");
  const [disp4, setdisplay4] = useState("hidden");
  const [disp5, setdisplay5] = useState("hidden");
  const [disp6, setdisplay6] = useState("hidden");
  const [disp7, setdisplay7] = useState("hidden");
  const [disp8, setdisplay8] = useState("hidden");
  const [disp11, setdisplay11] = useState("hidden");
  const [disp9, setdisplay9] = useState("hidden");
  const [disp10, setdisplay10] = useState("visible");
  const [disp12, setdisplay12] = useState("visible");
  const [disp13, setdisplay13] = useState("hidden");
  const [disp14, setdisplay14] = useState("hidden");
  const [suggestions, setSuggestions] = useState([]);
  const [Json, setJson] = useState([]);

  const red = useNavigate();

  const handleP = () => {
    socket.emit("ShowTech", "ok");
    setdisplay7("visible");
    setdisplay6("hidden");
    setdisplay4("hidden");
    setdisplay5("hidden");
    setdisplay2("hidden");
  };

  let array = [];
  const Applicantfeatcher = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/Applicants/GetAllApplicant`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const json = await response.json();
    setArray3(json);
    setNotify(array3.length);
    console.log("yes in tye", notify);
  };
  useEffect(() => {
    socket.on("MyObject", (msg) => {
      Applicantfeatcher();
      // array3.push(msg._id);
    });
    return () => {
      socket.off("MyObject");
    };
  }, [socket]);
  useEffect(() => {
    Applicantfeatcher();
    // array3.push(msg._id);
  }, []);

  const handleChoiceChange2 = () => {
    setdisplay8("hidden");
  };
  const handleChoiceChange3 = () => {
    setdisplay4("visible");
    setdisplay8("hidden");
  };
  const handleChoiceChange4 = () => {
    setdisplay4("hidden");
    setdisplay8("hidden");
  };
  const handleChoiceChange5 = () => {
    setdisplay5("visible");
    setdisplay6("hidden");
    setdisplay7("hidden");
  };

  const handleChoiceChange7 = () => {
    setdisplay5("hidden");
    setdisplay6("hidden");
    setdisplay7("hidden");
    setdisplay4("hidden");
    setdisplay14("hidden");
    setdisplay13("hidden");
    setdisplay2("visible");
  };
  const handleChoiceChange8 = () => {
    setdisplay8("visible");
    setdisplay12("visible");
    setdisplay11("hidden");
  };
  const findApplicant = async (d) => {
    setApplicantId(d);
    const response = await fetch(
      `${API_BASE_URL}/api/Applicants/GetApplicant/${d}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("the d", d);

    const data = await response.json();
    setDepartment(data.department);
    setFirstname(data.firstname);
    setLastname(data.lastname);
    setPassword(data.password);
    setImage(data.image);
    setImage2(data.image2);
    setImage3(data.image3);
    setImage4(data.image4);
    setGender(data.gender);
    setEmail(data.email);
    setPhonenumber(data.phonenumber);
    setdisplay11("visible");
    setdisplay12("hidden");
  };
  const handleSumit = async (e) => {
    e.preventDefault();
    await register(
      department,
      firstname,
      lastname,
      gender,
      phonenumber,
      email,
      password,
      image,
      image2,
      image3,
      image4
    );
    socket.once("ErrorM", async (msg) => {
      if (msg == "ok") {
        setdisplay13("visible");
        setdisplay8("hidden");
        array3.shift();
        const response = await fetch(
          `${API_BASE_URL}/api/Applicants/deleteApplicant/${ApplicantId}`,
          {
            method: "DELETE",
            body: JSON.stringify({
              email: Email,
              email2: email,
              password: password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      if (msg == "Failed to send Email") {
        //setNotify(array3.length);

        setdisplay13("hidden");
        setdisplay9("visible");
      }
    });
    return () => {
      socket.off("ErrorM");
    };
    //socket.emit("Registred", admin._id);
  };

  const HandleReject = async () => {
    array3.shift();
    //socket.emit("Rejected", admin._id);
    const response = await fetch(
      `${API_BASE_URL}/api/Applicants/deleteApplicant/${ApplicantId}`,
      {
        method: "DELETE",
        body: JSON.stringify({
          email: Email,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (response.ok) {
      console.log("the handle is", data);
      setArray3(data);
      setdisplay14("visible");
      setdisplay13("hidden");
      setdisplay8("hidden");
      setNotify(array3.length);
    }
    if (!response.ok) {
      setError2(data.message);
    }
  };
  const RechargeBalance = async (amountt) => {
    const response = await fetch(`${API_BASE_URL}/api/Admin/RechargeBalance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amountt,
      }),
    });
    const amount = await response.json();
    setAmount2(amount);
    console.log("the amount 2", amount2.amount);
  };

  let featcher = async () => {
    setJson([]);
    setTitle("Users");
    setdisplay6("visible");
    setdisplay2("hidden");
    setIsCustomer(true);
    const user = JSON.parse(localStorage.getItem("admin"));
    const token = "Bearer " + user.token;

    response = await fetch(`${API_BASE_URL}/api/Customer/GetCustomer`, {
      headers: { authorization: token },
    });
    setJson(await response.json());
    setdisplay5("hidden");
    setdisplay7("hidden");
    setdisplay7("hidden");
  };
  let featcher3 = async () => {
    setJson([]);
    setTitle("ServiceProviders");
    setdisplay6("visible");
    setdisplay2("hidden");
    setIsCustomer(false);
    const user = JSON.parse(localStorage.getItem("admin"));
    const token = "Bearer " + user.token;
    response = await fetch(`${API_BASE_URL}/api/Tech/GetTech`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    setJson(await response.json());
    setdisplay5("hidden");
    setdisplay7("hidden");

    setdisplay7("hidden");
  };
  socket.on(
    "locationChange",
    (msg) => {
      featcher3();
      return () => {
        socket.off("locationChange");
      };
    },
    [socket]
  );
  const featcher2 = async (id) => {
    if (isCustomer) {
      response = await fetch(`${API_BASE_URL}/api/Customer/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      setJson(await response.json());
    } else {
      response = await fetch(`${API_BASE_URL}/api/tech/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      setJson(await response.json());
    }
  };
  //AssgnJob
  // const assignJob = async (id) => {

  //   const  response = await fetch(`${API_BASE_URL}/api/tech/assignJob/${id}`, {
  //       method: "POST",
  //       body
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     setJson(await response.json());
  //   }
  // };
  // Handle search text change
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Filter customers based on search criteria
  const filteredCustomers = Json.filter((customer) => {
    if (title == "ServiceProviders") {
      // Perform your desired condition checks here
      const { firstname, phonenumber, location, department, status } = customer;
      const searchRegex = new RegExp(searchText, "i");

      return (
        searchText === "" ||
        firstname.match(searchRegex) ||
        phonenumber.match(searchRegex) ||
        location.match(searchRegex) ||
        status.match(searchRegex) ||
        department.some((d) => d.match(searchRegex))
      );
    } else {
      const { firstname, phonenumber, location, status } = customer;
      const searchRegex = new RegExp(searchText, "i");

      return (
        searchText === "" ||
        firstname.match(searchRegex) ||
        phonenumber.match(searchRegex) ||
        location.match(searchRegex) ||
        status.match(searchRegex)
      );
    }
  }).sort((a, b) => a.firstname.localeCompare(b.firstname));

  return (
    <div className={""}>
      <div className=" overflow-y-auto   m-3 absolute  w-[1010px] h-[470px] mt-[138px] ml-72">
        {/* <h1>{amount2.map((r) => r)}</h1> */}
        <div className={disp7}>
          <AdminChat user3={user4} />
        </div>
        <div className={disp2}>
          <AdminDashboard />
        </div>
        <div id="last" className={"hidden"}>
          <input
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={() => RechargeBalance(amount)}>Enter</button>
        </div>
        <div className={"absolute mt-6 ml-52 w-56 h-56 " + disp13}>
          <FaCheckCircle className="text-green-500 w-16 h-16 mb-4 ml-7" />
          <h1 className="text-3xl font-bold">Registred</h1>
        </div>
        <div className={"absolute mt-6 ml-52 w-56 h-56 " + disp9}>
          <GoXCircleFill className="text-[60px] text-red-500 ml-6 mt-3" />
          <h1 className="text-3xl font-bold">{error}</h1>
          <h1 className="text-3xl font-bold">Check Your Connection</h1>
        </div>
        <div className={"absolute mt-6 ml-52 w-56 h-56 " + disp14}>
          <GoXCircleFill className="text-[60px] text-red-500 ml-6 mt-3" />

          <h1 className=" text-3xl    font-bold">Rejected</h1>
        </div>
        {/* <div id="map" className={disp6}></div> */}

        <div className={disp6}>
          {Json && (
            <div className="ml-36  h-96  overflow-y-auto">
              <h1 className="ml-56 text-3xl font-bold text-green-500">
                {title}
              </h1>
              <div className="ml-44 mb-11 mt-5 flex">
                <IoSearchSharp className="text-2xl mr-3 mt-3" />
                <input
                  type="text"
                  value={searchText}
                  onChange={handleSearchChange}
                  placeholder="Search By Name Or Phone"
                  className="rounded-lg focus:outline-none px-2 w-60 h-11"
                />
              </div>
              Haileyesus Getnet ®, [1/6/2025 7:22 PM]
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((r, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg hover:shadow-2xl ml-10 mb-5 cursor-pointer border border-gray-300 text-lg flex h-28 rounded-lg w-[800px] transition-all duration-300"
                  >
                    <div className="ml-4 mt-2">
                      <div className="flex items-center">
                        <img
                          src={r.image}
                          className="mr-4 w-16 h-16 rounded-full border border-gray-300"
                        />
                        <div className="mt-2 font-semibold">{r.firstname}</div>
                      </div>
                      <div className="flex items-center mt-2 text-gray-600">
                        <AiFillPhone
                          className="text-2

Haileyesus Getnet ®, [1/6/2025 7:23 PM]
text-cyan-600 mr-2"
                        />
                        {r.phonenumber}
                      </div>
                    </div>

                    <div className="flex flex-col justify-center ml-5 w-72 h-28 border border-gray-200 rounded-lg overflow-y-scroll p-2 bg-gray-50">
                      {title === "ServiceProviders" &&
                        r.department.map((p, depIndex) => (
                          <div key={depIndex} className="text-sm text-gray-700">
                            {p}
                          </div>
                        ))}
                    </div>

                    <div className="flex flex-col justify-center ml-5 w-40 h-28 text-sm overflow-y-scroll p-2 bg-gray-50 border border-gray-200 rounded-lg">
                      <div>{r.location}</div>
                    </div>

                    <div className="bg-green-100 ml-10 rounded-lg flex items-center justify-center mt-8 h-7 w-[75px]">
                      <h3 className="text-green-600 font-medium">{r.status}</h3>
                    </div>
                    <div className="bg-green-100 ml-10 rounded-lg flex items-center justify-center mt-8 h-7 w-[75px]">
                      <h3 className="text-green-600 font-medium">
                        {r.status2}
                      </h3>
                    </div>

                    <div className="bg-yellow-100 ml-5 rounded-lg flex items-center justify-center mt-8 h-7 w-[75px]">
                      <h3 className="text-yellow-600 font-medium">
                        {r.deposit} ብር
                      </h3>
                    </div>

                    <div className="flex items-center space-x-4 mt-6 ml-5">
                      {/* <button
                        className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-1 h-9 w-[70px] transition-colors duration-300"
                        onClick={() => featcher2(r._id)}
                      >
                        Delete
                      </button> */}
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-1 h-9 w-[70px] transition-colors duration-300"
                        onClick={() => openAssignModal(r._id)}
                      >
                        Assign Job
                      </button>

                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-1 h-9 w-[70px] transition-colors duration-300"
                        onClick={() => openRechargeModal(r._id)}
                      >
                        Recharge
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="ml-44 text-gray-600 font-medium">
                  No matching {title} found.
                </p>
              )}
              <RechargeModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onRecharge={handleRecharge}
                amount={rechargeAmount}
                setAmount={setRechargeAmount}
                isLoading={isLoading}
              />
              <AssignModal
                isOpen={isModalOpenA}
                onClose={closeModal}
                onAssign={handleAssign}
                Customer_firstname={Customer_firstname}
                setCustomer_firstname={setCustomer_firstname}
                department2={department2}
                setDepartment2={setDepartment2}
                Customer_phonenumber={Customer_phonenumber}
                setCustomer_phonenumber={setCustomer_phonenumber}
                Customer_location={Customer_location}
                setCustomer_location={setCustomer_location}
                isLoading={isLoading}
              />
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
                  <div className=" border-b-gray-300 ml-10  h-16 mt-7">
                    <div className="flex">
                      <FaTools className="text-2xl" />
                      <h1 className="text-[18] font-semibold ml-2">
                        Department
                      </h1>
                    </div>

                    {Department}
                  </div>
                  <div className=" border-b-gray-300 ml-10  h-16 mt-7">
                    <div className="flex">
                      <FaUser className="text-2xl" />
                      <h1 className="text-[18] font-semibold ml-2">
                        First Name
                      </h1>
                    </div>
                    {Firstname}
                  </div>
                  <div className=" border-b-gray-300 ml-10  h-16 mt-7">
                    <div className="flex">
                      <FaUser className="text-2xl" />
                      <h1 className="text-[18] font-semibold ml-2">Lastname</h1>
                    </div>
                    {Lastname}
                  </div>

                  <div className=" border-b-gray-300 ml-10  h-16 mt-7">
                    <div className="flex">
                      <PiGenderFemaleDuotone className="text-2xl" />
                      <h1 className="text-[18] font-semibold ml-2">Gender</h1>
                    </div>
                    {Gender}
                  </div>
                  <div className=" border-b-gray-300 ml-10  h-16 mt-7">
                    <div className="flex">
                      <AiFillPhone className="text-2xl" />
                      <h1 className="text-[18] font-semibold ml-2">
                        Phonenumber
                      </h1>
                    </div>
                    {Phonenumber}
                  </div>
                  <div className=" border-b-gray-300 ml-10  h-16 mt-7">
                    <div className="flex">
                      <MdEmail className="text-2xl" />
                      <h1 className="text-[18] font-semibold ml-2">Email</h1>
                    </div>
                    {Email}
                  </div>
                  <div className=" border-b-gray-300 ml-10  h-16 mt-7">
                    <div className="flex">
                      <ImLocation className="text-2xl" />
                      <h1 className="text-[18] font-semibold ml-2">Location</h1>
                    </div>
                    {Location}
                  </div>
                </div>
                <div className="  w-96">
                  <div className="ml-24 mt-5 text-[18px]">Update Profile</div>
                  <div className="absolute mt-44 ml-48  ">
                    <FaPen className="absolute ml-2 mt-2 text-white text-[13px]" />
                    <FaCircle className="text-green-500 text-3xl" />
                  </div>
                  <div className="mt-14 ml-14">
                    <img
                      src={profile}
                      className="w-[150px] h-[150px] rounded-full "
                      onClick={handleChoiceChange3}
                      alt="Admin Image"
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
              <div className="flex text-green-500 ml-3 mt-11 cursor-pointer bg-gray-200 hover:bg-white w-72 h-12 rounded-lg">
                <RiLogoutCircleLine className="mt-3 ml-3" />
                <p className="text-[15px] ml-3 mt-2 font-bold">Logout</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={
            "bg-gray-100 w-96 h-[450px] absolute mt-24 ml-[576px] rounded-lg overflow-y-scroll  border-2 " +
            disp8
          }
        >
          <div className={"mr-40  " + disp11}>
            <form className="to-blue-100 ">
              <div className=" flex flex-col justify-center ml-[120px] mb-3">
                <h3 className=" font-bold text-2xl ">Applicant</h3>
              </div>

              <div className=" flex   justify-center items-center space-y-3   ">
                <div className="flex flex-col space-y-5 ml-40 ">
                  <div className="flex">
                    <div className="flex">
                      <input
                        placeholder="Department"
                        type="text"
                        onChange={(e) => setDepartment(e.target.value)}
                        value={department}
                        className="bg-transparent   h-[25px] w-[200px] border-2 border-black block focus:outline-none focus:border-orange-500  rounded-lg   px-4   "
                        id="myInput"
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <input
                      placeholder="Firstname"
                      type="text"
                      onChange={(e) => setFirstname(e.target.value)}
                      value={firstname}
                      className="bg-transparent   h-[25px] w-[200px] border-2 border-black block focus:outline-none focus:border-orange-500  rounded-lg   px-4   "
                      id="myInput2"
                    />
                  </div>
                  <div className="flex">
                    <input
                      placeholder="Lastname"
                      type="text"
                      onChange={(e) => setLastname(e.target.value)}
                      value={lastname}
                      className="bg-transparent   h-[25px] w-[200px] border-2 border-black block focus:outline-none focus:border-orange-500  rounded-lg   px-4   "
                    />
                  </div>

                  <div className="flex">
                    <input
                      placeholder="PhoneNumber"
                      type="text"
                      onChange={(e) => setPhonenumber(e.target.value)}
                      value={phonenumber}
                      className="bg-transparent   h-[25px] w-[200px] border-2 border-black block focus:outline-none focus:border-orange-500  rounded-lg   px-4   "
                    />
                  </div>

                  <div className="flex">
                    <input
                      placeholder="Email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="bg-transparent   h-[25px] w-[200px] border-2 border-black block focus:outline-none focus:border-orange-500  rounded-lg   px-4   "
                    />
                  </div>
                  <div className="flex">
                    <input
                      placeholder="Password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      className="bg-transparent   h-[25px] w-[200px] border-2 border-black block focus:outline-none focus:border-orange-500  rounded-lg   px-4   "
                    />
                  </div>
                  <div className="flex">
                    <input
                      placeholder="gender"
                      type="text"
                      onChange={(e) => setGender(e.target.value)}
                      value={gender}
                      className="bg-transparent   h-[25px] w-[200px] border-2 border-black block focus:outline-none focus:border-orange-500  rounded-lg   px-4   "
                      id="myInput3"
                    />
                  </div>
                  <div className="flex">
                    <input
                      placeholder="image"
                      type="text"
                      onChange={(e) => setImage(e.target.value)}
                      value={image}
                      className="bg-transparent hidden   h-[25px] w-[200px] border-2 border-black focus:outline-none focus:border-orange-500  rounded-lg   px-4   "
                      id="myInput4"
                    />
                    <input
                      placeholder="image"
                      type="text"
                      onChange={(e) => setImage2(e.target.value)}
                      value={image2}
                      className="bg-transparent hidden   h-[25px] w-[200px] border-2 border-black focus:outline-none focus:border-orange-500  rounded-lg   px-4   "
                      id="myInput5"
                    />
                    <input
                      placeholder="image"
                      type="text"
                      onChange={(e) => setImage3(e.target.value)}
                      value={image3}
                      className="bg-transparent hidden   h-[25px] w-[200px] border-2 border-black focus:outline-none focus:border-orange-500  rounded-lg   px-4   "
                      id="myInput6"
                    />
                    <input
                      placeholder="image"
                      type="text"
                      onChange={(e) => setImage4(e.target.value)}
                      value={image4}
                      className="bg-transparent hidden   h-[25px] w-[200px] border-2 border-black focus:outline-none focus:border-orange-500  rounded-lg   px-4   "
                      id="myInput7"
                    />
                  </div>
                </div>

                {/* <div className="flex flex-col space-y-3 ml-10">
           
              </div> */}
              </div>
            </form>
            <div className="flex space-x-5 ml-3 w-[700px]">
              {iView && (
                <div className="rounded-2xl  mt-1 absolute ">
                  <img
                    src={image}
                    className="w-[400px] h-[400px] rounded-2xl cursor-pointer"
                    onClick={() => setIView(false)}
                  />
                </div>
              )}
              <div className="rounded-2xl  mt-1">
                <img
                  src={image}
                  className="w-[100px] h-[100px] rounded-2xl cursor-pointer hover:w-[120px] hover:h-[120px] hover:animate-pulse"
                  onClick={() => setIView(true)}
                />
              </div>
              {iView2 && (
                <div className="rounded-2xl  mt-1 absolute w-[600px] ">
                  <img
                    src={image2}
                    className="w-[600px] h-[300px] rounded-2xl cursor-pointer ml-[-35px]"
                    onClick={() => setIView2(false)}
                  />
                </div>
              )}
              <div className="rounded-2xl  mt-1">
                <img
                  src={image2}
                  className="w-[100px] h-[100px] rounded-2xl cursor-pointer hover:w-[120px] hover:h-[120px] hover:animate-pulse "
                  onClick={() => setIView2(true)}
                />
              </div>
              {iView3 && (
                <div className="rounded-2xl  mt-1 absolute w-[600px]">
                  <img
                    src={image3}
                    className="w-[600px] h-[300px] rounded-2xl cursor-pointer ml-[-15px]"
                    onClick={() => setIView3(false)}
                  />
                </div>
              )}
              <div className="rounded-2xl  mt-1">
                <img
                  src={image3}
                  className="w-[100px] h-[100px] rounded-2xl cursor-pointer hover:w-[120px] hover:h-[120px] hover:animate-pulse"
                  onClick={() => setIView3(true)}
                />
              </div>
              {iView4 && image4 != "" && (
                <div className="rounded-2xl  mt-1 absolute ">
                  <img
                    src={image4}
                    className="w-[400px] h-[400px] rounded-2xl cursor-pointer"
                    onClick={() => setIView4(false)}
                  />
                </div>
              )}
              {image4 != "" && (
                <div className="rounded-2xl  mt-1">
                  <img
                    src={image4}
                    className="w-[100px] h-[100px] rounded-2xl cursor-pointer hover:w-[120px] hover:h-[120px] hover:animate-pulse"
                    onClick={() => setIView4(true)}
                  />
                </div>
              )}
            </div>
            <div className=" flex space-x-36   mt-6 mb-3 ">
              <div>
                <button
                  onClick={handleSumit}
                  className="ml-5 bg-green-400  h-[38px] w-20 border-2  rounded-3xl font-semibold hover:bg-yellow-400 transition delay-200"
                >
                  Register
                </button>
              </div>

              <div className="">
                <button
                  className="ml-5 bg-red-500 text-white  h-[38px] w-20 border-2  rounded-3xl font-semibold hover:bg-yellow-400 transition delay-200"
                  onClick={HandleReject}
                >
                  Reject
                </button>
              </div>

              {error2 && <div>{error2}</div>}
            </div>
          </div>
          <div className={"mt-5 ml-28 text-2xl " + disp12}>Notifications</div>
          {array3.map((d, index) => (
            <div
              className={
                "w-80 cursor-pointer ml-3 h-16 hover:bg-yellow-400 mt-8 rounded-lg " +
                disp12
              }
              key={index}
              onClick={() => findApplicant(d._id)}
            >
              <div className="mt-3 absolute ">{d._id}</div>
            </div>
          ))}
        </div>
        <div className=" w-[300px]">
          <div className=" ">{/* {error && <p>Error: {error}</p>} */}</div>
          <div
            className="  h-32 w-[313px] mt-7  "
            onClick={handleChoiceChange2}
          ></div>
        </div>

        <div className="flex space-x-10 text-3xl ml-4 mt-3 text-black  ">
          <div className=" w-14 h-14 border-[1px] rounded-xl border-green-400 cursor-pointer">
            <FaMoon className="ml-3 mt-3" />
          </div>

          <div className=" w-14 h-14 border-[1px] rounded-xl border-green-400 cursor-pointer">
            {/* "absolute text-[19px] ml-6 mt-3 text-red-600 flex" */}
            <div
              className={
                array3.length == 0
                  ? "hidden"
                  : "absolute text-[19px] ml-7 mt-2 text-red-600 flex"
              }
            >
              <FaCircle />
            </div>
            <div
              className="absolute text-white ml-8  text-[14px] font-bold  "
              onClick={handleChoiceChange8}
            >
              {array3.length == 0 ? null : array3.length}
            </div>

            <div>
              {" "}
              <MdEmojiPeople className={"ml-3 mt-3 " + disp10} />
            </div>
          </div>
          <div
            className=" w-14 h-14 border-[1px] rounded-xl border-green-400 cursor-pointer"
            onClick={handleP}
          >
            <BiSolidMessageDetail className="ml-3 mt-3" />
          </div>
          <div className=" w-14 h-14 border-[1px] rounded-xl border-green-400 cursor-pointer">
            <IoMdNotifications className="ml-3 mt-3" />
          </div>
        </div>

        <div className="rounded-2xl ml-80 mt-1">
          <img
            src={profile}
            className="w-[70px] h-[70px] rounded-2xl cursor-pointer"
            onClick={handleChoiceChange3}
            alt="Admin Profile"
          />
        </div>
      </div>
      <div className="mt-12">
        <div className="border-[1px] w-72">
          <h2 className="ml-16">Menu</h2>
        </div>
        <div className="ml-14 mt-8 space-y-4">
          <div className="flex cursor-pointer" onClick={handleChoiceChange7}>
            <FaHome className="text-3xl" />
            <h1 className="text-[20px] ml-2">Home</h1>
          </div>
          <div className="flex cursor-pointer" onClick={handleP}>
            <IoMdNotifications className="text-3xl" />
            <h1 className="text-[20px] ml-2">Inbox</h1>
          </div>
          <div className="flex absolute  w-64 h-36 ">
            <div className="user-container group  flex w-48  ">
              <div className="flex">
                <FaUser className="text-3xl" />
                <h1 className="text-[20px] ml-2">User</h1>
              </div>
              <div className="hidden ml-20 user-options group-hover:visible absolute top-10 left-0 bg-white p-2 border border-gray-300 rounded-lg">
                <div
                  className="option hover:bg-green-400 cursor-pointer rounded-lg"
                  onClick={featcher}
                >
                  Customer
                </div>
                <div
                  className="option hover:bg-green-400 cursor-pointer rounded-lg"
                  onClick={featcher3}
                >
                  Service Provider
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
