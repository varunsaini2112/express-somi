const jwt = require("jsonwebtoken");
const Users = require("../schema/userSchema");
const errorHandler = require("../utils/errorHandler");

async function logout(req, res) {
	try {
		const authHeader = req.headers["authorization"] ?? "";
		const accessToken = authHeader.split(" ")[1];

		if (!accessToken) {
			console.log("No token received");
			res.status(401).send("Unauthorised access");
			return;
		}

		const { email } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
		const userDetails = await Users.findOne({ email });

		if (!userDetails) {
			console.log("User not found");
			res.status(401).send("Unauthorised access");
			return;
		}

		if (userDetails.token.get("accessToken") !== accessToken) {
			console.log("Unknown token received");
			res.status(401).send("Unauthorised access");
			return;
		}

		userDetails.token = {};
		await userDetails.save();
		console.log("User logged out");

		res.status(200).send("Successful logout");
	} catch (error) {
		errorHandler(res)(error);
	}
}

module.exports = logout;
