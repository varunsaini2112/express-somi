const express = require("express");
const router = express.Router();
const { todoController } = require("../controllers");
const { authenticateToken } = require("../middlewares");

router.post("/", authenticateToken, todoController.createItem);

router.get("/", authenticateToken, todoController.getList);

router.put("/:itemId", authenticateToken, todoController.updateItem);

router.delete("/:itemId", authenticateToken, todoController.deleteItem);

module.exports = router;
