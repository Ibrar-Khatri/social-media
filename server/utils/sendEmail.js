import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { hashString } from "./index";
import Verification from "../models/emailVerificationModel";

dotenv.config();

const { AUTH_EMAIL, AUTH_PASSWORD, APP_URL } = process.env;

const transporter = nodemailer.createTransport({
  host: "happyfashion.outlook.com",
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
});

export const sendVerificationEmail = async (user, res) => {
  const { _id, email, firstName, lastName } = user;

  const token = _id + uuidv4();

  const link = `${APP_URL}users/verify/"${_id}"/"${token}`;

  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Email verification",

    html: `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 5px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                color: #666;
            }
            .verification-link {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007BFF;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Email Verification</h1>
            <p>Thank you for signing up ${firstName} ${lastName}!  To verify your email address, please click the link below:</p>
            <p><a class="verification-link" href="${link}">Verify Email</a></p>
            <p>If you did not sign up for our service, you can safely ignore this email.</p>
        </div>
    </body>
    </html>
    `,
  };

  try {
    const hashedToken = await hashString(token);
    const newVerifiedEmail = await Verification.create({
      userId: _id,
      token: hashedToken,
    });
    if (newVerifiedEmail) {
      await transporter.sendMail(mailOptions);
      res.status(201).send({
        success: "PENDING",
        message:
          "Verification email has been sent to your account. Check your email for further instructions.",
      });
    }
  } catch (e) {
    res.status(404).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};
