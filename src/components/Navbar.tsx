import { useState, useEffect } from 'react';
import { Menu, X, Calculator, ArrowRight, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationConfig } from '../utils/navigation';
import { getActiveSection, scrollToSection } from '../utils/scroll';
import NavigationLink from './common/NavigationLink';
import { useWindowSize } from '../utils/hooks';

interface Section {
  id: string;
  label: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { mainSections }: { mainSections: Section[] } = navigationConfig;
  const { width } = useWindowSize();

  useEffect(() => {
    const handleScroll = () => {
      // Update active section
      const newActiveSection = getActiveSection(mainSections);
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }

      // Update navbar background opacity based on scroll
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, mainSections]);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    if (width >= 1024 && isOpen) {
      setIsOpen(false);
    }
  }, [width]);

  const handleNavigation = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20, height: 0 },
    visible: { opacity: 1, y: 0, height: 'auto' }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-responsive">
        {/* Main Navbar Content */}
        <div className="flex justify-between items-center py-2 lg:py-4">
          {/* Logo Section */}
          <motion.button 
            onClick={() => handleNavigation('home')}
            className="flex items-center group transition-transform duration-200 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img 
              src="https://github.com/devloper-dp/nathun/raw/main/logo.png" 
              alt="Logo" 
              className="h-16 w-32 sm:h-20 sm:w-40 md:h-24 md:w-48 text-yellow-500"
              animate={{ scale: isScrolled ? 1.2 : 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.span 
              className="hidden sm:block ml-2 text-base sm:text-lg md:text-xl font-bold text-gray-800"
              animate={{ color: isScrolled ? '#1a1a1a' : '#ffffff' }}
            >

            </motion.span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Main Navigation Links */}
            <div className="flex items-center space-x-1 xl:space-x-2">
              {mainSections.slice(0, -1).map((section) => (
                <NavigationLink
                  key={section.id}
                  sectionId={section.id}
                  activeSection={activeSection}
                  className="px-2 xl:px-3 py-2 text-sm xl:text-base whitespace-nowrap hover:text-yellow-500 transition-colors"
                >
                  {section.id === 'calculator' ? (
                    <motion.span 
                      className="flex items-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Calculator className="h-4 w-4 mr-1" />
                      {section.label}
                    </motion.span>
                  ) : (
                    section.label
                  )}
                </NavigationLink>
              ))}
            </div>

            {/* Contact Button */}
            <motion.button
              onClick={() => handleNavigation('contact')}
              className="ml-2 px-4 xl:px-6 py-2 bg-yellow-500 text-white text-sm xl:text-base rounded-full 
                hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105 hover:shadow-lg 
                active:scale-95 whitespace-nowrap flex items-center"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(234, 179, 8, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get Quote
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-gray-700" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -180, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
              transition={{ duration: 0.3 }}
              className="lg:hidden absolute left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg"
            >
              <div className="container-responsive py-4 space-y-2">
                {mainSections.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => handleNavigation(section.id)}
                    className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                      activeSection === section.id
                        ? 'bg-yellow-50 text-yellow-500'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-yellow-500'
                    }`}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section.id === 'calculator' && <Calculator className="h-4 w-4 mr-2" />}
                    {section.label}
                    {section.id === 'contact' && (
                      <ArrowRight className="ml-auto h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}