function errorHandler(res) {
	return function (error) {
		console.log("FAILURE>>>", error);

		res.status(500).send(error.message);
	};
}

module.exports = errorHandler;
