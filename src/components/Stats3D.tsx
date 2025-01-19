import React from 'react';
import { motion } from 'framer-motion';

const Stats3D: React.FC = () => {
  const numbers: string[] = ['10K+', '98%', '50M+'];

  return (
    <div className="h-48 my-12 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="grid grid-cols-3 gap-12">
          {numbers.map((number, index) => (
            <motion.div
              key={number}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center justify-center"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
                {number}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Stats3D;

