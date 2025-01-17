import React, { useState } from "react";
import { updateTech, setTech, logOut } from "../features/tech/techSlice";
import { useDispatch } from "react-redux";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ToggleButton = ({ nanoId, userId, state }) => {
  const [isOn, setIsOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch2 = useDispatch();
  const handleToggle = async () => {
    let newStatus;
    try {
      setLoading(true);
      if (state == "not" || state == "loading") {
        newStatus = "offline";
      } else {
        newStatus = "not";
      }

      console.log("the status ", newStatus);
      const response2 = await fetch(
        `${API_BASE_URL}/api/Tech/changeStatus/${userId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isOnline: newStatus }),
        }
      );
      if (response2.ok) {
        const json = await response2.json();
        const {
          department,
          firstname,
          lastname,
          gender,
          phonenumber,
          deposit,
          email,
          image,
          location,
          status,
          status2,
          _id,
        } = json;
        dispatch2(
          updateTech({
            id: nanoId,
            department: department,
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            phonenumber: phonenumber,
            deposit: deposit,
            email: email,
            image: image,
            status: status,
            status2: status2,
            location: location,
            _id: _id,
          })
        );
      }
    } catch (error) {
      console.log("Failed to update status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="text-center mt-1">
    //   <button
    //     onClick={handleToggle}
    //     disabled={loading}
    //     className={`px-1 py-1 text-[15px] font-semibold text-white rounded-md transition-colors ${
    //       state == "not" || state == "loading"
    //         ? "bg-red-500 hover:bg-red-600"
    //         : "bg-green-500 hover:bg-green-600"
    //     } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    //   >
    //     {loading
    //       ? "Updating..."
    //       : state == "not" || state == "loading"
    //       ? "Change to OFFLINE"
    //       : "Change to ONLINE"}
    //   </button>
    // </div>
    <div className="flex items-center gap-3 mt-2 ml-2">
      <div
        className={`w-16 h-8 rounded-full p-1 cursor-pointer flex items-center transition-colors duration-300 ${
          state == "not" || state == "loading" ? "bg-sky-950" : "bg-gray-300"
        }`}
        onClick={handleToggle}
      >
        <div
          className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
            state == "not" || state == "loading"
              ? "transform translate-x-8"
              : ""
          }`}
        />
      </div>
      {/* <span className="text-xl">Instant booking</span> */}
    </div>
  );
};

export default ToggleButton;
