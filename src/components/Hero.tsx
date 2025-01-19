import React from 'react';
import { motion } from 'framer-motion';
import { Sun, ArrowRight, Star, Shield, Award, CheckCircle } from 'lucide-react';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import { scrollToSection, scrollToContact } from '../utils/scroll';

const Hero: React.FC = () => {
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

  return (
    <section id="home" className="relative min-h-screen">
      <ParallaxBanner className="min-h-screen">
        <ParallaxBannerLayer speed={-20}>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-40" />
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-set-of-solar-panels-in-the-sunset-34901-large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/50" />
          </div>
        </ParallaxBannerLayer>

        <ParallaxBannerLayer speed={-10}>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.2
                      }
                    }
                  }}
                >
                  <motion.div
                    variants={fadeInUp}
                    className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-full w-fit"
                  >
                    <Award className="h-5 w-5 text-primary" />
                    <span className="text-white text-sm">Leading Solar Provider in Bhopal</span>
                  </motion.div>

                  <motion.h1
                    variants={fadeInUp}
                    className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                  >
                    Power Your Future with{' '}
                    <span className="gradient-text">
                      Solar Energy
                    </span>
                  </motion.h1>

                  <motion.p
                    variants={fadeInUp}
                    className="mt-6 text-lg sm:text-xl text-gray-300 max-w-xl"
                  >
                    Transform your energy consumption with our cutting-edge solar solutions. Save up to 90% on electricity bills and contribute to a greener planet.
                  </motion.p>

                  <motion.div
                    variants={fadeInUp}
                    className="mt-8 flex flex-wrap gap-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToContact()}
                      className="btn-primary"
                    >
                      Get Free Quote
                      <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection('features')}
                      className="btn-secondary"
                    >
                      Learn More
                    </motion.button>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8"
                  >
                    <div className="flex items-start space-x-4">
                      <Shield className="h-12 w-12 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="text-white font-semibold">25 Year Warranty</h3>
                        <p className="text-gray-400 text-sm mt-1">Comprehensive coverage for complete peace of mind</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Sun className="h-12 w-12 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="text-white font-semibold">90% Energy Savings</h3>
                        <p className="text-gray-400 text-sm mt-1">Significantly reduce your electricity bills</p>
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
                  <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                  <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

                  <div className="relative glass-effect p-8 rounded-2xl">
                    <div className="absolute -top-10 -right-10 bg-primary/10 backdrop-blur-sm border border-primary/20 p-6 rounded-xl">
                      <div className="text-3xl font-bold text-white">10K+</div>
                      <div className="text-sm text-gray-300">Installations</div>
                    </div>

                    <img
                      src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      alt="Solar Installation"
                      className="w-full rounded-xl"
                    />

                    <div className="mt-6 space-y-4">
                      {['Premium Tier-1 Solar Panels', 'Smart Monitoring System', 'Professional Installation'].map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span className="text-white">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-8"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`}
                      alt={`Customer ${i}`}
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center justify-center sm:justify-start">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 text-primary fill-primary" />
                    ))}
                    <span className="ml-2 text-white">4.9/5</span>
                  </div>
                  <p className="text-gray-300 text-sm text-center sm:text-left">From 1,000+ Customer Reviews</p>
                </div>
              </motion.div>
            </div>
          </div>
        </ParallaxBannerLayer>
      </ParallaxBanner>
    </section>
  );
}

export default Hero;