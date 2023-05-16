const express = require("express");
const router = express.Router();
const { signup, login, logout, verifyToken, verifyOtpByEmail, verifyOtpByMobile, resetPassword, forgotPassword } = require("../controller/auth_controller.js");

router.route("/signup").post(signup);
router.route("/email-otp-verification").post(verifyOtpByEmail);
router.route("/mobile-otp-verification").post(verifyOtpByMobile)
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password').post(resetPassword);

router.route("/login").post(login);
router.route("/logout").post(verifyToken, logout);
module.exports = router;
