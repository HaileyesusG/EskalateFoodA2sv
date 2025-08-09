const Food = require("../Model/Food");

const listFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFood = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.status(200).json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createFood = async (req, res) => {
  try {
    const newFood = new Food(req.body);
    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateFood = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFood = await Food.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedFood) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.status(200).json(updatedFood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteFood = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFood = await Food.findByIdAndDelete(id);
    if (!deletedFood) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.status(200).json({ message: "Food deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  listFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood,
};
