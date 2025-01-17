import React from "react";
import { ClipLoader } from "react-spinners";
const AssignModal = ({
  isOpen,
  onClose,
  onAssign,
  Customer_firstname,
  setCustomer_firstname,
  department2,
  setDepartment2,
  Customer_phonenumber,
  setCustomer_phonenumber,
  Customer_location,
  setCustomer_location,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Assign Technician
        </h2>
        <input
          placeholder="Enter Customer_firstname"
          className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-200"
          value={Customer_firstname}
          onChange={(e) => setCustomer_firstname(e.target.value)}
          disabled={isLoading} // Disable input while loading
        />
        <input
          placeholder="Enter department"
          className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-200"
          value={department2}
          onChange={(e) => setDepartment2(e.target.value)}
          disabled={isLoading} // Disable input while loading
        />
        <input
          placeholder="Enter Customer_phonenumber"
          className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-200"
          value={Customer_phonenumber}
          onChange={(e) => setCustomer_phonenumber(e.target.value)}
          disabled={isLoading} // Disable input while loading
        />
        <input
          placeholder="Enter Customer_location"
          className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-200"
          value={Customer_location}
          onChange={(e) => setCustomer_location(e.target.value)}
          disabled={isLoading} // Disable input while loading
        />
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition-colors duration-300"
            onClick={onClose}
            disabled={isLoading} // Disable cancel button while loading
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-md transition-colors duration-300 ${
              isLoading
                ? "bg-blue-300 text-white cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            onClick={onAssign}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <ClipLoader color="#36d7b7" size={30} />
              </div>
            ) : (
              "Assign"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignModal;
