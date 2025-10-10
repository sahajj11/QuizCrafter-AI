import express from "express"
import axios from "axios"
import dotenv from "dotenv"

dotenv.config();

const quizRouter = express.Router()

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;


const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const generateQuiz = async (req, res) => {
    const { topic, numQuestions = 5 } = req.body;

    if (!topic) {
        return res.status(400).json({ message: 'Topic is required' });
    }

  
    if (!GEMINI_API_KEY) {
        console.error("GEMINI_API_KEY is not set in environment variables.");
        return res.status(500).json({ message: 'Server configuration error: API Key missing' });
    }

    try {
        const prompt = `Generate ${numQuestions} multiple-choice questions about "${topic}" with 4 options each, and mark the correct answer. Format the response strictly as a JSON array of objects.`;

        // 💡 FIX 2: API Key in URL query parameter (Corrected in previous step)
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                // Request body uses the correct 'contents' field
                contents: [{ role: "user", parts: [{ text: prompt }] }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // 💡 FIX 3: Correct response path (Corrected in previous step)
        let responseText = response.data.candidates[0].content.parts[0].text;
        
        // 🚀 FINAL FIX: Clean the response text by removing Markdown fences for reliable JSON.parse()
        let cleanJsonText = responseText.trim();

        // Use a RegEx to find and remove the starting and ending Markdown code fences (```json, ```)
        // This is more robust than simple string slicing/trimming.
        const jsonMatch = cleanJsonText.match(/```json\s*([\s\S]*?)\s*```/);
        
        if (jsonMatch && jsonMatch[1]) {
            // If the code block format is found, use the captured group (the content inside the fences)
            cleanJsonText = jsonMatch[1].trim();
        } else {
            // If no Markdown fences are found, just use the response text (it might be clean already)
            cleanJsonText = responseText.trim();
        }

        try {
            // Attempt to parse the cleaned text
            const quiz = JSON.parse(cleanJsonText);
            
            // Send the parsed JSON object
            res.json({ quiz }); 

        } catch (parseError) {
            // This is the error you were seeing, now caught by the try/catch
            console.error("Failed to parse LLM response as JSON. Raw LLM response:", responseText);
            
            // If parsing still fails (e.g., LLM returned malformed JSON), send a detailed error
            return res.status(500).json({ 
                message: 'LLM generated invalid JSON format. Manual review required.',
                rawResponse: responseText,
                errorDetails: parseError.message
            });
        }


    } catch (error) {
        // Log more helpful error information for network/API key/permission issues
        console.error("Gemini API Request Failed:", error.response ? error.response.data : error.message);
        res.status(500).json({ 
            message: 'Failed to generate quiz (External API Error)', 
            details: error.response ? error.response.data : error.message 
        });
    }
}