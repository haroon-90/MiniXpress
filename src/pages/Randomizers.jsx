import { Routes, Route, useLocation } from 'react-router-dom'
import { motion } from "framer-motion"
import Rolldice from '../mini/RollDice.jsx'
import Quickquiz from '../mini/QuickQuiz.jsx'

import Card from '../parts/card'
import Dice_icon from '../assets/svg/dice_logo.svg'
import Quickquiz_icon from '../assets/svg/QuickQuiz.svg'

const Randomizers = () => {
    const location = useLocation()
    const isInGame = ['rolldice', 'quickquiz'].some((slug) =>
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
                        <Card title="RollDice" icon={Dice_icon} />
                        <Card title="QuickQuiz" icon={Quickquiz_icon} />
                        {/* <Card title="Randomizers 2" />
                        <Card title="Randomizers 3" />
                        <Card title="Randomizers 4" />
                        <Card title="Randomizers 5" />
                        <Card title="Randomizers 6" /> */}
                    </div>
                )}

                <Routes>
                    <Route path="rolldice" element={<Rolldice />} />
                    <Route path="quickquiz" element={<Quickquiz />} />
                    {/* Future nested routes can go here */}
                </Routes>
            </div>
        </motion.div>
    )
}

export default Randomizers
