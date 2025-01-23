import { motion } from 'framer-motion';
import { Sun, Battery, Zap, ArrowRight, Shield } from 'lucide-react';
import { useState } from 'react';

interface ProductItem {
  name: string;
  power: string;
  efficiency: string;
  warranty: string;
  image: string;
  features: string[];
}

interface ProductCategory {
  category: string;
  items: ProductItem[];
}

const products: ProductCategory[] = [
  {
    category: "Solar Panels",
    items: [
      {
        name: "Premium Mono PERC",
        power: "550W",
        efficiency: "21.7%",
        warranty: "25 Years",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        features: [
          "Anti-reflective coating",
          "Enhanced low-light performance",
          "Salt mist resistance",
          "PID resistant"
        ]
      },
      {
        name: "Bifacial Solar Panel",
        power: "600W",
        efficiency: "23.1%",
        warranty: "30 Years",
        image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        features: [
          "Dual-sided power generation",
          "Enhanced durability",
          "Higher energy yield",
          "Temperature resistant"
        ]
      }
    ]
  },
  {
    category: "Inverters",
    items: [
      {
        name: "Smart Hybrid Inverter",
        power: "10kW",
        efficiency: "98.6%",
        warranty: "10 Years",
        image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        features: [
          "Battery compatibility",
          "Smart monitoring",
          "Grid support",
          "Surge protection"
        ]
      },
      {
        name: "Microinverter System",
        power: "2kW",
        efficiency: "97.5%",
        warranty: "15 Years",
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        features: [
          "Panel-level optimization",
          "Enhanced safety",
          "Flexible design",
          "Remote monitoring"
        ]
      }
    ]
  },
  {
    category: "Batteries",
    items: [
      {
        name: "Deep Cycle Battery",
        power: "12V",
        efficiency: "90%",
        warranty: "5 Years",
        image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        features: [
          "Long cycle life",
          "High discharge rate",
          "Low self-discharge",
          "Maintenance-free"
        ]
      }
    ]
  }
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Solar Panels");

  return (
    <section id="products" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-yellow-500 font-semibold tracking-wider uppercase">Our Products</span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Premium Solar Solutions
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our range of high-efficiency solar products
          </p>
        </motion.div>

        <div className="mt-12 flex justify-center space-x-4">
          {products.map((product) => (
            <button
              key={product.category}
              onClick={() => setSelectedCategory(product.category)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === product.category
                  ? 'bg-yellow-500 text-white'
                  : 'text-gray-600 hover:text-yellow-500'
              }`}
            >
              {product.category === "Solar Panels" && <Sun className="icon" />}
              {product.category === "Inverters" && <Zap className="icon" />}
              {product.category === "Batteries" && <Battery className="icon" />}
              {product.category}
            </button>
          ))}
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {products
            .find((p) => p.category === selectedCategory)
            ?.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden group"
              >
                <div className="relative h-64">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{item.name}</h3>
                    <p className="text-yellow-400">{item.power}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Efficiency</p>
                      <p className="text-lg font-semibold">{item.efficiency}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Warranty</p>
                      <p className="text-lg font-semibold">{item.warranty}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-600">
                        <Shield className="h-4 w-4 text-yellow-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center group"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}