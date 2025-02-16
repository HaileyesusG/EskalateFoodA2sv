import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Components/SignUp";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import Login from "./Components/LogIn";
import LoginC from "./Components/LogInC";
import LoginA from "./Components/LogInA";
import Dashboard from "./Components/Dashboard";
import Dashboard2 from "./Components/DashBoard2";
import Chat from "./Components/Chat";
import Admin from "./Components/Admin";
import AdminChat from "./Components/AdminChat";
import Home from "./Components/Home";
import FrontPage from "./Components/FrontPage";
import ChatTech from "./Components/ChatTech";
import SignUpA from "./Components/SignUpA";
import SignUpC from "./Components/SignUpC";
import Transition from "./Components/Transition";
import Transition2 from "./Components/Transition2";
import { useEffect, useState } from "react";
import { setTech } from "./features/tech/techSlice";
import { setAdmin } from "./features/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import JobCompletionModal from "./Components/ConfirmModal";
import TermsAndConditions from "./Components/Terms";
import { io } from "socket.io-client";
const socket = io(API_BASE_URL, {
  transports: ["websocket"],
});
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState("");
  const [admin, setAdmin2] = useState("");
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.admin.admin);
  const todo2 = useSelector((state) => state.tech.tech);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAdmin = localStorage.getItem("admin");
    if (storedUser) {
      setIsLoggedIn(true);
      const user = JSON.parse(storedUser);
      setUser(user);
      featch(user._id);

      socket.emit("newUser", user.email);
    } else {
      const storedUser = localStorage.getItem("user");
      console.log("not found2U", storedUser);
    }
    if (storedAdmin) {
      //setIsLoggedIn(true);
      const admin = JSON.parse(storedAdmin);
      setAdmin2(admin);
      featch2(admin._id);

      //socket.emit("newUser", user.email);
    } else {
      console.log("not found2");
    }
    setIsLoading(false);
  }, []);
  //user
  const featch = async (id) => {
    const response = await fetch(
      `${API_BASE_URL}/api/tech/GetOneTechById/${id}`
    );
    const json = await response.json();
    if (!response.ok) {
      console.log("can not log");
    }
    if (response.ok) {
      dispatch(setTech([json]));
      //save the user on local storage
      // localStorage.setItem("user", JSON.stringify(json));
    } else {
      console.log("not log in");
    }
  };
  //admin
  const featch2 = async (id) => {
    const response = await fetch(
      `${API_BASE_URL}/api/admin/GetOneAdminById/${id}`
    );
    const json = await response.json();
    if (!response.ok) {
      console.log("can not log");
    }
    if (response.ok) {
      dispatch(setAdmin([json]));
      //save the user on local storage
      // localStorage.setItem("user", JSON.stringify(json));
    } else {
      console.log("not log in");
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <BrowserRouter>
        {/* <center>
          <NavBar />
        </center> */}

        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/FrontPage" element={<FrontPage />} />
          <Route path="/Transition" element={<Transition />} />
          <Route path="/Transition2" element={<Transition2 />} />
          <Route path="/LoginC" element={<LoginC />} />
          <Route path="/LoginA" element={<LoginA />} />
          <Route
            path="/Home"
            element={
              user || todo2.length > 0 ? (
                <Home user3={user || todo2[0]} />
              ) : (
                <Navigate to="/FrontPage" />
              )
            }
          />
          <Route
            path="/Signup"
            element={user || todo2.length > 0 ? <FrontPage /> : <SignUp />}
          />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Dashboard2" element={<Dashboard2 />} />
          <Route path="/Chat" element={<Chat />} />
          <Route
            path="/Admin"
            element={
              admin || todo.length > 0 ? (
                <Admin user3={admin || todo[0]} />
              ) : (
                <Navigate to="/FrontPage" />
              )
            }
          />
          <Route path="/AdminChat" element={<AdminChat />} />
          <Route path="/JobCompletionModal" element={<JobCompletionModal />} />
          <Route path="/ChatTech" element={<ChatTech />} />
          <Route path="/SignUpA" element={<SignUpA />} />
          <Route path="/SignUpC" element={<SignUpC />} />
          <Route path="/FrontPage" element={<FrontPage />} />
          <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
