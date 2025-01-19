import { motion } from 'framer-motion';
import React from 'react';

// Define the type for the award prop
interface Award {
  color: string; // Expected to be a TailwindCSS gradient class
  icon: React.ReactNode; // Icon can be any React node
  title: string;
  organization: string;
  description: string;
}

// Define the props for the component
interface AwardCardProps {
  award: Award;
  index: number;
}

const AwardCard: React.FC<AwardCardProps> = ({ award, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl transform transition-transform group-hover:scale-105 group-hover:rotate-1" />
      <div className="relative p-8 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 transform transition-transform group-hover:-rotate-1">
        <div
          className={`w-16 h-16 rounded-xl bg-gradient-to-r ${award.color} flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-6`}
        >
          {award.icon}
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{award.title}</h3>
        <p className="text-yellow-500 mb-4">{award.organization}</p>
        <p className="text-gray-400">{award.description}</p>
      </div>
    </motion.div>
  );
};

export default AwardCard;
