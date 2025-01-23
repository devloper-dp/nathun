// TypeScript types for the navigation configuration
type Section = {
  id: string;
  label: string;
};

type Service = {
  id: string;
  label: string;
  section: string;
};

type SocialLink = {
  id: string;
  url: string;
  label: string;
};

type Contact = {
  phone: string[];
  email: string;
  website: string;
  address: string;
};

interface NavigationConfig {
  mainSections: Section[];
  services: Service[];
  socialLinks: SocialLink[];
  contact: Contact;
}

// Navigation configuration
export const navigationConfig: NavigationConfig = {
  mainSections: [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'products', label: 'Products' },
    { id: 'calculator', label: 'Calculator' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ],

  services: [
    { id: 'residential', label: 'Residential Solar', section: 'solutions' },
    { id: 'commercial', label: 'Commercial Solar', section: 'solutions' },
    { id: 'industrial', label: 'Industrial Solar', section: 'solutions' },
    { id: 'maintenance', label: 'Maintenance', section: 'solutions' }
  ],

  socialLinks: [
    { id: 'facebook', url: 'https://facebook.com', label: 'Facebook' },
    { id: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
    { id: 'instagram', url: 'https://instagram.com', label: 'Instagram' },
    { id: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' }
  ],

  contact: {
    phone: ['+91 7566777699', '+91 8962359234'],
    email: 'solar@nathuncorp.com',
    website: 'www.nathunenergies.com',
    address: 'Shop No. 3 - Azad Nagar Barkheda, Pathani Bhopal (M.P.)'
  }
};