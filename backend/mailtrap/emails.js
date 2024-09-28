import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import nodemailer from 'nodemailer'; // Use import instead of require

export const sendVerificationEmail = async (email, verificationToken) => {
	const recipient = email.toString();
	var transporter = nodemailer.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'jaswanthreddy.2019@gmail.com',
            pass: 'mmmvvzhzhydhwiow'
        }
    }
	);

	var options = {
		from: 'jaswanthreddy.2019@gmail.com',
		to: recipient,
		subject: "Testing node emails",
		text: verificationToken,
	};
	transporter.sendMail(
		options, function (error, info) {
			if (error) {
				console.log(error)
			}
			else {
				console.log("sent ")
			}

		}
	)
};

export const sendWelcomeEmail = async (email, name) => {
	const recipient = email.toString();
	var transporter = nodemailer.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'jaswanthreddy.2019@gmail.com',
            pass: 'mmmvvzhzhydhwiow'
        }
    }
	);

	var options = {
		from: 'jaswanthreddy.2019@gmail.com',
		to: recipient,
		subject: "Testing node emails",
		text: "Welcome "+`${name}`,
	};
	transporter.sendMail(
		options, function (error, info) {
			if (error) {
				console.log(error)
			}
			else {
				console.log("sent ")
			}

		}
	)
};

export const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = email.toString();
	var transporter = nodemailer.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'jaswanthreddy.2019@gmail.com',
            pass: 'mmmvvzhzhydhwiow'
        }
    }
	);

	var options = {
		from: 'jaswanthreddy.2019@gmail.com',
		to: recipient,
		subject: "Testing node emails",
		text: "Reset password using "+`${resetURL}`,
	};
	transporter.sendMail(
		options, function (error, info) {
			if (error) {
				console.log(error)
			}
			else {
				console.log("sent ")
			}

		}
	)
};

export const sendResetSuccessEmail = async (email) => {
	const recipient = email.toString();
	var transporter = nodemailer.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'jaswanthreddy.2019@gmail.com',
            pass: 'mmmvvzhzhydhwiow'
        }
    }
	);

	var options = {
		from: 'jaswanthreddy.2019@gmail.com',
		to: recipient,
		subject: "Testing node emails",
		text: "password changed successfull for "+`${email}`,
	};
	transporter.sendMail(
		options, function (error, info) {
			if (error) {
				console.log(error)
			}
			else {
				console.log("sent ")
			}

		}
	)
};