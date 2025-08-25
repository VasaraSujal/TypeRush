import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Access your API key from the environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the Generative AI model
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

function App() {
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateParagraph = async () => {
    setLoading(true);
    setError(null);
    setGeneratedText('');

    try {
      const prompt = "Generate a random paragraph of approximately 100 words for a typing test. The paragraph should be about a natural phenomenon.";
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setGeneratedText(text);
    } catch (err) {
      console.error("Failed to generate content:", err);
      setError("Failed to generate content. Please check your API key and network connection.");
    } finally {
      setLoading(false);
    }
  };

  // Correct way to get env variable
  const data = import.meta.env.VITE_GEMINI_API_KEY;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>Typing Platform Text Generator</h1>
      <button 
        onClick={generateParagraph} 
        disabled={loading}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        {loading ? 'Generating...' : 'Generate New Paragraph'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {generatedText && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <p>{generatedText}</p>
          <p>API key is: {data}</p>
        </div>
      )}
    </div>
  );
}

export default App;
