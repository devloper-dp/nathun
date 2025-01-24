import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useWindowSize } from '../../utils/hooks';
import { ThreeDErrorBoundary } from './ErrorBoundary';

interface ThreeDContainerProps {
  children: ReactNode;
  className?: string;
  minHeight?: string;
  maxHeight?: string;
  scale?: number;
}

export const ThreeDContainer: React.FC<ThreeDContainerProps> = ({
  children,
  className = '',
  minHeight = '400px',
  maxHeight = '800px',
  scale = 1
}) => {
  const { width } = useWindowSize();

  const getResponsiveScale = () => {
    if (width < 640) return scale * 0.6;
    if (width < 768) return scale * 0.75;
    if (width < 1024) return scale * 0.85;
    return scale;
  };

  const getResponsiveHeight = () => {
    if (width < 640) return '300px';
    if (width < 768) return '400px';
    if (width < 1024) return '500px';
    return minHeight;
  };

  return (
    <div 
      className={`relative w-full ${className}`}
      style={{ 
        minHeight: getResponsiveHeight(),
        maxHeight,
        perspective: '1000px',
        position: 'relative'
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
        style={{
          transform: `scale(${getResponsiveScale()})`,
          transformOrigin: 'center center'
        }}
      >
        <ThreeDErrorBoundary>
          {children}
        </ThreeDErrorBoundary>
      </motion.div>
    </div>
  );
};