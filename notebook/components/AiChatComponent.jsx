// components/AiChatComponent.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenWrapper from "./ScreenWrapper";
import Icon from "../assets/icons"; // Assuming you have an icon component for the send button

const AiChatComponent = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [messages, setMessages] = useState([]); // Array to store messages
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //   const fetchAiResponse = async () => {
  //     setLoading(true);
  //     setErrorMessage("");
  //     try {
  //       const token = await AsyncStorage.getItem("authToken");
  //       if (!token) {
  //         setErrorMessage("Token not found. Please log in.");
  //         setLoading(false);
  //         return;
  //       }

  //       // Save user prompt to messages
  //       const newMessage = { text: userPrompt, isUser: true };
  //       setMessages((prevMessages) => [...prevMessages, newMessage]);

  //       const response = await fetch("http://192.168.141.68:3000/api/aiChat", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({ userPrompt }),
  //       });

  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         throw new Error(
  //           `HTTP error! status: ${response.status} - ${errorData.message}`
  //         );
  //       }

  //       const data = await response.json();
  //       const aiMessage = {
  //         text: data.result.aiChat || "No response available.",
  //         isUser: false,
  //       };
  //       setMessages((prevMessages) => [...prevMessages, aiMessage]);
  //     } catch (error) {
  //       console.error("Error fetching AI response:", error.message);
  //       setErrorMessage("Error fetching AI response: " + error.message);
  //     } finally {
  //       setLoading(false);
  //       setUserPrompt(""); // Clear input after sending
  //     }
  //   };
  const fetchAiResponse = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        setErrorMessage("Token not found. Please log in.");
        setLoading(false);
        return;
      }

      // Log user prompt and token for debugging
      console.log("Token:", token);
      console.log("User Prompt:", userPrompt);

      // Save user prompt to messages
      const newMessage = { text: userPrompt, isUser: true };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      const response = await fetch("http://192.168.141.68:3000/api/aiChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userPrompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorData.message}`
        );
      }

      const data = await response.json();
      const aiMessage = {
        text: data.result.aiChat || "No response available.",
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error.message);
      setErrorMessage(
        "Error fetching AI response: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
      setUserPrompt(""); // Clear input after sending
    }
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <ScrollView style={styles.chatContainer}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                message.isUser ? styles.userMessage : styles.aiMessage,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type a message"
            placeholderTextColor="#A0A0A0"
            value={userPrompt}
            onChangeText={setUserPrompt}
            style={styles.input}
          />
          <Pressable
            onPress={fetchAiResponse}
            style={styles.sendButton}
            disabled={loading || !userPrompt.trim()}
          >
            <Icon name="SendArrowIcon" color="#075E54" strokeWidth={2} />
          </Pressable>
        </View>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      </View>
    </ScreenWrapper>
  );
};

export default AiChatComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F7F7F7", // Light gray background for a minimal look
  },
  chatContainer: {
    flex: 1,
    width: 350,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 12,
    marginVertical: 5,
  },
  userMessage: {
    backgroundColor: "#DCF8C6", // Light green for user messages
    alignSelf: "flex-end", // Align user messages to the right
  },
  aiMessage: {
    backgroundColor: "#E1E1E1", // Light gray for AI responses
    alignSelf: "flex-start", // Align AI messages to the left
  },
  messageText: {
    fontSize: 15,
    color: "#333", // Darker text for better readability
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 25,
    backgroundColor: "#FFF",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 25,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    flex: 1,
    marginRight: 10,
    width: 300,
  },
  sendButton: {
    width: 30,
    height: 30,
    backgroundColor: "#FFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  error: {
    color: "#FF4D4D", // Softer red for error messages
    marginTop: 10,
  },
});
