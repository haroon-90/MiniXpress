import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = ["red", "green", "blue", "yellow", "purple", "orange"];

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const ColorTrapGame = () => {
    const [wordColor, setWordColor] = useState("");
    const [textColor, setTextColor] = useState("");
    const [showWord, setShowWord] = useState(false);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [status, setStatus] = useState("waiting");
    const [round, setRound] = useState(0);

    const startGame = () => {
        setScore(0);
        setLives(3);
        setStatus("playing");
        setRound(1);
    };

    useEffect(() => {
        if (status === "playing") {
            const colorText = getRandomColor();
            let fontColor = getRandomColor();
            while (fontColor === colorText) {
                fontColor = getRandomColor();
            }
            setWordColor(colorText);
            setTextColor(fontColor);
            setShowWord(true);

            const hideTimeout = setTimeout(() => {
                setShowWord(false);
            }, 1000);

            const missTimeout = setTimeout(() => {
                handleMiss();
            }, 3000);

            return () => {
                clearTimeout(hideTimeout);
                clearTimeout(missTimeout);
            };
        }
    }, [round, status]);

    const handleClick = (selectedColor) => {
        if (status !== "playing" || !wordColor) return;
        if (selectedColor === wordColor) {
            setScore((prev) => prev + 1);
            setTimeout(() => setRound((r) => r + 1), 500);
        } else {
            handleMiss();
        }
    };

    const handleMiss = () => {
        setLives((prev) => {
            if (prev <= 1) {
                setStatus("gameover");
                return 0;
            } 
            else {
                setTimeout(() => setRound((r) => r + 1), 500);
                return prev - 1;
            }
        });
    };

    const getColorClass = (color) => {
        return {
            red: "text-red-500",
            green: "text-green-500",
            blue: "text-blue-500",
            yellow: "text-yellow-400",
            purple: "text-purple-500",
            orange: "text-orange-500",
        }[color];
    };

    return (
        <div className="p-4 bg-blue-800/20 backdrop-blur-[3px] rounded-xl flex flex-col items-center justify-center px-4 text-center">
            <motion.h1 
                className="text-5xl font-extrabold mb-6 drop-shadow-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Color Trap Challenge
            </motion.h1>

            <div className="mb-4 text-lg font-semibold space-x-4">
                <span className="bg-blue-800/20 px-3 py-1 rounded-full shadow-sm">Score: {score}</span>
                <span className="bg-blue-800/20 px-3 py-1 rounded-full shadow-sm">Lives: {"❤️".repeat(lives)}</span>
            </div>

            {status === "waiting" && (
                <motion.button
                    onClick={startGame}
                    className="bg-[#FFA500] hover:bg-[#ffa600dd] font-bold px-6 py-3 rounded-full shadow-xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    Start Game
                </motion.button>
            )}

            {status === "gameover" && (
                <motion.div
                    className="bg-blue-800/20 px-6 py-4 rounded-xl shadow-lg mt-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <p className="text-xl font-semibold text-red-600 mb-3">Game Over! Final Score: {score}</p>
                    <button
                        onClick={startGame}
                        className="bg-[#FFA500] hover:bg-[#ffa600dd] text-black font-bold px-5 py-2 rounded-full shadow-md"
                    >
                        Try Again
                    </button>
                </motion.div>
            )}

            {status === "playing" && (
                <>
                    <div className="h-24 flex items-center justify-center mb-6">
                        <AnimatePresence>
                            {showWord ? (
                                <motion.h2
                                    key={wordColor + textColor + round}
                                    className={`text-3xl font-extrabold drop-shadow-lg ${getColorClass(textColor)}`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {wordColor.toUpperCase()}
                                </motion.h2>
                            ) : (
                                <motion.p
                                    key="thinking"
                                    className="text-xl text-gray-400 italic"
                                >
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="grid grid-cols-3 gap-4 max-w-md">
                        {COLORS.map((color) => (
                            <motion.button
                                key={color}
                                onClick={() => handleClick(color)}
                                whileTap={{ scale: 1.2 }}
                                whileHover={{ scale: 1.05 }}
                                className={`px-4 py-2 rounded-full text-white font-bold shadow-md transition-all duration-200
                                    ${
                                        {
                                            red: "bg-red-500",
                                            green: "bg-green-500",
                                            blue: "bg-blue-500",
                                            yellow: "bg-yellow-400 text-black",
                                            purple: "bg-purple-500",
                                            orange: "bg-orange-500",
                                        }[color]
                                    }`}
                            >
                                {color.toUpperCase()}
                            </motion.button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ColorTrapGame;