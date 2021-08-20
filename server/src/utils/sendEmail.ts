"use strict";
import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, html: string) {
	// let testAccount = await nodemailer.createTestAccount();
	// console.log(testAccount);

	let transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false,
		auth: {
			user: "ypkqmsoiwsvb7ref@ethereal.email",
			pass: "eNvMeQ1teSyWaR8GEG",
		},
	});

	let info = await transporter.sendMail({
		from: '"Bebbit Email Services"',
		to,
		subject,
		html,
	});

	console.log("Message sent: %s", info.messageId);

	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
