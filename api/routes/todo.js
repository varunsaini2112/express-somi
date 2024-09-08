const express = require("express");
const router = express.Router();
const { todoController } = require("../controllers");
const { authenticateToken } = require("../middlewares");

router.post("/", authenticateToken, todoController.createItem);

module.exports = router;
