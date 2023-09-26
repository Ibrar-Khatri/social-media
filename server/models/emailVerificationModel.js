import mongoose, { Schema } from "mongoose";
import { TOKEN_EXPIRE_DELAY } from "../utils/index.js";

const emailVerificationSchema = new Schema({
  userId: String,
  token: String,
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  expiresAt: {
    type: Number,
    default: Date.now() + TOKEN_EXPIRE_DELAY,
  },
});

const Verification = mongoose.model("Verification", emailVerificationSchema);

export default Verification;
