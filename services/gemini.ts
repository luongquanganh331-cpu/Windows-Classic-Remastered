
import { GoogleGenAI } from "@google/genai";

// chatWithGemini provides a structured way to interact with the model while maintaining conversation state
export async function chatWithGemini(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  try {
    // Initialization: Must use named parameter apiKey and get value from process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Use ai.chats.create for conversational tasks as it handles history state
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      history: history,
      config: {
        systemInstruction: "You are the built-in AI assistant for WinClassic Remastered OS. Your personality is helpful, slightly nostalgic for the late 90s/early 2000s computing era, but equipped with state-of-the-art knowledge. Respond succinctly and use classic Windows metaphors where appropriate (e.g., 'Let me look that up in my knowledge base', 'Accessing registry...').",
      },
    });

    const response = await chat.sendMessage({ message: prompt });
    // Extraction: Directly access the .text property from the GenerateContentResponse
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error communicating with system kernel. Please try again later.";
  }
}
