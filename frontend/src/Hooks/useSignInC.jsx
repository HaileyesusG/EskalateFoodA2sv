import { useState } from "react";
import { Form } from "react-router-dom";
import { useUserContextC } from "../Hooks/useUserContextC";
import { Navigate, useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useSignInC = () => {
  const red = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { customer, dispatch2 } = useUserContextC();

  const signinC = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(`${API_BASE_URL}/api/Customer/LoginCustomer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      setIsLoading(false);

      //save the user on local storage
      localStorage.setItem("customer", JSON.stringify(json));
      dispatch2({ type: "LOGIN", payload: json });
      red("/Dashboard");
    } else {
      console.log("not log in");
    }
  };
  return { signinC, isLoading, error };
};
