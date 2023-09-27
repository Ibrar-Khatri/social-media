import Verification from "../models/emailVerificationModel.js";
import FriendRequest from "../models/friendRequestModel.js";
import PasswordReset from "../models/passwordResetModel.js";
import Users from "../models/userModel.js";
import { REQUEST_STATUS } from "../utils/constant.js";
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
    console.log("🚀 ~ e:", e);
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

export const friendRequest = async (req, res) => {
  try {
    const { userId } = req.body.user;
    const { requestTo } = req.body;

    const requestExists = await FriendRequest.findOne({
      requestFrom: requestTo,
      requestTo: userId,
    });

    if (requestExists) {
      next("Friend request already exists");
      return;
    }
    const newRequest = await FriendRequest.create({
      requestTo,
      requestFrom: userId,
    });

    res.status(200).send({
      success: true,
      message: "Friend request sent successfully",
    });
  } catch (e) {
    console.log("🚀 ~ e:", e);
    res
      .status(500)
      .json({ error: e.message, success: false, message: "auth error" });
  }
};

export const getFriendRequest = async (req, res) => {
  try {
    const { userId } = req.body.user;
    const request = await FriendRequest.find({
      requestTo: userId,
      requestStatus: REQUEST_STATUS["PENDING"],
    })
      .populate({
        path: "requestFrom",
        select: "firstName lastName profileUrl profession -password",
      })
      .limit(10)
      .sort({ _id: -1 });

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (e) {
    res
      .status(500)
      .json({ error: e.message, success: false, message: "auth error" });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const id = req.body.user.userId;
    const { rid, status } = req.body;
    const requestExists = FriendRequest.findById(rid);

    if (!requestExists) {
      next("No friend request found");
      return;
    }

    const newRes = await FriendRequest.findByIdAndUpdate(
      { _id: rid },
      { requestStatus: status }
    );
    if (status === REQUEST_STATUS["ACCEPTED"]) {
      const user = await Users.findById(id);
      user.friends.push(newRes.requestFrom);
      await user.save();

      const friend = await Users.findById(newRes.requestFrom);

      friend.friends.push(newRes.requestTo);

      await friend.save();
    }

    res.status(200).json({
      success: true,
      message: `Friend request ${status.lowercase()}`,
    });
  } catch (e) {
    res
      .status(500)
      .json({ error: e.message, success: false, message: "auth error" });
  }
};

export const profileViews = async (req, res) => {
  try {
    const { userId } = req.body.user;
    const { id } = req.body;

    const user = await Users.findById(id);

    user.views.push(userId);
    await user.save();
    res.status(201).json({
      success: true,
      message: "successfully",
    });
  } catch (e) {
    res
      .status(500)
      .json({ error: e.message, success: false, message: "auth error" });
  }
};

export const suggestedFriends = async (req, res) => {
  try {
    const { userId } = req.body.user;
    let queryObject = {};
    queryObject._id = { $ne: userId };
    queryObject.friends = { $nin: userId };

    let queryResult = await Users.find(queryObject)
      .limit(15)
      .select("firstName lastName profileUrl profession -password");

    res.status(201).json({
      success: true,
      data: queryResult,
    });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
