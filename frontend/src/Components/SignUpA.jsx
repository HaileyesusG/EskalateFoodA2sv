import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSignUpA } from "../Hooks/useSignUpA";
import { FaUser } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { PiGenderFemaleDuotone } from "react-icons/pi";
import { FaTools } from "react-icons/fa";
import hiloe5 from "../assets/Ai_3.png";
const SignUpA = () => {
  const [query, setQuery] = useState("");
  const [disp, setdisplay] = useState("visible");
  const [suggestions, setSuggestions] = useState([]);

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationName, setLocationName] = useState("");
  const [error2, setError] = useState("");

  const { signupA, isLoading, error } = useSignUpA();
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [location, setLocation] = useState("");
  const [testImage, settestImage] = useState(null);
  const GenderOption = ["Male", "Female"];
  const DepartmentOption = ["DISH", "TV"];

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    fetchSuggestions(inputValue);
  };
  const handleChoiceChange = (event) => {
    setQuery(event);
    setdisplay("hidden");
  };

  const fetchSuggestions = async (inputValue) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${inputValue}&format=json&limit=5`;
      const response = await axios.get(url);
      setSuggestions(response.data);
    } catch (error) {
      setError("Error fetching suggestions.");
    }
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    await signupA(
      department,
      firstname,
      lastname,
      gender,
      phonenumber,
      query,
      email,
      password,
      testImage
    );
  };

  return (
    <div>
      <div className="flex  justify-center items-center absolute mt-6 ml-10">
        <h1 className="flex">
          <ImLocation className="text-[40px] text-white" />{" "}
          <strong className="text-white font-bold">{locationName}</strong>
        </h1>
      </div>

      <div className=" mt-12   h-[700px] w-[700px] ml-[300px] absolute bg-opacity-50 backdrop-filter backdrop-blur-sm border-[1px] border-white">
        <div className="absolute ">
          <form onSubmit={handleSumit} className="to-blue-100">
            <div className=" flex flex-col justify-center ml-[290px] mb-6 mt-5">
              <h3 className=" font-bold text-3xl text-white">Sign Up</h3>
            </div>

            <div className=" flex   justify-center items-center space-y-3   ">
              <div className="flex flex-col space-y-5 ml-40 ">
                <div className="flex">
                  <div className="flex">
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="bg-transparent  h-[35px] w-[300px]  border-2 block focus:outline-none   rounded-2xl px-4 text-white"
                    >
                      <option className="px-3">Profession/ሙያ</option>
                      {DepartmentOption.map((option) => (
                        <option className="bg-gray-400 px-3" key={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <FaTools className="text-white mt-2 absolute ml-[270px]" />
                  </div>
                </div>
                <div className="flex">
                  <input
                    placeholder="Firstname"
                    type="text"
                    onChange={(e) => setFirstname(e.target.value)}
                    onFocus={() => setdisplay("hidden")}
                    value={firstname}
                    className="bg-transparent   h-[35px] w-[300px]  border-2 block focus:outline-none focus:border-white  rounded-2xl   px-4 placeholder-white text-white "
                    id="myInput"
                  />
                  <FaUser className="text-white mt-2 absolute ml-[270px]" />
                </div>
                <div className="flex">
                  <input
                    placeholder="Lastname"
                    type="text"
                    onChange={(e) => setLastname(e.target.value)}
                    onFocus={() => setdisplay("hidden")}
                    value={lastname}
                    className="bg-transparent   h-[35px] w-[300px]  border-2 block focus:outline-none focus:border-white  rounded-2xl   px-4 placeholder-white text-white"
                  />
                  <FaUser className="text-white mt-2 absolute ml-[270px]" />
                </div>

                <div className="flex">
                  <input
                    placeholder="PhoneNumber"
                    type="text"
                    onChange={(e) => setPhonenumber(e.target.value)}
                    onFocus={() => setdisplay("hidden")}
                    value={phonenumber}
                    className="bg-transparent   h-[35px] w-[300px]  border-2 block focus:outline-none focus:border-white  rounded-2xl   px-4 placeholder-white text-white"
                  />
                  <AiFillPhone className="text-white mt-2 absolute ml-[270px]" />
                </div>
                <div className="flex">
                  <input
                    type="text"
                    onChange={handleInputChange}
                    onFocus={() => setdisplay("visible")}
                    value={query}
                    placeholder="Location"
                    className="bg-transparent   h-[35px] w-[300px]  border-2 block focus:outline-none focus:border-white  rounded-2xl   px-4 placeholder-white text-white"
                  />
                  <ImLocation className="text-white mt-2 absolute ml-[270px]" />
                </div>
                <ul id="mylist" className={disp}>
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.place_id}
                      onClick={() =>
                        handleChoiceChange(suggestion.display_name)
                      }
                      className="text-white "
                    >
                      <div className="flex">
                        <ImLocation className="text-2xl p-1 text-white" />
                        {suggestion.display_name}
                      </div>
                    </li>
                  ))}
                </ul>
                {error && <p>Error: {error}</p>}

                <div className="flex">
                  <input
                    placeholder="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setdisplay("hidden")}
                    value={email}
                    className="bg-transparent   h-[35px] w-[300px]  border-2 block focus:outline-none focus:border-white  rounded-2xl   px-4 placeholder-white text-white"
                  />
                  <MdEmail className="text-white mt-2 absolute ml-[270px]" />
                </div>
                <div className="flex">
                  <input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setdisplay("hidden")}
                    value={password}
                    className="bg-transparent  h-[35px] w-[300px]  border-2 block focus:outline-none focus:border-white  rounded-2xl   px-4 placeholder-white text-white"
                  />
                  <RiLockPasswordFill className="text-white mt-2 absolute ml-[270px]" />
                </div>
                <div className="flex">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="bg-transparent  h-[35px] w-[300px]  border-2 block focus:outline-none   rounded-2xl px-4 text-white"
                  >
                    <option className="px-3">Gender</option>
                    {GenderOption.map((option) => (
                      <option className="bg-gray-400 px-3" key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <PiGenderFemaleDuotone className="text-white mt-2 absolute ml-[270px]" />
                </div>
                <div className="flex">
                  <label
                    htmlFor="customFile"
                    className="absolute text-[14px] ml-9 mt-3 text-white cursor-pointer"
                  >
                    Upload Photo
                  </label>
                  <input
                    placeholder="Avatar"
                    name="file"
                    type="file"
                    onChange={(e) => settestImage(e.target.files[0])}
                    className="file:bg-gradient-to-b file:from-orange-500 file:to-blue-500 file:px-6 file:py-3 files-5 file:border-none

file:rounded-full

file:text-transparent

file:cursor-pointer

file:shadow-lg file shadow-blue-600/50
      focus:outline-none   px-4 text-white"
                  />
                </div>
              </div>

              {/* <div className="flex flex-col space-y-3 ml-10">
           
              </div> */}
            </div>
            <div className=" flex flex-row justify-center mt-8 ml-40">
              <button className="bg-gradient-to-b hover:text-white h-[48px] w-96 border-2  from-white rounded-3xl font-bold hover:to-purple-800 transition delay-200">
                Sign Up
              </button>
              {error && <div>{error}</div>}
            </div>
          </form>
        </div>
      </div>

      <img className="object-fill w-full h-full" src={hiloe5} alt="" />
    </div>
  );
};
export default SignUpA;
