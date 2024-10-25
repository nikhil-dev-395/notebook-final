// components/Task.jsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Task = ({ text }) => {
  return (
    <View style={styles.taskContainer}>
      <Text style={styles.taskText}>{text}</Text>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  taskContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: 5,
    marginVertical: 5,
  },
  taskText: {
    fontSize: 16,
  },
});
