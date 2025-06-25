import React from 'react'
import { Link } from 'react-router-dom'
import LogoText from '../assets/svg/MiniXpress_text.svg'

const Footer = () => {
  return (
    <footer className=" border-t backdrop-blur-[4px]">
      <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className=''>
          <img className='h-10 mb-2' src={LogoText} alt="MiniXpress" />
          <p className="text-sm">Developed with ❤️ by Haroon.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Connect with Us</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="https://github.com/haroon-90" target="_blank" className="hover:underline">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/muhammad-haroon-nawaz-206343362/" target="_blank" className="hover:underline">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/haroon_nawaz_/" target="_blank" className="hover:underline">Instagram</a></li>
          </ul>
        </div>

          <div>
            <h5 className="font-semibold mb-1">Legal</h5>
            <ul className="space-y-1 text-sm">
              <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
              <li><Link to="/policy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="hover:underline">Cookies Policy</Link></li>
              <li><Link to="/license" className="hover:underline">License Info</Link></li>
            </ul>
          </div>
        </div>

      <div className="text-center py-4 border-t text-xs dark:text-gray-500">
        &copy; 2025 MiniXpress. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
