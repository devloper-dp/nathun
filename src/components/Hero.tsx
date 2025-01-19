import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Sun, ArrowRight, Star, Shield, Award, CheckCircle, ArrowDown } from 'lucide-react';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import { useInView } from 'react-intersection-observer';
import { scrollToSection, scrollToContact } from '../utils/scroll';

const Hero: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-gray-900">
      {/* Fallback background color and gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/50" />

      <div className="relative min-h-screen flex items-center">
        <div className="container-responsive py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={staggerChildren}
              className="text-responsive"
            >
              <motion.div
                variants={fadeInUp}
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full w-fit mx-auto md:mx-0"
              >
                <Award className="h-5 w-5 text-yellow-500" />
                <span className="text-white text-sm">Leading Solar Provider in Bhopal</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="h1 mt-6 text-white leading-tight"
              >
                Power Your Future with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                  Solar Energy
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-body mt-6 text-gray-300 max-w-xl mx-auto md:mx-0"
              >
                Transform your energy consumption with our cutting-edge solar solutions. Save up to 90% on electricity bills and contribute to a greener planet.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="mt-8 flex flex-wrap justify-center md:justify-start gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToContact()}
                  className="btn-responsive bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-full font-semibold flex items-center group hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
                >
                  Get Free Quote
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('features')}
                  className="btn-responsive border-2 border-yellow-500 text-yellow-500 rounded-full font-semibold hover:bg-yellow-500 hover:text-white transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8"
              >
                <div className="flex items-start space-x-4">
                  <Shield className="h-12 w-12 text-yellow-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold">25 Year Warranty</h3>
                    <p className="text-sm sm:text-base text-gray-400 mt-1">Comprehensive coverage for complete peace of mind</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Sun className="h-12 w-12 text-yellow-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold">90% Energy Savings</h3>
                    <p className="text-sm sm:text-base text-gray-400 mt-1">Significantly reduce your electricity bills</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative hidden lg:block"
            >
              {/* Add your hero image or 3D component here if needed */}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-16 flex items-center justify-center space-x-8"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`}
                  alt={`Customer ${i}`}
                  className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-500 fill-yellow-500" />
                ))}
                <span className="ml-2 text-white">4.9/5</span>
              </div>
              <p className="text-sm sm:text-base text-gray-300">From 1,000+ Customer Reviews</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="h-6 w-6 text-yellow-500" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;