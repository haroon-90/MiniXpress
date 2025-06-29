import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext'

function Results({ score, totalQuestions, onRetry }) {
    const { theme } = useContext(ThemeContext)
    const isDark = theme === "dark"

    const percentage = Math.round((score / totalQuestions) * 100);

    return (
        <div className={`text-center p-6 ${isDark ? "bg-[#0b0d6f]" : "bg-[#E8F9FF]" } border border-blue-200 rounded-lg`}>
            <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-xl">
                You scored <span className="font-bold text-blue-600">{score}</span> out of <span className="font-bold">{totalQuestions}</span> ({percentage}%)
            </p>
            <button
                onClick={onRetry}
                className="mt-6 bg-[#FFA500] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#ffa600de] transition-colors"
            >
                Try Another Quiz
            </button>
        </div>
    );
}

export default Results;