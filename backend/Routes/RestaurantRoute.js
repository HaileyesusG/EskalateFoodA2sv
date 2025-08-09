const express = require("express");
const validate = require("../MiddleWare/validateRequest").default;
const {
  listRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../Controller/RestaurantController");
const {
  createRestaurantSchema,
  updateRestaurantSchema,
} = require("../Validation/restaurant.schema");

const router = express.Router();

router.route("/")
  .get(listRestaurants)
  .post(validate(createRestaurantSchema), createRestaurant);

router.route("/:id")
  .put(validate(updateRestaurantSchema), updateRestaurant)
  .delete(deleteRestaurant);

module.exports = router;
