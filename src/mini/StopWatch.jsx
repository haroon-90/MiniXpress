import React, { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext.jsx"
import { motion } from "framer-motion"

const StopWatch = () => {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === "dark"

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (timeInMilliseconds) => {
    const hours = Math.floor(timeInMilliseconds / 3600000);
    const minutes = Math.floor((timeInMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    const milliseconds = timeInMilliseconds % 1000;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds
        .toString()
        .padStart(3, "0")}`;
  };

  const handleStartStop = () => {
    setIsRunning((prevState) => !prevState);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <motion.div
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ clipPath: 'circle(0% at 50% 50%)' }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <div
        className="p-6 w-80 mx-auto bg-blue-800/20 backdrop-blur-[2px] my-4 rounded-lg"
        style={{
          color: isDark ? "#ffffff" : "#000000",
        }}
      >
        <h2 className="flex justify-center gap-2 text-center text-3xl font-bold mb-4">
          <lord-icon
            src="https://cdn.lordicon.com/kiqyrejq.json"
            trigger="hover"
            colors="primary:#e88c30">
          </lord-icon>
          <span>Stop Watch</span></h2>

        <div className="mb-6 text-center text-3xl font-semibold">
          {formatTime(time)}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleStartStop}
            className="bg-[#25d366] hover:bg-[#00e19e] text-black font-semibold py-3 px-6 rounded-lg transition"
          >
            {isRunning ?
              <lord-icon
                src="https://cdn.lordicon.com/gzpbhanm.json"
                trigger="hover">
              </lord-icon>
              :
              <lord-icon
                src="https://cdn.lordicon.com/rfoqztsr.json"
                trigger="hover">
              </lord-icon>
            }
          </button>

          <div
            onClick={handleReset}
            className="bg-[#FF6347] hover:bg-[#FF4C36] text-black font-semibold py-3 px-6 rounded-lg transition"
          >
            <lord-icon
              src="https://cdn.lordicon.com/ibckyoan.json"
              trigger="click">
            </lord-icon>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StopWatch;
