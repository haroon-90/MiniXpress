import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion } from "framer-motion"
import Musicplayer from '../mini/MusicPlayer.jsx'

import Card from '../parts/card'

import music_icon from '../assets/svg/music_logo.svg'

const Entertainment = () => {
    const location = useLocation()
    const isInGame = ['musicplayer'].some((slug) =>
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
                        <Card title="MusicPlayer" icon={music_icon} />
                        {/* <Card title="Entertainment 2" />
                        <Card title="Entertainment 3" />
                        <Card title="Entertainment 4" />
                        <Card title="Entertainment 5" />
                        <Card title="Entertainment 6" />
                        <Card title="Entertainment 7" /> */}
                    </div>
                )}

                <Routes>
                    <Route path="musicplayer" element={<Musicplayer />} />
                    {/* Future nested routes can go here */}
                </Routes>
            </div>
        </motion.div>
    )
}

export default Entertainment
