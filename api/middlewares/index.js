const isUserAlreadyRegistered = require("./isUserAlreadyRegistered");
const authenticateToken = require("./authenticateToken");

const middlewares = {
	isUserAlreadyRegistered: isUserAlreadyRegistered,
	authenticateToken: authenticateToken
};

module.exports = middlewares;
