import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Food from '../Model/Food.js';
import Restaurant from '../Model/Restaurant.js';
dotenv.config();

const foods = [
  {
    food_name: 'Pizza Margherita',
    food_rating: 4.5,
    food_image: 'https://example.com/pizza.jpg'
  },
  {
    food_name: 'Cheeseburger',
    food_rating: 4.2,
    food_image: 'https://example.com/cheeseburger.jpg'
  }
];

const restaurants = [
  {
    restaurant_name: 'Italiano Ristorante',
    restaurant_logo: 'https://example.com/italiano-logo.jpg',
    restaurant_status: 'Open Now'
  },
  {
    restaurant_name: 'Burger House',
    restaurant_logo: 'https://example.com/burger-house-logo.jpg',
    restaurant_status: 'Closed'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await Food.deleteMany();
    await Restaurant.deleteMany();

    await Food.insertMany(foods);
    await Restaurant.insertMany(restaurants);

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export default seed;
