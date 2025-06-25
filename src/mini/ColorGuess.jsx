import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext.jsx"
import { motion } from "framer-motion"
import red from "../assets/sounds/red.mp3";
import green from "../assets/sounds/green.mp3";
import blue from "../assets/sounds/blue.mp3";
import yellow from "../assets/sounds/yellow.mp3";

const colors = ["red", "green", "blue", "yellow"];
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const soundMap = {
    red,
    green,
    blue,
    yellow
};

const ColorGame = () => {
    const { theme } = useContext(ThemeContext)
    const isDark = theme === "dark"

    const [pattern, setPattern] = useState([]);
    const [userInput, setUserInput] = useState([]);
    const [level, setLevel] = useState(0);
    const [message, setMessage] = useState("Tap Start to Begin");
    const [showingPattern, setShowingPattern] = useState(false);
    const [activeColor, setActiveColor] = useState(null);
    const [userClickColor, setUserClickColor] = useState(null);
    const [highScore, setHighScore] = useState(
        parseInt(localStorage.getItem("highScore")) || 0
    );

    useEffect(() => {
        soundMap.current = {
            red: new Audio(red),
            green: new Audio(green),
            blue: new Audio(blue),
            yellow: new Audio(yellow),
        };

        Object.values(soundMap.current).forEach((audio) => {
            audio.preload = "auto";
            audio.load();
        });
    }, []);


    const playSound = (color) => {
        const audioPath = soundMap[color];
        if (audioPath) {
            const sound = new Audio(audioPath);
            sound.currentTime = 0;
            sound.play();
        }
    };

    const startGame = () => {
        const firstColor = getRandomColor();
        setPattern([firstColor]);
        setUserInput([]);
        setLevel(1);
        setMessage("Watch the pattern...");
        setShowingPattern(true);
    };

    useEffect(() => {
        if (showingPattern && pattern.length > 0) {
            let i = 0;
            const interval = setInterval(() => {
                const currentColor = pattern[i];
                highlightColor(currentColor);
                playSound(currentColor);
                i++;
                if (i >= pattern.length) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setMessage("Now your turn!");
                        setShowingPattern(false);
                    }, 300);
                }
            }, 600);
        }
    }, [showingPattern]);

    const highlightColor = (color) => {
        setActiveColor(color);
        setTimeout(() => setActiveColor(null), 300);
    };

    const handleColorClick = (color) => {
        if (showingPattern || pattern.length === 0) return;

        setUserClickColor(color);
        setTimeout(() => setUserClickColor(null), 200);
        playSound(color);

        const newInput = [...userInput, color];
        setUserInput(newInput);

        if (color !== pattern[newInput.length - 1]) {
            setMessage("Wrong! Try Again.");
            if (level > highScore) {
                localStorage.setItem("highScore", level);
                setHighScore(level);
            }
            setPattern([]);
            setUserInput([]);
            setLevel(0);
            return;
        }

        if (newInput.length === pattern.length) {
            setMessage("Great! Next Level...");
            setTimeout(() => {
                const nextPattern = [...pattern, getRandomColor()];
                setPattern(nextPattern);
                setUserInput([]);
                setLevel((prev) => prev + 1);
                setMessage("Watch the pattern...");
                setShowingPattern(true);
            }, 900);
        }
    };

    return (
        <motion.div
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(150% at 50% 50%)' }}
            exit={{ clipPath: 'circle(0% at 50% 50%)' }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
            <div
                className={`flex flex-col items-center justify-center text-center p-6 py-8 bg-blue-800/20 backdrop-blur-[2px] my-4 rounded-lg`}
            >
                <h1 className={`text-4xl font-extrabold mb-4 drop-shadow-lg ${isDark ? "" : "text-black"}`}>
                    Color Memory Game
                </h1>

                <div className="mb-3 space-x-4 text-sm">
                    <span className="px-4 py-1 bg-blue-600 text-white font-semibold rounded-full shadow-sm">
                        Level: {level}
                    </span>
                    <span className="px-4 py-1 bg-green-600 text-white font-semibold rounded-full shadow-sm">
                        High Score: {highScore}
                    </span>
                </div>

                <p className="mb-6 text-lg font-semibold transition">{message}</p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => handleColorClick(color)}
                            disabled={showingPattern}
                            className={`w-28 h-28 rounded-full transition-all duration-200 shadow-md border-4
              ${color === "red" ? "bg-red-500" : ""}
              ${color === "green" ? "bg-green-500" : ""}
              ${color === "blue" ? "bg-blue-500" : ""}
              ${color === "yellow" ? "bg-yellow-400" : ""}
              ${activeColor === color
                                    ? "ring-4 ring-black scale-110 animate-pulse"
                                    : userClickColor === color
                                        ? "ring-4 ring-purple-500 scale-105"
                                        : "ring-0"
                                }`}
                        ></button>
                    ))}
                </div>

                <button
                    onClick={startGame}
                    className="px-8 py-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold text-lg rounded-full shadow-xl transition-all duration-200"
                >
                    {level === 0 ? "Start Game" : "Restart"}
                </button>
            </div>
        </motion.div>
    );
};

export default ColorGame;
