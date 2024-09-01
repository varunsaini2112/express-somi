const isUserAlreadyRegistered = require("./isUserAlreadyRegistered");

const middlewares = {
	isUserAlreadyRegistered: isUserAlreadyRegistered
};

module.exports = middlewares;
