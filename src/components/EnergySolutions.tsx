import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Battery, Zap, ArrowRight, Shield } from 'lucide-react';
import EnergySolutions3D from './EnergySolutions3D';

interface Solution {
  icon: JSX.Element;
  title: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  color: string;
}

const solutions: Solution[] = [
  {
    icon: <Sun className="h-8 w-8" />,
    title: "Solar Panel Systems",
    description: "High-efficiency Tier-1 panels with advanced PERC technology",
    features: [
      "25-year performance warranty",
      "Anti-soiling coating",
      "Enhanced low-light performance",
      "Temperature coefficient -0.35%/°C"
    ],
    specs: {
      efficiency: "21.7%",
      power: "550W Peak",
      warranty: "25 Years",
      lifespan: "30+ Years"
    },
    color: "from-yellow-400 to-yellow-600"
  },
  {
    icon: <Battery className="h-8 w-8" />,
    title: "Energy Storage",
    description: "Advanced lithium battery systems with smart BMS",
    features: [
      "10,000+ cycle life",
      "Smart monitoring system",
      "Modular expandability",
      "Emergency backup power"
    ],
    specs: {
      capacity: "15 kWh",
      efficiency: "98%",
      warranty: "10 Years",
      backup: "24 Hours"
    },
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Smart Inverters",
    description: "High-efficiency inverters with advanced grid features",
    features: [
      "97.5% efficiency rating",
      "Built-in monitoring",
      "Grid support functions",
      "Anti-islanding protection"
    ],
    specs: {
      power: "10 kW",
      efficiency: "97.5%",
      warranty: "12 Years",
      monitoring: "24/7"
    },
    color: "from-green-400 to-green-600"
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Maintenance Plans",
    description: "Comprehensive maintenance and monitoring services",
    features: [
      "Regular inspections",
      "Performance monitoring",
      "Cleaning services",
      "Emergency support"
    ],
    specs: {
      response: "24 Hours",
      coverage: "Complete",
      support: "24/7",
      guarantee: "100%"
    },
    color: "from-purple-400 to-purple-600"
  }
];

const EnergySolutions: React.FC = () => {
  const [selectedSolution, setSelectedSolution] = useState<number>(0);

  return (
    <section id="solutions" className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('../assets/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-yellow-500 font-semibold tracking-wider uppercase">Our Solutions</span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Complete Energy Solutions
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our comprehensive range of solar energy solutions
          </p>
        </motion.div>

        <EnergySolutions3D />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedSolution(index)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl transform transition-transform group-hover:scale-105 group-hover:rotate-1" />
              <div className="relative p-8 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 transform transition-transform group-hover:-rotate-1">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${solution.color} flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                  {solution.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{solution.title}</h3>
                <p className="text-gray-300 mb-6">{solution.description}</p>

                <div className="space-y-2">
                  {solution.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-400">
                      <Shield className="h-4 w-4 text-yellow-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ x: 5 }}
                  className={`mt-6 flex items-center text-sm font-semibold bg-gradient-to-r ${solution.color} bg-clip-text text-transparent`}
                >
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-full font-semibold inline-flex items-center group hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
          >
            View All Solutions
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default EnergySolutions;