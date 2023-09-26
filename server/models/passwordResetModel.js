import mongoose, { Schema } from "mongoose";

const passwordResetSchema = new Schema({
  userId: { type: String, unique: true },
  email: { type: String, unique: true },
  token: String,
  createdAt: Number,
  expiresAt: Number,
});

const PasswordReset = mongoose.model("PasswordReset", passwordResetSchema);

export default PasswordReset;
