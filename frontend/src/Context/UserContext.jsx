import { useReducer, createContext, useEffect } from "react";

export const UserContext = createContext();
export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: [...state.user, action.payload] };
    case "LOGOUT":
      return { user: null };

    case "SIGNUP":
      const updatedUsers = action.payload;

      const updatedUserIds = updatedUsers.map((user) => user._id);
      const NewUsers = state.user.map((user) => {
        if (updatedUserIds.includes(user._id)) {
          const updatedUser = updatedUsers.find((u) => u._id === user._id);
          return updatedUser;
        }
        return user;
      });
      return { ...state, user: NewUsers };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: [],
  });
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user) {
  //     dispatch({ type: "LOGIN", payload: user });
  //   }
  // }, []);
  console.log("userContext State:", state);
  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
