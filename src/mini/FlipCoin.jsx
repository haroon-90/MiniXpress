import React, { useState, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext.jsx"
import { motion } from "framer-motion"

const FlipCoin = () => {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === "dark"

  const [side, setSide] = useState("coin");
  const [flipping, setFlipping] = useState(false);

  const flipCoin = () => {
    setFlipping(true);
    const outcomes = ["Heads", "Tails"];
    const result = outcomes[Math.floor(Math.random() * outcomes.length)];

    setTimeout(() => {
      setSide(result);
      setFlipping(false);
    }, 400);
  };

  return (
    <motion.div
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ clipPath: 'circle(0% at 50% 50%)' }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <div
        className="text-center p-6 max-w-md mx-auto bg-blue-800/20 backdrop-blur-[2px] my-4 rounded-lg"
        style={{
          color: isDark ? "#ffffff" : "#000000",
        }}
      >
        <h2 className="text-2xl font-bold mb-4">🪙 Flip a Coin</h2>

        <div className="w-32 h-32 mx-auto mb-4">
          <div
            className={`w-full h-full rounded-full flex items-center justify-center text-2xl font-semibold border-4 transition-transform duration-400 ease-in-out ${flipping ? "rotate-y-180 translate-y-[-10px]" : ""
              } ${side === "Heads" ? "bg-yellow-400 text-black" : "bg-gray-800 text-white"}`}
          >
            {!flipping ? side : "🪙"}
          </div>
        </div>

        <button
          onClick={flipCoin}
          disabled={flipping}
          className="bg-[#FFA500] hover:bg-[#ffbf00] text-black font-semibold px-6 py-2 rounded-full transition disabled:opacity-50"
        >
          {flipping ? "Flipping..." : "Flip Coin"}
        </button>
      </div>
    </motion.div>
  );
};

export default FlipCoin;
