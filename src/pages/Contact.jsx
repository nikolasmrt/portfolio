import { useOutletContext } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaWhatsapp, FaInstagram, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';
import { content } from '../data/translations';
import { playHover, playClick } from '../utils/sounds';
import PageTransition from '../components/PageTransition';
import SoundTitle from '../components/SoundTitle';

const Contact = () => {
  const { lang } = useOutletContext();
  const t = content[lang];

  const socialLinks = [
    { 
        icon: <FaLinkedin size={32} />, 
        name: "LinkedIn", 

        url: "https://www.linkedin.com/in/nikolasmrt/", 
        color: "group-hover:text-blue-500", 
        border: "group-hover:border-blue-500" 
    },
    { 
        icon: <FaGithub size={32} />, 
        name: "GitHub", 
        url: "https://github.com/nikolasmrt", 
        color: "group-hover:text-purple-500", 
        border: "group-hover:border-purple-500" 
    },
    { 
        icon: <FaWhatsapp size={32} />, 
        name: "WhatsApp", 
        url: "https://wa.me/5531996815746", 
        color: "group-hover:text-green-500", 
        border: "group-hover:border-green-500" 
    },
    { 
        icon: <FaInstagram size={32} />, 
        name: "Instagram", 
        url: "https://instagram.com/nnk.mrt", 
        color: "group-hover:text-pink-500", 
        border: "group-hover:border-pink-500" 
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center pb-32 pt-20 bg-center bg-no-repeat bg-cover bg-[url('/wpp4.png')] bg-blend-overlay bg-slate-900/90 rounded-xl max-w-5xl mx-auto my-10 shadow-2xl border border-slate-800">
        
        <div className="mb-10">
            <SoundTitle 
                prefix=">" 
                text={t.contactTitle} 
                colorClass="text-3xl md:text-5xl font-bold text-white" 
                soundFile="/hover.mp3"
            />
        </div>
        
        <p className="max-w-lg p-4 mb-16 font-light leading-relaxed border rounded-lg text-slate-300 bg-slate-950/50 backdrop-blur-sm border-slate-700/30">
            {t.contactText}
        </p>

        <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            {socialLinks.map((social, index) => (
                <a 
                    key={index}
                    href={social.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="relative flex items-center gap-6 p-6 overflow-hidden transition-all duration-300 border group bg-slate-950/80 rounded-2xl border-slate-700 hover:-translate-y-2 hover:shadow-xl backdrop-blur-md"
                >   
                    <div className={`absolute inset-0 border-2 border-transparent ${social.border} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>

                    <div className={`p-4 bg-slate-900 rounded-xl ${social.color} text-slate-400 transition-colors`}>
                        {social.icon}
                    </div>
                    
                    <div className="text-left">
                        <h4 className={`font-bold text-xl text-slate-200 ${social.color} transition-colors`}>{social.name}</h4>
                        <span className="text-xs text-slate-500">{social.desc}</span>
                    </div>

                    <FaExternalLinkAlt className="absolute text-xs top-4 right-4 text-slate-700 group-hover:text-slate-500" />
                </a>
            ))}
        </div>

        <div className="flex flex-col items-center gap-2 mt-16">
            <span className="text-sm tracking-widest uppercase text-slate-500"></span>
            <a 
                href="mailto:nikoti2024@gmail.com" 
                onMouseEnter={playHover}
                onClick={playClick}
                className="flex items-center gap-2 px-6 py-2 text-xl font-bold transition-colors border rounded-full text-cyan-400 hover:text-white bg-slate-900/50 border-cyan-500/20 hover:border-cyan-500"
            >
                <FaEnvelope /> nikoti2024@gmail.com
            </a>
        </div>

      </div>
    </PageTransition>
  );
};

export default Contact;