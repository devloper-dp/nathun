import { motion } from 'framer-motion';
import React from 'react';

interface Award {
  color: string;
  icon: React.ReactNode;
  title: string;
  organization: string;
  description: string;
  image: string;
}

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
      className="relative group mx-4"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl transform transition-transform group-hover:scale-105 group-hover:rotate-1" />
      <div className="relative p-8 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 transform transition-transform group-hover:-rotate-1">
        <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
          <img
            src={award.image}
            alt={award.title}
            className="w-full h-full object-cover transform transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div
            className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-r ${award.color} flex items-center justify-center`}
          >
            {award.icon}
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{award.title}</h3>
        <p className="text-yellow-500 mb-4">{award.organization}</p>
        <p className="text-gray-400">{award.description}</p>
      </div>
    </motion.div>
  );
};

export default AwardCard;