import { useContext } from 'react';
import bg from './assets/images/bg.png'
import bg_light from './assets/images/bg_light.png'
import { Routes, Route } from 'react-router-dom';
import { ThemeContext } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Games from './pages/Games';
import Utilities from './pages/Utilities';
import Entertainment from './pages/Entertainment';
import Randomizers from './pages/Randomizers';
import Terms from './pages/Terms'
import Policy from './pages/policy'
import Cookies from './pages/Cookies'
import License from './pages/License'

function App() {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === "dark"
  let themeclass = isDark ? "bg-[#0f1056] text-gray-100" : "bg-[#E8F9FF] text-gray-900";

  return (
    <div className={`min-h-screen flex flex-col justify-between font-[roboto] ${themeclass}`}
      style={{
        backgroundImage: `url(${isDark ? bg : bg_light})`
      }}
    >
      <Navbar />
      {/* ${isDark ? "bg-[#151269]/50" : "bg-[#ffffff]/50"} */}
      <div className={`min-h-[calc(100vh-100px)] flex justify-center items-center
      `}
      >
        <Routes>
          <Route path="/MiniXpress/" element={<Home />} />
          <Route path="/MiniXpress/games/*" element={<Games />} />
          <Route path="/MiniXpress/utilities/*" element={<Utilities />} />
          <Route path="/MiniXpress/entertainment/*" element={<Entertainment />} />
          <Route path="/MiniXpress/randomizers/*" element={<Randomizers />} />
          <Route path="/MiniXpress/terms" element={<Terms />} />
          <Route path="/MiniXpress/policy" element={<Policy />} />
          <Route path="/MiniXpress/cookies" element={<Cookies />} />
          <Route path="/MiniXpress/license" element={<License />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;