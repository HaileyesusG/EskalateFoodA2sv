import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io("https://africadeploybackend.onrender.com");
export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const red = useNavigate();
  const register = async (
    department,
    firstname,
    lastname,
    gender,
    phonenumber,
    email,
    password,
    testImage,
    image2,
    image3,
    image4
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/Tech/TechCreate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        department,
        firstname,
        lastname,
        gender,
        phonenumber,
        email,
        password,
        testImage,
        image2,
        image3,
        image4,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      socket.emit("ErrorM", json.message);
      setError(json.message);
      console.log(json.message);
    }
    if (response.ok) {
      setIsLoading(false);
      socket.emit("ErrorM", "ok");
      console.log("this is the data of the");
      // red("/login");
      //save the user on local storage
      //localStorage.setItem('user')
    }
  };
  return { register, isLoading, error };
};
