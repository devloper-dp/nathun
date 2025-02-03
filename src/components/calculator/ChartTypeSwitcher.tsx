import React from 'react';
import { BarChart, LineChart, PieChart, TrendingUp } from 'lucide-react';

export type ChartType = 'area' | 'bar' | 'line' | 'composed';

interface ChartTypeSwitcherProps {
  value: ChartType;
  onChange: (type: ChartType) => void;
}

export const ChartTypeSwitcher: React.FC<ChartTypeSwitcherProps> = ({
  value,
  onChange,
}) => {
  const types: { type: ChartType; icon: React.ReactNode; label: string; description: string }[] = [
    { 
      type: 'area', 
      icon: <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />, 
      label: 'Area', 
      description: 'Shows cumulative data over time with filled regions'
    },
    { 
      type: 'bar', 
      icon: <BarChart className="w-3 h-3 sm:w-4 sm:h-4" />, 
      label: 'Bar', 
      description: 'Compare discrete values with vertical bars'
    },
    { 
      type: 'line', 
      icon: <LineChart className="w-3 h-3 sm:w-4 sm:h-4" />, 
      label: 'Line', 
      description: 'View trends with connected data points'
    },
    { 
      type: 'composed', 
      icon: <PieChart className="w-3 h-3 sm:w-4 sm:h-4" />, 
      label: 'Combined', 
      description: 'Mix of bars and lines for complex analysis'
    },
  ];

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {types.map(({ type, icon, label, description }) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={`
              relative flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg
              font-medium transition-all duration-300 group text-xs sm:text-sm
              ${value === type 
                ? 'bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 text-white shadow-lg shadow-yellow-500/20'
                : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-yellow-500/10'
              }
            `}
            title={description}
          >
            <span className={`
              transition-transform duration-300 
              ${value === type ? 'scale-110' : 'group-hover:scale-110'}
            `}>
              {icon}
            </span>
            <span className="hidden sm:inline">
              {label}
            </span>
            
            {/* Enhanced tooltip - only show on larger screens */}
            <div className={`
              hidden sm:block
              absolute -top-12 left-1/2 -translate-x-1/2
              px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg
              bg-gray-800/95 backdrop-blur-sm text-white text-xs
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all duration-200
              whitespace-nowrap
              shadow-lg shadow-black/20
              border border-yellow-500/20
              z-10
              before:content-['']
              before:absolute
              before:-bottom-1
              before:left-1/2
              before:-translate-x-1/2
              before:w-2
              before:h-2
              before:bg-gray-800
              before:rotate-45
              before:border-b before:border-r before:border-yellow-500/20
            `}>
              {description}
            </div>

            {/* Active indicator */}
            {value === type && (
              <div className="
                absolute -top-1 -right-1
                w-2 h-2 sm:w-3 sm:h-3
                bg-white
                rounded-full
                shadow-md
                border-2 border-yellow-500
                animate-[pulse_1.5s_ease-in-out_infinite]
              "/>
            )}
          </button>
        ))}
      </div>
      
      {/* Chart type description - show on mobile */}
      <div className="
        sm:hidden
        text-xs
        bg-gray-900/70
        backdrop-blur-sm
        px-3 py-1.5
        rounded-full
        transition-all duration-300 ease-out
        animate-[fadeIn_0.3s_ease-out]
        shadow-inner
        border border-yellow-500/20
        flex items-center gap-2
      ">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-[pulse_1.5s_ease-in-out_infinite]"></span>
        {types.find(t => t.type === value)?.description}
      </div>
    </div>
  );
};