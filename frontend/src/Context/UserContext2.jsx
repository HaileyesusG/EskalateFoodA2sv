import { useReducer, createContext } from "react";

export const UserContext2 = createContext();
export const userReducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP":
      const updatedUser = action.payload;
      const updatedUsers = state.user2.map((user2) =>
        user2._id === updatedUser._id ? updatedUser : user2
      );

      return { ...state, user2: updatedUsers };
    default:
      return state;
  }
};

export const UserContext2Provider = ({ children }) => {
  const [state, dispatch2] = useReducer(userReducer, {
    user2: null,
  });
  console.log("userContext State2:", state);
  return (
    <UserContext2.Provider value={{ ...state, dispatch2 }}>
      {children}
    </UserContext2.Provider>
  );
};
