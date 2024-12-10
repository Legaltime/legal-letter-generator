import React from 'react';

const LetterPreview = ({ letterContent }) => {
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(letterContent);
      alert('Letter copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Generated Letter</h2>
        <button
          onClick={handleCopyToClipboard}
          className="bg-legal-blue text-white py-2 px-4 rounded-md hover:bg-opacity-90"
        >
          Copy to Clipboard
        </button>
      </div>
      <div className="prose max-w-none">
        <div className="whitespace-pre-wrap font-serif">
          {letterContent}
        </div>
      </div>
    </div>
  );
};

export default LetterPreview;