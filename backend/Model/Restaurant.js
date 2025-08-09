const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema(
  {
    restaurant_name: { type: String, required: true },
    restaurant_logo: { type: String },
    restaurant_status: { type: String, enum: ['Open Now', 'Closed'], default: 'Closed' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Restaurant', RestaurantSchema);
