import { Sun, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';
import { navigationConfig } from '../utils/navigation';
import { scrollToSection, scrollToContact } from '../utils/scroll';
import NavigationLink from './common/NavigationLink';
import ScrollToTop from './common/ScrollToTop';

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

  // Create Google Maps URL from the address
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;

  return (
    <footer className="bg-gray-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <button 
              onClick={() => scrollToSection('home')}
              className="flex items-center group"
            >
              <Sun className="h-8 w-8 text-yellow-500" />
              <span className="ml-2 text-xl font-bold">Nathun Energies</span>
            </button>
            <p className="mt-4 text-gray-400">
              Leading solar energy solutions provider in Bhopal, Madhya Pradesh. Transforming homes and businesses with sustainable power.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                  aria-label={social.label}
                >
                  {social.id === 'facebook' && <Facebook className="h-6 w-6" />}
                  {social.id === 'twitter' && <Twitter className="h-6 w-6" />}
                  {social.id === 'instagram' && <Instagram className="h-6 w-6" />}
                  {social.id === 'linkedin' && <Linkedin className="h-6 w-6" />}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {mainSections.map((section) => (
                <li key={section.id}>
                  <NavigationLink
                    sectionId={section.id}
                    className="text-gray-400 hover:text-yellow-500"
                  >
                    {section.label}
                  </NavigationLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => scrollToSection(service.section)}
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-6 w-6 text-yellow-500 flex-shrink-0 mr-3" />
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  {contact.address}
                </a>
              </li>
              {contact.phone.map((phoneNumber, index) => (
                <li key={index}>
                  <a 
                    href={`tel:${phoneNumber}`}
                    className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors"
                  >
                    <Phone className="h-6 w-6 text-yellow-500 flex-shrink-0 mr-3" />
                    <span>{phoneNumber}</span>
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href={`mailto:${contact.email}`}
                  className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  <Mail className="h-6 w-6 text-yellow-500 flex-shrink-0 mr-3" />
                  <span>{contact.email}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`https://${contact.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  <Globe className="h-6 w-6 text-yellow-500 flex-shrink-0 mr-3" />
                  <span>{contact.website}</span>
                </a>
              </li>
              <li>
                <button 
                  onClick={() => scrollToContact()}
                  className="mt-4 text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Nathun Energies. All rights reserved.</p>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </footer>
  );
}