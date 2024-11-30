import React, { useState } from "react";
import axios from "axios";

const New = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");

  const API_KEY = "AIzaSyC3TxwdUzV5gbwZN-61Hb1RyDJr0PRSfW4"; // Replace with your Google API Key

  const calculateDistance = async () => {
    try {
      setError("");
      const response = await axios.get("http://localhost:5001/api/distance", {
        params: { origin, destination },
      });

      const data = response.data;

      if (data.rows[0].elements[0].status === "OK") {
        setDistance(data.rows[0].elements[0].distance.text);
        setDuration(data.rows[0].elements[0].duration.text);
      } else {
        setError(
          "Could not calculate the distance. Please check the locations."
        );
      }
    } catch (err) {
      setError("An error occurred. Please try again." + err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Distance Calculator</h2>
      <div>
        <label>
          Origin:
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Enter origin"
          />
        </label>
      </div>
      <div>
        <label>
          Destination:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
          />
        </label>
      </div>
      <button onClick={calculateDistance} style={{ marginTop: "10px" }}>
        Calculate Distance
      </button>
      {distance && (
        <div>
          <h4>Results:</h4>
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default New;
