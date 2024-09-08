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
		trim: true,
		minlength: 2,
		maxlength: 100
	},
	description: {
		type: String,
		trim: true,
		maxlength: 400
	}
});

const todoListSchema = new mongoose.Schema({
	todos: [todoItemSchema]
});

const TodoList = mongoose.model("TodoList", todoListSchema);

module.exports = TodoList;
