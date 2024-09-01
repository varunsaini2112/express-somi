const crypto = require("crypto");

function getCryptoToken() {
	return crypto.randomBytes(16).toString("hex");
}

module.exports = getCryptoToken;
