import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserContextC } from "../Hooks/useUserContextC";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { io } from "socket.io-client";
const socket = io(API_BASE_URL);
export const useSignUpC = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const red = useNavigate();
  const { customer, dispatch2 } = useUserContextC();
  const signupC = async (phonenumber, otp) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(
      `${API_BASE_URL}/api/Customer/CustomerCreate`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          phonenumber,
          otp,
        }),
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
      const error = json.message;
      const PhoneNumber = phonenumber;
      const data = { PhoneNumber, error };
      socket.emit("notSuccess", data);
    }
    if (response.ok) {
      setIsLoading(false);
      localStorage.setItem("customer", JSON.stringify(json));
      dispatch2({ type: "LOGIN", payload: json });
      socket.emit("isLoading12", phonenumber);
      // red("/Dashboard");
    }
  };
  return { signupC, isLoading, error };
};
