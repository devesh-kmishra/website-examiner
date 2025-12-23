import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function askAI(
  websiteText: string,
  question: string
): Promise<string> {
  const prompt = `
You are given the content of a website.

Website content:
"""
${websiteText}
"""

User question:
"${question}"

Answer clearly and concisely based ONLY on the website content.
If the answer is not present, say "The website does not provide this information."
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  const resContent = response.text;

  return resContent ?? "No answer generated.";
}
