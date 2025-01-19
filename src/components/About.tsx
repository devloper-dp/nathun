import { CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  const features: string[] = [
    "Over 10,000 installations completed",
    "Certified professional team",
    "Industry-leading warranty coverage",
    "24/7 monitoring and support",
  ];

  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Leading the Solar Revolution Since 2010
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              We're committed to making sustainable energy accessible to everyone. Our team of experts has
              installed over 10,000 solar systems across the country, helping businesses and homeowners
              reduce their carbon footprint while saving money.
            </p>

            <div className="mt-8 space-y-4">
              {features.map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle2 className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                  <span className="ml-3 text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <p className="text-4xl font-bold text-yellow-500">10K+</p>
                <p className="mt-2 text-gray-600">Installations</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-yellow-500">98%</p>
                <p className="mt-2 text-gray-600">Satisfaction</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-yellow-500">50M+</p>
                <p className="mt-2 text-gray-600">CO₂ Reduced</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Solar installation team"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
              <p className="text-2xl font-bold text-yellow-500">15+</p>
              <p className="text-gray-700">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
