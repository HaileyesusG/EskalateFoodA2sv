import { useEffect, useRef, useState } from "react";
import { useSignUp } from "../Hooks/useSignUp";
import { FaIdCard } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";
import { GrCertificate } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { PiGenderFemaleDuotone } from "react-icons/pi";
import { FaTools } from "react-icons/fa";
import hiloe5 from "../assets/Ai_3.png";
import SuccessMessage from "./Thankyou";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { io } from "socket.io-client";
const socket = io(API_BASE_URL);
const SignUp = () => {
  const { signup, isLoading, error } = useSignUp();
  const [email, setEmail] = useState("");
  const [error2, setError2] = useState(null);
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [testImage, settestImage] = useState(null);
  const [testImage2, settestImage2] = useState(null);
  const [testImage3, settestImage3] = useState(null);
  const [testImage4, settestImage4] = useState("");
  const [depError, setdepError] = useState("");
  const [genError, setgenError] = useState("");
  const [imError, setimError] = useState("");
  const [imError2, setim2Error] = useState("");
  const [imError3, setim3Error] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [View, setView] = useState(false);
  const [View2, setView2] = useState(true);
  const [otp, setOtp] = useState("");
  const [category, setCategory] = useState("");
  const [selectedChoices, setSelectedChoices] = useState([]);
  const GenderOption = ["Male", "Female"];
  const DepartmentOption = ["DISH", "TV"];
  useEffect(() => {
    if (selectedChoices.length !== 0) {
      setdepError("");
    }
  }, [selectedChoices]);
  useEffect(() => {
    if (gender !== "" || gender !== "Gender") {
      setgenError("");
    }
  }, [gender]);
  useEffect(() => {
    if (testImage) {
      setimError("");
    }
  }, [testImage]);
  useEffect(() => {
    if (testImage2) {
      setim2Error("");
    }
  }, [testImage2]);
  useEffect(() => {
    if (testImage3) {
      setim3Error("");
    }
  }, [testImage3]);
  //Generate OTP
  const generateOtp = async (e) => {
    e.preventDefault();
    setError2("");
    if (selectedChoices.length == 0) {
      setdepError("Department is Required");
      return;
    }

    if (gender == "" || gender == "Gender") {
      setgenError("Gender is Required");
      return;
    }
    if (!testImage) {
      setimError("Profile Photo is Required");
      return;
    }
    if (!testImage2) {
      setim2Error("Front side of Id is Required");
      return;
    }
    if (!testImage3) {
      setim3Error("Back side of Id is Required");
      return;
    }

    const response = await fetch(`${API_BASE_URL}/api/Applicants/GenerateOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        phonenumber: phonenumber,
        password: password,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError2(json.message);

      console.log(json.message);
      return;
    }

    setIsOtpSent(true);
  };
  const handleSumit = async (e) => {
    e.preventDefault();

    await signup(
      selectedChoices,
      firstname,
      lastname,
      gender,
      phonenumber,
      email,
      password,
      otp,
      testImage,
      testImage2,
      testImage3,
      testImage4
    );
  };
  const inputRef = useRef(null);
  useEffect(() => {
    console.log("the is opt", isOtpSent);
  }, [isOtpSent]);
  useEffect(() => {
    socket.on("isLoading", (msg) => {
      console.log("the email", email);
      if (msg == email) {
        setView(true);
        setView2(false);
        console.log("in loading ", msg);
      }
    });
    return () => {
      socket.off("isLoading");
    };
  }, [socket, email]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedChoices((prevChoices) => [...prevChoices, value]);
    } else {
      setSelectedChoices((prevChoices) =>
        prevChoices.filter((choice) => choice !== value)
      );
    }
  };

  ///
  return (
    <div>
      {View2 && (
        <div className="mt-12 h-auto w-full md:w-[700px] mx-auto md:ml-[300px] absolute bg-opacity-50 backdrop-filter backdrop-blur-sm border border-white px-4 py-6 md:py-8">
          {!isOtpSent ? (
            <div className="absolute inset-0 p-4">
              <form onSubmit={generateOtp} className="to-blue-100">
                <div className="flex flex-col items-center mb-6">
                  <h3 className="font-bold text-2xl md:text-3xl text-green-400 ">
                    Online Application Form
                  </h3>
                </div>
                <div className="space-y-6">
                  <div className="">
                    <h3 className="text-lg font-semibold mb-2">
                      Select Profession category:
                    </h3>
                    <label className="flex items-center mb-2">
                      <input
                        type="radio"
                        value="Electronics"
                        checked={category === "Electronics"}
                        onChange={handleCategoryChange}
                        className="mr-2"
                      />
                      Electronics
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="Home Service"
                        checked={category === "Home Service"}
                        onChange={handleCategoryChange}
                        className="mr-2"
                      />
                      Home Service
                    </label>
                  </div>

                  {category === "Electronics" && (
                    <div className="">
                      <h3 className="text-lg font-semibold mb-2">
                        Select Profession:
                      </h3>
                      <label className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          value="TV"
                          checked={selectedChoices.includes("TV")}
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        TV
                      </label>
                      <label className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          value="DISH"
                          checked={selectedChoices.includes("DISH")}
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        Satellite Dish
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          value="Electric Stove"
                          checked={selectedChoices.includes("Electric Stove")}
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        Electric Stove
                      </label>
                    </div>
                  )}

                  {category === "Home Service" && (
                    <div className="">
                      <h3 className="text-lg font-semibold mb-2">
                        Select Profession:
                      </h3>
                      <label className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          value="Painting"
                          checked={selectedChoices.includes("Painting")}
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        Painting
                      </label>
                      <label className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          value="Plumbing"
                          checked={selectedChoices.includes("Plumbing")}
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        Plumbing
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          value="Roofing"
                          checked={selectedChoices.includes("Roofing")}
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        Roofing
                      </label>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <input
                        required
                        placeholder="Firstname"
                        type="text"
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstname}
                        className="bg-transparent h-[35px] w-full border-2 focus:outline-none  rounded-2xl px-4  "
                      />
                    </div>
                    <div className="flex flex-col">
                      <input
                        required
                        placeholder="Lastname"
                        type="text"
                        onChange={(e) => setLastname(e.target.value)}
                        value={lastname}
                        className="bg-transparent h-[35px] w-full border-2 focus:outline-none  rounded-2xl px-4  "
                      />
                    </div>
                    <div className="flex flex-col">
                      <input
                        required
                        placeholder="PhoneNumber"
                        type="text"
                        onChange={(e) => setPhonenumber(e.target.value)}
                        value={phonenumber}
                        className="bg-transparent h-[35px] w-full border-2 focus:outline-none  rounded-2xl px-4  "
                      />
                    </div>
                    <div className="flex flex-col">
                      <input
                        required
                        placeholder="Email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="bg-transparent h-[35px] w-full border-2 focus:outline-none  rounded-2xl px-4  "
                      />
                    </div>
                    <div className="flex flex-col">
                      <input
                        required
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="bg-transparent h-[35px] w-full border-2 focus:outline-none  rounded-2xl px-4  "
                      />
                    </div>
                    <div>
                      <select
                        required
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="bg-transparent h-[35px] w-full border-2 focus:outline-none rounded-2xl px-4 "
                      >
                        <option className="text-black">Gender</option>
                        {GenderOption.map((option) => (
                          <option
                            className="bg-gray-400 text-black"
                            key={option}
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-8">
                  <button
                    disabled={false}
                    className="bg-yellow-400 hover: h-[48px] w-full md:w-96 border-2 from-white rounded-3xl font-bold hover:to-purple-800 transition delay-200"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="mt-10 flex flex-col items-center space-y-4">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                className="bg-transparent h-[55px] w-full md:w-[300px] border-2 focus:outline-none  px-4  "
              />
              <button
                onClick={handleSubmit}
                className="bg-green-400 hover: h-[48px] w-[200px] border-2 rounded-3xl font-bold hover:bg-yellow-400 transition delay-200"
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>
      )}
      {View && <SuccessMessage />}
    </div>
  );
};
export default SignUp;
