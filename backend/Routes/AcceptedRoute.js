const {
  GetOneCustomer,
  GetOneTech,
  DeleteCustomer,
  GetLatestAccept,
  toBeFinished,
  DeleteLatestAccept,
  jobFetch,
  jobUpdate,
} = require("../Controller/AcceptController");
const AuthenticationCustomer = require("../MiddleWare/AuthenticationCustomer");
const AuthenticationTech = require("../MiddleWare/AuthenticationTech");
const express = require("express");
const router = express.Router();
router.route("/GetOneCustomer/:id").get(GetOneCustomer);
router.route("/jobUpdate/:id").put(jobUpdate);
router.route("/jobFetch/:isChecked").put(jobFetch);
router.route("/GetOneTech").get(AuthenticationTech, GetOneTech);
router.route("/GetLatestAccept/:id").get(GetLatestAccept);
router.route("/toBeFinished/:id").post(toBeFinished);
router.route("/DeleteLatestAccept/:id").delete(DeleteLatestAccept);
module.exports = router;
