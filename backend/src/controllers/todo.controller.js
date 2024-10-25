import todo from "../models/Todo.models.js";
const getTodo = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(400).send({ message: "User ID is required." });
    }
    const findTodo = await todo.find({ userId });
    if (!findTodo) {
      return res
        .status(404)
        .send({ message: "No chat records found for this user." });
    }
    res.status(200).send(findTodo);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while fetching chat records." });
  }
};

const createTodo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { task, status } = req.body;

    const Todo = await todo.create({
      task,
      status,
      userId,
    });

    const saveTodo = await Todo.save();
    return res
      .status(201)
      .json({ message: "todo created successfully", saveTodo });
  } catch (error) {
    console.log("error at creating a new todo " + error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { todo_id } = req.params;

    // Use findById correctly by passing the ID directly
    const findTodo = await todo.findById(todo_id);

    // Check if the todo item exists
    if (!findTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Delete the todo item
    await findTodo.deleteOne(); // No need to assign it to a variable
    console.log(`Deleted Todo: ${findTodo}`);

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log("Error occurred while deleting the todo:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    // Destructure todo_id directly from req.params
    const { todo_id } = req.params;

    // Find the todo item by ID
    const findTodo = await todo.findById(todo_id);
    if (!findTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Update the todo item with the new data
    const updatedTodo = await todo.findByIdAndUpdate(
      todo_id,
      { $set: req.body }, // Set the new values from the request body
      { new: true } // Return the updated document
    );

    return res.status(200).json({
      message: "Todo updated successfully",
      updatedTodo, // Return the updated todo item
    });
  } catch (error) {
    console.log("Error occurred while updating todo:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getTodo, createTodo, deleteTodo, updateTodo };
