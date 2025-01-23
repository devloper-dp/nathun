// Animation utility functions
import { gsap } from 'gsap';

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

export const staggerChildren = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export const slideIn = (direction: 'left' | 'right' | 'up' | 'down') => {
  const directions = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 }
  };

  return {
    initial: { ...directions[direction], opacity: 0 },
    animate: { x: 0, y: 0, opacity: 1 },
    transition: { duration: 0.5, ease: 'easeOut' }
  };
};

export const animateValue = (
  element: HTMLElement,
  start: number,
  end: number,
  duration: number
) => {
  gsap.fromTo(
    element,
    { textContent: start },
    {
      textContent: end,
      duration,
      ease: 'power1.out',
      snap: { textContent: 1 }
    }
  );
};

export const parallaxEffect = (element: HTMLElement, speed: number = 0.5) => {
  const y = window.scrollY * speed;
  gsap.to(element, {
    y,
    duration: 0.5,
    ease: 'none'
  });
};

export const revealOnScroll = (element: HTMLElement) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );
};

export const hoverEffect = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1.05,
    duration: 0.3,
    ease: 'power2.out'
  });
};

export const exitHoverEffect = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1,
    duration: 0.3,
    ease: 'power2.out'
  });
};