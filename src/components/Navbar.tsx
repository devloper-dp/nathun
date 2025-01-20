import { useState, useEffect } from 'react';
import { Sun, Menu, X } from 'lucide-react';
import { navigationConfig } from '../utils/navigation';
import { getActiveSection, scrollToSection } from '../utils/scroll';
import NavigationLink from './common/NavigationLink';
import logo from '../assets/logo.png';

interface Section {
  id: string;
  label: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const { mainSections }: { mainSections: Section[] } = navigationConfig;

  useEffect(() => {
    const handleScroll = () => {
      const newActiveSection = getActiveSection(mainSections);
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, mainSections]);

  const handleNavigation = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container-responsive">
        <div className="flex justify-between h-24 sm:h-35 items-center">
          <button 
            onClick={() => handleNavigation('home')}
            className="flex items-center group transition-transform duration-200 hover:scale-105"
          >
            <img src={logo} alt="Logo" className="h-40 w-auto text-yellow-500 transition-transform duration-200 group-hover:rotate-90" />
            <span className="ml-2 text-lg sm:text-xl font-bold text-gray-800 group-hover:text-yellow-500">
              Nathun Energies
            </span>
          </button>
          
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {mainSections.slice(0, -1).map((section) => (
              <NavigationLink
                key={section.id}
                sectionId={section.id}
                activeSection={activeSection}
                className="px-3 py-2 text-sm lg:text-base"
              >
                {section.label}
              </NavigationLink>
            ))}
            <button
              onClick={() => handleNavigation('contact')}
              className="btn-responsive bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Get Quote
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg transform transition-transform duration-200">
          <div className="container-responsive py-4 space-y-2">
            {mainSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavigation(section.id)}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeSection === section.id
                    ? 'bg-yellow-50 text-yellow-500'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-yellow-500'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}