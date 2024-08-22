"use client";

import { useState } from "react";

interface Flashcard {
	front: string;
	back: string;
}

export default function Flashcard() {
	const [inputText, setInputText] = useState("");
	const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [showBack, setShowBack] = useState(false);

	const handleGenerateFlashcards = async () => {
		try {
			const response = await fetch("/api/ai", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					messages: [
						{
							content: `
                        You are a flashcard creator, you take in topic and create multiple flashcards from it. Make sure to create exactly 8 flashcards.
                        Both front and back should be one sentence long.
                        You should return in the following JSON format:
                        
                        { "flashcards":[{ "front": "Front of the card", "back": "Back of the card"}] }
                        
                        The topic is as follows: "${inputText}"
                        `,
						},
					],
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to generate flashcards");
			}

			const data = await response.json();

			// Print the JSON response to the console
			console.log("AI Response:", JSON.stringify(data, null, 2));

			setFlashcards(data.flashcards);
			setCurrentCardIndex(0);
			setShowBack(false);
		} catch (error) {
			console.error("Error generating flashcards:", error);
		}
	};

	const handlePrevious = () => {
		setShowBack(false);
		setCurrentCardIndex((prevIndex) =>
			prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
		);
	};

	const handleNext = () => {
		setShowBack(false);
		setCurrentCardIndex((prevIndex) =>
			prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
		);
	};

	const handleFlip = () => {
		setShowBack((prevShowBack) => !prevShowBack);
	};

	return (
		<div className="max-w-lg mx-auto mt-10 font-sans text-gray-800">
			<div className="flex flex-col items-center mb-8">
				<textarea
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					placeholder="Enter text to generate flashcards..."
					className="w-full h-32 p-4 text-lg border border-gray-300 rounded-md mb-4"
				/>
				<button
					onClick={handleGenerateFlashcards}
					className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
				>
					Generate Flashcards
				</button>
			</div>
			{flashcards && flashcards.length > 0 ? (
				<div className="flex flex-col items-center">
					<div className="p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md w-full text-center mb-4">
						<p className="text-xl">
							{showBack
								? flashcards[currentCardIndex]?.back ||
								  "No back content available"
								: flashcards[currentCardIndex]?.front ||
								  "No front content available"}
						</p>
					</div>
					<div className="flex space-x-4">
						<button
							onClick={handlePrevious}
							className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
						>
							Previous
						</button>
						<button
							onClick={handleFlip}
							className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
						>
							Flip
						</button>
						<button
							onClick={handleNext}
							className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
						>
							Next
						</button>
					</div>
				</div>
			) : (
				<p className="text-center text-lg text-white">
					No flashcards available.
				</p>
			)}
		</div>
	);
}
