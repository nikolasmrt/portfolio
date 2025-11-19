import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaAward, FaTimes } from 'react-icons/fa';
import { content, skillsData } from '../data/translations';
import { playHover, playClick } from '../utils/sounds';
import PageTransition from '../components/PageTransition';
import SoundTitle from '../components/SoundTitle';

const About = () => {
  const { lang } = useOutletContext();
  const t = content[lang];
  const [showExtras, setShowExtras] = useState(false);

  const certificates = [
    { name: "Python 3", issuer: "Curso em Vídeo", detail: "120h" },
    { name: "MySQL Database", issuer: "Curso em Vídeo", detail: "40h" },
    { name: "Git & GitHub", issuer: "Curso em Vídeo", detail: "20h" },
    { name: "Artificial Intelligence", issuer: "Curso em Vídeo", detail: "80h" },
    { name: "IA e Saúde Cognitiva", issuer: "PUC Minas / Sympla", detail: "2025" }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <PageTransition>
      <div className="flex flex-col items-center min-h-screen px-6 pt-24 pb-40 mx-auto bg-center bg-no-repeat bg-cover max-w-7xl bg-[url('/wpp2.png')] bg-blend-overlay bg-slate-900/90 rounded-xl my-4 shadow-2xl border border-slate-800">
        
        <div className="mb-16">
            <SoundTitle 
                prefix=">" 
                text={t.aboutTitle} 
                colorClass="text-3xl md:text-5xl font-bold text-white" 
                soundFile="/hover.mp3"
            />
            <div className="h-1 w-24 bg-cyan-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
        </div>

        <div className="grid items-start w-full gap-12 mb-24 md:grid-cols-12">
            
            <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-xs mx-auto cursor-pointer md:col-span-4 group md:mx-0"
                onClick={() => { setShowExtras(true); playClick(); }}
                onMouseEnter={playHover}
            >   
                <div className="absolute z-20 px-3 py-1 text-xs font-bold text-black transition-opacity transform -translate-x-1/2 bg-white rounded opacity-0 -top-8 left-1/2 group-hover:opacity-100 whitespace-nowrap font-pixel">
                    CLICK FOR EXTRAS!
                </div>

                <div className="absolute transition duration-500 -inset-1 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100"></div>
                <div className="relative z-10 overflow-hidden border-2 aspect-square rounded-2xl border-slate-700 bg-slate-800">
                    <img src="/perfil.png" alt="Profile" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 group-hover:grayscale-0 grayscale" />
                    <div className="absolute inset-0 transition-colors duration-300 bg-cyan-500/20 group-hover:bg-transparent"></div>
                </div>
            </motion.div>

            <div className="space-y-6 md:col-span-8">
                {t.aboutText.map((paragraph, index) => (
                    <motion.div 
                        key={index}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.15 }}
                        className="p-6 transition-colors border bg-slate-950/60 border-slate-700/50 rounded-xl hover:border-cyan-500/30 backdrop-blur-sm"
                    >
                        <p className="text-lg font-light leading-relaxed text-slate-300">
                            {paragraph}
                        </p>
                    </motion.div>
                ))}
                
                <motion.a
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    href="/cv-Nikolas_Martins.pdf" 
                    target="_blank"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="inline-flex items-center gap-2 px-6 py-3 mt-4 font-bold text-white transition-all rounded-lg bg-slate-700 hover:bg-cyan-600 group"
                >
                    <FaDownload className="group-hover:animate-bounce" /> Download CV
                </motion.a>
            </div>
        </div>

        <div className="w-full">
            <h3 className="flex items-center justify-center gap-3 mb-10 text-2xl font-bold text-center text-white font-pixel">
                <span className="text-cyan-400">&lt;</span> {t.skillsTitle} <span className="text-cyan-400">/&gt;</span>
            </h3>
            
            <motion.div 
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4"
            >
                {skillsData.map((skill) => (
                    <motion.div 
                        key={skill.name}
                        variants={item}
                        whileHover={{ y: -5, backgroundColor: "rgba(15, 23, 42, 0.9)" }}
                        onMouseEnter={playHover}
                        className="bg-slate-950/60 border border-slate-700 p-5 rounded-lg flex flex-col items-center justify-center gap-3 hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all cursor-default group backdrop-blur-sm"
                    >
                        <div className="text-4xl transition-transform duration-300 group-hover:scale-110 filter drop-shadow-lg">
                            {skill.icon}
                        </div>
                        <div className="text-center">
                            <h4 className="text-sm font-bold text-slate-200">{skill.name}</h4>
                            <span className="text-[10px] text-cyan-400 uppercase tracking-widest mt-1 block">{skill.level}</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>

        <AnimatePresence>
            {showExtras && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4"
                    onClick={() => setShowExtras(false)}
                >
                    <motion.div
                        initial={{ scale: 0.8, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.8, y: 50 }}
                        className="relative w-full max-w-2xl p-8 border-2 shadow-2xl bg-slate-900 rounded-2xl border-cyan-500/50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => { setShowExtras(false); playClick(); }}
                            onMouseEnter={playHover}
                            className="absolute text-2xl text-slate-400 top-4 right-4 hover:text-white"
                        >
                            <FaTimes />
                        </button>

                        <h3 className="mb-8 text-3xl text-center text-white font-pixel">
                            EXTRAS & <span className="text-cyan-400">CERTS</span>
                        </h3>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {certificates.map((cert, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    onMouseEnter={playHover}
                                    className="flex items-center gap-4 p-4 transition-colors border rounded-lg bg-slate-800/50 border-slate-700 hover:border-cyan-500 hover:bg-slate-800"
                                >
                                    <div className="p-3 rounded-full bg-cyan-500/10 text-cyan-400">
                                        <FaAward size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{cert.name}</h4>
                                        <p className="text-xs tracking-wide uppercase text-slate-400">
                                            {cert.issuer} • <span className="text-cyan-500">{cert.detail}</span>
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                        <div className="mt-8 text-center">
                            <p className="text-sm text-slate-500 font-pixel animate-pulse">
                                ...ALWAYS LEARNING...
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
};

export default About;