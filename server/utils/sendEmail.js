import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { TOKEN_EXPIRE_DELAY, hashString } from "./index.js";
import Verification from "../models/emailVerificationModel.js";
import PasswordReset from "../models/passwordResetModel.js";

dotenv.config();

const { AUTH_EMAIL, AUTH_PASSWORD, APP_URL } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
});

export const sendVerificationEmail = async (user, res) => {
  const { _id, email, firstName, lastName } = user;

  const token = _id + uuidv4();

  const link = `${APP_URL}users/verify/${_id}/${token}`;

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
    console.log("🚀 ~ e:2", e);
    res.status(404).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const resetPasswordLink = async (user, res) => {
  const { _id, email } = user;
  const token = _id + uuidv4();
  const link = `${APP_URL}/users/reset-password/${_id}/${token}`;

  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Reset Password",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
            /* Reset some default styles */
            body, html {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
            }
    
            /* Container for the email */
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
            }
    
            /* Header section */
            .header {
                text-align: center;
            }
    
            /* Logo styling */
            .logo {
                width: 150px;
                height: auto;
            }
    
            /* Body section */
            .body {
                margin-top: 20px;
                text-align: left;
            }
    
            /* Button styling */
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007BFF;
                color: #fff;
                text-decoration: none;
                border-radius: 4px;
            }
    
            /* Footer section */
            .footer {
                margin-top: 20px;
                text-align: center;
                color: #888;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="your_logo.png" alt="Company Logo" class="logo">
                <h1>Password Reset</h1>
            </div>
            <div class="body">
                <p>Hello,</p>
                <p>We received a request to reset your password. To reset your password, please click the button below:</p>
                <p><a href=${link} class="btn">Reset Password</a></p>
                <p>If you didn't request a password reset, you can ignore this email. Your password will remain unchanged.</p>
            </div>
            <div class="footer">
                <p>If you have any questions, please contact our support team at <a href="mailto:support@example.com">support@example.com</a>.</p>
            </div>
        </div>
    </body>
    </html>
    `,
  };

  try {
    const hashedToken = await hashString(token);
    const resetEmail = await PasswordReset.create({
      userId: _id,
      email,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() * TOKEN_EXPIRE_DELAY,
    });

    if (resetEmail) {
      await transporter.sendMail(mailOptions);
      res.status(201).send({
        success: "PENDING",
        message: "Reset password link has been sent to the email address",
      });
    }
  } catch (e) {
    res.status(404).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};
