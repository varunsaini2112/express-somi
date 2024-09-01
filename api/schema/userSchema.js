const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		maxlength: 40
	},
	lastName: {
		type: String,
		trim: true,
		minlength: 3,
		maxlength: 40
	},
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		minlength: 3,
		maxlength: 40
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		lowercase: true,
		match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	},
	password: {
		type: String,
		required: true,
	},
	token: {
		type: Map,
		of: mongoose.Schema.Types.Mixed,
		required: false
	},
	isVerifield: {
		type: Boolean,
		default: false,
	},
	verificationToken: {
		type: String,
		required: false,
	}
});

const Users = mongoose.model("User", userSchema);

module.exports = Users;
