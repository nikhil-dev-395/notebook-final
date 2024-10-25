import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Task from "./Task"; // Assuming Task is a separate component
import Icon from "../assets/icons"; // Your icon components

export default function TodoList() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [token, setToken] = useState(null);
  const [notification, setNotification] = useState(""); // State to hold notification message

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "http://192.168.141.68:3000/api/v1/todo/todo",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTaskItems(data);
      } else {
        console.error("Failed to fetch tasks:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    const retrieveToken = async () => {
      const storedToken = await AsyncStorage.getItem("authToken"); // Adjust key if needed
      setToken(storedToken);
    };

    retrieveToken();
  }, []);

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  // Add a new task or update an existing task
  const handleAddOrUpdateTask = async () => {
    Keyboard.dismiss();

    if (editingTaskId) {
      // Edit task description
      try {
        await fetch(
          `http://192.168.141.68:3000/api/v1/todo/todo/${editingTaskId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ task }), // Update task description
          }
        );
        setEditingTaskId(null); // Clear editing task ID
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      // Add a new task
      try {
        await fetch("http://192.168.141.68:3000/api/v1/todo/todo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ task, status: "pending" }), // Set new task status
        });
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }

    setTask(""); // Clear input field
    fetchTasks(); // Refresh tasks
  };

  // Delete a task
  const deleteTask = async (todo_id) => {
    try {
      await fetch(`http://192.168.141.68:3000/api/v1/todo/todo/${todo_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks(); // Refresh tasks
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Mark a task as completed
  const markAsCompleted = async (todo_id) => {
    try {
      await fetch(`http://192.168.141.68:3000/api/v1/todo/todo/${todo_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "completed" }), // Update status to completed
      });
      setNotification("Task marked as completed!"); // Show notification

      // Automatically hide the notification after 2 seconds
      setTimeout(() => {
        setNotification("");
      }, 2000);

      fetchTasks(); // Refresh tasks
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  // Start editing a task
  const startEditing = (item) => {
    setTask(item.task);
    setEditingTaskId(item._id);
  };

  // Separate tasks into pending and completed
  const pendingTasks = taskItems.filter((item) => item.status === "pending");
  const completedTasks = taskItems.filter(
    (item) => item.status === "completed"
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <View style={styles.items}>
            {/* Render pending tasks */}
            {pendingTasks.map((item) => (
              <View key={item._id}>
                <TouchableOpacity onPress={() => startEditing(item)}>
                  <Task
                    text={item.task}
                    style={{ textDecorationLine: "none" }} // No strikethrough for pending tasks
                  />
                </TouchableOpacity>
                <View style={styles.taskActions}>
                  <TouchableOpacity onPress={() => markAsCompleted(item._id)}>
                    <Icon name="UpdateIcon" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteTask(item._id)}>
                    <Icon name="DeleteIcon" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* Render completed tasks at the bottom */}
            {completedTasks.map((item) => (
              <View key={item._id}>
                <TouchableOpacity onPress={() => startEditing(item)}>
                  <Task
                    text={item.task}
                    style={{ textDecorationLine: "line-through" }} // Strikethrough for completed tasks
                  />
                </TouchableOpacity>
                <View style={styles.taskActions}>
                  <TouchableOpacity onPress={() => deleteTask(item._id)}>
                    <Icon name="DeleteIcon" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          {notification ? (
            <View style={styles.notification}>
              <Text style={styles.notificationText}>{notification}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>

      <KeyboardAvoidingView style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddOrUpdateTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>{"+"}</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9ff",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    fontSize: 24,
  },
  taskActions: {
    flexDirection: "row",
    marginBottom: 14,
    flexDirection: "row",
      // justifyContent: "space-between",
    gap:10,
    marginLeft: 10,
  },
  notification: {
    backgroundColor: "#d4edda",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  notificationText: {
    color: "#155724",
    textAlign: "center",
  },
});
