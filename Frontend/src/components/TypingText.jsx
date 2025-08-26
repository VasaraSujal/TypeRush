import React, { useState, useEffect } from "react";

// sample fallback texts (you can later replace with API)
const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast and accurately takes practice every day.",
  "JavaScript is a versatile language for web development.",
  "Consistency is the key to mastering any new skill.",
];

function TypingText() {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);

  // Pick random text on load
  useEffect(() => {
    generateRandomText();
  }, []);

  // Timer logic
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const generateRandomText = () => {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    setText(sampleTexts[randomIndex]);
    setUserInput("");
    setTime(0);
    setIsRunning(false);
    setResults(null);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    // start timer on first keystroke
    if (!isRunning && value.length === 1) {
      setIsRunning(true);
    }

    // stop when finished
    if (value.length === text.length) {
      setIsRunning(false);
      calculateResults(value);
    }
  };

  const calculateResults = (finalInput) => {
    const correctChars = finalInput
      .split("")
      .filter((ch, i) => ch === text[i]).length;

    const wrongChars = finalInput.length - correctChars;
    const minutes = time / 60;

    const wpm = Math.round((correctChars / 5) / minutes || 0);
    const accuracy = Math.round(
      (correctChars / finalInput.length) * 100 || 0
    );

    setResults({ wpm, accuracy, time });
  };

  // Split text into array of chars for highlighting
  const renderText = () => {
    return text.split("").map((char, index) => {
      let color = "text-gray-800"; // default
      if (index < userInput.length) {
        color = char === userInput[index] ? "text-green-500" : "text-red-500";
      }
      return (
        <span key={index} className={`${color}`}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="text-center">
      {/* Display text with highlighting */}
      <p className="text-lg font-mono bg-gray-50 p-4 rounded-lg border border-gray-200 leading-relaxed">
        {renderText()}
      </p>

      {/* Typing input */}
      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        placeholder="Start typing here..."
        className="mt-4 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* New text button */}
      <button
        onClick={generateRandomText}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        New Text
      </button>

      {/* Results */}
      {results && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border">
          <p>⏱ Time: {results.time}s</p>
          <p>⚡ Speed: {results.wpm} WPM</p>
          <p>✅ Accuracy: {results.accuracy}%</p>
        </div>
      )}
    </div>
  );
}

export default TypingText;
