import { Navigate, useNavigate, Link } from "react-router-dom";
import { IoCall } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import React, { useState, useEffect } from "react";
import hiloe from "../assets/AiM.jpeg";
import hiloe2 from "../assets/AiM2.jpeg";
import sport3 from "../assets/sport3.jpg";
import sport2 from "../assets/sport2.jpg";
import sport1 from "../assets/sport1.jpg";
import sport4 from "../assets/sport4.jpg";
import hiloe4 from "../assets/AiM4.jpeg";
import hiloe5 from "../assets/lg1.webp";
import hiloe6 from "../assets/bgl.jpg";
import { FaSatelliteDish } from "react-icons/fa";
import { PiTelevisionFill } from "react-icons/pi";
import { MdOutlinePlumbing } from "react-icons/md";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { GiCampCookingPot } from "react-icons/gi";
import { FaPaintRoller } from "react-icons/fa6";
import { MdRoofing } from "react-icons/md";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

const FrontPage = () => {
  const handleSignIn = () => {
    red("/LogIn");
  };
  const handleHome = () => {
    red("/Home");
  };
  const handleSignUp = () => {
    red("/SignUpA");
  };
  const handleSignInA = () => {
    red("/LogInA");
  };
  const handleSignUpT = () => {
    red("/SignUp");
  };
  const handleOrder = () => {
    red("/DashBoard");
  };
  const red = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState("");
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Smooth scrolling functionality
    const handleScroll = (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 50, // Adjust offset for fixed header
          behavior: "smooth",
        });
      }
    };

    const links = document.querySelectorAll("a[href^='#']");
    links.forEach((link) => {
      link.addEventListener("click", handleScroll);
    });

    // Clean up the event listeners
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleScroll);
      });
    };
  }, []);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      console.log("yes");
    } else {
      console.log("No");
    }
  }, []);

  return (
    <div>
      <nav className="bg-yellow-400 w-full z-10 shadow-md">
        <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
          <div className="text-2xl font-bold text-black flex justify-between w-full md:w-auto">
            <Link to="home" smooth={true} duration={500} offset={-50}>
              Master
            </Link>
            <div className="md:hidden">
              <button
                className="text-black focus:outline-none"
                onClick={toggleMenu}
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:justify-between md:w-auto md:space-x-8">
            <a href="#home" className="cursor-pointer hover:text-red-500">
              Home
            </a>
            <a href="#about" className="cursor-pointer hover:text-red-500">
              About
            </a>
            <a href="#services" className="cursor-pointer hover:text-red-500">
              Services
            </a>
            <a href="#page" className="cursor-pointer hover:text-red-500">
              Page
            </a>
            <a href="#package" className="cursor-pointer hover:text-red-500">
              Package
            </a>
            <a href="#contact" className="cursor-pointer hover:text-red-500">
              Contact
            </a>
          </div>
          <div className="flex space-x-3">
            {user ? (
              <button
                className="w-20 h-10 bg-yellow-500 rounded-2xl mt-2 text-[15px] hover:bg-yellow-300 hover:text-black"
                onClick={handleHome}
              >
                Home
              </button>
            ) : (
              <div className="flex space-x-3">
                <button
                  className="w-32 h-10 bg-yellow-500 rounded-2xl mt-2 text-[15px] hover:bg-yellow-300 hover:text-black"
                  onClick={handleSignUpT}
                >
                  SignUp/የባለሙያ መመዝገቢያ
                </button>
                <button
                  className="w-32 h-10 bg-yellow-500 rounded-2xl mt-2 text-[15px] hover:bg-yellow-300 hover:text-black"
                  onClick={handleSignIn}
                >
                  LogIn/የባለሙያ መግቢያ
                </button>
              </div>
            )}
            <button
              className="w-24 h-14 bg-yellow-500 rounded-2xl text-[15px] hover:bg-yellow-300 hover:text-black"
              onClick={handleOrder}
            >
              በቅርብ ቀን ይጀምራል/ Order Online/ባለሙያ መጥሪያ
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 py-4">
            <a href="#home" className="cursor-pointer hover:text-red-500">
              Home
            </a>
            <a href="#about" className="cursor-pointer hover:text-red-500">
              About
            </a>
            <a href="#services" className="cursor-pointer hover:text-red-500">
              Services
            </a>
            <a href="#page" className="cursor-pointer hover:text-red-500">
              Page
            </a>
            <a href="#package" className="cursor-pointer hover:text-red-500">
              Package
            </a>
            <a href="#contact" className="cursor-pointer hover:text-red-500">
              Contact
            </a>
          </div>
        )}
      </nav>

      <div className="main-container mt-6 w-full px-4 md:px-0">
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center">
          <div className="flex justify-center md:first-letter:mt-[-25px] md:block">
            <img
              src={hiloe5}
              alt="Profile"
              className="rounded-full w-20 h-20 md:w-24 md:h-24 object-cover"
            />
          </div>
          <div className="mt-4 md:mt-0 lg:ml-[-500px] text-center md:text-left">
            <p className="text-xl md:text-4xl font-bold text-black">Master</p>
            <p className="text-xl md:text-4xl text-yellow-400 font-bold">Fix</p>
          </div>
          <div className="flex flex-col mt-4 md:flex-row md:items-center md:space-x-4">
            <div className="mb-4 md:mb-0">
              <div className="flex">
                <IoCall /> <h4 className="text-center md:text-left">CALL US</h4>
              </div>

              <h4 className="text-center md:text-left">+251960295512</h4>
            </div>
            <div>
              <div className="flex">
                <IoMail />
                <h4 className="text-center md:text-left">MAIL US</h4>
              </div>

              <h4 className="text-center md:text-left">
                AfricaDish9@gmail.com
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Swiper
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          effect="fade"
          modules={[
            Autoplay,
            Pagination,
            Navigation,
            Scrollbar,
            A11y,
            EffectFade,
          ]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-white font-bold">
              <h1 className="text-lg md:text-3xl lg:text-[40px]">
                WE Take Care Of
              </h1>
              <h1 className="text-2xl md:text-4xl lg:text-[60px]">
                YOUR HOME!
              </h1>
            </div>
            <img
              className="object-cover w-full h-[50vh] md:h-[80vh] lg:h-screen"
              src={hiloe}
              alt="Slide 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="object-cover w-full h-[50vh] md:h-[80vh] lg:h-screen"
              src={hiloe2}
              alt="Slide 2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="object-cover w-full h-[50vh] md:h-[80vh] lg:h-screen"
              src={hiloe4}
              alt="Slide 3"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div id="home">
        <Swiper
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          effect="fade"
          modules={[Autoplay, Pagination, EffectFade]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center w-full h-[50vh] md:h-[80vh] lg:h-screen bg-gray-800 text-white">
              <p className="text-lg font-bold mb-4">Satellite Dish</p>
              <FaSatelliteDish size={150} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center w-full h-[50vh] md:h-[80vh] lg:h-screen bg-gray-700 text-white">
              <p className="text-lg font-bold mb-4">Television</p>
              <PiTelevisionFill size={150} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center w-full h-[50vh] md:h-[80vh] lg:h-screen bg-gray-600 text-white">
              <p className="text-lg font-bold mb-4">Plumbing</p>
              <MdOutlinePlumbing size={150} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center w-full h-[50vh] md:h-[80vh] lg:h-screen bg-gray-500 text-white">
              <p className="text-lg font-bold mb-4">Refrigerator</p>
              <CgSmartHomeRefrigerator size={150} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center w-full h-[50vh] md:h-[80vh] lg:h-screen bg-gray-400 text-white">
              <p className="text-lg font-bold mb-4">Cooking Pot</p>
              <GiCampCookingPot size={150} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center w-full h-[50vh] md:h-[80vh] lg:h-screen bg-gray-300 text-black">
              <p className="text-lg font-bold mb-4">Paint Roller</p>
              <FaPaintRoller size={150} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center w-full h-[50vh] md:h-[80vh] lg:h-screen bg-gray-200 text-black">
              <p className="text-lg font-bold mb-4">Roofing</p>
              <MdRoofing size={150} />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div id="services">
        <Swiper
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          effect="fade"
          modules={[Autoplay, Pagination, EffectFade]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center w-full h-[50vh] md:h-[80vh] lg:h-screen bg-gray-700 text-white">
              <span className="text-lg font-bold mb-4 flex">
                <h1>🛰</h1>
                <p>Amos 4°W Satellite</p>
              </span>
              <div className="flex space-x-3">
                <img
                  src={sport2} // Replace with your own image URL if needed
                  alt="Amos 4°W Satellite Logo"
                  className="w-52 h-52 object-contain mb-4"
                />
                <img
                  src={sport3} // Replace with your own image URL if needed
                  alt="Amos 4°W Satellite Logo"
                  className="w-52 h-52 object-contain mb-4"
                />
                <img
                  src={sport4} // Replace with your own image URL if needed
                  alt="Amos 4°W Satellite Logo"
                  className="w-52 h-52 object-contain mb-4"
                />
              </div>
              <div>
                <p>
                  ከየትኛውም የኢትዮጵያ ክፍል ሆነው ይህን ምርጥ የሆነ የ ስፖርት እና መዝናኛ ሳተላይት ለማሰራት
                  ቢፈልጉ አሁኑኑ ከታች ባለው ስልክ ይደውሉልን ወይም ባለሙያ ይዘዙ የሚለውን ተጭነው አሁኑኑ
                  አቅራቢያዎ ያለ ባለሙያ ይጥሩ
                </p>
              </div>
              <p className="text-center text-sm md:text-lg">
                Call us now to install the Amos 4°W satellite dish and enjoy
                top-notch services.
              </p>
              <div></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center w-full h-[50vh] md:h-[80vh] lg:h-screen bg-gray-700 text-white">
              <p className="text-lg font-bold mb-4">Amos 4°W Satellite</p>
              <div className="flex space-x-3">
                <img
                  src={sport2} // Replace with your own image URL if needed
                  alt="Amos 4°W Satellite Logo"
                  className="w-52 h-52 object-contain mb-4"
                />
                <img
                  src={sport3} // Replace with your own image URL if needed
                  alt="Amos 4°W Satellite Logo"
                  className="w-52 h-52 object-contain mb-4"
                />
                <img
                  src={sport4} // Replace with your own image URL if needed
                  alt="Amos 4°W Satellite Logo"
                  className="w-52 h-52 object-contain mb-4"
                />
              </div>

              <p className="text-center text-sm md:text-lg">
                Call us now to install the Amos 4°W satellite dish and enjoy
                top-notch services.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center w-full h-[50vh] md:h-[80vh] lg:h-screen bg-gray-700 text-white">
              <p className="text-lg font-bold mb-4">Amos 4°W Satellite</p>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/AMOS_Spacecom_logo.png/600px-AMOS_Spacecom_logo.png" // Replace with your own image URL if needed
                alt="Amos 4°W Satellite Logo"
                className="w-40 h-40 object-contain mb-4"
              />
              <p className="text-center text-sm md:text-lg">
                Call us now to install the Amos 4°W satellite dish and enjoy
                top-notch services.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center w-full h-[50vh] md:h-[80vh] lg:h-screen bg-gray-700 text-white">
              <p className="text-lg font-bold mb-4">Amos 4°W Satellite</p>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/AMOS_Spacecom_logo.png/600px-AMOS_Spacecom_logo.png" // Replace with your own image URL if needed
                alt="Amos 4°W Satellite Logo"
                className="w-40 h-40 object-contain mb-4"
              />
              <p className="text-center text-sm md:text-lg">
                Call us now to install the Amos 4°W satellite dish and enjoy
                top-notch services.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center w-full h-[50vh] md:h-[80vh] lg:h-screen bg-gray-700 text-white">
              <p className="text-lg font-bold mb-4">Amos 4°W Satellite</p>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/AMOS_Spacecom_logo.png/600px-AMOS_Spacecom_logo.png" // Replace with your own image URL if needed
                alt="Amos 4°W Satellite Logo"
                className="w-40 h-40 object-contain mb-4"
              />
              <p className="text-center text-sm md:text-lg">
                Call us now to install the Amos 4°W satellite dish and enjoy
                top-notch services.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center w-full h-[50vh] md:h-[80vh] lg:h-screen bg-gray-300 text-black">
              <p className="text-lg font-bold mb-4">Paint Roller</p>
              <FaPaintRoller size={150} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center w-full h-[50vh] md:h-[80vh] lg:h-screen bg-gray-200 text-black">
              <p className="text-lg font-bold mb-4">Roofing</p>
              <MdRoofing size={150} />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div id="about">
        <h2 className="text-center mt-8 text-3xl">
          Live Football Matches Streamings
        </h2>
        <h2 className="text-center mt-8 text-3xl">Comming Soon</h2>
        {/* Add your About section content here */}
      </div>

      <div id="page">
        <h2 className="text-center mt-8 text-3xl">Comming Soon</h2>
        {/* Add your Page section content here */}
      </div>

      <div id="package">
        <h2 className="text-center mt-8 text-3xl">Comming Soon</h2>
        {/* Add your Package section content here */}
      </div>

      <div id="contact">
        <h2 className="text-center mt-8 text-3xl">Comming Soon</h2>
        {/* Add your Contact section content here */}
      </div>

      <div id="order">
        <h2 className="text-center mt-8 text-3xl">Comming Soon</h2>
        {/* Add your Order Online section content here */}
      </div>
    </div>
  );
};

export default FrontPage;
