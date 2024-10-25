import { Router } from "express";
import { gemini, aiChatResponse } from "../controllers/aiChat.controllers.js";
import isLoggedIn from "../middleware/isLoggedIn.js";

const router = Router();

router.post("/aiChat", isLoggedIn, gemini);
router.get("/aiChat", isLoggedIn, aiChatResponse);

export { router as aiChatRouter }; // Export the router
