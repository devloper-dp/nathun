// Scroll offset configuration
const SCROLL_OFFSET = {
  default: 80,
  mobile: 64,
  header: 96
} as const; // `as const` ensures the object properties are treated as literals

// Type definitions for sections
interface Section {
  id: string;
}

// Get dynamic offset based on screen size
function getScrollOffset(): number {
  return window.innerWidth < 768 ? SCROLL_OFFSET.mobile : SCROLL_OFFSET.default;
}

// Smooth scroll utility with dynamic offset
export function scrollToSection(sectionId: string, customOffset?: number): void {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = customOffset ?? getScrollOffset();
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Common scroll functions
export function scrollToContact(): void {
  scrollToSection('contact');
}

export function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Get active section based on scroll position
export function getActiveSection(sections: Section[]): string {
  const scrollPosition = window.scrollY + SCROLL_OFFSET.header;
  
  for (const section of sections) {
    const element = document.getElementById(section.id);
    if (element) {
      const { offsetTop, offsetHeight } = element;
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        return section.id;
      }
    }
  }
  
  return 'home';
}
