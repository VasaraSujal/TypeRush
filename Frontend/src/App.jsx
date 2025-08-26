// 


import React from "react";
import TypingText from "./components/TypingText";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          Single Player Typing Platform
        </h1>
        <TypingText />
      </div>
    </div>
  );
}

export default App;
