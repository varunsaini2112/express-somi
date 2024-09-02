const login = require("./login");
const signup = require("./signup");
const logout = require("./logout");
const verifyEmail = require("./verifyEmail");

module.exports = {
	signup: signup,
	login: login,
	logout: logout,
	verifyEmail: verifyEmail
};
