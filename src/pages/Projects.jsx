import { useOutletContext } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { content, projectsData } from '../data/translations';
import { playHover, playClick } from '../utils/sounds';
import PageTransition from '../components/PageTransition';
import SoundTitle from '../components/SoundTitle';

const Projects = () => {
  const { lang } = useOutletContext();
  const t = content[lang];

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-40 px-6 max-w-7xl mx-auto bg-center bg-no-repeat bg-cover bg-[url('/wpp3.png')] bg-blend-overlay bg-slate-900/90 rounded-xl my-4 shadow-2xl border border-slate-800">
        
        <div className="mb-20 text-center">
             <SoundTitle 
                prefix=">" 
                text={t.projectsTitle} 
                colorClass="text-3xl md:text-5xl font-bold text-white" 
                soundFile="/hover.mp3"
            />
        </div>
        
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((proj) => (
            <div 
                key={proj.id} 
                className="group relative bg-slate-950/80 border border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500 flex flex-col h-full backdrop-blur-sm"
            >
              <div className="relative overflow-hidden h-52">
                <div className="absolute inset-0 z-10 transition-colors bg-slate-900/20 group-hover:bg-transparent"></div>
                <img 
                    src={proj.img} 
                    alt={proj.title} 
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute z-20 flex flex-wrap gap-2 top-3 left-3">
                    {proj.tech.split(',').map((tech, i) => (
                         <span key={i} className="bg-slate-950/90 text-cyan-400 text-[10px] font-bold px-2 py-1 rounded border border-cyan-500/30 backdrop-blur-sm">
                            {tech.trim()}
                         </span>
                    ))}
                </div>
              </div>
              
              <div className="flex flex-col flex-grow p-6">
                <h3 className="mb-3 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-cyan-400 font-pixel">
                    {proj.title}
                </h3>
                
                <p className="flex-grow mb-6 text-sm leading-relaxed text-slate-400">
                    {lang === 'pt' ? proj.descPT : proj.descEN}
                </p>
                
                <div className="pt-4 mt-auto border-t border-slate-700/50">
                    <a 
                        href={proj.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onMouseEnter={playHover}
                        onClick={playClick}
                        className="flex items-center justify-center w-full gap-2 py-3 text-sm font-bold text-center text-white transition-all border rounded-lg bg-slate-800 border-slate-600 hover:bg-cyan-600 hover:border-cyan-500 group/btn"
                    >
                        {lang === 'pt' ? 'Ver Projeto' : 'View Project'} 
                        <FaExternalLinkAlt size={12} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;