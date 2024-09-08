const TodoList = require("../../schema/todoSchema");
const errorHandler = require("../../utils/errorHandler");

async function getList(req, res) {
	try {
		const { _id } = req.user;
		const todoList = await TodoList.findById(_id);

		if (!todoList) {
			console.log("No List available");
			res.status(200).json({});
			return;
		}

		console.log("TodoList sent successfully");
		res.status(200).json(todoList.todos);
	} catch (error) {
		errorHandler(res)(error);
	}
}

module.exports = getList;
