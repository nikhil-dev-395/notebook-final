// controllers/account.controllers.js
import todo from "../models/Todo.models.js";
import User from "../models/User.models.js"; // Import the User model
import Account from "../models/Account.models.js"; // Import the Account model

const account = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find the user to get their email and username
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the user's tasks
    const tasks = await todo.find({ userId });
    const completedCount = tasks.filter(
      (task) => task.status === "completed"
    ).length;
    const pendingCount = tasks.filter(
      (task) => task.status === "pending"
    ).length;

    // Check if the account already exists
    let account = await Account.findOne({ userId });

    if (!account) {
      // If the account doesn't exist, create a new one
      account = new Account({
        userId,
        email: user.email,
        username: user.username,
        completedCount,
        pendingCount,
      });
    } else {
      // If the account exists, update the completed and pending counts
      account.completedCount = completedCount;
      account.pendingCount = pendingCount;
    }

    // Save the account
    await account.save();

    // Return the response
    res.status(200).json({
      email: user.email,
      username: user.username,
      completedCount,
      pendingCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default account;
