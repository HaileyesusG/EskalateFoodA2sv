import React, { useState } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function FoodForm({ onAdd }) {
  const [food_name, setFoodName] = useState('');
  const [food_rating, setFoodRating] = useState('');
  const [food_image, setFoodImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!food_name || !food_rating) {
      alert('Please fill in required fields');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/foods`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ food_name, food_rating: Number(food_rating), food_image }),
      });
      if (!res.ok) throw new Error('Failed to add food');

      setFoodName('');
      setFoodRating('');
      setFoodImage('');
      onAdd();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <input
        name="food_name"
        type="text"
        placeholder="Food Name"
        value={food_name}
        onChange={(e) => setFoodName(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="food_rating"
        type="number"
        step="0.1"
        min="0"
        max="5"
        placeholder="Food Rating"
        value={food_rating}
        onChange={(e) => setFoodRating(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="food_image"
        type="text"
        placeholder="Food Image URL"
        value={food_image}
        onChange={(e) => setFoodImage(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Food
      </button>
    </form>
  );
}

export default FoodForm;
