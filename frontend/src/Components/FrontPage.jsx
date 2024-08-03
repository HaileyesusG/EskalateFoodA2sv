import { Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import hiloe from "../assets/AiM.jpeg";
import hiloe2 from "../assets/AiM2.jpeg";
import hiloe3 from "../assets/logo.jpg";
import hiloe4 from "../assets/AiM4.jpeg";
import hiloe5 from "../assets/Ai_6.jfif";
import { Link } from "react-scroll";
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
    red("/Transition2");
  };
  const handleSignUp = () => {
    red("/Transition");
  };
  const red = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="bg-yellow-400 w-full z-10 shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="text-2xl font-bold text-black">
            <div className="flex">
              <Link to="home" smooth={true} duration={500} offset={-50}>
                Africa
              </Link>
              <div className="ml-7 flex space-x-3">
                <button
                  className="w-20 h-10 bg-yellow-500 rounded-2xl  text-[15px]  hover:bg-yellow-300 hover:text-black"
                  onClick={handleSignIn}
                >
                  LogIn
                </button>
                <button
                  className="w-20 h-10 bg-yellow-500 rounded-2xl  text-[15px]  hover:bg-yellow-300 hover:text-black "
                  onClick={handleSignUp}
                >
                  SignUp
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:flex space-x-8 text-lg">
            <Link
              to="home"
              className="cursor-pointer hover:text-red-500"
              smooth={true}
              duration={500}
              offset={-50}
            >
              Home
            </Link>
            <Link
              to="about"
              className="cursor-pointer hover:text-red-500"
              smooth={true}
              duration={500}
              offset={-50}
            >
              About
            </Link>
            <Link
              to="services"
              className="cursor-pointer hover:text-red-500"
              smooth={true}
              duration={500}
              offset={-50}
            >
              Services
            </Link>
            <Link
              to="page"
              className="cursor-pointer hover:text-red-500"
              smooth={true}
              duration={500}
              offset={-50}
            >
              Page
            </Link>
            <Link
              to="package"
              className="cursor-pointer hover:text-red-500"
              smooth={true}
              duration={500}
              offset={-50}
            >
              Package
            </Link>
            <Link
              to="contact"
              className="cursor-pointer hover:text-red-500"
              smooth={true}
              duration={500}
              offset={-50}
            >
              Contact
            </Link>
          </div>
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
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col items-center space-y-4 py-4">
              <Link
                to="home"
                className="cursor-pointer hover:text-red-500"
                onClick={toggleMenu}
                smooth={true}
                duration={500}
                offset={-50}
              >
                Home
              </Link>
              <Link
                to="about"
                className="cursor-pointer hover:text-red-500"
                onClick={toggleMenu}
                smooth={true}
                duration={500}
                offset={-50}
              >
                About
              </Link>
              <Link
                to="services"
                className="cursor-pointer hover:text-red-500"
                onClick={toggleMenu}
                smooth={true}
                duration={500}
                offset={-50}
              >
                Services
              </Link>
              <Link
                to="page"
                className="cursor-pointer hover:text-red-500"
                onClick={toggleMenu}
                smooth={true}
                duration={500}
                offset={-50}
              >
                Page
              </Link>
              <Link
                to="package"
                className="cursor-pointer hover:text-red-500"
                onClick={toggleMenu}
                smooth={true}
                duration={500}
                offset={-50}
              >
                Package
              </Link>
              <Link
                to="contact"
                className="cursor-pointer hover:text-red-500"
                onClick={toggleMenu}
                smooth={true}
                duration={500}
                offset={-50}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      <div className="main-container mt-6 w-screen">
        <div className="flex flex-col md:flex-row ml-4 md:ml-11 items-center">
          <div className="flex justify-center md:block">
            <img
              src={hiloe3}
              alt="Profile"
              className="rounded-full w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-cover"
            />
          </div>
          <div className="mt-4 md:mt-0 md:ml-6">
            <p className="text-xl md:text-4xl font-bold text-black md:ml-12">
              Africa
            </p>
            <div>
              <p className="text-xl md:text-4xl text-yellow-400 font-bold">
                CustomerService
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-4 md:mt-0 md:ml-auto md:mr-4">
            <div className="mb-4 md:mb-0 md:mr-28">
              <h4 className="text-center md:text-left">CALL US</h4>
              <h4 className="text-center md:text-left">+251960295512</h4>
            </div>
            <div>
              <h4 className="text-center md:text-left">MAIL US</h4>
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
        <h2 className="text-center mt-8 text-3xl">Home Section</h2>
        {/* Add your Home section content here */}
      </div>

      <div id="about">
        <h2 className="text-center mt-8 text-3xl">About Section</h2>
        {/* Add your About section content here */}
      </div>

      <div id="services">
        <h2 className="text-center mt-8 text-3xl">Services Section</h2>
        {/* Add your Services section content here */}
      </div>

      <div id="page">
        <h2 className="text-center mt-8 text-3xl">Page Section</h2>
        {/* Add your Page section content here */}
      </div>

      <div id="package">
        <h2 className="text-center mt-8 text-3xl">Package Section</h2>
        {/* Add your Package section content here */}
      </div>

      <div id="contact">
        <h2 className="text-center mt-8 text-3xl">Contact Section</h2>
        {/* Add your Contact section content here */}
      </div>
    </div>
  );
};

export default FrontPage;
