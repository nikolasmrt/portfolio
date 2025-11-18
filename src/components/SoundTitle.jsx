import { motion } from 'framer-motion';
import { playSound } from '../utils/sounds'; 


const SoundTitle = ({ text, prefix, colorClass = "text-white", soundFile = "/hover.mp3", onCharClick }) => {
  const words = text.split(" ");

  const handleMouseEnter = () => {
    playSound(soundFile, 0.8, true); 
  };

  const handleClick = (char, charIndex) => {
    playSound('/click.mp3', 0.5, false); 
    if (onCharClick) {
      onCharClick(char, charIndex); 
    }
  };

  return (
    <div className="relative z-20 flex flex-wrap items-center justify-center gap-x-3 md:gap-x-4">
      {prefix && (
        <motion.span 
          className="mr-3 cursor-default text-cyan-400 font-pixel"
          whileHover={{ scale: 1.2, rotate: -10 }}
          onMouseEnter={handleMouseEnter}
        >
          {prefix}
        </motion.span>
      )}
      
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="flex whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              whileHover={{ y: -5, scale: 1.2, filter: "brightness(1.5)" }} 
              transition={{ type: "spring", stiffness: 300 }}
              className={`inline-block cursor-pointer font-pixel relative z-20 ${colorClass}`} 
              onMouseEnter={handleMouseEnter} 
              onClick={() => handleClick(char, charIndex)} 
            >
              {char}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SoundTitle;