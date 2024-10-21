const {
  BookCreate,
  GetBook,
  GetOneBook,
  DeleteBook,
  UpdateBook,
  UpdateTechBook,
  updateBooking,
  beforeBooking,
} = require("../Controller/BookController");
const AuthenticationCustomer = require("../MiddleWare/AuthenticationCustomer");
const express = require("express");
const router = express.Router();
router.route("/GetBook").get(AuthenticationCustomer, GetBook);
router.route("/BookCreate").post(AuthenticationCustomer, BookCreate);
router.route("/:id").patch(AuthenticationCustomer, UpdateBook);
router.route("/UpdateTechBook/:id").patch(UpdateTechBook);
router.route("/updateBooking").post(updateBooking);
router.route("/beforeBooking").post(beforeBooking);
router
  .route("/:id")
  .get(GetOneBook)
  .delete(AuthenticationCustomer, DeleteBook)
  .patch(AuthenticationCustomer, UpdateBook);

module.exports = router;
