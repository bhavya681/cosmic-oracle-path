"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import witch from "../assets/witch.png";

export default function WitchWithCrystalBall() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-purple-950 to-black overflow-hidden">
      {/* Background mist */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(150,80,255,0.1)_0%,transparent_80%)]"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Woman (transparent PNG you uploaded) */}
      <div className="relative z-10 flex items-center justify-center">
        <img
          src={witch}
          alt="Mystic woman holding a crystal ball"
          width={600}
          height={700}
          className="object-contain pointer-events-none select-none"
          loading="eager"
        />
      </div>

      {/* Glowing crystal ball */}
      <motion.div
        className="absolute bottom-[19%] z-20 flex items-center justify-center"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: hovered ? 1.1 : 1,
          opacity: 1,
          y: hovered ? -10 : 0,
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <motion.div
          className="relative w-44 h-44 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 shadow-[0_0_80px_25px_rgba(130,90,255,0.6)]"
          animate={{
            boxShadow: hovered
              ? "0 0 90px 35px rgba(180,120,255,0.6)"
              : "0 0 60px 20px rgba(130,90,255,0.5)",
            rotate: hovered ? 360 : 0,
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          {/* Inner glow pulse */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/30 blur-3xl"
            animate={{
              opacity: hovered ? [0.4, 0.7, 0.4] : [0.3, 0.5, 0.3],
              scale: hovered ? [1, 1.1, 1] : [1, 1.05, 1],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          {/* Floating sparkle motion */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              background: [
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 70%)",
                "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.3) 0%, transparent 70%)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Ambient sparkles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white/40 blur-[2px]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 2}px`,
            height: `${Math.random() * 3 + 2}px`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}
