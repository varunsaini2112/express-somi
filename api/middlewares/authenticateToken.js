const jwt = require("jsonwebtoken");
const Users = require("../schema/userSchema");
const errorHandler = require("../utils/errorHandler");

async function authenticateToken(req, res, next) {
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

		if (!userDetails || accessToken !== userDetails.accessToken) {
			console.log("User not found");
			res.status(401).send("Unauthorised access");
			return;
		}

        req.user = userDetails;
		req.accessToken = accessToken;
        next();
	} catch (error) {
		errorHandler(res)(error);
	}
}

module.exports = authenticateToken;
