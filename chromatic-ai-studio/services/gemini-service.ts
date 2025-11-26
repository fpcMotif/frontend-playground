import { GoogleGenAI, type Schema, Type } from "@google/genai";
import type { AIResponseSchema } from "@/types";

const apiKey = process.env.API_KEY || "";
// Note: In a real production app, ensure API_KEY is handled securely via backend proxy.
// For this demo structure, we assume process.env.API_KEY is available.

const ai = new GoogleGenAI({ apiKey });

const paletteSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    paletteName: {
      type: Type.STRING,
      description: "A creative name for the color palette.",
    },
    description: {
      type: Type.STRING,
      description:
        "A short description of the vibe or theory behind the palette.",
    },
    colors: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "An array of exactly 5 hex color codes (e.g., #FF0000).",
    },
  },
  required: ["paletteName", "description", "colors"],
};

export const generateAIPalette = async (
  prompt: string
): Promise<AIResponseSchema> => {
  try {
    const model = "gemini-2.5-flash";
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: `You are an expert color theorist and UI/UX designer. 
        Generate cohesive, accessible, and aesthetically pleasing color palettes based on the user's request. 
        Always return exactly 5 colors in hexadecimal format.
        Focus on color harmony (analogous, complementary, split-complementary, triadic, etc.).`,
        responseMimeType: "application/json",
        responseSchema: paletteSchema,
        temperature: 0.7, // Creativity balanced with theory
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    return JSON.parse(text) as AIResponseSchema;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
