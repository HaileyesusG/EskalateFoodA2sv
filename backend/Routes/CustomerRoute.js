const {
  CustomerCreate,
  GetCustomer,
  GetOneCustomer,
  DeleteCustomer,
  UpdateCustomer,
  //LoginCustomer,
  UpdateOneCustomer,
  GenerateOtp,
} = require("../Controller/CustomerController");
const AuthenticationCustomer = require("../MiddleWare/AuthenticationCustomer");
const AuthenticationAdmin = require("../MiddleWare/AuthenticationAdmin");
const express = require("express");
const router = express.Router();

router.route("/GetCustomer").get(AuthenticationAdmin, GetCustomer);
router.route("/CustomerCreate").post(CustomerCreate);
// router.route("/LoginCustomer").post(LoginCustomer);
router.route("/GetOneCustomer").get(AuthenticationCustomer, GetOneCustomer);
// router.route("/:id").patch(UpdateCustomer);
//router.route("/:id").patch(UpdateOneCustomer);
router.route("/:id").delete(DeleteCustomer).patch(UpdateOneCustomer);
//router.patch("/:id", UpdateOneCustomer);
router.route("/:id").patch(UpdateOneCustomer);
router.route("/GenerateOtp").post(GenerateOtp);

module.exports = router;
