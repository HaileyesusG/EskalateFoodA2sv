import { useReducer, createContext } from "react";

export const UserContextChat = createContext();
export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_CHAT":
      return { chat: action.payload };
    case "CREATE_CHAT":
      return { chat: [action.payload, ...state.chat] };
    case "DELETE_CHAT":
      return { chat: state.chat.filter((w) => w._id !== action.payload._id) };
    default:
      return state;
  }
};

export const UserContextProviderChat = ({ children }) => {
  const [state, dispatchChat] = useReducer(userReducer, {
    chat: null,
  });
  console.log("userContext Chat:", state);
  return (
    <UserContextChat.Provider value={{ ...state, dispatchChat }}>
      {children}
    </UserContextChat.Provider>
  );
};
