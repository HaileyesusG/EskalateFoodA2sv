import { useReducer, createContext, useEffect } from "react";

export const UserContextC = createContext();
export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, customer: [...state.customer, action.payload] };
    case "LOGOUT":
      return { customer: null };
    default:
      return state;
  }
};

export const UserContextProviderC = ({ children }) => {
  const [state, dispatch2] = useReducer(userReducer, {
    customer: [],
  });
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (user) {
  //     dispatch2({ type: "LOGIN", payload: user });
  //   }
  // }, []);

  console.log("CustomerContextC State:", state);
  return (
    <UserContextC.Provider value={{ ...state, dispatch2 }}>
      {children}
    </UserContextC.Provider>
  );
};
