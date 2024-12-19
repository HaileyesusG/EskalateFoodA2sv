import React, { useState } from "react";
import axios from "axios";

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    try {
      setLoading(true);
      const newStatus = !isOn;
      console.log("the status ",newStatus)
      await axios.post("http://localhost:5000/toggle-status", { isOn: newStatus });
      setIsOn(newStatus); // Update the local state only if the request is successful
    } catch (error) {
      console.log("Failed to update status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center mt-12">
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`px-6 py-2 text-lg font-semibold text-white rounded-md transition-colors ${
          isOn ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Updating..." : isOn ? "ON" : "OFF"}
      </button>
      <p className="mt-4">
        The switch is currently:{" "}
        <strong className={isOn ? "text-green-600" : "text-red-600"}>
          {isOn ? "ON" : "OFF"}
        </strong>
      </p>
    </div>
  );
};

export default ToggleButton;