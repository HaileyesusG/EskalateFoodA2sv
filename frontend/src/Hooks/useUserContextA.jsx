import { useContext } from "react";
import { UserContextA } from "../Context/UserContextA";
export const useUserContextA = () => {
  const context = useContext(UserContextA);

  if (!context) {
    throw Error("useUserContextA must be inside in usercontextA provider");
  }
  return context;
};
