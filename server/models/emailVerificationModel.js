import mongoose, { Schema } from "mongoose";

const emailVerificationSchema = new Schema({
  userId: String,
  token: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now() + 86400000,
  },
});

const Verification = mongoose.model("Verification", emailVerificationSchema);

export default Verification;
