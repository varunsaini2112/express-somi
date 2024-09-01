const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID, // Client ID
	process.env.GOOGLE_CLIENT_SECRET, // Client Secret
	"https://express-somi.vercel.app" // Redirect URL
);

oAuth2Client.setCredentials({
	refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

function generateVerificationEmailHtml(verificationLink) {
	return `<div class="container" style="max-width:600px;margin:auto;text-align:center;padding:20px;font-family:Arial,sans-serif;"><h1>Email Verification</h1><p>Please verify your email address by clicking the button below:</p><a href="${verificationLink}" style="display:inline-block;padding:10px 20px;font-size:16px;color:#fff;background-color:#007bff;text-decoration:none;border-radius:5px;">Verify Email</a><p>If you didn't create an account, you can ignore this email.</p></div>`;
}

async function sendVerificationMail(recipientEmail, token) {
	const accessToken = await oAuth2Client.getAccessToken();

	const transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			type: "OAuth2",
			user: process.env.GOOGLE_EMAIL,
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
			accessToken: accessToken.token
		}
	});

	const verificationLink = `http://localhost:8000/auth/verify-email?token=${encodeURIComponent(
		token
	)}`;

	const mailOptions = {
		from: process.env.GOOGLE_EMAIL,
		to: recipientEmail,
		subject: "Verify Your Express Vercel Email",
		html: generateVerificationEmailHtml(verificationLink)
	};

	const result = await transporter.sendMail(mailOptions);

	return result;
}

module.exports = sendVerificationMail;
