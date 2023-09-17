function errorHandler(res) {
	return function (error) {
		console.log("FAILURE>>>", error);

		res.status(500).send({
			status: 500,
			result: null,
			message: "Internal server error"
		});
	};
}

module.exports = errorHandler;
