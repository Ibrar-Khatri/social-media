import Users from "../models/userModel.js";
import { hashString } from "../utils/index.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!(firstName, lastName, email, password)) {
    next("Provide Required Parameters");
    return;
  }
  try {
    const isUserExist = Users.findOne({ email });
    if (isUserExist) {
      next("Email already in exists");
      return;
    }

    const hashedPassword = await hashString(password);

    const user = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await sendVerificationEmail(user, res);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};
