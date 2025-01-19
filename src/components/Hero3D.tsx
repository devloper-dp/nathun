import React from 'react';
import { motion } from 'framer-motion';

const Hero3D: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <div className="relative w-full h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-64 h-64 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full blur-3xl opacity-30" />
        </motion.div>
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-96 h-96 border-4 border-yellow-500/20 rounded-full" />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero3D;
