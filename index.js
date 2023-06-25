const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
	console.log("Got here /");

	res.status(200).send("Hi");
});

const todoRoutes = require("./routes/todo");

app.use("/todo", todoRoutes);

app.listen(3000);
