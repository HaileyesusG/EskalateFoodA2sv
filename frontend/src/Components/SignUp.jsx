import { useEffect, useRef, useState } from "react";
import { useSignUp } from "../Hooks/useSignUp";
import { FaIdCard } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { BounceLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [loading, setLoading] = useState(false);
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

  //Generate OTP
  const generateOtp = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (selectedChoices.length == 0) {
      toastify("Department is Required");
      setLoading(false);
      return;
    }

    if (gender == "" || gender == "Gender") {
      toastify("Gender is Required");
      setLoading(false);
      return;
    }
    if (!testImage) {
      toastify("Profile Photo is Required");
      setLoading(false);
      return;
    }
    if (!testImage2) {
      toastify("Front side of Id is Required");
      setLoading(false);
      return;
    }
    if (!testImage3) {
      toastify("Back side of Id is Required");
      setLoading(false);
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
      toastify(json.message);
      setLoading(false);
      console.log(json.message);
      return;
    }
    setLoading(false);
    setIsOtpSent(true);
  };
  const handleSumit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        setLoading(false);
        console.log("in loading ", msg);
      }
    });
    return () => {
      socket.off("isLoading");
    };
  }, [socket, email]);

  //toastify
  const toastify = (message) => {
    toast.error(message, {
      position: "top-right",
      style: { backgroundColor: "#EEEEEE", color: "black", fontWeight: "bold" },
    });
  };
  //
  useEffect(() => {
    socket.on("notSuccess2", (msg) => {
      const { Email, error } = msg;
      console.log("the email", phonenumber);
      if (email == Email) {
        toastify(error);
        setLoading(false);
      }
    });
    return () => {
      socket.off("notSuccess2");
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
        <div className="mt-12 h-auto w-full md:w-[700px] mx-auto md:ml-[300px] absolute bg-opacity-50 backdrop-filter backdrop-blur-sm   px-4 py-6 md:py-8">
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
                  <div className="bg-red-500 ml-10 w-52 mt-2 rounded-sm"></div>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <input
                        required
                        placeholder="Firstname"
                        type="text"
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstname}
                        className="bg-transparent h-[35px] w-full border-2 border-black  focus:border-yellow-300 rounded-2xl px-4  "
                      />
                    </div>
                    <div className="flex flex-col">
                      <input
                        required
                        placeholder="Lastname"
                        type="text"
                        onChange={(e) => setLastname(e.target.value)}
                        value={lastname}
                        className="bg-transparent h-[35px] w-full border-2 border-black focus:border-yellow-300 rounded-2xl px-4  "
                      />
                    </div>
                    <div className="flex flex-col">
                      <input
                        required
                        placeholder="PhoneNumber"
                        type="text"
                        onChange={(e) => setPhonenumber(e.target.value)}
                        value={phonenumber}
                        className="bg-transparent h-[35px] w-full border-2 border-black focus:border-yellow-300 rounded-2xl px-4  "
                      />
                    </div>
                    <div className="flex flex-col">
                      <input
                        required
                        placeholder="Email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="bg-transparent h-[35px] w-full border-2 border-black focus:border-yellow-300 rounded-2xl px-4  "
                      />
                    </div>
                    <div className="flex flex-col">
                      <input
                        required
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="bg-transparent h-[35px] w-full border-2 border-black focus:border-yellow-300 rounded-2xl px-4  "
                      />
                    </div>
                    <div>
                      <select
                        required
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="bg-transparent h-[35px] w-full border-2 border-black rounded-2xl px-4 "
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
                      <div className="bg-red-500 ml-10 w-52 mt-2 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap sm:flex-row items-center justify-center gap-4 sm:gap-6">
                    {/* Upload Profile */}
                    <div className="flex flex-col items-center">
                      <div className="bg-transparent cursor-pointer w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-green-400">
                        <label htmlFor="fileInput">
                          {testImage ? (
                            <img
                              src={URL.createObjectURL(testImage)}
                              alt="Uploaded"
                              className="cursor-pointer w-20 h-20 sm:w-[92px] sm:h-[92px] rounded-full"
                            />
                          ) : (
                            <IoMdPersonAdd className="text-[40px] sm:text-[60px] ml-2 sm:ml-4 mt-2 sm:mt-4  cursor-pointer hover:text-[50px] sm:hover:text-[75px]" />
                          )}
                        </label>
                        <input
                          id="fileInput"
                          placeholder="National Id"
                          name="file"
                          type="file"
                          ref={inputRef}
                          onChange={(e) => settestImage(e.target.files[0])}
                          className="hidden"
                        />
                      </div>
                      <div className="bg-green-400 mt-2 sm:mt-3 w-20 sm:w-28 rounded-lg text-center">
                        <label className="text-[10px] sm:text-[12px] font-bold">
                          Upload
                        </label>
                        <div className="text-[10px] sm:text-[12px] font-bold">
                          <label>Profile</label>
                        </div>
                        <div className="text-[10px] sm:text-[12px] font-bold">
                          <label>Picture</label>
                        </div>
                      </div>
                    </div>
                    {/* Upload Front Side */}
                    <div className="flex flex-col items-center">
                      <div className="bg-transparent cursor-pointer w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-green-400">
                        <label htmlFor="fileInput2">
                          {testImage2 ? (
                            <img
                              src={URL.createObjectURL(testImage2)}
                              alt="Uploaded"
                              className="cursor-pointer w-20 h-20  sm:w-[92px] sm:h-[92px] rounded-full"
                            />
                          ) : (
                            <FaIdCard className="text-[40px] sm:text-[60px] ml-2 sm:ml-4 mt-2 sm:mt-4  cursor-pointer hover:text-[50px] sm:hover:text-[75px]" />
                          )}
                        </label>
                        <input
                          id="fileInput2"
                          placeholder="National Id"
                          name="file"
                          type="file"
                          ref={inputRef}
                          onChange={(e) => settestImage2(e.target.files[0])}
                          className="hidden"
                        />
                      </div>
                      <div className="bg-green-400 mt-2 sm:mt-3 w-20 sm:w-28 rounded-lg text-center">
                        <label className="text-[10px] sm:text-[12px] font-bold">
                          Upload Front Side
                        </label>
                        <div className="text-[10px] sm:text-[12px] font-bold">
                          <label>Of National Id</label>
                        </div>
                      </div>
                    </div>

                    {/* Upload Back Side */}
                    <div className="flex flex-col items-center">
                      <div className="bg-transparent cursor-pointer w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-green-400">
                        <label htmlFor="fileInput3">
                          {testImage3 ? (
                            <img
                              src={URL.createObjectURL(testImage3)}
                              alt="Uploaded"
                              className="cursor-pointer w-20 h-20  sm:w-[92px] sm:h-[92px] rounded-full"
                            />
                          ) : (
                            <FaIdCard className="text-[40px] sm:text-[60px] ml-2 sm:ml-5 mt-2 sm:mt-5  cursor-pointer hover:text-[50px] sm:hover:text-[75px]" />
                          )}
                        </label>
                        <input
                          id="fileInput3"
                          placeholder="National Id"
                          name="file"
                          type="file"
                          ref={inputRef}
                          onChange={(e) => settestImage3(e.target.files[0])}
                          className="hidden"
                        />
                      </div>
                      <div className="bg-green-400 mt-2 sm:mt-3 w-20 sm:w-28 rounded-lg text-center">
                        <label className="text-[10px] sm:text-[12px] font-bold">
                          Upload Back Side
                        </label>
                        <div className="text-[10px] sm:text-[12px] font-bold">
                          <label>Of National Id</label>
                        </div>
                      </div>
                    </div>
                    {/* Certificate */}
                    <div className="flex flex-col items-center">
                      <div className="bg-transparent cursor-pointer w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-green-400">
                        <label htmlFor="fileInput4">
                          {testImage4 ? (
                            <img
                              src={URL.createObjectURL(testImage4)}
                              alt="Uploaded"
                              className="cursor-pointer w-20 h-20  sm:w-[92px] sm:h-[92px] rounded-full"
                            />
                          ) : (
                            <GrCertificate className="text-[40px] sm:text-[60px] ml-2 sm:ml-5 mt-2 sm:mt-5  cursor-pointer hover:text-[50px] sm:hover:text-[75px]" />
                          )}
                        </label>
                        <input
                          id="fileInput4"
                          placeholder="Certificate"
                          name="file"
                          type="file"
                          ref={inputRef}
                          onChange={(e) => settestImage4(e.target.files[0])}
                          className="hidden"
                        />
                      </div>
                      <div className="bg-green-400 mt-2 sm:mt-3 w-20 sm:w-28 rounded-lg text-center">
                        <label className="text-[10px] sm:text-[12px] font-bold">
                          Upload Certificate
                        </label>
                        <div className="text-[10px] sm:text-[12px] font-bold">
                          <label>If Any (Optional)</label>
                        </div>
                      </div>
                    </div>
                    <div className="bg-red-500 ml-10 w-56 mt-2 rounded-md"></div>
                  </div>
                </div>
                <div className="flex justify-center mt-8">
                  <button
                    disabled={loading}
                    className="bg-yellow-400  hover:from-purple-400 hover:to-purple-800 text-sm md:text-base h-12 md:h-14 w-full max-w-xs md:max-w-md border-2 rounded-3xl font-bold transition-transform transform hover:scale-105 duration-200"
                  >
                    {loading ? (
                      <span className="flex justify-center items-center">
                        <BounceLoader
                          size={20}
                          color="#ffffff"
                          loading={loading}
                        />
                        Processing...
                      </span>
                    ) : (
                      "Apply"
                    )}
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
                className="bg-transparent h-[50px] w-[90%] max-w-[300px] border-2 border-black focus:border-yellow-300 px-4 text-sm md:h-[55px] md:text-base"
              />
              <button
                onClick={handleSumit}
                disabled={loading}
                className="bg-green-400 h-[45px] w-[70%] max-w-[200px] rounded-3xl font-bold hover:bg-yellow-400 transition delay-200 md:h-[48px]"
              >
                {loading ? (
                  <span className="flex justify-center items-center">
                    Please wait...
                    <BounceLoader size={20} color="#ffffff" loading={loading} />
                  </span>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </div>
          )}
        </div>
      )}
      <ToastContainer />
      {View && <SuccessMessage />}
    </div>
  );
};
export default SignUp;
