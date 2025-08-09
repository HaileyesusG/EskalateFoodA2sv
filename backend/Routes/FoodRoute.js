const express = require("express");
const validate = require("../MiddleWare/validateRequest").default;
const {
  listFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood,
} = require("../Controller/FoodController");
const { createFoodSchema, updateFoodSchema } = require("../Validation/food.schema");

const router = express.Router();

router.route("/")
  .get(listFoods)
  .post(validate(createFoodSchema), createFood);

router.route("/:id")
  .get(getFood)
  .put(validate(updateFoodSchema), updateFood)
  .delete(deleteFood);

module.exports = router;
