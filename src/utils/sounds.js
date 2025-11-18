const audioCache = {};
let lastPlayTime = 0;

/**
 * @param {string} path 
 * @param {number} volume 
 * @param {boolean} limitRate 
 */

export const playSound = (path, volume = 0.8, limitRate = false) => {
  try {
    const now = Date.now();
    if (limitRate && now - lastPlayTime < 50) return; 
    if (limitRate) lastPlayTime = now;

    if (!audioCache[path]) {
        audioCache[path] = new Audio(path);
        audioCache[path].preload = 'auto';
        audioCache[path].load();
    }
    const sound = audioCache[path].cloneNode();
    sound.volume = volume;
    
    const playPromise = sound.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn(`Erro ao tocar ${path}:`, error); 
      });
    }
  } catch (error) {
    console.error("Erro crítico de áudio:", error);
  }
};

export const playHover = () => playSound('/hover.mp3', 0.8, true); 

export const playClick = () => playSound('/click.mp3', 1.0, false);