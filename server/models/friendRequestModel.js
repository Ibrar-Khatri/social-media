import mongoose, { Schema } from "mongoose";
import { REQUEST_STATUS } from "../utils/constant.js";

const requestSchema = new Schema(
  {
    requestTo: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    requestFrom: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    requestStatus: { type: String, default: REQUEST_STATUS["PENDING"] },
  },
  {
    timestamps: true,
  }
);

const FriendRequest = mongoose.model("FriendRequest", requestSchema);

export default FriendRequest;
