import React, { useEffect, useState } from "react";
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
const logOutC = ({ onConfirm, onCancel, user }) => {
  const [phonenumber, setPhonenumber] = useState("");

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

  //logOut
  const logOut = (e) => {
    e.preventDefault();
    setLoading(true);
    localStorage.removeItem("customer");
    onConfirm();
    red("/dashboard");
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
        <div className="absolute inset-0">
          <form onSubmit={logOut} className="to-blue-100">
            <div className="flex flex-col justify-center items-center mb-6 mt-8"></div>

            <div className="flex justify-center items-center space-y-3 flex-col">
              <div className="flex flex-col space-y-5">
                <div className="flex relative">
                  <strong>{user.phonenumber}</strong>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button className="h-[48px] w-24 border-2 bg-green-500 hover:bg-green-400 rounded-md text-white font-serif transition delay-200 text-[15px]">
                LogOut
              </button>
              <button
                className="h-[48px] w-24 border-2 bg-red-500 hover:bg-red-400 rounded-md text-white font-serif transition delay-200 text-[15px]"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default logOutC;
