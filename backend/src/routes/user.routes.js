import { Router } from "express";
const router = Router();

router.get("/account", (req, res) => {
  try {
  } catch (error) {
    console.log("err occurred at account validation , " + error);
  }
});


export {router as userRouter}
