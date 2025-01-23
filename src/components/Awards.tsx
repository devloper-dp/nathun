import { motion } from 'framer-motion';
import { Award, Star, Shield, Trophy } from 'lucide-react';
import Marquee from 'react-fast-marquee';
import { Suspense } from 'react';
import Awards3D from './Awards3D';
import AwardCard from './AwardCard';
import CertificationCard from './CertificationCard';
import LoadingSpinner from './common/LoadingSpinner';

interface AwardProps {
  icon: React.ReactNode;
  title: string;
  organization: string;
  description: string;
  color: string;
  image: string;
}

interface CertificationProps {
  name: string;
  logo: string;
  description: string;
  validUntil: string;
  details: string[];
  color: string;
}

const awards: AwardProps[] = [
  {
    icon: <Trophy className="h-8 w-8 text-white" />,
    title: 'Best Solar Company 2023',
    organization: 'Renewable Energy Awards',
    description: 'Excellence in solar solutions and customer service',
    color: 'from-yellow-400 to-yellow-600',
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: <Award className="h-8 w-8 text-white" />,
    title: 'Innovation Award',
    organization: 'Solar Technology Forum',
    description: 'Pioneering smart solar monitoring systems',
    color: 'from-blue-400 to-blue-600',
    image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: <Shield className="h-8 w-8 text-white" />,
    title: 'Quality Excellence',
    organization: 'ISO 9001:2015',
    description: 'Certified quality management system',
    color: 'from-green-400 to-green-600',
    image: 'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: <Star className="h-8 w-8 text-white" />,
    title: 'Customer Satisfaction',
    organization: 'Consumer Choice Awards',
    description: 'Highest rated solar provider in the region',
    color: 'from-purple-400 to-purple-600',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const certifications: CertificationProps[] = [
  {
    name: 'ISO 9001:2015',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    description: 'Quality Management System',
    validUntil: '2025',
    details: [
      'International quality standards',
      'Process optimization',
      'Customer satisfaction focus',
      'Continuous improvement'
    ],
    color: 'from-blue-400 to-blue-600'
  },
  {
    name: 'MNRE Approved',
    logo: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    description: 'Ministry of New and Renewable Energy',
    validUntil: '2024',
    details: [
      'Government authorized',
      'Quality standards compliance',
      'Technical specifications met',
      'Regular audits'
    ],
    color: 'from-green-400 to-green-600'
  },
  {
    name: 'CEA Certified',
    logo: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    description: 'Central Electricity Authority',
    validUntil: '2024',
    details: [
      'Safety standards compliance',
      'Grid connectivity approved',
      'Technical competence',
      'Regular monitoring'
    ],
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    name: 'BIS Certified',
    logo: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    description: 'Bureau of Indian Standards',
    validUntil: '2024',
    details: [
      'Product quality standards',
      'Manufacturing excellence',
      'Safety compliance',
      'Regular quality checks'
    ],
    color: 'from-purple-400 to-purple-600'
  }
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

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="awards-3d-container canvas-interactive canvas-shadow"
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Awards3D />
          </Suspense>
        </motion.div>

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
            <CertificationCard key={index} certifications={[cert]} index={0} />
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
             Recognitions
            <Trophy className="ml-2 h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}