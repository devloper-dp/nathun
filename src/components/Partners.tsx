import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

interface Partner {
  name: string;
  logo: string;
  type: string;
}

const partners: Partner[] = [
  {
    name: "Solar Tech Industries",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    type: "Manufacturing Partner"
  },
  {
    name: "Green Energy Solutions",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    type: "Technology Partner"
  },
  {
    name: "EcoSmart Systems",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    type: "Installation Partner"
  },
  {
    name: "PowerGrid Solutions",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    type: "Infrastructure Partner"
  },
  {
    name: "SunTech Global",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    type: "Research Partner"
  }
];

const Partners: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-yellow-500 font-semibold tracking-wider uppercase">Our Partners</span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Collaborating with the best to deliver excellence in solar solutions
          </p>
        </motion.div>

        <div className="mt-16">
          <Marquee gradient={false} speed={40}>
            <div className="flex space-x-12">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 w-64"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-16 w-auto mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 text-center">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-gray-500 text-center">{partner.type}</p>
                </motion.div>
              ))}
            </div>
          </Marquee>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <h4 className="text-4xl font-bold text-yellow-500">50+</h4>
            <p className="mt-2 text-gray-600">Global Partners</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-bold text-yellow-500">20+</h4>
            <p className="mt-2 text-gray-600">Countries</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-bold text-yellow-500">100+</h4>
            <p className="mt-2 text-gray-600">Joint Projects</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-bold text-yellow-500">15+</h4>
            <p className="mt-2 text-gray-600">Years of Partnership</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
