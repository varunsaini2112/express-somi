const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../schema/userSchema");
const errorHandler = require("../utils/errorHandler");

async function login(req, res) {
	try {
		const { identifier = "", password = "" } = req.body; // identifier can be email or username

		const userDetails = await Users.findOne({
			$or: [
				{ email: identifier.trim().toLowerCase() },
				{ username: identifier.trim().toLowerCase() }
			]
		});

		if (!userDetails) {
			res.status(401).send("Invalid user credentials");
			return;
		}

		const isPasswordValid = await bcrypt.compare(
			password,
			userDetails.password
		);

		if (!isPasswordValid) {
			res.status(401).send("Invalid user credentials");
			return;
		}

		const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: "1h"
		});
		userDetails.token = { accessToken };
		await userDetails.save();

		res.status(200).json({ accessToken });
	} catch (error) {
		errorHandler(res)(error);
	}
}

module.exports = login;
