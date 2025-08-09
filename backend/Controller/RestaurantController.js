const Restaurant = require("../Model/Restaurant");

const listRestaurants = async (req, res) => {
  try {
    const { name } = req.query;
    const q = {};
    if (name) q.restaurant_name = { $regex: name, $options: "i" };
    const items = await Restaurant.find(q).sort({ createdAt: -1 });
    res.status(200).json({ data: items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createRestaurant = async (req, res) => {
  try {
    const created = await Restaurant.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Restaurant.findByIdAndUpdate(id, req.body, { new: true });
    if (!item) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Restaurant.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  listRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
