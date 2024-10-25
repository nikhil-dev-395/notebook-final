// routes/todo.routes.js

import { Router } from "express";

import isLoggedIn from "../middleware/isLoggedIn.js";
import {
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "../controllers/todo.controller.js";
import account from "../controllers/account.controllers.js";
const router = Router();

router.get("/protected", isLoggedIn, (req, res) => {
  // console.log(req.user.userId);

  res.send("hii this is protected");
});

// isLoggedIn - this middleware will help us to authenticate the user
router.get("/todo", isLoggedIn, getTodo);
router.post("/todo", isLoggedIn, createTodo);
router.delete("/todo/:todo_id", isLoggedIn, deleteTodo);
router.put("/todo/:todo_id", isLoggedIn, updateTodo);
router.get("/account", isLoggedIn,account)


export { router as todoRouter };
