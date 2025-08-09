// client/src/components/FoodList.jsx
import React, { useState } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function FoodList({ foods, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editRating, setEditRating] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const deleteFood = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/foods/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete food');
      onDelete();
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (food) => {
    setEditingId(food._id);
    setEditName(food.food_name);
    setEditRating(food.food_rating);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditRating('');
  };

  const saveEdit = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/foods/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ food_name: editName, food_rating: editRating }),
      });
      if (!res.ok) throw new Error('Failed to update food');
      setEditingId(null);
      onUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  // Filter foods by search term
  const filteredFoods = foods.filter((food) =>
    food.food_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* Empty State */}
      {filteredFoods.length === 0 ? (
        <div className="text-center italic text-gray-500 py-6 bg-gray-50 rounded-md shadow-sm">
          No matching items found
        </div>
      ) : (
        <ul className="space-y-4">
          {filteredFoods.map((food) => {
            const isClosed = food.restaurant?.isClosed ?? false;
            const restaurantStatus = isClosed ? 'Closed' : 'Open';

            return (
              <li
                key={food._id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={food.food_image || 'https://via.placeholder.com/80'}
                    alt={food.food_name}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                  />

                  {/* Edit Mode */}
                  {editingId === food._id ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border p-1 rounded shadow-sm"
                      />
                      <input
                        type="number"
                        value={editRating}
                        onChange={(e) => setEditRating(e.target.value)}
                        className="border p-1 rounded w-20 shadow-sm"
                      />
                      <button
                        onClick={() => saveEdit(food._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <strong className="text-lg">{food.food_name}</strong>
                      <div className="text-gray-600">Rating: {food.food_rating}</div>
                      <div className={isClosed ? 'text-red-500 font-medium' : 'text-green-500 font-medium'}>
                        {restaurantStatus}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {editingId !== food._id && (
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => startEdit(food)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteFood(food._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default FoodList;
