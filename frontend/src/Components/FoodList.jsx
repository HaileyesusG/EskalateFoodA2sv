import React, { useState, useEffect } from 'react';
import FoodList from '../Components/FoodList';
import AddFoodModal from '../Components/AddFoodModal';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function FoodPage() {
  const [foods, setFoods] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchFoods = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/foods`);
      const data = await res.json();
      setFoods(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Food List</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Food
        </button>
      </div>

      <FoodList
        foods={foods}
        onDelete={fetchFoods}
        onUpdate={fetchFoods}
      />

      <AddFoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFoodAdded={fetchFoods}
      />
    </div>
  );
}

export default FoodPage;
