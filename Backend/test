import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ CHANGE MODEL HERE
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const result = await model.generateContent("Say hello in one word");
console.log(result.response.text());
