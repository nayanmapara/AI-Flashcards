import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const generationConfig = {
    stopSequences: ["red"],
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 11195,
    responseMimeType: "text/plain", 
};

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig });

export async function POST(request: NextRequest) {
    try {
        const { messages } = await request.json();
        const prompt = messages[messages.length - 1].content;

        // Generate content using the model
        const result = await model.generateContent(prompt);

        // Log the raw response to the console
        const rawResponse = result.response.text();
        // console.log("Raw AI Response:", rawResponse);

        // Attempt to parse the response as JSON
        let responseJson;
        try {
            responseJson = JSON.parse(rawResponse);
            console.log("Parsed AI Response:", JSON.stringify(responseJson, null, 2));
            console.log("Flashcards:", typeof(responseJson));
        } catch (jsonError) {
            console.error("Failed to parse JSON:", jsonError);
            return NextResponse.json({ error: "Invalid JSON response from AI" }, { status: 500 });
        }

        // Assuming the responseJson has a `flashcards` field directly with the desired structure
        const flashcards = responseJson.flashcards;

        // Return the flashcards as a JSON response
        return NextResponse.json({ flashcards }, { status: 200 });
    } catch (error) {
        console.error("Error generating content:", error);
        return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 });
    }
}
