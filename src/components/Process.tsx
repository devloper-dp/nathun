import { CircleDot, ArrowRight, CheckCircle2, Wrench, Clock, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import gridSvg from '../assets/grid.svg';

interface Step {
  number: string;
  title: string;
  description: string;
  details: string[];
  icon: JSX.Element;
  duration: string;
  color: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Site Assessment",
    description: "Expert evaluation of your property",
    details: [
      "Comprehensive site analysis",
      "Solar potential assessment",
      "Shade analysis",
      "Structural evaluation"
    ],
    icon: <Sun className="h-6 w-6" />,
    duration: "1-2 Days",
    color: "from-yellow-400 to-yellow-600"
  },
  {
    number: "02",
    title: "Custom Design",
    description: "Tailored solar solution design",
    details: [
      "3D system modeling",
      "Performance simulation",
      "ROI calculation",
      "Design optimization"
    ],
    icon: <Wrench className="h-6 w-6" />,
    duration: "2-3 Days",
    color: "from-blue-400 to-blue-600"
  },
  {
    number: "03",
    title: "Installation",
    description: "Professional system setup",
    details: [
      "Expert installation team",
      "Quality components",
      "Safety compliance",
      "System testing"
    ],
    icon: <CheckCircle2 className="h-6 w-6" />,
    duration: "3-4 Days",
    color: "from-green-400 to-green-600"
  },
  {
    number: "04",
    title: "Monitoring",
    description: "24/7 system monitoring",
    details: [
      "Real-time monitoring",
      "Performance tracking",
      "Mobile app access",
      "Instant alerts"
    ],
    icon: <Clock className="h-6 w-6" />,
    duration: "Ongoing",
    color: "from-purple-400 to-purple-600"
  }
];

export default function Process() {
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="process" className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('./assets/')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-yellow-500 font-semibold tracking-wider uppercase">How It Works</span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Our Installation Process
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Experience our streamlined solar installation process, from consultation to completion
          </p>
        </motion.div>

        <div className="mt-24 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500/20 via-yellow-500/40 to-yellow-500/20 transform -translate-y-1/2" />
          
          <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className={`relative ${selectedStep === index ? 'active' : ''}`}
                onClick={() => setSelectedStep(index)}
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative bg-white rounded-2xl shadow-xl p-8 cursor-pointer group"
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold`}>
                      {step.number}
                    </div>
                  </div>

                  <div className={`mt-4 w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white mb-6 transform transition-transform group-hover:rotate-6`}>
                    {step.icon}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>

                  <div className="space-y-2">
                    {step.details.slice(0, 2).map((detail, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500">
                        <CircleDot className="h-4 w-4 text-yellow-500 mr-2" />
                        {detail}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-gray-500">{step.duration}</span>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className={`flex items-center text-sm font-semibold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}
                    >
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid-image">
          <img src={gridSvg} alt="Grid" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-full font-semibold inline-flex items-center group hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
          >
            Start Your Solar Journey
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
