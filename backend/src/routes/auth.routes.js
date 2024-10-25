// routes/auth.js

import { Register, Login } from "../controllers/auth.controllers.js";
import { Router } from "express";
import isLoggedIn from "../middleware/isLoggedIn.js";
const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/protected", isLoggedIn, (req, res) => {
  res.send("hii this is protected");
});

export { router as AuthRouter };
