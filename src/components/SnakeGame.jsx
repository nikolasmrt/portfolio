import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playClick, playHover } from '../utils/sounds'; 


const KeyCap = ({ label, active }) => (
  <div className={`
    w-10 h-10 flex items-center justify-center rounded-lg 
    border-b-4 text-sm font-bold font-pixel transition-all
    ${active 
      ? 'bg-cyan-500 border-cyan-700 text-slate-900 translate-y-1 border-b-0' 
      : 'bg-slate-800 border-slate-600 text-slate-400'}
  `}>
    {label}
  </div>
);

const SnakeGame = ({ onGameEnd }) => {
  const canvasRef = useRef(null);
  
  const TILE_SIZE = 20;
  const BOARD_SIZE = 20; 
  const INITIAL_SPEED = 150;

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [activeKey, setActiveKey] = useState(null); 

  const snake = useRef([{ x: 10, y: 10 }]);
  const food = useRef({ x: 15, y: 15 });
  const dir = useRef({ x: 0, y: 0 });
  const nextDir = useRef({ x: 0, y: 0 });
  const gameInterval = useRef(null);

  const draw = (ctx) => {
    ctx.fillStyle = '#0f172a'; 
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = '#ff0077';
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#ff0077";
    ctx.fillRect(food.current.x * TILE_SIZE, food.current.y * TILE_SIZE, TILE_SIZE - 2, TILE_SIZE - 2);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#22d3ee';
    snake.current.forEach((s, i) => {
      if (i === 0) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#22d3ee";
      } else {
          ctx.shadowBlur = 0;
      }
      ctx.fillRect(s.x * TILE_SIZE, s.y * TILE_SIZE, TILE_SIZE - 2, TILE_SIZE - 2);
    });
    ctx.shadowBlur = 0;
  };

  const move = () => {
    const head = { ...snake.current[0] };
    dir.current = nextDir.current;

    if (dir.current.x === 0 && dir.current.y === 0) return;

    head.x += dir.current.x;
    head.y += dir.current.y;

    if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
      endGame();
      return;
    }

    if (snake.current.some(s => s.x === head.x && s.y === head.y)) {
      endGame();
      return;
    }

    snake.current.unshift(head);

    if (head.x === food.current.x && head.y === food.current.y) {
      setScore(s => s + 1);
      playClick();
      placeFood();
    } else {
      snake.current.pop();
    }
  };

  const placeFood = () => {
    let newFood;
    let isOnSnake;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      };
      isOnSnake = snake.current.some(s => s.x === newFood.x && s.y === newFood.y);
    } while (isOnSnake);
    food.current = newFood;
  };

  const endGame = () => {
    setGameOver(true);
    setGameStarted(false);
    if (gameInterval.current) clearInterval(gameInterval.current);
  };

  const handleKeyDown = useCallback((e) => {
    const key = e.key;
    
    const gameKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "w", "a", "s", "d", "W", "A", "S", "D"];
    
    if(gameKeys.includes(key)) {
        e.preventDefault();
    }

    const current = dir.current;
    let pressedKey = null;

    if ((key === 'ArrowUp' || key === 'w' || key === 'W') && current.y !== 1) {
        nextDir.current = { x: 0, y: -1 };
        pressedKey = 'UP';
    }
    if ((key === 'ArrowDown' || key === 's' || key === 'S') && current.y !== -1) {
        nextDir.current = { x: 0, y: 1 };
        pressedKey = 'DOWN';
    }
    if ((key === 'ArrowLeft' || key === 'a' || key === 'A') && current.x !== 1) {
        nextDir.current = { x: -1, y: 0 };
        pressedKey = 'LEFT';
    }
    if ((key === 'ArrowRight' || key === 'd' || key === 'D') && current.x !== -1) {
        nextDir.current = { x: 1, y: 0 };
        pressedKey = 'RIGHT';
    }

    if (pressedKey) {
        setActiveKey(pressedKey);
        setTimeout(() => setActiveKey(null), 200);
    }

  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const loop = () => {
        if (gameStarted && !gameOver) {
            move();
        }
        draw(ctx);
    };

    if (gameStarted) {
        document.addEventListener('keydown', handleKeyDown);
        gameInterval.current = setInterval(loop, INITIAL_SPEED);
    } else {
        draw(ctx);
    }

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
        if (gameInterval.current) clearInterval(gameInterval.current);
    };
  }, [gameStarted, gameOver, handleKeyDown]);

  const handleStart = () => {
    snake.current = [{ x: 10, y: 10 }];
    dir.current = { x: 1, y: 0 }; 
    nextDir.current = { x: 1, y: 0 };
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    placeFood();
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8 border-2 shadow-2xl md:flex-row bg-slate-950/90 rounded-xl border-slate-700 backdrop-blur-md">
      
      <div className="flex flex-col items-center">
          <h2 className="mb-2 text-2xl text-center text-cyan-400 font-pixel drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">SNAKE</h2>
          
          <div className="relative border-4 rounded-lg shadow-lg border-slate-700">
              <canvas 
                ref={canvasRef} 
                width={BOARD_SIZE * TILE_SIZE} 
                height={BOARD_SIZE * TILE_SIZE}
                className="block bg-slate-900"
              />
              
              {(!gameStarted || gameOver) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm">
                    {gameOver && <p className="mb-4 text-3xl text-red-500 font-pixel animate-pulse">GAME OVER</p>}
                    
                    <p className="mb-6 text-white font-pixel">SCORE: {score}</p>

                    <button 
                        onClick={handleStart}
                        onMouseEnter={playHover}
                        className="px-6 py-2 mb-4 text-white transition-transform bg-cyan-600 rounded font-pixel hover:scale-105 hover:bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    >
                        {gameOver ? "TRY AGAIN" : "START"}
                    </button>
                    
                    <button 
                        onClick={() => onGameEnd(score)}
                        onMouseEnter={playHover}
                        className="px-6 py-2 border rounded text-cyan-400 border-cyan-500 font-pixel hover:bg-cyan-500/20"
                    >
                        QUIT
                    </button>
                </div>
              )}
          </div>

          {gameStarted && (
             <div className="mt-2 text-xl text-white font-pixel">SCORE: {score}</div>
          )}
      </div>

      <div className="flex flex-col items-center justify-center p-6 border-2 bg-slate-900 border-slate-700 rounded-xl">
        <p className="mb-6 text-xs tracking-widest text-center uppercase text-cyan-400 font-pixel">Controls</p>
        
        <div className="flex flex-col items-center gap-2 mb-8">
            <KeyCap label="W" active={activeKey === 'UP'} />
            <div className="flex gap-2">
                <KeyCap label="A" active={activeKey === 'LEFT'} />
                <KeyCap label="S" active={activeKey === 'DOWN'} />
                <KeyCap label="D" active={activeKey === 'RIGHT'} />
            </div>
        </div>

        <div className="text-center">
            <p className="text-[10px] text-slate-500 font-pixel mb-2">OR USE ARROWS</p>
            <div className="flex flex-col items-center gap-2 scale-75 opacity-70">
                <KeyCap label="▲" active={activeKey === 'UP'} />
                <div className="flex gap-2">
                    <KeyCap label="◄" active={activeKey === 'LEFT'} />
                    <KeyCap label="▼" active={activeKey === 'DOWN'} />
                    <KeyCap label="►" active={activeKey === 'RIGHT'} />
                </div>
            </div>
        </div>

      </div>

    </div>
  );
};

export default SnakeGame;