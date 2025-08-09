import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FoodForm from './Components/FoodForm';
import FoodList from "./Components/FoodList";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function Home() {
  const [foods, setFoods] = useState([]);

  const fetchFoods = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/foods`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Failed to fetch foods");

    const data = await response.json();
    setFoods(data);
  } catch (error) {
    console.error(error);
  }
};


  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Food Management</h1>
      <FoodForm onAdd={fetchFoods} />
      <FoodList foods={foods} onDelete={fetchFoods} onUpdate={fetchFoods}/>
    </div>
  );
}

function About() {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">About</h1>
      <p className="text-center text-gray-700">
        This is a simple food management app built with MERN stack and React Router.
      </p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="bg-blue-600 p-4 text-white">
        <ul className="flex justify-center space-x-8">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
