import React from 'react';
import { motion } from 'motion/react';

export default function BackgroundGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#0A0A0C]">
      {/* Dynamic Deep Mesh Gradients matching Frosted Glass specification */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Floating plus symbols matching the image references, colored for the dark background */}
      <motion.div 
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.1, 0.3, 0.1] 
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute left-[15%] top-[25%] text-slate-500 font-light select-none text-4xl"
      >
        +
      </motion.div>
      
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          opacity: [0.08, 0.25, 0.08] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1 
        }}
        className="absolute left-[40%] top-[15%] text-slate-500 font-light select-none text-5xl"
      >
        +
      </motion.div>

      <motion.div 
        animate={{ 
          y: [0, -25, 0],
          opacity: [0.1, 0.35, 0.1] 
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 3 
        }}
        className="absolute right-[25%] bottom-[20%] text-slate-500 font-light select-none text-6xl"
      >
        +
      </motion.div>

      <motion.div 
        animate={{ 
          y: [0, 15, 0],
          opacity: [0.08, 0.3, 0.08] 
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2 
        }}
        className="absolute left-[30%] bottom-[8%] text-slate-500 font-light select-none text-5xl"
      >
        +
      </motion.div>
    </div>
  );
}
