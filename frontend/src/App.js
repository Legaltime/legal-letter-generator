import React, { useState } from 'react';
import LetterForm from './components/LetterForm';
import LetterPreview from './components/LetterPreview';

function App() {
  const [generatedLetter, setGeneratedLetter] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Legal Letter Generator
        </h1>
        {!generatedLetter ? (
          <LetterForm onLetterGenerated={setGeneratedLetter} />
        ) : (
          <LetterPreview letterContent={generatedLetter} />
        )}
      </div>
    </div>
  );
}

export default App;