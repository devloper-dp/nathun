import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sun, Battery, Wallet, LineChart, Clock, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import gridSvg from '../assets/grid.svg';
import LoadingSpinner from './common/LoadingSpinner';

interface Feature {
  icon: React.ReactNode & { className?: string };  
  title: string;
  description: string;
  stats: {
    [key: string]: string;
  };
  color: string;
}

const features: Feature[] = [
  {
    icon: <Sun />,
    title: "Premium Solar Panels",
    description: "Tier-1 solar panels with 25+ years lifespan and maximum efficiency",
    stats: {
      efficiency: "21.5%",
      warranty: "25 Years",
      power: "550W Peak"
    },
    color: "from-yellow-400 to-yellow-600"
  },
  {
    icon: <Battery />,
    title: "Smart Storage",
    description: "Advanced battery systems for 24/7 uninterrupted power supply",
    stats: {
      capacity: "15 kWh",
      cycles: "10,000+",
      backup: "24 Hours"
    },
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: <Wallet />,
    title: "90% Bill Savings",
    description: "Drastically reduce your electricity bills with solar power",
    stats: {
      savings: "₹12,000/mo",
      payback: "3-4 Years",
      roi: "25% p.a."
    },
    color: "from-green-400 to-green-600"
  },
  {
    icon: <LineChart />,
    title: "Smart Monitoring",
    description: "Real-time monitoring and analytics via mobile app",
    stats: {
      updates: "Real-time",
      alerts: "Instant",
      reports: "Daily"
    },
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: <Shield />,
    title: "25 Year Warranty",
    description: "Comprehensive warranty coverage for complete peace of mind",
    stats: {
      performance: "90%",
      service: "24/7",
      support: "Lifetime"
    },
    color: "from-red-400 to-red-600"
  },
  {
    icon: <Clock />,
    title: "Quick Installation",
    description: "Professional installation completed within 3-5 days",
    stats: {
      duration: "3-5 Days",
      team: "Certified",
      support: "24/7"
    },
    color: "from-indigo-400 to-indigo-600"
  }
];

const Features: React.FC = () => {
  const { inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="features" className="py-24 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-[url('../assets/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]`} />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-yellow-500 font-semibold tracking-wider uppercase">Why Choose Us</span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Cutting-Edge Solar Solutions
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the future of energy with our innovative solar technology and smart solutions
          </p>
        </motion.div>
        <div><br></br></div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl transform transition-transform group-hover:scale-105 group-hover:rotate-1" />
              <div className="relative p-8 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 transform transition-transform group-hover:-rotate-1">
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                  {React.isValidElement(feature.icon) && React.cloneElement(feature.icon, {
                    className: "h-8 w-8 text-white"
                  })}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 mb-6">{feature.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(feature.stats).map(([key, value], i) => (
                    <div key={i} className="bg-gray-700/50 rounded-lg p-3">
                      <p className="text-sm text-gray-400 capitalize">{key}</p>
                      <p className="text-lg font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ x: 5 }}
                  className={`mt-6 flex items-center text-sm font-semibold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                >
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {inView && (
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
              View All Features
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}

        <div className="grid-image">
          <img src={gridSvg} alt="Grid" />
        </div>
      </div>
    </section>
  );
}

export default Features;