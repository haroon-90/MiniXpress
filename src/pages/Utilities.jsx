import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion } from "framer-motion"
import Calculator from '../mini/Calculator.jsx'
import FlipCoin from '../mini/FlipCoin.jsx'
import Stopwatch from '../mini/StopWatch.jsx'
import Taskify from '../mini/Taskify.jsx'

import Card from '../parts/card'
import Calculator_icon from '../assets/svg/calculator_logo.svg'
import Flipcoin_icon from '../assets/svg/coin_logo.svg'
import Stopwatch_icon from '../assets/svg/Stopwatch_logo.svg'
import Taskify_icon from '../assets/svg/Taskify_icon.svg'

const Utilities = () => {
    const location = useLocation()
    const isInGame = ['calculator', 'flipcoin', 'stopwatch', 'taskify'].some((slug) =>
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
                        <Card title="Calculator" icon={Calculator_icon} />
                        <Card title="FlipCoin" icon={Flipcoin_icon} />
                        <Card title="Stopwatch" icon={Stopwatch_icon} />
                        <Card title="Taskify" icon={Taskify_icon} />
                    </div>
                )}

                <Routes>
                    <Route path="calculator" element={<Calculator />} />
                    <Route path="flipcoin" element={<FlipCoin />} />
                    <Route path="stopwatch" element={<Stopwatch />} />
                    <Route path="taskify" element={<Taskify />} />
                    {/* Future nested routes can go here */}
                </Routes>
            </div>
        </motion.div>
    )
}

export default Utilities
