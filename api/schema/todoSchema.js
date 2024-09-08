const mongoose = require("mongoose");

const todoItemSchema = new mongoose.Schema({
	status: {
		type: String,
		required: true,
		trim: true,
		enum: ["notStarted", "inProgress", "completed", "onHold", "cancelled"],
		default: "notStarted"
	},
	title: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		trim: true
	}
});

const todoListSchema = new mongoose.Schema({
	todos: [todoItemSchema]
});

const TodoList = mongoose.model("TodoList", todoListSchema);

module.exports = TodoList;
