const TodoList = require("../../schema/todoSchema");

async function getList(req, res) {
	const { _id } = req.user;
	const todoList = await TodoList.findById(_id);

	if (!todoList) {
		console.log("No List available");
		res.status(200).json({});
		return;
	}

	console.log("TodoList sent successfully");
	res.status(200).json(todoList.todos);
}

module.exports = getList;
