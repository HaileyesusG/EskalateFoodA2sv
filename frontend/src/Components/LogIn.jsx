import { useContext, useEffect, useState } from "react";
import { useSignIn } from "../Hooks/useSignIn";
import { io } from "socket.io-client";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import hiloe5 from "../assets/dish.jfif";
import { BounceLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Login = () => {
  const [email, setEmail] = useState("");
  const [viewr, setViewer] = useState(null);
  const [password, setPassword] = useState("");
  const { signin, isLoading, error, image, setError } = useSignIn();
  const [socket, setSocket] = useState(null);
  const toastify = (message) => {
    toast.error(message, {
      position: "top-center",
      style: { backgroundColor: "#EEEEEE", color: "black", fontWeight: "bold" },
    });
  };
  const handleSumit = async (e) => {
    e.preventDefault();
    await signin(email, password);

    if (image) setViewer(true);
  };
  useEffect(() => {
    setSocket(
      io(API_BASE_URL, {
        transports: ["websocket"],
      })
    );
  }, []);
  useEffect(() => {
    socket?.emit("newUser", email);
  }, [email]);
  //
  const handleInputChange = (e, setValue) => {
    setValue(e.target.value);
    if (error) {
      setError(null);
    }
  };
  if (error) {
    toastify(error);
  }

  return (
    <div className="relative w-full h-screen">
      <div className="mt-20 ml-5 sm:mt-56 h-auto sm:h-[500px] w-[90%] sm:w-[700px] mx-auto sm:ml-[310px] absolute bg-opacity-50 backdrop-filter backdrop-blur-sm border-[1px] border-white md:ml-24 lg:ml-64">
        <div className="absolute w-full">
          <form onSubmit={handleSumit}>
            <div className="flex flex-col justify-center items-center mb-6 mt-12">
              <h3 className="font-bold text-2xl sm:text-3xl text-white">
                Log In
              </h3>
            </div>

            <div className="flex flex-col space-y-5 items-center">
              <div className="flex w-[90%] sm:w-auto justify-center relative">
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => handleInputChange(e, setEmail)}
                  value={email}
                  className="bg-transparent h-[35px] w-full sm:w-[300px] border-b-2 block focus:outline-none focus:border-white rounded-2xl px-4 placeholder-white text-white"
                />
                <MdEmail className="text-white mt-2 absolute right-3" />
              </div>
              <div className="flex w-[90%] sm:w-auto justify-center relative">
                <input
                  type="password"
                  onChange={(e) => handleInputChange(e, setPassword)}
                  value={password}
                  placeholder="Password"
                  className="bg-transparent h-[35px] w-full sm:w-[300px] border-b-2 block focus:outline-none focus:border-white rounded-2xl px-4 placeholder-white text-white"
                />
                <RiLockPasswordFill className="text-white mt-2 absolute right-3" />
              </div>
              <button
                disabled={isLoading}
                className="bg-gradient-to-b hover:text-black h-[35px] w-[90%] sm:w-[300px] border-2 from-orange-300 rounded-3xl font-bold hover:to-purple-500 transition delay-200 text-white"
              >
                {isLoading ? (
                  <span className="flex justify-center items-center">
                    <BounceLoader
                      size={20}
                      color="#ffffff"
                      loading={isLoading}
                    />
                    Processing...
                  </span>
                ) : (
                  "Log In"
                )}
              </button>
              {error && <ToastContainer />}
            </div>
          </form>
        </div>
      </div>
      <img className="object-cover w-full h-full" src={hiloe5} alt="" />
    </div>
  );
};
export default Login;
