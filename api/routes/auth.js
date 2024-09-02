const express = require("express");
const router = express.Router();

const {
	isUserAlreadyRegistered,
	authenticateToken
} = require("../middlewares");
const { authController } = require("../controllers");

router.post("/signup", isUserAlreadyRegistered, authController.signup);

router.post("/login", authController.login);

router.get("/logout", authenticateToken, authController.logout);

router.get("/verify-email", authController.verifyEmail);

module.exports = router;
