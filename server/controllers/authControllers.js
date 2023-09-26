import Users from "../models/userModel.js";
import { compareString, createJWT, hashString } from "../utils/index.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!(firstName, lastName, email, password)) {
    next("Provide Required Parameters");
    return;
  }
  try {
    const isUserExist = await Users.findOne({ email });
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

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    next("Please provide user credentials");
    return;
  }
  try {
    const user = await Users.findOne({ email }).select("+password").populate({
      path: "friends",
      select: "firstName lastName location profileUrl -password",
    });
    if (!user) {
      next("Invalid email or password");
      return;
    }
    if (!user?.verified) {
      next("User email is not verified. Check your accounts and verify your email!");
      return;
    }
    const isMatch = await compareString(password, user.password);
    if (!isMatch) {
      next("Invalid email or password");
      return;
    }

    delete user.password;
    const token = createJWT(user._id)

    res.status(201).json({
      success: true,
      message: "Login successfully",
      token,
      user,
    });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};
