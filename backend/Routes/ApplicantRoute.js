const {
  ApplicantCreate,
  GetApplicant,
  GetAllApplicant,
  GenerateOtp,
  deleteApplicant,
} = require("../Controller/ApplicantController");
const bcryptjs = require("bcryptjs");
const multer = require("multer");
const { storage } = require("../MiddleWare/cloudinary");
const { cloudinary } = require("../MiddleWare/cloudinary");
const formidable = require("formidable"); // To parse multipart/form-data
const { getOtp, deleteOtp } = require("../utils/otpStore");
// Middleware for parsing form data without immediately uploading files
const upload = multer({ storage });
const validateOtp = async (req, res, next) => {
  const form = new formidable.IncomingForm();

  // OTP is valid, upload files
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log("the res ", req);
      return res.status(500).json({ message: err.message });
    }
    try {
      const email = Array.isArray(fields.email)
        ? fields.email[0]
        : fields.email;
      const otp = Array.isArray(fields.otp) ? fields.otp[0] : fields.otp;
      // Validate OTP
      const storedOtpData = getOtp(email);
      console.log("the storedOtpData ", storedOtpData);
      console.log("the email ", email);
      console.log("the otp ", otp);
      if (!storedOtpData) {
        return res
          .status(400)
          .send({ message: "OTP not generated or expired" });
      }

      const isOtpValid = bcryptjs.compare(otp, storedOtpData.otp);
      const isOtpExpired = Date.now() > storedOtpData.otpExpiry;

      if (isOtpExpired) {
        deleteOtp(email);
        return res.status(400).send({ message: "OTP expired" });
      }

      if (!isOtpValid) {
        return res.status(400).send({ message: "Invalid OTP" });
      }
      // OTP is valid, remove from store
      deleteOtp(email);
      // Upload files to Cloudinary
      let uploadedImages = [];
      if (files.testImages) {
        const testImages = Array.isArray(files.testImages)
          ? files.testImages
          : [files.testImages];

        for (const image of testImages) {
          const uploadResult = await cloudinary.uploader.upload(
            image.filepath,
            {
              folder: "applicant_images",
            }
          );
          uploadedImages.push(uploadResult.secure_url);
        }
      }

      // Add uploaded images and fields to req for the controller
      req.body = { ...fields, images: uploadedImages };

      // Proceed to the controller
      next();
    } catch (error) {
      console.log("another error is ", error);
      return res.status(500).json({ message: error.message });
    }
  });
};

const express = require("express");
const router = express.Router();
router.route("/GetApplicant/:id").get(GetApplicant);
router.route("/GetAllApplicant").get(GetAllApplicant);
router.route("/ApplicantCreate").post(validateOtp, ApplicantCreate);
router.route("/GenerateOtp").post(GenerateOtp);
router.route("/deleteApplicant/:id").delete(deleteApplicant);
module.exports = router;
