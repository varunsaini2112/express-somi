const TodoList = require("../../schema/todoSchema");
const errorHandler = require("../../utils/errorHandler");

async function updateItem(req, res) {
	try {
		const { _id } = req.user;
		const { itemId } = req.params ?? {};
		const { status, title, description } = req.body;
		const todoList = await TodoList.findOne({ _id, "todos._id": itemId });

		if (!todoList) {
			console.log("Todo list item unavailable");
			res.status(400).send("Todo list item unavailable");
			return;
		}

		const keysToUpdate = {
			"todos.$.status": status,
			"todos.$.title": title,
			"todos.$.description": description
		};
		await TodoList.findOneAndUpdate(
			{ _id, "todos._id": itemId },
			{ $set: keysToUpdate }
		);

		console.log("List Item updated");
		res.status(200).send("List Item updated");
	} catch (error) {
		errorHandler(res)(error);
	}
}

module.exports = updateItem;
