import { useState } from "react";
import { Form } from "react-router-dom";
import { useUserContextA } from "../Hooks/useUserContextA";
import { setAdmin } from "../features/admin/adminSlice";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
export const useSignInA = () => {
  const red = useNavigate();
  const dispatch2 = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signinA = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/Admin/LoginAdmin", {
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
      //dispatch({ type: "LOGIN", payload: json });
      dispatch2(setAdmin([json]));
      //save the user on local storage
      localStorage.setItem("admin", JSON.stringify(json));
      red("/Admin");
    } else {
      console.log("not log in");
    }
  };
  return { signinA, isLoading, error };
};
