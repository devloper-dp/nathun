import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

interface Stat {
  value: string;
  label: string;
}

const Stats: React.FC = () => {
  const stats: Stat[] = [
    { value: '10000', label: 'Installations' },
    { value: '98', label: 'Satisfaction' },
    { value: '50000000', label: 'CO₂ Reduced' }
  ];

  return (
    <section id="stats" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
                <CountUp end={parseInt(stat.value, 10)} suffix="+" duration={2.5} />
              </div>
              <div className="mt-2 text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
