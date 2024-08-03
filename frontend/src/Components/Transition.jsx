import { GiRadarDish } from "react-icons/gi";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import hiloe5 from "../assets/Ai_6.jfif";
const Transition = () => {
  const handleUser = () => {
    red("/SignUpC");
  };
  const handleProvider = () => {
    red("/SignUp");
  };
  const red = useNavigate();
  return (
    <div className="h-[1100px] ">
      <div className="font-mono flex text-[60px] hover:text-sky-800   ml-96 absolute border-b-4 border-white rounded-3xl ">
        <h6 className="mt-[60px] bg-orange-500 rounded-full font-bold text-white hover:text-emerald-400">
          Select Account Type
        </h6>
      </div>
      <div className="flex mt-[220px] ml-36 space-x-48 absolute">
        <div
          onClick={handleUser}
          className="animate-bounce  rounded-full hover:animate-none hover:bg-gradient-to-b hover:from-blue-400    cursor-pointer  relative   bg-transparent w-[395px] h-[395px] ml-6 mt-6 hover:h-[405px] hover:w-[405px] hover:to-pink-500 transition-transform delay-1000  ease-in-out border-2 border-white"
        >
          <center className="mt-10">
            <FaUserCircle className="text-white text-[65px] hover:animate-spin delay-1000" />

            <h1 className="mt-6 text-2xl text-white">Employer/ተጠቃሚ/ቀጣሪ</h1>
            <div className="flex flex-col w-80 mt-5">
              <p className="text-white">
                ሰራተኞችን ለመቅጠር የምትፈልግ ግለሰብ ወይም ኩባንያ ከሆንክ "ቀጣሪ" የመለያ አይነትን ምረጥ።
              </p>
              <p className="text-white">
                If you are an individual user or a company seeking to hire
                professionals, then choose "Employer" account type.
              </p>
            </div>
          </center>
        </div>

        <div
          className="animate-bounce  rounded-full hover:animate-none hover:bg-gradient-to-b hover:from-blue-400    cursor-pointer  relative   bg-transparent w-[395px] h-[395px] ml-6 mt-6 hover:h-[405px] hover:w-[405px] hover:to-pink-500 transition-transform delay-1000  ease-in-out border-2 border-white"
          onClick={handleProvider}
        >
          <center className="mt-10">
            <GiRadarDish className="text-white text-[65px] hover:animate-spin delay-1000" />
            <h1 className="mt-6 text-2xl text-white">
              Service Provider/አገልግሎት ሰጪ/ሰራተኛ
            </h1>
            <div className="flex flex-col w-80 mt-5">
              <p className="text-white">
                ባለሙያ እና የስራ እድሎችን የምትፈልግ ግለሰብ አገልግሎት አቅራቢ ወይም ሰራተኛ ከሆንክ " ሰራተኛ"
                መለያ አይነትን ምረጥ።
              </p>
              <h6 className="text-white">
                If you are an individual service provider looking for jobs and
                employment opportunities, then choose "Service Provider" account
                type.
              </h6>
            </div>
          </center>
        </div>
      </div>
      <img className="object-fill w-full h-full" src={hiloe5} alt="" />
    </div>
  );
};

export default Transition;
