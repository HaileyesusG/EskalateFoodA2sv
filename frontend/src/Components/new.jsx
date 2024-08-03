import React, { useState, useEffect } from "react";
import { RiseLoader } from "react-spinners";
const YourComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a delay to showcase the loading state.
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false to stop showing the loading spinner
    }, 10000); // Simulating a delay of 3 seconds
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLoading ? (
        <RiseLoader color="#A0E713" loading={isLoading} size={60} />
      ) : (
        <div>{/* Your content when loading is false */}</div>
      )}
    </div>
  );
};
export default YourComponent;
