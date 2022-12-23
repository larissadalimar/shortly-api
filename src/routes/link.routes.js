import { Router } from "express";
import { create, deleteUrl, getOne, openLink } from "../controllers/link.controller";
import authMiddleware from "../middlewares/auth.middleware";
import linkValidation from "../middlewares/linkValidation.middleware";
import userUrlValidation from "../middlewares/userUrl.middleware";

const router = Router();

router.post("/urls/shorten", authMiddleware, linkValidation, create);
router.get("/urls/:id", getOne);
router.get("/urls/open/:shortUrl", openLink);
router.delete("/urls/:id", authMiddleware, userUrlValidation, deleteUrl);


export default router;