import { useContext } from "react";
import { UserContextChat } from "../Context/UserContextChat";
export const useUserContextChat = () => {
  const context = useContext(UserContextChat);

  if (!context) {
    throw Error(
      "useUserContextChat must be inside in usercontextChat provider"
    );
  }
  return context;
};
