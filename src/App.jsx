import { useContext, Suspense, lazy } from 'react';
import bg from './assets/images/bg.png'
import bg_light from './assets/images/bg_light.png'
import { Routes, Route } from 'react-router-dom';
import { ThemeContext } from './contexts/ThemeContext';
import LogoIcon from './assets/svg/MiniXpress_icon2.svg'

const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));
const Home = lazy(() => import('./pages/Home'));
const Games = lazy(() => import('./pages/Games'));
const Utilities = lazy(() => import('./pages/Utilities'));
const Entertainment = lazy(() => import('./pages/Entertainment'));
const Randomizers = lazy(() => import('./pages/Randomizers'));
const Terms = lazy(() => import('./pages/Terms'));
const Policy = lazy(() => import('./pages/Policy'));
const Cookies = lazy(() => import('./pages/Cookies'));
const License = lazy(() => import('./pages/License'));

function App() {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === "dark"
  let themeclass = isDark ? "bg-[#0f1056] text-gray-100" : "bg-[#E8F9FF] text-gray-900";

  return (
    <Suspense fallback={
    <div className={`flex justify-center items-center ${themeclass} min-h-screen`}>
        <img src={LogoIcon} alt="logo" className='h-30' />
    </div>}>
      <div className={`min-h-screen flex flex-col justify-between font-[roboto]  ${themeclass}`}
        style={{
          backgroundImage: `url(${isDark ? bg : bg_light})`
        }}
      >
        <Navbar />
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
    </Suspense>
  );
}

export default App;