const TodoList = require("../../schema/todoSchema");
const errorHandler = require("../../utils/errorHandler");

async function deleteItem(req, res) {
	try {
		const { _id } = req.user;
		const { itemId } = req.params ?? {};
		const todoList = await TodoList.findOne({ _id, "todos._id": itemId });

		if (!todoList) {
			console.log("list item does not exist");
			res.status(400).send("list item does not exist");
			return;
		}

		await TodoList.findOneAndUpdate(
			{ _id, "todos._id": itemId },
			{ $pull: { todos: { _id: itemId } } },
			{ runValidators: true }
		);

		console.log("List Item deleted");
		res.status(200).send("List Item deleted");
	} catch (error) {
		errorHandler(res)(error);
	}
}

module.exports = deleteItem;
