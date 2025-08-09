// client/src/components/AddFoodModal.jsx
import React, { useState } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AddFoodModal({ isOpen, onClose, onFoodAdded }) {
  const [foodName, setFoodName] = useState('');
  const [foodRating, setFoodRating] = useState('');
  const [foodImage, setFoodImage] = useState('');
  const [restaurantId, setRestaurantId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/foods`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          food_name: foodName,
          food_rating: Number(foodRating),
          food_image: foodImage,
          restaurant: restaurantId,
        }),
      });
      if (!res.ok) throw new Error('Failed to add food');
      setFoodName('');
      setFoodRating('');
      setFoodImage('');
      setRestaurantId('');
      onFoodAdded();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Food</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Food Name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Rating"
            value={foodRating}
            onChange={(e) => setFoodRating(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={foodImage}
            onChange={(e) => setFoodImage(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Restaurant ID"
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFoodModal;
