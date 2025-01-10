import React from "react";
import { ClipLoader } from "react-spinners";
const RechargeModal = ({
  isOpen,
  onClose,
  onRecharge,
  amount,
  setAmount,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Recharge Customer
        </h2>
        <input
          type="number"
          placeholder="Enter Amount"
          className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-200"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
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
            onClick={onRecharge}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <ClipLoader color="#36d7b7" size={30} />
              </div>
            ) : (
              "Recharge"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RechargeModal;
