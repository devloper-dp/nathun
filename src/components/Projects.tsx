import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sun, Battery, ArrowRight, Users, Building2, Factory, Award, Shield, Star } from 'lucide-react';
import Projects3D from './Projects3D';

interface Project {
  id: number;
  type: 'residential' | 'commercial' | 'industrial';
  title: string;
  location: string;
  image: string;
  specs: {
    capacity: string;
    savings: string;
    co2: string;
    completion: string;
  };
  features: string[];
  client: {
    name: string;
    role: string;
    image: string;
    testimonial: string;
  };
  gallery: string[];
  status: 'completed' | 'in-progress' | 'upcoming';
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    type: 'residential',
    title: 'Smart Villa Solar Integration',
    location: 'Bhopal, MP',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    specs: {
      capacity: '10 kW',
      savings: '₹15,000/month',
      co2: '12 tons/year',
      completion: '2024'
    },
    features: [
      'Smart home integration',
      'Battery backup system',
      'Mobile monitoring',
      'Premium panels'
    ],
    client: {
      name: 'Rajesh Kumar',
      role: 'Homeowner',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      testimonial: 'The installation has exceeded our expectations. Our electricity bills have reduced significantly.'
    },
    gallery: [
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d',
      'https://images.unsplash.com/photo-1509391366360-2e959784a276'
    ],
    status: 'completed',
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    id: 2,
    type: 'commercial',
    title: 'Shopping Mall Solar Plant',
    location: 'Indore, MP',
    image: 'https://images.unsplash.com/photo-1566093097221-ac2335b09e70?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    specs: {
      capacity: '200 kW',
      savings: '₹2.5L/month',
      co2: '240 tons/year',
      completion: '2024'
    },
    features: [
      'Zero export solution',
      'Peak load management',
      'Advanced monitoring',
      'Hybrid inverters'
    ],
    client: {
      name: 'Priya Sharma',
      role: 'Mall Manager',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      testimonial: 'The solar installation has significantly reduced our operational costs.'
    },
    gallery: [
      'https://images.unsplash.com/photo-1566093097221-ac2335b09e70',
      'https://images.unsplash.com/photo-1559302995-f1d6d0cb6c39'
    ],
    status: 'in-progress',
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 3,
    type: 'industrial',
    title: 'Factory Solar Integration',
    location: 'Gwalior, MP',
    image: 'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    specs: {
      capacity: '500 kW',
      savings: '₹6L/month',
      co2: '600 tons/year',
      completion: '2024'
    },
    features: [
      'Load optimization',
      'Power quality control',
      '24/7 monitoring',
      'Industrial grade'
    ],
    client: {
      name: 'Amit Patel',
      role: 'Factory Owner',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      testimonial: 'The ROI has been exceptional. Our factory now runs primarily on solar power.'
    },
    gallery: [
      'https://images.unsplash.com/photo-1605980776566-0486c3ac7617',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    ],
    status: 'completed',
    color: 'from-green-400 to-green-600'
  }
];

const Projects: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'residential' | 'commercial' | 'industrial'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedType === 'all' 
    ? projects 
    : projects.filter(project => project.type === selectedType);

  return (
    <section id="projects" className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
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
          <span className="text-yellow-500 font-semibold tracking-wider uppercase">Our Projects</span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Featured Installations
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our successful solar installations across different sectors
          </p>
        </motion.div>

        <div className="mt-12 flex justify-center space-x-4">
          {['all', 'residential', 'commercial', 'industrial'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type as typeof selectedType)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedType === type
                  ? 'bg-yellow-500 text-white'
                  : 'text-gray-300 hover:text-yellow-500'
              }`}
            >
              {type === 'all' && 'All Projects'}
              {type === 'residential' && <><Users className="inline-block mr-2" /> Residential</>}
              {type === 'commercial' && <><Building2 className="inline-block mr-2" /> Commercial</>}
              {type === 'industrial' && <><Factory className="inline-block mr-2" /> Industrial</>}
            </button>
          ))}
        </div>

        <Projects3D />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gray-800/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700"
            >
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <div className="flex items-center text-gray-300 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.location}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Capacity</p>
                    <p className="text-lg font-semibold text-white">{project.specs.capacity}</p>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Savings</p>
                    <p className="text-lg font-semibold text-white">{project.specs.savings}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {project.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-300">
                      <Shield className="h-4 w-4 text-yellow-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={project.client.image}
                      alt={project.client.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="text-white font-medium">{project.client.name}</p>
                      <p className="text-sm text-gray-400">{project.client.role}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="text-yellow-500 flex items-center"
                  >
                    Details <ArrowRight className="ml-1 h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
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
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;