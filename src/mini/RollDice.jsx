import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../contexts/ThemeContext.jsx"

import Dice0 from "../assets/svg/dice/Dice_0.svg";
import Dice1 from "../assets/svg/dice/Dice_1.svg";
import Dice2 from "../assets/svg/dice/Dice_2.svg";
import Dice3 from "../assets/svg/dice/Dice_3.svg";
import Dice4 from "../assets/svg/dice/Dice_4.svg";
import Dice5 from "../assets/svg/dice/Dice_5.svg";
import Dice6 from "../assets/svg/dice/Dice_6.svg";

const diceImages = [Dice0, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

const RollDice = () => {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === "dark"

  const [diceValue, setDiceValue] = useState(0);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);

    let rollCount = 0;
    const interval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(randomValue);
      rollCount++;
      if (rollCount >= 10) {
        clearInterval(interval);
        setRolling(false);
      }
    }, 100);
  };

  return (<motion.div
    initial={{ clipPath: 'circle(0% at 50% 50%)' }}
    animate={{ clipPath: 'circle(150% at 50% 50%)' }}
    exit={{ clipPath: 'circle(0% at 50% 50%)' }}
    transition={{ duration: 0.7, ease: 'easeInOut' }}
  >
    <div
      className="w-[50vw] h-auto flex flex-col items-center p-6 bg-blue-800/20 backdrop-blur-[2px] my-4 rounded-lg"
      style={{
        color: isDark ? "#ffffff" : "#000000",
      }}
    >
      <h2 className="text-2xl font-bold mb-6">Roll Dice</h2>

      <motion.img
        key={diceValue}
        src={diceImages[diceValue]}
        alt={`Dice ${diceValue}`}
        className={`md:w-[15vw] md:h-[15vw] w-[50vw] m-6 ${isDark ? "" : "invert"}`}
        initial={{ rotate: 0, scale: 0.8 }}
        animate={{
          rotate: [0, 180, 270, 360],
          scale: [1, 1.15, 1.05, 1],
        }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
        }}
      />

      <button
        onClick={rollDice}
        disabled={rolling}
        className="mt-6 bg-[#FFA500] hover:bg-[#ffd484] text-black font-bold py-2 px-6 rounded shadow-md transition-all duration-300"
      >
        {rolling ? "Rolling..." : "Roll Dice"}
      </button>
    </div>
  </motion.div>
  );
};

export default RollDice;
