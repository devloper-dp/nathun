import React from 'react';
import { motion } from 'framer-motion';

interface FeatureItem {
  name: string;
  color: string;
}

const featureItems: FeatureItem[] = [
  { name: 'Premium', color: 'from-yellow-400 to-yellow-600' },
  { name: 'Smart', color: 'from-blue-400 to-blue-600' },
  { name: 'Efficient', color: 'from-green-400 to-green-600' }
];

export default function Features3D(): JSX.Element {
  return (
    <div className="h-48 my-12 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="grid grid-cols-3 gap-16">
          {featureItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-32 h-32 bg-gradient-to-br ${item.color} rounded-2xl shadow-2xl transform transition-all duration-300`}
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3 }}
                className="mt-6 text-xl font-bold text-white"
              >
                {item.name}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
