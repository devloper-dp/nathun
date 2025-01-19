import { motion } from 'framer-motion';
import { Shield, Sun, Award, Clock, Users, Wrench } from 'lucide-react';
import gridSvg from '../assets/grid.svg';

// Define the type for each reason item
interface Reason {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
}

const reasons: Reason[] = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: "25 Years Warranty",
    description: "Comprehensive coverage for complete peace of mind with industry-leading warranty terms.",
    color: "from-yellow-400 to-yellow-600"
  },
  {
    icon: <Sun className="h-8 w-8" />,
    title: "Premium Components",
    description: "Only the highest quality Tier-1 solar panels and inverters for maximum efficiency.",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Certified Excellence",
    description: "ISO 9001:2015 certified company with multiple industry awards and recognitions.",
    color: "from-green-400 to-green-600"
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Quick Installation",
    description: "Professional installation completed within 3-5 days with minimal disruption.",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Expert Team",
    description: "Highly skilled and experienced professionals dedicated to your project.",
    color: "from-red-400 to-red-600"
  },
  {
    icon: <Wrench className="h-8 w-8" />,
    title: "Lifetime Support",
    description: "24/7 monitoring and dedicated support throughout the system's lifetime.",
    color: "from-indigo-400 to-indigo-600"
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <img src={gridSvg} alt="grid" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-yellow-500 font-semibold tracking-wider uppercase">Why Choose Us</span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            The Nathun Energies Advantage
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Experience excellence in solar solutions with our award-winning service
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden group"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${reason.color} flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                {reason.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-2xl font-semibold text-gray-900">
            Join over <span className="text-yellow-500">10,000+</span> satisfied customers
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-full font-semibold inline-flex items-center group hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
          >
            Learn More About Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
