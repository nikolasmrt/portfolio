import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaCode, FaEnvelope, FaGlobeAmericas } from 'react-icons/fa';
import { playHover, playClick } from '../utils/sounds'; // Importando do novo arquivo

const Navbar = ({ lang, toggleLang }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path 
      ? "text-cyan-400 scale-125 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" 
      : "text-slate-400 hover:text-white hover:scale-110";
  };

  // Funções simples agora
  const handleHover = () => playHover();
  const handleClick = () => playClick();

  return (
    <div className="fixed z-50 flex flex-col items-center w-full gap-4 px-4 transform -translate-x-1/2 bottom-8 left-1/2">
      <nav className="flex items-center gap-10 px-10 py-5 text-2xl transition-all border shadow-2xl bg-slate-900/80 backdrop-blur-xl rounded-2xl border-slate-700/50">
        
        <Link to="/" className={`transition-all duration-300 ${isActive('/')}`} onMouseEnter={handleHover} onClick={handleClick}><FaHome /></Link>
        <Link to="/about" className={`transition-all duration-300 ${isActive('/about')}`} onMouseEnter={handleHover} onClick={handleClick}><FaUser /></Link>
        <Link to="/projects" className={`transition-all duration-300 ${isActive('/projects')}`} onMouseEnter={handleHover} onClick={handleClick}><FaCode /></Link>
        <Link to="/contact" className={`transition-all duration-300 ${isActive('/contact')}`} onMouseEnter={handleHover} onClick={handleClick}><FaEnvelope /></Link>
        
        <div className="w-px h-8 mx-2 bg-slate-700"></div>

        <button 
            onClick={() => { toggleLang(); handleClick(); }}
            onMouseEnter={handleHover}
            className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors font-pixel text-cyan-400 hover:text-white"
        >
            <FaGlobeAmericas className="text-xl"/> {lang === 'pt' ? 'BR' : 'EN'}
        </button>
      </nav>
    </div>
  );
};

export default Navbar;