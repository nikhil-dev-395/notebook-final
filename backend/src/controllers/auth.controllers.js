// "auth.controllers.js"

import User from "../models/User.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/* -------------------------------------------------------------------------------
  */
// Register function
const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if all fields are provided
    // if (!username || !email || !password) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }
    // Check if user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const signUp = await User.create({
      username,
      email,
      password: hashPassword,
    });

    let token = jwt.sign({ email: signUp.email, userId: signUp._id }, "secret");
    console.log("token: ", token);

    res.status(201).json({
      message: "User registered successfully",
      user: signUp,
      token,
    });
  } catch (error) {
    console.error("Error in Register: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* -------------------------------------------------------------------------------
  */

// Login function
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const signin = await User.findOne({ email });
    if (!signin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, signin.password);

    let token = jwt.sign({ email: signin.email, userId: signin._id }, "secret");
    console.log("token: ", token);
    if (isMatch) {
      return res
        .status(200)
        .json({ message: "Login successful", token: token, user: signin });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in Login: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { Register, Login };
