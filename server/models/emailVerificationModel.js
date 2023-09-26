import mongoose, { Schema } from "mongoose";

const emailVerificationSchema = new Schema({
  userId: String,
  token: String,
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  expiresAt: {
    type: Number,
    default: Date.now() + 86400000,
  },
});

const Verification = mongoose.model("Verification", emailVerificationSchema);

export default Verification;
