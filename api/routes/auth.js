const express = require("express");
const router = express.Router();

const {
	isUserAlreadyRegistered,
	authenticateToken
} = require("../middlewares");
const controllers = require("../controllers");

router.post("/signup", isUserAlreadyRegistered, controllers.signup);

router.post("/login", controllers.login);

router.get("/logout", authenticateToken, controllers.logout);

module.exports = router;
