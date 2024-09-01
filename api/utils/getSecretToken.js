const jwt = require("jsonwebtoken");

function getSecretToken(expiryTime) {
	return jwt.sign({}, process.env.RANDOM_ENCRYPT_SECRET, {
		expiresIn: expiryTime
	});
}

module.exports = getSecretToken;
