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
      icon: <TrendingUp className="w-4 h-4" />, 
      label: 'Area', 
      description: 'Shows data as filled areas over time'
    },
    { 
      type: 'bar', 
      icon: <BarChart className="w-4 h-4" />, 
      label: 'Bar', 
      description: 'Compare values with vertical bars'
    },
    { 
      type: 'line', 
      icon: <LineChart className="w-4 h-4" />, 
      label: 'Line', 
      description: 'Track trends with connected points'
    },
    { 
      type: 'composed', 
      icon: <PieChart className="w-4 h-4" />, 
      label: 'Combined', 
      description: 'Mix of bars and lines for complex data'
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      <div className="flex flex-wrap justify-center gap-3">
        {types.map(({ type, icon, label, description }) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={`
              chart-type-button
              ${value === type ? 'active' : ''}
            `}
            title={description}
          >
            <span className={`
              transition-transform duration-300 
              ${value === type ? 'scale-110' : 'group-hover:scale-110'}
            `}>
              {icon}
            </span>
            <span className="text-sm font-medium">
              {label}
            </span>
            
            {/* Enhanced tooltip */}
            <div className={`
              absolute -top-12 left-1/2 -translate-x-1/2
              px-3 py-2 rounded-lg
              bg-gray-800 text-white text-xs
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all duration-200
              whitespace-nowrap
              shadow-lg
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
            `}>
              {description}
            </div>

            {/* Active indicator */}
            {value === type && (
              <div className="
                absolute -top-1 -right-1
                w-2.5 h-2.5
                bg-white
                rounded-full
                shadow-md
                border-2 border-blue-500
                animate-pulse
              "/>
            )}
          </button>
        ))}
      </div>
      
      {/* Chart type description */}
      <div className="
        text-sm text-gray-600
        bg-gray-50/80
        backdrop-blur-sm
        px-4 py-2
        rounded-full
        transition-all duration-300 ease-out
        animate-fade-in
        shadow-inner
      ">
        {types.find(t => t.type === value)?.description}
      </div>
    </div>
  );
};