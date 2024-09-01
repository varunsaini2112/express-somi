const errorHandler = require("../utils/errorHandler");

async function logout(req, res) {
	try {
		const userDetails = req.user;
		const accessToken = req.accessToken;

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
