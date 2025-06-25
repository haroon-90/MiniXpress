import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext.jsx"

const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"]
];

const Keyboard = ({ onKeyPress }) => {
    const [pressedKey, setPressedKey] = useState(null);
    const { theme } = useContext(ThemeContext)
    const isDark = theme === "dark"

    useEffect(() => {
        const handleKeyDown = (e) => {
            let key = e.key;
            if (key.length === 1) key = key.toUpperCase();
            if (key === "Enter" || key === "Backspace" || /^[A-Z]$/.test(key)) {
                setPressedKey(key);
                onKeyPress && onKeyPress(key);
            }
        };

        const handleKeyUp = () => setPressedKey(null);

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [onKeyPress]);

    // 🎨 Dynamic styles based on theme
    const keyStyles = {
        base: `transition-all duration-150 shadow-sm select-none flex items-center justify-center font-bold`,
        normal: isDark
            ? "bg-gradient-to-b from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white"
            : "bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-800",
        special: isDark
            ? "bg-gradient-to-b from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white"
            : "bg-gradient-to-b from-blue-200 to-blue-400 hover:from-blue-300 hover:to-blue-500 text-blue-900",
        backspace: isDark
            ? "bg-gradient-to-b from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white"
            : "bg-gradient-to-b from-red-200 to-red-400 hover:from-red-300 hover:to-red-500 text-red-900"
    };

    return (
        <div
            className="flex flex-col items-center gap-2 p-4 rounded-2xl shadow-lg border transition-all duration-300"
            style={{
                backgroundColor: isDark ? "#2A2B31" : "#f9f9f9",
                borderColor: isDark ? "#444" : "#ddd",
                color: isDark ? "#fff" : "#000"
            }}
        >
            <p className="hidden md:inline">Pressed key: <span className="font-mono">{pressedKey || "None"}</span></p>

            {keys.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1">
                    {row.map((key) => {
                        let style = keyStyles.base + " ";
                        if (key === "Enter") style += keyStyles.special;
                        else if (key === "Backspace") style += keyStyles.backspace;
                        else style += keyStyles.normal;

                        return (
                            <button
                                key={key}
                                onClick={() => onKeyPress(key)}
                                className={`${style} rounded-xl md:px-3 md:py-1 px-2 text-lg active:scale-95`}
                                tabIndex={0}
                                aria-label={key}
                            >
                                {key === "Backspace" ? "⌫" : key === "Enter" ? "⏎" : key}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Keyboard;
