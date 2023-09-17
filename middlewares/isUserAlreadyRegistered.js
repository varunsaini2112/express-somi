const Users = require("../schema/userSchema");
const errorHandler = require("../utils/errorHandler");

function isUserAlreadyRegistered(req, res, next) {
	const { email } = req.body;
	Users.findOne({
		email: email.trim().toLowerCase()
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
