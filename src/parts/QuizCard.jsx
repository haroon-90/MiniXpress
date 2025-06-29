import React, {useContext} from 'react';
import { ThemeContext } from '../contexts/ThemeContext'

function QuizCard({ questionData, questionIndex, userAnswer, isSubmitted, onAnswerChange }) {
    const { theme } = useContext(ThemeContext)
    const isDark = theme === "dark"

    const getLabelClassName = (option) => {
        const baseClasses = "block w-full p-3 rounded-lg cursor-pointer transition-all";

        if (!isSubmitted) {
            return `${baseClasses} ${isDark ? "bg-[#0b0d6f] hover:text-black" : "bg-[#E8F9FF]"} border-gray-300 hover:bg-[#ffA500]`;
        }

        const isCorrect = option === questionData.correct;
        const isSelected = option === userAnswer;

        if (isCorrect) {
            return `${baseClasses} bg-green-100 border-green-500 text-green-800 font-semibold`;
        }
        if (isSelected && !isCorrect) {
            return `${baseClasses} bg-red-100 border-red-500 text-red-800 font-semibold`;
        }

        return `${baseClasses} ${isDark ? "bg-[#0b0d6f]" : "bg-[#E8F9FF]"} border-gray-300`;
    };

    return (
        <div className={`${isDark ? "bg-blue-800/20" : "bg-blue-800/20"} rounded-2xl p-4 sm:p-6 mb-4 border-l-4 border-[#FFA500]`}>
            <p className="text-sm font-semibold">Question {questionIndex + 1}</p>
            <h3 className="text-lg mt-1 mb-4">{questionData.question}</h3>
            <div className="flex flex-col gap-3">
                {['a', 'b', 'c', 'd'].map(option => (
                    <div className={`flex items-center gap-2 rounded-lg border accent-[#FFA500] px-2 transition hover:bg-[#0b0d8f] ${getLabelClassName(option)}`} key={option}>
                        <input
                            type="radio"
                            name={`q${questionIndex}`}
                            value={option}
                            id={`q${questionIndex}${option}`}
                            checked={userAnswer === option}
                            onChange={(e) => onAnswerChange(questionIndex, e.target.value)}
                            disabled={isSubmitted}
                        />
                        <label
                            htmlFor={`q${questionIndex}${option}`}
                            // className={getLabelClassName(option)}
                        >
                            <span className="font-bold mr-2">{option.toUpperCase()})</span> {questionData[option]}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuizCard;