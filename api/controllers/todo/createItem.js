const TodoList = require("../../schema/todoSchema");
const { TODO_ITEM_STATUS } = require("../../constants/todoConstants");
const errorHandler = require("../../utils/errorHandler");

async function createItem(req, res) {
	try {
		const { status = "", title = "", description = "" } = req.body;
		const { _id } = req.user;

		if (!title.trim()) {
			console.log("Item title missing");
			res.status(400).send("Item title missing");
			return;
		} else if (status.trim() && !TODO_ITEM_STATUS.includes(status.trim())) {
			console.log("Invalid Item status received");
			res.status(400).send("Invalid Item status received");
			return;
		}

		const todoItem = {
			...(status?.trim() ? { status } : {}),
			title,
			...(description?.trim() ? { description } : {})
		};

		const todoList = await TodoList.findById(_id);

		if (!todoList) {
			await TodoList.create({ _id, todos: [todoItem] });
		} else {
			await TodoList.findByIdAndUpdate(_id, { $push: { todos: todoItem } });
		}

		console.log("Todo Item created successfully");
		res.status(200).send("Todo Item created successfully");
	} catch (error) {
		errorHandler(res)(error);
	}
}

module.exports = createItem;
