import React, { useState } from 'react';

function QuizInput({ onGenerate }) {
    const [inputValue, setInputValue] = useState('');

    const handleGenerateClick = () => {
        onGenerate(inputValue);
    };

    return (
        <div className="text-center p-4 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Generate a New Quiz</h2>
            <p className="mb-6">Enter any topic below and let AI create a quiz for you!</p>
            <div className="max-w-lg mx-auto">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="e.g., DSA, JavaScript Basics, etc."
                    className="w-full p-3 text-lg border border-gray-300 placeholder:text-gray-500 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button 
                    onClick={handleGenerateClick}
                    className="mt-4 w-full text-black bg-[#FFA500] font-bold py-3 px-6 rounded-lg hover:bg-[#ffa600de] transition-colors"
                >
                    Generate Quiz
                </button>
            </div>
        </div>
    );
}

export default QuizInput;