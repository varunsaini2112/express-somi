const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../schema/userSchema");
const errorHandler = require("../utils/errorHandler");

async function signup(req, res) {
	try {
		const { fullName = "", email = "", password = "" } = req.body;

		const hashedPassword = await bcrypt.hash(password, 10);

		await Users.create({
			fullname: fullName.trim(),
			email: email.trim().toLowerCase(),
			password: hashedPassword
		});

		const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);

		res.status(200).send({
			status: 200,
			result: { accessToken: token },
			message: "Signup Successful"
		});
	} catch (error) {
		errorHandler(res)(error);
	}
}

module.exports = signup;
