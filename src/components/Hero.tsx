import React, { useEffect, Suspense, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { Sun, ArrowRight, Star, Shield, Award, ArrowDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { scrollToSection, scrollToContact } from '../utils/scroll';
import Hero3D from './Hero3D';
import LoadingSpinner from './common/LoadingSpinner';

const Hero: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const [{ scale }, api] = useSpring(() => ({ scale: 1 }));
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const bind = useGesture({
    onHover: ({ hovering }) => api({ scale: hovering ? 1.05 : 1 }),
    onMove: ({ xy: [x, y] }) => {
      if (heroRef.current) {
        const bounds = heroRef.current.getBoundingClientRect();
        const rotateX = (y - bounds.top - bounds.height / 2) / 20;
        const rotateY = (x - bounds.left - bounds.width / 2) / 20;
        api({
          transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        });
      }
    }
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

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(234, 179, 8, 0.3)",
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-24 bg-gray-900">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="relative min-h-[calc(100vh-6rem)] flex items-center">
        <div className="container-responsive py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={staggerChildren}
              className="text-responsive"
              style={{ y }}
            >
              <motion.div
                variants={fadeInUp}
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full w-fit mx-auto md:mx-0"
                whileHover={{ scale: 1.05 }}
              >
                <Award className="h-5 w-5 text-yellow-500" />
                <span className="text-white text-sm">Leading Solar Provider in Bhopal</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="h1 mt-6 text-white leading-tight"
              >
                Power Your Future with{' '}
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600"
                  animate={{ 
                    backgroundPosition: ['0%', '100%'],
                    backgroundSize: ['100%', '200%']
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  Solar Energy
                </motion.span>
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
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => scrollToContact()}
                  className="btn-responsive bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-full font-semibold flex items-center group hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
                >
                  Get Free Quote
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </motion.button>

                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
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
                <animated.div {...bind()} style={{ scale }} className="flex items-start space-x-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl">
                  <Shield className="h-12 w-12 text-yellow-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold">25 Year Warranty</h3>
                    <p className="text-sm sm:text-base text-gray-400 mt-1">Comprehensive coverage for complete peace of mind</p>
                  </div>
                </animated.div>

                <animated.div {...bind()} style={{ scale }} className="flex items-start space-x-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl">
                  <Sun className="h-12 w-12 text-yellow-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold">90% Energy Savings</h3>
                    <p className="text-sm sm:text-base text-gray-400 mt-1">Significantly reduce your electricity bills</p>
                  </div>
                </animated.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative hidden lg:block hero-3d-container"
              ref={heroRef}
              {...bind()}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <div className="canvas-interactive canvas-shadow">
                  <Hero3D />
                </div>
              </Suspense>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-16 flex items-center justify-center space-x-8"
          >
            <motion.div 
              className="flex -space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              {[1, 2, 3, 4].map((i) => (
                <animated.img
                  key={i}
                  src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`}
                  alt={`Customer ${i}`}
                  className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-white"
                  style={{
                    transform: scale.to(s => `scale(${s})`)
                  }}
                />
              ))}
            </motion.div>
            <div>
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                  >
                    <Star className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-500 fill-yellow-500" />
                  </motion.div>
                ))}
                <span className="ml-2 text-white">4.9/5</span>
              </motion.div>
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
};

export default Hero;