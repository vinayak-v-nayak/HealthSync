import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Generative AI client with the API key
const genAi = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY);

export async function generateChatResponse(prompt) {
  try {
    // Get the generative model (e.g., gemini-1.5-pro)
    const model = await genAi.getGenerativeModel({
      model: "gemini-1.5-pro",
    });

    // Ensure we pass the correct structure for the request
    const response = await model.generateContent({
      messages: [
        {
          role: "user", // The role is "user" for the user's input
          content: prompt, // Pass the user input as content
        },
      ],
    });

    // Return the response text if available
    return response?.text || "Sorry, there was an error generating content.";
  } catch (error) {
    console.error("Error generating content:", error);
    console.log("Error details:", error.response || error.message);
    throw error;  // Re-throw the error for handling at the component level
  }
}
