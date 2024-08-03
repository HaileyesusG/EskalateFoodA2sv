import { Navigate, useNavigate } from "react-router-dom";
import hiloe from "../assets/AiM.jpeg";
import hiloe2 from "../assets/AiM2.jpeg";
import hiloe3 from "../assets/logo.jpg";
import hiloe4 from "../assets/AiM4.jpeg";
import hiloe5 from "../assets/Ai_6.jfif";
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

  var previousScrollPosition =
    window.scrollY || document.documentElement.scrollTop;
  window.addEventListener("scroll", function () {
    var currentScrollPosition =
      window.scrollY || document.documentElement.scrollTop;
    var navbarContainer = document.querySelector(".navbar-container");

    // Adjust this value to determine the scroll point

    if (currentScrollPosition > previousScrollPosition) {
      navbarContainer.classList.add("fixed");
      navbarContainer.classList.add("top-0");
      navbarContainer.classList.add("inset-x-0");
      navbarContainer.classList.replace("mt-3", "mt-0");
    } else {
      navbarContainer.classList.remove("fixed");
      navbarContainer.classList.remove("top-0");
      navbarContainer.classList.remove("inset-x-0");
      navbarContainer.classList.remove("mt-0");
      navbarContainer.classList.add("mt-3");
    }
    previousScrollPosition = currentScrollPosition;
  });
  return (
    <div>
      <div className="main-container flex mt-6">
        <div className="flex ml-11  items-center ">
          <div>
            <img
              src={hiloe5}
              className="rounded-full w-[100px] h-[100px] object-cover"
            />
          </div>
          <div className="ml-6">
            <text className="text-4xl font-bold text-black ml-12">Africa</text>
            <div>
              <text className="text-4xl text-yellow-400 font-bold">
                CustomerService
              </text>
            </div>
          </div>
          <div className="flex ml-[400px] mr-4  ">
            <div className="mr-28">
              <h4>CALL US</h4>
              <h4>+251960295512</h4>
            </div>
            <div>
              <h4>MAIL US</h4>
              <h4>AfricaDish9@gmail.com</h4>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="navbar-container bg-yellow-400 mt-3  w-full z-10">
          <div className="ml-[1000px] mt-3 absolute items-center flex space-x-5">
            <button
              className="w-28 h-14 bg-yellow-500 rounded-2xl  text-[19px]  hover:bg-yellow-300 hover:text-black"
              onClick={handleSignIn}
            >
              LogIn
            </button>
            <button
              className="w-28 h-14 bg-yellow-500 rounded-2xl  text-[19px]  hover:bg-yellow-300 hover:text-black "
              onClick={handleSignUp}
            >
              SignUp
            </button>
          </div>
          <div className="flex ml-20 items-center h-20 space-x-[70px] text-[17px] ">
            <h1 className="transition delay-500 hover:text-red-500">Home</h1>
            <h1 className="transition delay-500 hover:text-red-500">About</h1>
            <h1 className="transition delay-500 hover:text-red-500">
              Services
            </h1>
            <h1 className="transition delay-500 hover:text-red-500">Page</h1>
            <h1 className="transition delay-500 hover:text-red-500">Package</h1>
            <h1 className="transition delay-500 hover:text-red-500">Contact</h1>
          </div>
        </div>
        <div className="">
          <Swiper
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            effect="fade"
            //scrollbar={{ draggable: true }}
            //spaceBetween={50}
            //navigation={true}
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
              <div className=" mt-80 absolute justify-end ml-[850px] text-white font-bold">
                <h1 className=" text-[40px] ml-[70px]">WE Take Care Of</h1>
                <h1 className="text-[60px] mr-2">YOUR HOME!</h1>
              </div>
              <img
                className="object-fill w-screen h-screen"
                src={hiloe}
                alt="image slide 1"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="object-fill w-screen h-screen"
                src={hiloe2}
                alt="image slide 2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="object-fill w-screen h-screen"
                src={hiloe4}
                alt="image slide 3"
              />
            </SwiperSlide>
          </Swiper>
          {/* <img src={hiloe3} /> */}
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
