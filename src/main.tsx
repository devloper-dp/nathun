import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ParallaxProvider } from 'react-scroll-parallax';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <ParallaxProvider>
        <App />
    </ParallaxProvider>
  </StrictMode>
);
