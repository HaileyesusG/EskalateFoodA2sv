import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useUserContext } from "../Hooks/useUserContext";
import { setTech } from "../features/tech/techSlice";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
export const useSignIn = () => {
  const red = useNavigate();
  //const { user, dispatch } = useUserContext();
  const dispatch2 = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signin = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${API_BASE_URL}/api/tech/LoginTech`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    console.log(response);
    console.log("ApI", API_BASE_URL);
    return;
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      setIsLoading(false);
      // const convert = [json];
      //dispatch({ type: "LOGIN", payload: json });
      dispatch2(setTech([json]));
      red("/Home");
      //save the user on local storage
      localStorage.setItem("user", JSON.stringify(json));
    } else {
      console.log("not log in");
    }
  };
  return { signin, isLoading, error };
};
