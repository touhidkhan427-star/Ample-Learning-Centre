import { GoogleGenAI, ThinkingLevel } from "@google/genai";

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

// System instruction to set the persona
const SYSTEM_INSTRUCTION = `You are Ample AI, the official AI assistant for Ample Learning Centre. 
Your role is to help students find courses, understand topics, and get information about the platform.
Be helpful, encouraging, and concise. Respond in Bengali or English based on the user's language.
If asked about contact info, provide the WhatsApp number: 01728810605 or email: hello@amplelearning.com.`;

export async function generateChatResponse(history: ChatMessage[], newMessage: string): Promise<string> {
  try {
    // Format history for the API
    const formattedHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: [
        ...formattedHistory,
        { role: 'user', parts: [{ text: newMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      }
    });

    return response.text || "দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না।";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "দুঃখিত, একটি সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।";
  }
}
