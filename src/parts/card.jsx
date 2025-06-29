import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from "../contexts/ThemeContext.jsx"
import Logo from '../assets/svg/MiniXpress_icon2.svg'

const Card = (prop) => {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === "dark"
  const { title, icon } = prop
  const lowertitle = title.toLowerCase()

  return (
    <Link
      to={lowertitle}
      className={`flex flex-col justify-center items-center bg-[#FFA500] md:h-[30vh] md:w-[20vw] h-[40vw] min-w-[14vh] text-center p-6 rounded-[2rem] transition-transform duration-300 ease-out transform hover:-translate-y-2 
        ${isDark
          ? "shadow-[0_20px_50px_rgba(255,165,0,0.3)] hover:shadow-[0_30px_60px_rgba(255,165,0,0.5)]"
          : "shadow-[0_20px_50px_rgba(255,209,124,0.3)] hover:shadow-[0_30px_60px_rgba(255,209,124,0.5)]"
        }`}
    >
      <img
        src={icon || Logo}
        alt={lowertitle}
        className={`w-20 h-20 mb-4 transition-transform duration-300 ${isDark ? "invert" : ""} hover:scale-110`}
      />
      <span className="text-2xl font-bold tracking-wide drop-shadow-md">
        {title}
      </span>
    </Link>
  )
}

export default Card
