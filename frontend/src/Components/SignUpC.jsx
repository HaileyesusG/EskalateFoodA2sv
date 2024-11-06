import React, { useEffect, useState } from "react";
import { useSignUpC } from "../Hooks/useSignUpC";
import { AiFillPhone } from "react-icons/ai";
import hiloe5 from "../assets/bg1.avif";
const SignUpC = ({ onConfirm, onCancel }) => {
  const { signupC, isLoading, error } = useSignUpC();
  const [phonenumber, setPhonenumber] = useState("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);
  const [validPhoneNumber2, setValidPhoneNumber2] = useState(true);

  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;

    // Trim leading and trailing spaces from the phone number
    const trimmedValue = value.trim();

    setValidPhoneNumber2(true);
    setPhonenumber(trimmedValue); // Store the trimmed phone number

    // Validate phone number
    const phoneRegex = /^(09|07)\d{8}$/; // Regular expression pattern for 10-digit phone number
    const isValid = phoneRegex.test(trimmedValue);
    console.log("isValid", isValid);
    setValidPhoneNumber(isValid);

    if (trimmedValue === "") {
      console.log("abebe");
      setValidPhoneNumber(true);
    }
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    setValidPhoneNumber2(validPhoneNumber);
    if (!validPhoneNumber) return;
    await signupC(phonenumber);
    onConfirm();
  };

  return (
    <div>
      <div className="h-[300px] w-[90%] max-w-[500px] ml-[18px] mr-auto mt-10 md:ml-[220px] md:mt-40 absolute bg-white border-[1px] rounded-lg lg:ml-96">
        <div className="absolute inset-0">
          <form onSubmit={handleSumit} className="to-blue-100">
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
                    className="bg-transparent h-[45px] w-[90%] max-w-[280px] border-2 block focus:outline-none focus:outline-blue-400 rounded-2xl px-4"
                  />
                  <AiFillPhone className="text-white absolute right-4 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button className="h-[48px] w-24 border-2 bg-green-500 hover:bg-green-400 rounded-md text-white font-serif transition delay-200 text-[15px]">
                Confirm
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
      </div>
    </div>
  );
};
export default SignUpC;
