const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../schema/userSchema");
const errorHandler = require("../utils/errorHandler");

async function login(req, res) {
	try {
		const { email = "", password = "" } = req.body;

		const userDetails = await Users.findOne({
			email: email.trim().toLowerCase()
		});

		if (!userDetails) {
			res.status(403).send({
				status: 403,
				result: null,
				message: "Invalid user credentials"
			});
			return;
		}

		const isPasswordValid = await bcrypt.compare(
			password,
			userDetails.password
		);

		if (!isPasswordValid) {
			res.status(403).send({
				status: 403,
				result: null,
				message: "Invalid user credentials"
			});
			return;
		}

		const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);

		res.status(200).send({
			status: 200,
			result: { accessToken: token },
			message: "Login Successful"
		});
	} catch (error) {
		errorHandler(res)(error);
	}
}

module.exports = login;
