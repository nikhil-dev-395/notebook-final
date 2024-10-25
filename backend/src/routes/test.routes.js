// routes/test.js

// import { Register, Login } from "../controllers/auth.controllers.js";
import { Router } from "express";
// import isLoggedIn from "../middleware/isLoggedIn.js";
import authenticateToken from "../middleware/auth.js";
import isLoggedIn from "../middleware/isLoggedIn.js";
const router = Router();

router.get("/protected", isLoggedIn, (req, res) => {
  // console.log(req.user.userId);

  res.send("hii this is protected");
});

export { router as testRouter };
