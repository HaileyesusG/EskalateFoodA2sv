import React, { useState } from "react";

const JobCompletionModal = ({ onFinish, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [amount, setAmount] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setAmount("");
  };

  const handleSubmit = () => {
    if (amount.trim() === "") {
      alert("Please enter a valid amount.");
      return;
    }

    // Logic to handle the submitted amount
    console.log("Amount collected:", amount);
    if (onFinish) {
      onFinish(amount);
    }
    // Close the modal after submission
    handleCloseModal();
  };

  return (
    <div className="p-4">
      {/* Button to open modal */}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Job Completion</h2>
            <label htmlFor="amount" className="block mb-2 text-gray-700">
              Enter amount collected:
            </label>
            <input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCompletionModal;
