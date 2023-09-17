const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const todoRoutes = require("./routes/todo");
const authRoutes = require("./routes/auth");

app.use("/todo", todoRoutes);
app.use("/auth", authRoutes);

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("mongoose connection successful"))
	.catch(() => console.log("mongoose connection failed"));

app.listen(PORT, () => {
	console.log("Server Listening on PORT:", PORT);
});
