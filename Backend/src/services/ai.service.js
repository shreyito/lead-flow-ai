import { genAI } from "../config/ai.js";

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const categorizeLead = async (message) => {
  const prompt = `
You are an AI sales assistant.

Classify this customer inquiry and return ONLY valid JSON.

Message:
"${message}"

Schema:
{
  "intent": "high | medium | low",
  "category": "pricing | bulk | dealer | technical | general",
  "urgency": "immediate | normal | future"
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Safety: extract JSON even if extra text appears
  const jsonMatch = text.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("AI response is not valid JSON");
  }

  return JSON.parse(jsonMatch[0]);
};
