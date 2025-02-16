import { useState } from "react";
import { io } from "socket.io-client";
import { useUserContextC } from "../Hooks/useUserContextC";
import { Navigate, useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useCustomerForm = () => {
  let socket = io(API_BASE_URL, {
    transports: ["websocket"],
  });
  const red = useNavigate();
  let { customer, dispatch } = useUserContextC();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [who, setWho] = useState(null);
  customer = customer[0];
  let token = customer ? "Bearer " + customer.token : "";
  const CustomerForm = async (typeOfProblem, department) => {
    console.log("dep", department);
    socket.emit("Error", "noterror");
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${API_BASE_URL}/api/Book/BookCreate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: token },
      body: JSON.stringify({
        typeOfProblem,
        department,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
      setWho(null);
      socket.emit("Error", "error");
      console.log("not alright ", json.message);
    }
    if (response.ok) {
      //dispatch2({ type: "CREATE_TASK", payload: json });
      setIsLoading(false);
      setWho(json);
      setError(null);
      console.log("alright");
      socket.emit("Error", "noterror");
      //red("/Dashboard");
      //save the user on local storage
      //localStorage.setItem('user')
    }
  };

  return { CustomerForm, isLoading, error, who };
};
