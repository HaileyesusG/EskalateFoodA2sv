const {
  ApplicantCreate,
  GetApplicant,
  GetAllApplicant,
  GenerateOtp,
  deleteApplicant,
} = require("../Controller/ApplicantController");

const multer = require("multer");
const { storage } = require("../MiddleWare/cloudinary");
const { getOtp, deleteOtp } = require("../utils/otpStore");
// Middleware for parsing form data without immediately uploading files
const parseFormData = multer().fields([{ name: "testImages", maxCount: 4 }]);
const upload = multer({ storage });

const upload2 = upload.fields([{ name: "testImages", maxCount: 4 }]);
const express = require("express");
const router = express.Router();
router.route("/GetApplicant/:id").get(GetApplicant);
router.route("/GetAllApplicant").get(GetAllApplicant);
router.route("/ApplicantCreate").post(
  parseFormData,
  async (req, res, next) => {
    try {
      const { otp, email } = req.body;

      // Validate OTP
      const storedOtpData = getOtp(email);
      if (!storedOtpData) {
        return res
          .status(400)
          .send({ message: "OTP not generated or expired" });
      }

      const isOtpValid = await bcryptjs.compare(otp, storedOtpData.otp);
      const isOtpExpired = Date.now() > storedOtpData.otpExpiry;

      if (isOtpExpired) {
        delete otpStore[email];
        return res.status(400).send({ message: "OTP expired" });
      }

      if (!isOtpValid) {
        return res.status(400).send({ message: "Invalid OTP" });
      }

      // OTP is valid, upload files
      upload2(req, res, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "File upload error", error: err.message });
        }

        // Forward request to the controller
        next();
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  },
  ApplicantCreate
);
router.route("/GenerateOtp").post(GenerateOtp);
router.route("/deleteApplicant/:id").delete(deleteApplicant);
module.exports = router;
