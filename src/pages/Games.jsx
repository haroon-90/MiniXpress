import { Routes, Route, useLocation } from 'react-router-dom'
import { motion } from "framer-motion"
import CardClash from '../mini/CardClash'
import ColorGame from '../mini/ColorGuess'
import TicTacToe from '../mini/TicTacToe'
import WordGuess from '../mini/WordGuess.jsx'
import Mindmatch from '../mini/MindMatch.jsx'

import Card from '../parts/card.jsx'

import CardClash_icon from '../assets/svg/Card_Clash_Logo.svg'
import ColorGuess_icon from '../assets/svg/ColorGuess_Logo.svg'
import TicTacToe_icon from '../assets/svg/Tic_Tac_Toe_Logo.svg'
import Wordguess_icon from '../assets/svg/Wordguess_logo.svg'
import Mindmatch_icon from '../assets/svg/Mindmatch_logo.svg'

const Games = () => {
  const location = useLocation()
  const isInGame = ['cardclash', 'colorgame', 'tictactoe', 'wordguess', 'mindmatch'].some((slug) =>
    location.pathname.includes(slug)
  )

  return (
    <motion.div
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ clipPath: 'circle(0% at 50% 50%)' }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <div className='flex flex-col'>
        {!isInGame && (
          <div className='flex justify-center items-center flex-wrap gap-2'>
            <Card title="CardClash" icon={CardClash_icon} />
            <Card title="ColorGame" icon={ColorGuess_icon} />
            <Card title="TicTacToe" icon={TicTacToe_icon} />
            <Card title="WordGuess" icon={Wordguess_icon} />
            <Card title="MindMatch" icon={Mindmatch_icon} />
          </div>
        )}

        <Routes>
          <Route path="cardclash" element={<CardClash />} />
          <Route path="colorgame" element={<ColorGame />} />
          <Route path="tictactoe" element={<TicTacToe />} />
          <Route path="wordguess" element={<WordGuess />} />
          <Route path="mindmatch" element={<Mindmatch />} />
          {/* Future nested routes can go here */}
        </Routes>
      </div>
    </motion.div>
  )
}

export default Games
