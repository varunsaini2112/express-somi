const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	console.log("Route get /");

	res.status(200).send("todo /");
});

module.exports = router;
