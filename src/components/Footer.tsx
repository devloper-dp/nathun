import { Sun, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Globe, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { navigationConfig } from '../utils/navigation';
import { scrollToSection, scrollToContact, scrollToTop } from '../utils/scroll';
import NavigationLink from './common/NavigationLink';

interface SocialLink {
  id: string;
  url: string;
  label: string;
}

interface Contact {
  phone: string[];
  email: string;
  website: string;
  address: string;
}

interface NavigationConfig {
  mainSections: { id: string; label: string }[];
  services: { id: string; label: string; section: string }[];
  socialLinks: SocialLink[];
  contact: Contact;
}

export default function Footer(): JSX.Element {
  const { mainSections, services, socialLinks, contact }: NavigationConfig = navigationConfig;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <motion.button 
              onClick={() => scrollToSection('home')}
              className="flex items-center group"
              whileHover={{ scale: 1.05 }}
            >
              <Sun className="h-8 w-8 text-yellow-500" />
              <span className="ml-2 text-xl font-bold">Nathun Energies</span>
            </motion.button>
            <p className="mt-4 text-gray-400">
              Leading solar energy solutions provider in Bhopal, Madhya Pradesh. 
              Transforming homes and businesses with sustainable power.
            </p>
            <motion.div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  {social.id === 'facebook' && <Facebook className="h-6 w-6" />}
                  {social.id === 'twitter' && <Twitter className="h-6 w-6" />}
                  {social.id === 'instagram' && <Instagram className="h-6 w-6" />}
                  {social.id === 'linkedin' && <Linkedin className="h-6 w-6" />}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {mainSections.map((section) => (
                <motion.li key={section.id} whileHover={{ x: 5 }}>
                  <NavigationLink
                    sectionId={section.id}
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                  >
                    {section.label}
                  </NavigationLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <motion.li key={service.id} whileHover={{ x: 5 }}>
                  <button
                    onClick={() => scrollToSection(service.section)}
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                  >
                    {service.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <motion.li whileHover={{ x: 5 }}>
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start group"
                >
                  <MapPin className="h-6 w-6 text-yellow-500 flex-shrink-0 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-400 group-hover:text-yellow-500 transition-colors">
                    {contact.address}
                  </span>
                </a>
              </motion.li>
              
              {contact.phone.map((phoneNumber, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a 
                    href={`tel:${phoneNumber}`}
                    className="flex items-center group"
                  >
                    <Phone className="h-6 w-6 text-yellow-500 flex-shrink-0 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-400 group-hover:text-yellow-500 transition-colors">
                      {phoneNumber}
                    </span>
                  </a>
                </motion.li>
              ))}
              
              <motion.li whileHover={{ x: 5 }}>
                <a 
                  href={`mailto:${contact.email}`}
                  className="flex items-center group"
                >
                  <Mail className="h-6 w-6 text-yellow-500 flex-shrink-0 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-400 group-hover:text-yellow-500 transition-colors">
                    {contact.email}
                  </span>
                </a>
              </motion.li>
              
              <motion.li whileHover={{ x: 5 }}>
                <a 
                  href={`https://${contact.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group"
                >
                  <Globe className="h-6 w-6 text-yellow-500 flex-shrink-0 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-400 group-hover:text-yellow-500 transition-colors">
                    {contact.website}
                  </span>
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              &copy; {new Date().getFullYear()} Nathun Energies. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <motion.button
                onClick={scrollToTop}
                className="bg-yellow-500 text-white p-3 rounded-full hover:bg-yellow-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowUp className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}