'use client';

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function PainterPro() {
  const arm = useAnimation();
  const camera = useAnimation();

  useEffect(() => {
    let isActive = true;
    const run = async () => {
      while (isActive) {
        // 🎬 Camera subtle push-in
        camera.start({
          scale: 1.04,
          transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] as [number, number, number, number] },
        });

        // 🫀 Anticipation (pull back)
        await arm.start({
          y: -110,
          rotate: -4,
          transition: { duration: 0.4, ease: "easeOut" },
        });
        if (!isActive) break;

        // 💥 Main stroke (heavy)
        await arm.start({
          y: 120,
          rotate: 2,
          transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number] },
        });
        if (!isActive) break;

        // 🌊 Follow-through (bounce)
        await arm.start({
          y: 100,
          transition: { type: "spring", stiffness: 120, damping: 10 },
        });
        if (!isActive) break;

        // 🎥 Camera relax
        camera.start({
          scale: 1,
          transition: { duration: 1 },
        });
      }
    };

    run();
    return () => { isActive = false; };
  }, [camera, arm]);

  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden" style={{ background: 'var(--off-white)', minHeight: 280 }}>
      <motion.svg
        viewBox="0 0 400 300"
        className="w-full h-auto max-w-2xl max-h-[85vh] p-4 sm:p-8"
        animate={camera}
      >
        <defs>
          {/* 🎨 Paint gradient */}
          <linearGradient id="paint" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--orange)" />
            <stop offset="100%" stopColor="var(--orange-dk)" />
          </linearGradient>

          {/* 💡 Light gradient */}
          <linearGradient id="light" x1="0" x2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.15" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/* 🌫 Shadow */}
          <filter id="shadow">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* 🧱 BACK WALL (slow parallax) */}
        <motion.rect
          x="20"
          y="20"
          width="360"
          height="250"
          rx="12"
          fill="#ffffff"
          stroke="var(--border)"
          strokeWidth="1.5"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        {/* 💡 moving light */}
        <motion.rect
          x="-200"
          y="20"
          width="200"
          height="250"
          fill="url(#light)"
          animate={{ x: 400 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* 🎨 PAINT */}
        <motion.rect
          x="160"
          y="40"
          width="40"
          height="230"
          rx="8"
          fill="url(#paint)"
          style={{ originY: 0 }}
          animate={{ scaleY: [0, 1, 1, 0] }}
          transition={{ duration: 3.4, ease: [0.33, 1, 0.68, 1] as [number, number, number, number], repeat: Infinity, repeatDelay: 0.8 }}
          filter="url(#shadow)"
        />

        {/* 💧 DRIPS (lagging physics) */}
        {[0, 0.3, 0.6].map((d, i) => (
          <motion.circle
            key={i}
            cx={180 + i * 6}
            cy={60}
            r="2.5"
            fill="var(--orange-dk)"
            initial={{ y: 0, opacity: 0, scaleY: 1 }}
            animate={{
              y: [0, 210],
              opacity: [0, 1, 1, 0],
              scaleY: [1, 2, 1],
            }}
            transition={{
              delay: d,
              duration: 1.8,
              ease: "easeIn",
              repeat: Infinity,
            }}
          />
        ))}

        {/* 💦 FLOOR SPLATTERS */}
        {[0, 0.3, 0.6].map((d, i) => (
          <motion.ellipse
            key={`splat-${i}`}
            cx={180 + i * 6}
            cy={275 + (i % 2)}
            rx="4.5"
            ry="1.5"
            fill="var(--orange-dk)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0, 0.4, 0],
              scale: [0, 0, 1.2, 0.8],
            }}
            transition={{
              delay: d,
              duration: 1.8,
              times: [0, 0.9, 0.95, 1],
              repeat: Infinity,
            }}
          />
        ))}

        {/* 🧍 PAINTER */}
        <g transform="translate(250,160)">

          {/* body */}
          <motion.rect 
            x="-20" y="-30" width="40" height="90" rx="14" fill="var(--navy)"
            animate={{ scaleY: [1, 1.02, 1], y: [0, -1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* legs */}
          <line x1="-10" y1="50" x2="-25" y2="110" stroke="var(--navy)" strokeWidth="12" strokeLinecap="round"/>
          <line x1="10" y1="50" x2="15" y2="110" stroke="var(--navy)" strokeWidth="12" strokeLinecap="round"/>

          {/* head */}
          <circle cx="0" cy="-55" r="20" fill="#fbbf24"/>
          
          {/* cap */}
          <path d="M-20,-60 Q0,-75 20,-60" stroke="var(--orange)" strokeWidth="8" fill="none" strokeLinecap="round" />

          {/* 🎯 ARM SYSTEM */}
          <motion.g animate={arm} initial={{ y: -100 }}>

            {/* arm */}
            <line
              x1="-15"
              y1="0"
              x2="-65"
              y2="0"
              stroke="#fbbf24"
              strokeWidth="10"
              strokeLinecap="round"
            />
            
            {/* frame */}
            <path d="M-65,0 L-70,0 L-70,-15 L-85,-15" stroke="#64748b" strokeWidth="3" fill="none" />

            {/* roller */}
            <motion.rect
              x="-120"
              y="-22"
              width="42"
              height="14"
              rx="7"
              fill="url(#paint)"
              animate={{
                rotate: [0, 3, -3, 0],
                scaleY: [1, 0.85, 1],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
              }}
            />

            {/* 🖤 contact shadow */}
            <motion.ellipse
              cx="-100"
              cy="-15"
              rx="18"
              ry="4"
              fill="black"
              opacity="0.15"
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          </motion.g>
        </g>

        {/* 🕶 floor shadow */}
        <ellipse cx="260" cy="275" rx="60" ry="12" fill="#000" opacity="0.08"/>
      </motion.svg>
    </div>
  );
}
