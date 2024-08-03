import { GiRadarDish } from "react-icons/gi";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import hiloe5 from "../assets/Ai_6.jfif";
const Transition2 = () => {
  const handleUser = () => {
    red("/LogInC");
  };
  const handleProvider = () => {
    red("/LogIn");
  };
  const red = useNavigate();
  return (
    <div className="h-[1100px]">
      <div className="text-white mt-12 font-bold   text-[60px] hover:text-pink-600   ml-[570px] absolute border-b-4 border-white rounded-3xl">
        <h6>Log In</h6>
      </div>
      <div className="flex mt-[300px] ml-36 space-x-48 absolute">
        <div
          onClick={handleUser}
          className="animate-bounce  rounded-full hover:animate-none hover:bg-gradient-to-b hover:from-blue-400    cursor-pointer  relative   bg-transparent w-[395px] h-[395px] ml-6 mt-6 hover:h-[405px] hover:w-[405px] hover:to-pink-500 transition-transform delay-1000  ease-in-out border-2 border-white"
        >
          <center className="mt-24">
            <FaUserCircle className="text-white text-[65px] hover:animate-spin delay-1000" />

            <h1 className="mt-6 text-2xl text-white font-semibold">
              Employer/ተጠቃሚ/ቀጣሪ
            </h1>
            <div className="flex flex-col w-80 mt-5"></div>
          </center>
        </div>

        <div
          className="animate-bounce  rounded-full hover:animate-none hover:bg-gradient-to-b hover:from-blue-400    cursor-pointer  relative   bg-transparent w-[395px] h-[395px] ml-6 mt-6 hover:h-[405px] hover:w-[405px] hover:to-pink-500 transition-transform delay-1000  ease-in-out border-2 border-white"
          onClick={handleProvider}
        >
          <center className="mt-24">
            <GiRadarDish className="text-white text-[65px] hover:animate-spin delay-1000" />
            <h1 className="mt-6 text-2xl text-white font-semibold">
              Service Provider/አገልግሎት ሰጪ/ሰራተኛ
            </h1>
            <div className="flex flex-col w-80 mt-5"></div>
          </center>
        </div>
      </div>
      <img className="object-fill w-full h-full" src={hiloe5} alt="" />
    </div>
  );
};

export default Transition2;
