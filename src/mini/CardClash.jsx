import React, { useEffect, useState, useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext.jsx"
import { motion } from "framer-motion"
import backCard from "../assets/images/back_card.png"

import img1 from "../assets/images/card1.jpg"
import img2 from "../assets/images/card2.jpg"
import img3 from "../assets/images/card3.jpg"
import img4 from "../assets/images/card4.jpg"
import img5 from "../assets/images/card5.jpg"
import img6 from "../assets/images/card6.jpg"
import img7 from "../assets/images/card7.jpg"
import img8 from "../assets/images/card8.jpg"

const cardImages = [img1, img2, img3, img4, img5, img6, img7, img8]

const shuffleCards = () => {
  const duplicatedCards = [...cardImages, ...cardImages]
  return duplicatedCards
    .map((img, index) => ({ id: index, img, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5)
}

const CardClash = () => {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === "dark"

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    cardImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    setCards(shuffleCards());
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].img === cards[second].img) {
        const newCards = cards.map((card, idx) =>
          idx === first || idx === second ? { ...card, matched: true } : card
        );
        setCards(newCards);
        setMoves((m) => m + 1);
      } else {
        setTimeout(() => {
          const newCards = cards.map((card, idx) =>
            idx === first || idx === second ? { ...card, flipped: false } : card
          );
          setCards(newCards);
          setMoves((m) => m + 1);
        }, 500);
      }
      setFlippedCards([]);
    }
  }, [flippedCards, cards]);

  const handleCardClick = (index) => {
    if (flippedCards.length < 2 && !cards[index].flipped && !cards[index].matched) {
      const newCards = [...cards];
      newCards[index].flipped = true;
      setCards(newCards);
      setFlippedCards([...flippedCards, index]);
    }
  };

  const resetGame = () => {
    setCards(shuffleCards());
    setFlippedCards([]);
    setMoves(0);
  };

  return (
    <motion.div
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ clipPath: 'circle(0% at 50% 50%)' }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <div
        className="p-4 sm:p-6 bg-blue-800/20 backdrop-blur-[2px] rounded-lg my-4"
      >
        <div className="flex items-center justify-center mt-4 mb-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Card Clash</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto mt-6 p-4">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="w-[calc(25%-1rem)] md:w-[calc(12.5%-1rem)] aspect-[3/4] cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
              <img
                src={card.flipped || card.matched ? card.img : backCard}
                alt="card"
                className={`w-full h-full object-cover ${(!card.flipped && isDark && !card.matched) ? "invert-100" : ""} rounded-lg shadow-md transition-transform duration-500`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: card.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              />
            </div>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 p-4 rounded-xl shadow-lg"
          style={{
            backgroundColor: isDark ? "#0f1056" : "#E8F9FF",
          }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <span className="text-base sm:text-lg font-semibold border border-[#FFA500] rounded-full px-5 py-2 shadow-inner text-center">
              {moves} moves
            </span>

            <button
              onClick={resetGame}
              className="bg-[#FFA500] hover:bg-[#F1A100] text-black font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:scale-105"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CardClash;
