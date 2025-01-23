import './index.css';
import { useEffect, Suspense, lazy, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy load components for better performance
const Stats = lazy(() => import('./components/Stats'));
const Features = lazy(() => import('./components/Features'));
const EnergySolutions = lazy(() => import('./components/EnergySolutions'));
const Process = lazy(() => import('./components/Process'));
const Projects = lazy(() => import('./components/Projects'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'));
const Products = lazy(() => import('./components/Products'));
const Blog = lazy(() => import('./components/Blog'));
const Awards = lazy(() => import('./components/Awards'));
const Partners = lazy(() => import('./components/Partners'));
const FAQ = lazy(() => import('./components/FAQ'));
const Calculator = lazy(() => import('./components/Calculator').then(module => ({ default: module.Calculator })));

const App: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 }
  });

  useEffect(() => {
    // Initialize AOS with responsive settings
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
      disable: 'mobile',
      startEvent: 'DOMContentLoaded',
      offset: window.innerHeight * 0.1,
      delay: 0,
      mirror: false,
    });

    // Update AOS on window resize
    const handleResize = () => {
      AOS.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <animated.div style={fadeIn} className="min-h-screen bg-white overflow-hidden">
      {/* Fixed Navigation */}
      <Navbar />

      {/* Main Content */}
      <main ref={mainRef} className="relative">
        {/* Hero section is not lazy loaded for immediate visibility */}
        <Hero />

        {/* Lazy loaded sections with suspense fallback */}
        <Suspense fallback={<LoadingSpinner />}>
          <div className="space-y-0 md:space-y-8 lg:space-y-16">
            {/* Statistics Section */}
            <section ref={ref} className="bg-white">
              <Stats />
            </section>

            {/* Features and Solutions */}
            <section className="bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="space-y-0 md:space-y-8">
                <WhyChooseUs />
                <Features />
                <Products />
                <EnergySolutions />
              </div>
            </section>

            {/* Calculator Section */}
            <section id="calculator" className="bg-white">
              <Suspense fallback={<LoadingSpinner />}>
                <Calculator />
              </Suspense>
            </section>

            {/* Process and Projects */}
            <section className="bg-white">
              <div className="space-y-0 md:space-y-8">
                <Process />
                <Projects />
              </div>
            </section>

            {/* Social Proof */}
            <section className="bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="space-y-0 md:space-y-8">
                <Awards />
                <Testimonials />
                <Partners />
              </div>
            </section>

            {/* Information */}
            <section className="bg-white">
              <div className="space-y-0 md:space-y-8">
                <About />
                <Blog />
                <FAQ />
              </div>
            </section>

            {/* Contact Section */}
            <section className="bg-gradient-to-br from-gray-50 to-gray-100">
              <Contact />
            </section>
          </div>
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
    </animated.div>
  );
};

export default App;