import { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/translations';
import { playHover, playClick, playSound } from '../utils/sounds'; 
import PageTransition from '../components/PageTransition';
import SoundTitle from '../components/SoundTitle';
import SnakeGame from '../components/SnakeGame';

const Home = () => {
  const { lang, toggleLang } = useOutletContext();
  const t = content[lang];
  const [introFinished, setIntroFinished] = useState(false);

  const easterEggTarget = "NIKOLAS"; 
  const [clickedChars, setClickedChars] = useState(new Set()); 
  const [showEasterEggGame, setShowEasterEggGame] = useState(false); 
  const [snakeScore, setSnakeScore] = useState(0); 
  
  useEffect(() => {
    const timer = setTimeout(() => setIntroFinished(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleCharClick = (char, index) => {
    const upperChar = char.toUpperCase();
    playClick(); 

    if (easterEggTarget[index] === upperChar) {
      setClickedChars((prev) => {
        const newSet = new Set(prev);
        newSet.add(index); 
        if (newSet.size === easterEggTarget.length) {
          setTimeout(() => setShowEasterEggGame(true), 300); 
          newSet.clear(); 
        }
        return newSet;
      });
    } else {
      setClickedChars(new Set());
    }
  };

  const handleGameEnd = (finalScore) => {
    setSnakeScore(finalScore);
    setShowEasterEggGame(false); 
  };

  const renderSoundTitleForEasterEgg = () => {
    const nameChars = t.homeTitleSpan.split('');
    
    return (
      <div className="relative z-40 mt-2 text-5xl font-bold leading-tight tracking-tight cursor-default md:text-7xl lg:text-8xl font-pixel">
        <div className="relative z-20 flex flex-wrap items-center justify-center gap-x-3 md:gap-x-4">
        {nameChars.map((char, index) => (
            <motion.span
                key={index}
                whileHover={{ y: -5, scale: 1.2, filter: "brightness(1.5)" }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`inline-block cursor-pointer font-pixel relative z-20 transition-all duration-300
                            ${clickedChars.has(index) ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
                            text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.9)] filter brightness-125`}
                onMouseEnter={() => playSound('/special.mp3', 0.3, true)}
                onClick={() => handleCharClick(char, index)}
            >
                {char}
            </motion.span>
        ))}
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      {!introFinished ? (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[999] bg-slate-950 flex flex-col items-center justify-center gap-6 px-10"
          onClick={() => {}} 
        >
          <div className="w-full max-w-lg h-6 bg-slate-900 border-2 border-slate-700 p-1 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee] relative"
            >
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]"></div>
            </motion.div>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-sm tracking-widest font-pixel text-cyan-400"
          >
            SYSTEM_BOOT...
          </motion.span>
        </motion.div>
      ) : (
        <PageTransition>
          <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[url('/wpp1.png')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-slate-900/90 relative overflow-hidden">
            
            <AnimatePresence>
                {showEasterEggGame && (
                    <motion.div
                        key="snake-game"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4"
                    >
                        <SnakeGame onGameEnd={handleGameEnd} />
                    </motion.div>
                )}
            </AnimatePresence>

            <button
              onClick={() => { toggleLang(); playClick(); }}
              onMouseEnter={playHover}
              className="absolute z-50 px-3 py-1 text-xs tracking-widest uppercase transition border rounded top-6 right-6 md:hidden border-cyan-500/50 text-cyan-400 font-pixel hover:bg-cyan-500 hover:text-slate-900"
            >
              {lang === 'pt' ? 'EN' : 'BR'}
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative z-10 w-full max-w-5xl"
            >
              <div className="relative z-30 flex flex-col items-center justify-center pointer-events-auto">
                
                <div className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white cursor-default md:text-5xl lg:text-6xl font-pixel drop-shadow-xl">
                  <SoundTitle
                    text={t.homeTitlePre}
                    soundFile="/hover.mp3"
                    colorClass="text-white"
                    onCharClick={() => setClickedChars(new Set())} 
                  />
                </div>

                {renderSoundTitleForEasterEgg()}

              </div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="relative z-20 mx-auto mt-12 mb-12 text-lg font-light leading-relaxed tracking-normal max-w-1xl md:text-2xl text-slate-300"
              >
                {t.homeSubtitle}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="relative z-20 flex flex-wrap justify-center gap-6"
              >
                <Link to="/projects">
                  <button
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="px-8 py-3 text-lg bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] transform hover:-translate-y-1"
                  >
                    {t.btnProjects}
                  </button>
                </Link>
                <Link to="/contact">
                  <button
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="px-8 py-3 text-lg font-bold transition-all transform border rounded-lg shadow-lg border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:-translate-y-1"
                  >
                    {t.btnContact}
                  </button>
                </Link>
              </motion.div>

              {snakeScore > 0 && !showEasterEggGame && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-xl font-pixel text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                >
                    High Score: {snakeScore}
                </motion.p>
              )}

            </motion.div>
          </div>
        </PageTransition>
      )}
    </AnimatePresence>
  );
};

export default Home;