import Verification from "../models/emailVerificationModel.js";
import Users from "../models/userModel.js";
import { compareString } from "../utils/index.js";

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
