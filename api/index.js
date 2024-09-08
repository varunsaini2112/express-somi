const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

mongoose
	.connect(process.env.MONGO_DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("mongoose connection successful"))
	.catch((error) => console.log("mongoose connection failed", error));

app.listen(PORT, () => {
	console.log("Server Listening on PORT:", PORT);
});
