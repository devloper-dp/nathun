import { motion } from 'framer-motion';
import { Award, Star, Shield, Trophy } from 'lucide-react';
import Marquee from 'react-fast-marquee';
import Awards3D from './Awards3D';
import AwardCard from './AwardCard';
import CertificationCard from './CertificationCard';

interface AwardProps {
  icon: React.ReactNode; // Icon can be any React node
  title: string;
  organization: string;
  description: string;
  color: string; // Tailwind gradient class
  image: string; // Path to the image
}

interface CertificationProps {
  name: string;
  logo: string; // Path to the logo
  description: string;
  validUntil: string; // Expiry year
  details: string[]; // List of details
  color: string; // Tailwind gradient class
}

const awards: AwardProps[] = [
  {
    icon: <Trophy className="h-8 w-8 text-white" />,
    title: 'Best Solar Company 2023',
    organization: 'Renewable Energy Awards',
    description: 'Excellence in solar solutions and customer service',
    color: 'from-yellow-400 to-yellow-600',
    image: '/awards/best-solar.webp',
  },
  {
    icon: <Award className="h-8 w-8 text-white" />,
    title: 'Innovation Award',
    organization: 'Solar Technology Forum',
    description: 'Pioneering smart solar monitoring systems',
    color: 'from-blue-400 to-blue-600',
    image: '/awards/innovation.webp',
  },
  {
    icon: <Shield className="h-8 w-8 text-white" />,
    title: 'Quality Excellence',
    organization: 'ISO 9001:2015',
    description: 'Certified quality management system',
    color: 'from-green-400 to-green-600',
    image: '/awards/quality.webp',
  },
  {
    icon: <Star className="h-8 w-8 text-white" />,
    title: 'Customer Satisfaction',
    organization: 'Consumer Choice Awards',
    description: 'Highest rated solar provider in the region',
    color: 'from-purple-400 to-purple-600',
    image: '/awards/customer.webp',
  },
];

const certifications: CertificationProps[] = [
  {
    name: 'ISO 9001:2015',
    logo: '/certifications/iso.webp',
    description: 'Quality Management System',
    validUntil: '2025',
    details: [
      'International quality standards',
      'Process optimization',
      'Customer satisfaction focus',
      'Continuous improvement',
    ],
    color: 'from-blue-400 to-blue-600',
  },
  {
    name: 'MNRE Approved',
    logo: '/certifications/mnre.webp',
    description: 'Ministry of New and Renewable Energy',
    validUntil: '2024',
    details: [
      'Government authorized',
      'Quality standards compliance',
      'Technical specifications met',
      'Regular audits',
    ],
    color: 'from-green-400 to-green-600',
  },
  {
    name: 'CEA Certified',
    logo: '/certifications/cea.webp',
    description: 'Central Electricity Authority',
    validUntil: '2024',
    details: [
      'Safety standards compliance',
      'Grid connectivity approved',
      'Technical competence',
      'Regular monitoring',
    ],
    color: 'from-yellow-400 to-yellow-600',
  },
  {
    name: 'BIS Certified',
    logo: '/certifications/bis.webp',
    description: 'Bureau of Indian Standards',
    validUntil: '2024',
    details: [
      'Product quality standards',
      'Manufacturing excellence',
      'Safety compliance',
      'Regular quality checks',
    ],
    color: 'from-purple-400 to-purple-600',
  },
];

export default function Awards() {
  return (
    <section id="awards" className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
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
          <span className="text-yellow-500 font-semibold tracking-wider uppercase">Recognition</span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Awards & Certifications
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Our commitment to excellence recognized by industry leaders
          </p>
        </motion.div>

        <Awards3D />

        <Marquee gradient={false} speed={50}>
          {awards.map((award, index) => (
            <AwardCard key={index} award={award} index={index} />
          ))}
        </Marquee>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <span className="text-yellow-500 font-semibold tracking-wider uppercase">Our Certifications</span>
          <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Industry Standards & Compliance
          </h3>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Meeting and exceeding international quality and safety standards
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, index) => (
            <CertificationCard key={index} cert={cert} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-2xl font-semibold text-white">
            Trusted by <span className="text-yellow-500">1,000+</span> customers
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-full font-semibold inline-flex items-center group hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
          >
            View All Recognitions
            <Trophy className="ml-2 h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
