import { useReducer, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const UserContextA = createContext();
export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { admin: action.payload };
    case "LOGOUT":
      return { admin: null };
    default:
      return state;
  }
};

export const UserContextProviderA = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    admin: null,
  });
  //const red = useNavigate();
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin) {
      dispatch({ type: "LOGIN", payload: admin });
      //red("/Admin");
    }
  }, []);
  console.log("CustomerContextA State:", state);
  return (
    <UserContextA.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContextA.Provider>
  );
};
