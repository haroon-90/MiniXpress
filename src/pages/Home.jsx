import { motion } from "framer-motion"
import Card from '../parts/card.jsx'

import Games_Icon from "../assets/svg/Game_Icon.svg"
import Entertainment_Icon from "../assets/svg/Entertainment_Icon.svg"
import Utilities_Icon from "../assets/svg/Utilities_Icon.svg"
import Randomizers_Icon from "../assets/svg/Randomizers_Icon.svg"

const Home = () => {
  return (
    <motion.div
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ clipPath: 'circle(0% at 50% 50%)' }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <div className="h-[calc(100vh-136px)] w-full mx-auto flex flex-col md:flex-row gap-4 justify-around items-center">
        <div className='flex gap-2'>
          <div className='flex flex-col gap-2 flex-wrap justify-center md:justify-start'>
            <Card title="Games" icon={Games_Icon} />
            <Card title="Utilities" icon={Utilities_Icon} />
          </div>
          <div className='flex flex-col gap-2 flex-wrap justify-center md:justify-start'>
            <Card title="Entertainment" icon={Entertainment_Icon} />
            <Card title="Randomizers" icon={Randomizers_Icon} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Home
