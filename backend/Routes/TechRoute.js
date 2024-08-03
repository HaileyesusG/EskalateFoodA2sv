const {
  TechCreate,
  GetTech,
  GetOneTech1,
  DeleteTech,
  UpdateTech,
  LoginTech,
  UpdateOneTech,
  GetOneTechById,
  updateFinish,
} = require("../Controller/TechController");

const multer = require("multer");
const AuthenticationTech = require("../MiddleWare/AuthenticationTech");
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../SENIOR_PROJECT2/frontend/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).single("testImage");

const express = require("express");
const router = express.Router();
router.route("/GetTech").get(GetTech);
router.route("/GetOneTech1").get(AuthenticationTech, GetOneTech1);
router.route("/TechCreate").post(TechCreate);
router.route("/LoginTech").post(LoginTech);
router.route("/UpdateTech/:id").patch(upload, UpdateTech);
router.route("/updateFinish/:id").patch(updateFinish);
router.route("/:id").patch(UpdateOneTech);
router.route("/GetOneTechById/:id").get(GetOneTechById);
router.route("/:id").delete(DeleteTech);

module.exports = router;
