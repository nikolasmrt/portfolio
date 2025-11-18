import { useState, useRef, useEffect } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio('/sua-musica.mp3'));

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.3; 
    audio.loop = true;

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Autoplay bloqueado (esperando interação do usuário)");
        setIsPlaying(false);
      }
    };

    playAudio();

    return () => {
      audio.pause();
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.error("Erro ao tocar:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button 
      onClick={togglePlay}
      className="fixed z-50 p-3 transition-all duration-300 border rounded-full shadow-lg bottom-24 right-6 bg-slate-800/80 backdrop-blur border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900 group"
      title={isPlaying ? "Pausar Música" : "Tocar Música"}
    >
      {isPlaying ? <FaVolumeUp size={18} /> : <FaVolumeMute size={18} />}
    </button>
  );
};

export default AudioPlayer;