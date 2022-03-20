import express from "express";
import { getUser, loginUser, registerUser } from "../controllers/user.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/users/register", registerUser);
router.post("/users/login", loginUser);
router.get("/users/me", isAuthenticatedUser, getUser);
export default router;
