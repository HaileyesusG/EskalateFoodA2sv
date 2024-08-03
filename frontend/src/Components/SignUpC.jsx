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
    setValidPhoneNumber2(true);
    setPhonenumber(value);

    // Validate phone number
    const phoneRegex = /^(09|07)\d{8}$/; // Regular expression pattern for 10-digit phone number
    const isValid = phoneRegex.test(value);
    console.log("isvalid", isValid);
    setValidPhoneNumber(isValid);
    if (value == "") {
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
      <div className="h-[300px] w-[500px] ml-[420px] mt-40  absolute bg-white  border-[1px]  rounded-lg">
        <div className="absolute  ">
          <form onSubmit={handleSumit} className="to-blue-100">
            <div className=" flex flex-col justify-center ml-[190px] mb-6 mt-8">
              <h3 className=" font-bold  ml-[-20px] ">Add PhoneNumber</h3>
            </div>
            <p className="flex justify-center items-center mb-3  ">
              Start with 09
            </p>
            <div className=" flex   justify-center items-center space-y-3   ">
              <div className="flex flex-col space-y-5  ">
                <div className="flex ml-6">
                  <input
                    placeholder="PhoneNumber"
                    required
                    type="text"
                    onChange={handlePhoneNumberChange}
                    value={phonenumber}
                    className="bg-transparent   h-[45px] w-[280px]  border-2 block focus:outline-none focus:outline-blue-400   rounded-2xl   px-4  "
                  />
                  <AiFillPhone className="text-white mt-2 absolute ml-[270px]" />
                </div>
              </div>

              {/* <div className="flex flex-col space-y-3 ml-10">
           
              </div> */}
            </div>
            <div className="  justify-center mt-8 ml-20">
              <button className="h-[48px] w-24 border-2  bg-green-500 hover:bg-green-400 rounded-md text-white font-serif transition delay-200 text-[15px]">
                Confirm
              </button>
              <button
                className="h-[48px] w-24 border-2  bg-red-500 hover:bg-red-400 rounded-md text-white font-serif transition delay-200 text-[15px]"
                onClick={onCancel}
              >
                Cancle
              </button>

              <div className="bg-red-500 ml-20 w-64 mt-2 rounded-md text-white">
                {error && <div className="ml-7 text-white ">{error}</div>}
                {!validPhoneNumber2 && (
                  <p className="ml-5">PhoneNumber is invalid.</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUpC;
