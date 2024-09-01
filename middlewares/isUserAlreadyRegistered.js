const Users = require("../schema/userSchema");
const errorHandler = require("../utils/errorHandler");

function isUserAlreadyRegistered(req, res, next) {
	const { email, username } = req.body;
	Users.findOne({
		$or: [
			{ email: email.trim().toLowerCase() },
			{ username: username.trim().toLowerCase() }
		]
	})
		.then((result) => {
			if (result) {
				res.status(403).send({
					status: 403,
					result: null,
					message: "Email already exists"
				});

				return;
			}

			next();
		})
		.catch(errorHandler(res));
}

module.exports = isUserAlreadyRegistered;
