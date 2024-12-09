import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const SuccessMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
      <FaCheckCircle className="text-green-500 w-12 h-12 mb-3 md:w-16 md:h-16 md:mb-4" />
      <h1 className="text-lg font-bold mb-2 md:text-2xl">
        Your Application has been submitted successfully
      </h1>
      <p className="text-gray-600 text-sm md:text-base">Thank you!</p>
    </div>
  );
};

export default SuccessMessage;
