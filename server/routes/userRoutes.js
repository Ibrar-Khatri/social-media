import express from "express";
import path from "path";

import {
  changePassword,
  getUser,
  requestPasswordReset,
  resetPassword,
  updateUser,
  verifyEmail,
} from "../controllers/userControllers.js";
import withAuth from "../middleware/authMiddleware.js";

const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

router.get("/verify/:userId/:token", verifyEmail);

//RESET PASSWORD
router.post("/request-password-reset", requestPasswordReset);
router.get("/reset-password/:userId/:token", resetPassword);
router.post("/reset-password", changePassword);

//user routes
router.post("/get-user/:id?", withAuth, getUser);
router.post("/update-user", withAuth, updateUser);

router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/build", "index.html"));
});
router.get("/resetpassword", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/build", "index.html"));
});

export default router;
