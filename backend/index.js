import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
configDotenv();
const app = express();
const port = process.env.PORT || 3000;

import connectDb from "./src/db/connect.db.js";
import { AuthRouter } from "./src/routes/auth.routes.js";
import { testRouter } from "./src/routes/test.routes.js";
import { todoRouter } from "./src/routes/todo.routes.js";
import { userRouter } from "./src/routes/user.routes.js";
import { aiChatRouter } from "./src/routes/aiChat.routes.js";

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//  MIDDLEWARE

// ROUTE
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/todo", todoRouter);
app.use("/api/v1/user", userRouter);
app.use("/api", aiChatRouter);
app.use("/test", testRouter);

// server is starting from here ....
(async () => {
  try {
    console.log("JWT Secret:", process.env.JWT_SECRET);

    await connectDb();
    await app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    );
  } catch (error) {
    console.log("error occurred at starting server: " + error);
  }
})();
