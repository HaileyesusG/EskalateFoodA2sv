import React, { useState, useEffect } from "react";

function New() {
  const [isTaskAccepted, setIsTaskAccepted] = useState(false);

  // Function to handle task acceptance
  const handleTaskAccept = () => {
    setIsTaskAccepted(true); // Update state to show modal to other technicians
  };

  return (
    <div className="App p-4">
      {/* Accept button for technician */}
      <button
        onClick={handleTaskAccept}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
      >
        Accept Task
      </button>

      {/* Modal that shows if task is accepted */}
      {isTaskAccepted && <TaskAcceptedModal />}
    </div>
  );
}

// Modal component
function TaskAcceptedModal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-full sm:max-w-md mx-4 sm:mx-auto">
        <h2 className="text-lg sm:text-2xl font-bold mb-4 text-center">
          Task Already Accepted
        </h2>
        <p className="text-gray-700 mb-4 text-center text-sm sm:text-base">
          Another technician has already accepted this task.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={() => window.location.reload()}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default New;
