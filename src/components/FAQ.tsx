import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

// Define the structure of a FAQ
interface FAQ {
  question: string;
  answer: string;
}

// Define the FAQs array with proper types
const faqs: FAQ[] = [
  {
    question: "How much can I save with solar panels?",
    answer: "Savings vary based on energy consumption, location, and system size. On average, customers save 50-90% on their electricity bills. Our solar calculator can provide a personalized estimate based on your specific situation."
  },
  {
    question: "What is the installation process like?",
    answer: "Our installation process is quick and efficient, typically taking 3-5 days. It includes site assessment, design, permits, installation, and final inspection. We handle all paperwork and ensure minimal disruption to your daily routine."
  },
  {
    question: "What maintenance is required?",
    answer: "Solar panels require minimal maintenance. Regular cleaning and annual inspections are recommended. Our systems come with 24/7 monitoring, and we provide comprehensive maintenance services to ensure optimal performance."
  },
  {
    question: "What warranties do you offer?",
    answer: "We provide comprehensive warranty coverage including: 25-year performance warranty, 12-year product warranty, and 10-year installation warranty. Our warranties are backed by industry-leading manufacturers and our commitment to quality."
  },
  {
    question: "Are there government incentives available?",
    answer: "Yes, several government incentives are available including tax credits, rebates, and subsidies. Our team will help you identify and apply for all eligible incentives to maximize your savings."
  },
  {
    question: "How long do solar panels last?",
    answer: "Quality solar panels have a lifespan of 25-30 years, with many systems continuing to produce energy beyond this period. We use only Tier-1 panels that maintain high efficiency throughout their lifetime."
  }
];

export default function FAQ(): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Properly type useState to handle index or null

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-yellow-500 font-semibold tracking-wider uppercase">FAQ</span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about solar energy solutions
          </p>
        </motion.div>

        <div className="mt-16 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Plus className="h-5 w-5 text-yellow-500" />
                )}
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 text-gray-600">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600">
            Still have questions? Contact our support team for assistance
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-full font-semibold inline-flex items-center group hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
