import { Router } from "express";
import { create, login } from "../controllers/user.controller.js";
import loginMiddleware from "../middlewares/login.middleware.js";
import userValidation from "../middlewares/userValidation.middleware.js";

const router = Router();

router.post("/signup", userValidation, create);
router.post("/signin", loginMiddleware, login);

export default router;