const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema(
  {
    food_name: { type: String, required: true },
    food_rating: { type: Number, min: 0, max: 5, default: 0 },
    food_image: { type: String },
    price: { type: Number, default: 0 },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Food', FoodSchema);
