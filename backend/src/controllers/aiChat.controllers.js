// aiChat.controllers.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
config();
import AiChatModel from "../models/aiChat.models.js";
import User from "../models/User.models.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generate = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.log(error);
  }
};

const gemini = async (req, res) => {
  try {
    let data = req.body.userPrompt;
    const userId = req.user.userId;
    const result = await generate(data);
    const aiChat = await AiChatModel.create({
      userPrompt: data,
      aiChat: result,
      userId,
    });
    /*here we are pushing our aiChat id to user*/
    const user = await User.findById(userId);
    if (user) {
      user.aiChat.push(aiChat._id);
      user.save();
    }

    console.log(aiChat, { res: user });
    res.send({ result: aiChat });
  } catch (error) {
    console.log(error);
  }
};

const aiChatResponse = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(400).send({ message: "User ID is required." });
    }
    const findAiChat = await AiChatModel.find({ userId });
    if (!findAiChat) {
      return res
        .status(404)
        .send({ message: "No chat records found for this user." });
    }
    res.status(200).send(findAiChat);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while fetching chat records." });
  }
};

export { gemini, aiChatResponse };
