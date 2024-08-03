import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const socket = io("https://africadeploybackend.onrender.com");
export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const red = useNavigate();
  const signup = async (
    department,
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
  ) => {
    setIsLoading(true);
    setError(null);
    let formdata = new FormData();
    formdata.append("department", department);
    formdata.append("firstname", firstname);
    formdata.append("lastname", lastname);
    formdata.append("gender", gender);
    formdata.append("phonenumber", phonenumber);
    formdata.append("email", email);
    formdata.append("otp", otp);
    formdata.append("password", password);
    formdata.append("testImages", testImage);
    formdata.append("testImages", testImage2);
    formdata.append("testImages", testImage3);
    formdata.append("testImages", testImage4);
    const response = await fetch(
      `${API_BASE_URL}/api/Applicants/ApplicantCreate`,
      {
        method: "POST",
        body: formdata,
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      setIsLoading(false);
      socket.emit("isLoading", true);
      // red("/login");
      //save the user on local storage
      //localStorage.setItem('user')
    }
  };
  return { signup, isLoading, error };
};
