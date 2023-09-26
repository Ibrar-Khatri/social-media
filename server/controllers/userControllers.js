import Verification from "../models/emailVerificationModel.js";
import PasswordReset from "../models/passwordResetModel.js";
import Users from "../models/userModel.js";
import { compareString, createJWT, hashString } from "../utils/index.js";
import { resetPasswordLink } from "../utils/sendEmail.js";

export const verifyEmail = async (req, res, next) => {
  const { token, userId } = req.params;
  try {
    const result = await Verification.findOne({ userId });
    if (result) {
      const { expiresAt, token: hashedToken } = result;
      if (expiresAt < Date.now()) {
        Verification.findOneAndDelete({ userId })
          .then(() => {
            Users.findOneAndDelete({ _id: userId })
              .then(() => {
                const message = "Verification token has expired";
                res.redirect(`/users/verified?status=error&message=${message}`);
              })
              .catch((err) => {
                const message = "Something went wrong";
                res.redirect(`/users/verified?status=error&message=${message}`);
              });
          })
          .catch((err) => {
            res.redirect(`/users/verified?message`);
          });
      } else {
        compareString(token, hashedToken)
          .then((isMatch) => {
            if (isMatch) {
              Users.findOneAndUpdate({ _id: userId }, { verified: true })
                .then(() => {
                  Verification.findOneAndDelete({ userId }).then(() => {
                    const messages = "Email verified successfully";
                    res.redirect(
                      `/users/verified?status=success&message=${messages}`
                    );
                  });
                })
                .catch((err) => {
                  const message = "Verification Failed or linke is invalid";

                  res.redirect(
                    `/users/verified?status=error&message=${message}`
                  );
                });
            } else {
              const message = "Verification Failed or linke is invalid";

              res.redirect(`/users/verified?status=error&message=${message}`);
            }
          })
          .catch((err) => {
            const message = "Something went wrong";

            res.redirect(`/users/verified?message=${message}`);
          });
      }
    }
  } catch (err) {
    res.redirect(`/users/verified?status=error`);
  }
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Email address not found" });
    }
    const existingRequest = await PasswordReset.findOne({ email });
    if (existingRequest) {
      if (existingRequest.expiresAt > Date.now()) {
        return res.status(201).json({
          status: "PENDING",
          message: "Reset password link has already been sent to you email",
        });
      }
      await PasswordReset.findOneAndDelete({ email });
    }
    await resetPasswordLink(user, res);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { userId, token } = req;
  try {
    const user = await Users.findOne({ _id: userId });

    if (!user) {
      const message = "Invalid password reset link. Try again later.";
      res.redirect(
        `/users/resetpassword?type=reset&status=error&message=${message}`
      );
    }
    const resetPassword = PasswordReset.findOne({ userId });
    if (!resetPassword) {
      const message = "Invalid password reset link. Try again later.";
      res.redirect(
        `/users/resetpassword?type=reset&status=error&message=${message}`
      );
    }

    const { expiresAt, token: hashedToken } = resetPassword;

    if (expiresAt < Date.now()) {
      const message = "Reset password link has expired. Try again later.";
      res.redirect(
        `/users/resetpassword?type=reset&status=error&message=${message}`
      );
    }

    const isMatch = await compareString(token, hashedToken);
    if (!isMatch) {
      const message = "Invalid password reset link. Try again later.";
      res.redirect(
        `/users/resetpassword?type=reset&status=error&message=${message}`
      );
    }

    res.redirect(`/users/resetpassword?type=reset&id=${userId}`);
  } catch (e) {
    res.status(404).json({
      message: e?.message,
    });
  }
};

export const changePassword = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const hashedPassword = await hashString(password);
    const user = await Users.findOneAndUpdate(
      { _id: userId },
      { password: hashedPassword }
    );

    if (user) {
      await PasswordReset.findOneAndDelete({ userId });
      const message = "Password successfully reset";
      res.redirect(`/users/resetpassword?&status=success&message=${message}`);
    }
  } catch (e) {
    res.status(404).json({ message: e?.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.body.user;
    const { id } = req.params;
    const user = await Users.findById(id ?? userId).populate({
      path: "friends",
      select: "-password",
    });

    if (user) {
      delete user.password;
      res.status(200).send({
        success: true,
        user,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "User not found",
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "auth error", success: false, error: e.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, location, profileUrl, profession } = req.body;

    if (!(firstName || lastName || location || profileUrl || profession)) {
      next("Please provide all fields");
      return;
    }
    const { userId } = req.body.user;
    const updateUser = {
      firstName,
      lastName,
      location,
      profileUrl,
      profession,
      _id: userId,
    };
    const user = await Users.findByIdAndUpdate(userId, updateUser, {
      new: true,
    });

    await user.populate({
      path: "friends",
      select: "-password",
    });

    const token = createJWT(user?._id);
    delete user.password;
    res.status(200).send({
      success: true,
      user,
      token,
      message: "User updated successfully",
    });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};
