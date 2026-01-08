import React from 'react';
import { motion } from 'framer-motion';

export const GridBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-white overflow-hidden pointer-events-none">
      {/* Radial Gradient for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,209,109,0.15),transparent_70%)]" />
      
      {/* Moving Grid Pattern */}
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px']
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Floating Geometric Shapes */}
      <motion.div
        className="absolute top-20 left-[10%] w-32 h-32 border-4 border-primary/20 rounded-full"
        animate={{
          y: [0, 50, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute bottom-40 right-[10%] w-48 h-48 border-4 border-secondary/40 rotate-45"
        animate={{
          y: [0, -70, 0],
          rotate: [45, 90, 45],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

       <motion.div
        className="absolute top-1/3 right-[20%] w-16 h-16 bg-primary/10 rounded-xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
          rotate: [0, -90, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};
