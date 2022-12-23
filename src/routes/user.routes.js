import { Router } from "express";
import { create, login } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import userValidation from "../middlewares/userValidation.middleware.js";

const router = Router();

router.post("/signup", userValidation, create);
router.post("/signin", authMiddleware, login);

export default router;