const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../schema/userSchema");
const errorHandler = require("../utils/errorHandler");
const sendVerificationMail = require("../utils/sendVerificationMail");
const getCryptoToken = require("../utils/getCryptoToken");

async function signup(req, res) {
	try {
		const { firstName, lastName, username, email, password } = req.body;
		if (!(firstName && username && email && password)) {
			console.log("Invalid credentials");
			res.status(400).send("Invalid credentials");
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: "1h"
		});

		const verificationToken = getCryptoToken();
		await Users.create({
			firstName,
			lastName,
			username,
			password: hashedPassword,
			email,
			token: { accessToken },
			verificationToken
		});

		await sendVerificationMail(email.trim().toLowerCase(), verificationToken);

		res.status(200).json({ accessToken });
		console.log("User created successfully and Verification Email Sent");
	} catch (error) {
		errorHandler(res)(error);
	}
}

module.exports = signup;
