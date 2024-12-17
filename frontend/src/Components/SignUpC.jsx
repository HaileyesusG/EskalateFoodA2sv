import React, { useEffect, useState, useRef } from "react";
import { useSignUpC } from "../Hooks/useSignUpC";
import { AiFillPhone } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BounceLoader } from "react-spinners"; // Import the spinner
import { io } from "socket.io-client";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const socket = io(API_BASE_URL);
import hiloe5 from "../assets/bg1.avif";
const SignUpC = ({ onConfirm, onCancel }) => {
  const length = 6;
  const { signupC, isLoading, error } = useSignUpC();
  const [phonenumber, setPhonenumber] = useState("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);
  const [validPhoneNumber2, setValidPhoneNumber2] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;

    // Trim leading and trailing spaces from the phone number
    const trimmedValue = value.replace(/\s+/g, "");

    setValidPhoneNumber2(true);
    setPhonenumber(trimmedValue); // Store the trimmed phone number

    // Validate phone number
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const isValid = phoneRegex.test(trimmedValue);
    console.log("isValid", isValid);
    setValidPhoneNumber(isValid);

    if (trimmedValue === "") {
      console.log("abebe");
      setValidPhoneNumber(true);
    }
  };

  const toastify = (message) => {
    toast.error(message, {
      position: "top-right",
      style: { backgroundColor: "#EEEEEE", color: "black", fontWeight: "bold" },
    });
  };
  const toastify2 = (message) => {
    toast.success(message, {
      position: "top-right",
      style: { backgroundColor: "#EEEEEE", color: "black", fontWeight: "bold" },
    });
  };
  //legacy otp
  const inputRefs = useRef([]);

  // Handle input changes
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only digits
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Allow only 1 character
    setOtp(newOtp);

    // Move to the next input field if a digit is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace to move focus
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Combine OTP digits
  const handleSumit = async (e) => {
    const otp2 = otp.join("");
    console.log("the otp is ", otp);
    e.preventDefault();
    setLoading(true);
    setValidPhoneNumber2(validPhoneNumber);
    if (!validPhoneNumber) return;
    await signupC(phonenumber, otp2);

    //onConfirm();
  };

  //Generate OTP
  const generateOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setValidPhoneNumber2(validPhoneNumber);
    if (!validPhoneNumber) {
      setLoading(false);
      return;
    }

    const response = await fetch(`${API_BASE_URL}/api/customer/GenerateOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phonenumber: phonenumber,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      toastify(json.message);

      console.log(json.message);
      return;
    }
    if (response.ok) {
      setIsOtpSent(true);
      setLoading(false);
    }
  };
  const red = useNavigate();
  useEffect(() => {
    socket.on("isLoading12", (msg) => {
      console.log("the email", phonenumber);
      if (msg == phonenumber) {
        toastify2("You have Successfully logged in");
        onConfirm();
        red("/Dashboard");
      }
    });
    return () => {
      socket.off("isLoading12");
    };
  }, [socket, phonenumber]);
  //
  useEffect(() => {
    socket.on("notSuccess", (msg) => {
      const { PhoneNumber, error } = msg;
      console.log("the email", phonenumber);
      if (PhoneNumber == phonenumber) {
        toastify(error);
        setLoading(false);
      }
    });
    return () => {
      socket.off("notSuccess");
    };
  }, [socket, phonenumber]);
  return (
    <div>
      <div className="h-[300px] w-[90%] max-w-[500px] ml-[18px] mr-auto mt-10 md:ml-[220px] md:mt-40 absolute bg-white border-[1px] rounded-lg lg:ml-96">
        {!isOtpSent ? (
          <div className="absolute inset-0">
            <form onSubmit={generateOtp} className="to-blue-100">
              <div className="flex flex-col justify-center items-center mb-6 mt-8">
                <h3 className="font-bold text-center md:ml-[-20px]">
                  Add PhoneNumber
                </h3>
              </div>
              <p className="flex justify-center items-center mb-3 text-center">
                Start with 09
              </p>
              <div className="flex justify-center items-center space-y-3 flex-col">
                <div className="flex flex-col space-y-5">
                  <div className="flex relative">
                    <input
                      placeholder="PhoneNumber"
                      required
                      type="text"
                      onChange={handlePhoneNumberChange}
                      value={phonenumber}
                      className="bg-transparent h-[45px] w-[95%] max-w-[285px] border-2 block focus:outline-none focus:outline-blue-400 rounded-2xl px-4"
                    />
                    <AiFillPhone className=" absolute right-4 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8 space-x-4">
                <button className="h-[48px] w-24 border-2 bg-green-500 hover:bg-green-400 rounded-md text-white font-serif transition delay-200 text-[15px]">
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
                    "Confirm"
                  )}
                </button>
                <button
                  className="h-[48px] w-24 border-2 bg-red-500 hover:bg-red-400 rounded-md text-white font-serif transition delay-200 text-[15px]"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
              <div className="bg-red-500 mt-2 rounded-md text-white p-2 mx-4">
                {error && <div className="text-center">{error}</div>}
                {!validPhoneNumber2 && (
                  <p className="text-center">PhoneNumber is invalid.</p>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="mt-24 sm:ml-24 ml-8">
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              {otp.map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  value={otp[index]}
                  maxLength={1}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  style={{
                    width: "40px",
                    height: "40px",
                    textAlign: "center",
                    fontSize: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              ))}
            </div>
            <div className="ml-12 mt-3">
              <button
                onClick={handleSumit}
                className="bg-green-400 hover: h-[48px] w-48 border-2  from-white rounded-3xl font-bold hover:bg-yellow-400 transition delay-200"
              >
                {loading ? (
                  <span className="flex justify-center items-center">
                    <BounceLoader size={20} color="#ffffff" loading={loading} />
                    Processing...
                  </span>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </div>

            <div className="bg-red-500 ml-10 w-56 mt-2 rounded-md">
              <ToastContainer />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SignUpC;
