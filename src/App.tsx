import './index.css';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import {Calculator} from './components/Calculator';
import EnergySolutions from './components/EnergySolutions';
import Process from './components/Process';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhyChooseUs from './components/WhyChooseUs';
import Products from './components/Products';
import Blog from './components/Blog';
import Awards from './components/Awards';
import Partners from './components/Partners';
import FAQ from './components/FAQ';
import GridBackground from './components/GridBackground';

const App: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out'
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <GridBackground />
      <main>
        <Hero />
        <Stats />
        <WhyChooseUs />
        <Features />
        <Products />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
          <Calculator />
        </div>
        <EnergySolutions />
        <Process />
        <Projects />
        <Awards />
        <Testimonials />
        <Partners />
        <About />
        <Blog />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
