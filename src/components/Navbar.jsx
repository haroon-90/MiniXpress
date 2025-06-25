import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { ThemeContext } from '../contexts/ThemeContext'
import LogoIcon from '../assets/svg/MiniXpress_icon2.svg'
import LogoText from '../assets/svg/MiniXpress_text.svg'

function Navbar() {
    const { toggleTheme, theme } = useContext(ThemeContext)
    const isDark = theme === "dark"
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => setMenuOpen((open) => !open);

    return (
        <nav className="px-8 py-4 flex justify-between items-center backdrop-blur-[4px] border-b relative">
            <div className="flex gap-2 justify-center items-center">
                <img src={LogoIcon} alt="logo" className='h-12' />
                <img src={LogoText} alt="logo" className='h-5' />
            </div>
            <div className='flex md:justify-between justify-end items-center w-[65%]'>
                <div className="hidden md:flex space-x-4">
                    <Link className="hover:text-[#FFA500] relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FFA500] after:transition-all after:duration-300 hover:after:w-full " to="/games">Games</Link>
                    <Link className="hover:text-[#FFA500] relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FFA500] after:transition-all after:duration-300 hover:after:w-full " to="/utilities">Utilities</Link>
                    <Link className="hover:text-[#FFA500] relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FFA500] after:transition-all after:duration-300 hover:after:w-full " to="/entertainment">Entertainment</Link>
                    <Link className="hover:text-[#FFA500] relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FFA500] after:transition-all after:duration-300 hover:after:w-full " to="/randomizers">Randomizers</Link>
                </div>
                <button title='Theme' onClick={toggleTheme} className="px-2 py-1 border rounded-full ml-4">
                    {isDark ? <FaSun /> : <FaMoon />}
                </button>
            </div>
            <button
                className="md:hidden ml-4 z-20"
                onClick={handleMenuToggle}
                aria-label="Toggle menu"
            >
                {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            
            {menuOpen && (
                <div className={`absolute top-full right-0 mt-2 w-48 ${isDark ? "bg-white text-black" : "bg-blue-900 text-white"} shadow-lg rounded-md flex flex-col md:hidden z-10`}>
                    <Link
                        to="/games"
                        className={`px-4 py-2 ${isDark ? "hover:bg-gray-200" : "hover:bg-blue-700"}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        Games
                    </Link>
                    <Link
                        to="/utilities"
                        className={`px-4 py-2 ${isDark ? "hover:bg-gray-200" : "hover:bg-blue-700"}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        Utilities
                    </Link>
                    <Link
                        to="/entertainment"
                        className={`px-4 py-2 ${isDark ? "hover:bg-gray-200" : "hover:bg-blue-700"}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        Entertainment
                    </Link>
                    <Link
                        to="/randomizers"
                        className={`px-4 py-2 ${isDark ? "hover:bg-gray-200" : "hover:bg-blue-700"}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        Randomizers
                    </Link>
                </div>
            )}
        </nav>
    )
}
export default Navbar