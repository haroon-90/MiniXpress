import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext.jsx"

// Helper to color each letter based on guess
const getColors = (guess, solution) => {
  const colors = Array(5).fill("bg-gray-300"); // Default color
  const solutionLetters = solution.split("");

  // First pass → Green
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      colors[i] = "bg-green-500";
      solutionLetters[i] = null;
    }
  }

  // Second pass → yellow
  for (let i = 0; i < 5; i++) {
    if (colors[i] === "bg-blue-500") continue;
    const index = solutionLetters.indexOf(guess[i]);
    if (index !== -1) {
      colors[i] = "bg-yellow-400";
      solutionLetters[index] = null;
    }
  }

  return colors;
};

const GameBoard = ({ guesses, currentGuess, solution }) => {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === "dark"

  const rows = [];

  for (let i = 0; i < 6; i++) {
    let word = "";
    let colors = [];

    if (i < guesses.length) {
      word = guesses[i];
      colors = getColors(word, solution);
    } else if (i === guesses.length) {
      word = currentGuess;
    }

    const paddedWord = word.padEnd(5, " ");
    const letters = paddedWord.split("");

    rows.push(
      <div key={i} className="flex gap-2 justify-center">
        {letters.map((letter, j) => {
          const bgColor = colors[j] || (letter.trim() === ""
            ? (isDark ? "bg-gray-700" : "bg-white")
            : (isDark ? "bg-blue-200" : "bg-gray-300"));

          const borderColor = colors[j]
            ? "border-transparent"
            : (isDark ? "border-blue-400" : "border-gray-400");

          const textColor = "text-black";

          return (
            <div
              key={j}
              className={`w-14 h-14 flex items-center justify-center font-bold text-xl uppercase rounded transition-all duration-300
                ${bgColor} ${borderColor} ${textColor} border-2`}
            >
              {letter}
            </div>
          );
        })}
      </div>
    );
  }

  return <div className="space-y-2">{rows}</div>;
};

export default GameBoard;
