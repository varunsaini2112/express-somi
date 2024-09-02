const Users = require("../../schema/userSchema");
const jwt = require("jsonwebtoken");
const errorHandler = require("../../utils/errorHandler");

async function verifyEmail(req, res) {
	try {
		const { token } = req.query;

		if (!token) {
			console.log("Token not received");
			res.status(401).send("Unauthorised access");
			return;
		}

		jwt.verify(token, process.env.RANDOM_ENCRYPT_SECRET);
		const userDetails = await Users.findOne({ verificationToken: token });
		if (!userDetails) {
			console.log("User not found");
			res.status(401).send("Unauthorised access");
			return;
		}

		userDetails.verificationToken = null;
		userDetails.isVerifield = true;
		await userDetails.save();

		res.status(200).send("Email verified");
	} catch (error) {
		errorHandler(res)(error);
	}
}

module.exports = verifyEmail;
