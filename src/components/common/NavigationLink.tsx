import { scrollToSection } from '../../utils/scroll';

interface NavigationLinkProps {
  sectionId: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  activeSection?: string | null;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ 
  sectionId, 
  children, 
  className = '', 
  onClick, 
  activeSection = null 
}) => {
  const handleClick = () => {
    scrollToSection(sectionId);
    onClick?.();
  };

  const isActive = activeSection === sectionId;

  return (
    <button
      onClick={handleClick}
      className={`relative transition-colors duration-200 ${
        isActive
          ? 'text-yellow-500'
          : 'text-gray-700 hover:text-yellow-500'
      } ${className}`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform transition-transform duration-200" />
      )}
    </button>
  );
}

export default NavigationLink;
