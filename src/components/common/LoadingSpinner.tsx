import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <Loader2 className="h-8 w-8 text-yellow-500 animate-spin" />
    </div>
  );
};

export default LoadingSpinner;