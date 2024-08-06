const {
  ApplicantCreate,
  GetApplicant,
  GetAllApplicant,
  GenerateOtp,
  deleteApplicant,
} = require("../Controller/ApplicantController");

const multer = require("multer");
const { storage } = require("../MiddleWare/cloudinary");
const upload = multer({ storage });

upload.fields([{ name: "testImages", maxCount: 4 }]);
const express = require("express");
const router = express.Router();
router.route("/GetApplicant/:id").get(GetApplicant);
router.route("/GetAllApplicant").get(GetAllApplicant);
router.route("/ApplicantCreate").post(upload, ApplicantCreate);
router.route("/GenerateOtp").post(GenerateOtp);
router.route("/deleteApplicant/:id").delete(deleteApplicant);
module.exports = router;
