import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
  Label,
  Brush,
  BarChart,
  Bar,
} from 'recharts';
import { ComparisonData } from '../../types/calculator';
import { ChartTypeSwitcher, ChartType } from './ChartTypeSwitcher';
import { useWindowSize } from '../../utils/hooks';

const generateUniqueKey = (prefix: string, value: number, index: number): string => {
  return `${prefix}-${value}-${index}`;
};

interface ComparisonChartProps {
  data: ComparisonData[];
  showEmi?: boolean;
}

const BrushAnalysis: React.FC<{
  data: ComparisonData[];
  startIndex: number;
  endIndex: number;
  showEmi: boolean;
}> = ({ data, startIndex, endIndex, showEmi }) => {
  if (!data || data.length === 0 || startIndex < 0 || endIndex >= data.length || startIndex > endIndex) {
    return null;
  }

  const selectedData = data.slice(startIndex, endIndex + 1);
  
  if (selectedData.length === 0) {
    return null;
  }

  const totalWithoutSolar = selectedData.reduce((sum, d) => sum + d.withoutSolar, 0);
  const totalWithSolar = selectedData.reduce((sum, d) => sum + d.withSolar, 0);
  const totalEmi = showEmi ? selectedData.reduce((sum, d) => sum + (d.emiPayment || 0), 0) : 0;
  const totalSavings = totalWithoutSolar - (totalWithSolar + totalEmi);

  const endSavings = selectedData[selectedData.length - 1]?.cumulativeSavings || 0;
  const startSavings = startIndex > 0 && data[startIndex - 1] 
    ? data[startIndex - 1].cumulativeSavings 
    : 0;
  const netSavings = endSavings - startSavings;

  const yearsSelected = selectedData.length;
  const avgYearlySavings = yearsSelected > 0 ? netSavings / yearsSelected : 0;
  const avgYearlyWithoutSolar = totalWithoutSolar / yearsSelected;
  const avgYearlyWithSolar = (totalWithSolar + totalEmi) / yearsSelected;

  const initialInvestment = Math.abs(data[0]?.cumulativeSavings || 0);
  const roi = initialInvestment !== 0 
    ? ((totalSavings - initialInvestment) / initialInvestment) * 100 
    : 0;

  const yearsToBreakEven = data.findIndex(d => d.cumulativeSavings > 0) + 1;

  return (
    <div className="p-6 rounded-xl bg-gray-800/70 backdrop-blur-sm border border-yellow-500/20 shadow-lg">
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="text-sm">
          <div className="font-medium text-gray-400 mb-2">Analysis Period</div>
          <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            Year {startIndex + 1} - {endIndex + 1}
          </div>
        </div>
        <div className="text-sm text-right">
          <div className="font-medium text-gray-400 mb-2">Total Savings</div>
          <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
            ₹{totalSavings.toLocaleString()}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-900/70 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors duration-300">
          <div className="text-gray-400 mb-2 text-sm">Without Solar</div>
          <div className="font-bold text-red-400 text-lg">₹{totalWithoutSolar.toLocaleString()}</div>
          <div className="text-gray-500 text-xs mt-2">
            Avg: ₹{avgYearlyWithoutSolar.toFixed(0)}/year
          </div>
        </div>
        <div className="p-4 bg-gray-900/70 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors duration-300">
          <div className="text-gray-400 mb-2 text-sm">With Solar</div>
          <div className="font-bold text-green-400 text-lg">₹{totalWithSolar.toLocaleString()}</div>
          <div className="text-gray-500 text-xs mt-2">
            Avg: ₹{avgYearlyWithSolar.toFixed(0)}/year
          </div>
        </div>
        {showEmi && (
          <div className="p-4 bg-gray-900/70 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors duration-300">
            <div className="text-gray-400 mb-2 text-sm">EMI Total</div>
            <div className="font-bold text-blue-400 text-lg">₹{totalEmi.toLocaleString()}</div>
            <div className="text-gray-500 text-xs mt-2">
              For first {Math.min(5, yearsSelected)} years
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-gray-900/70 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors duration-300">
          <div className="text-gray-400 mb-2 text-sm">Avg. Yearly Savings</div>
          <div className="font-bold text-green-400">₹{avgYearlySavings.toLocaleString()}</div>
          <div className="text-gray-500 text-xs mt-2">
            Per year average
          </div>
        </div>
        <div className="p-4 bg-gray-900/70 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors duration-300">
          <div className="text-gray-400 mb-2 text-sm">Net Savings</div>
          <div className="font-bold text-yellow-400">₹{netSavings.toLocaleString()}</div>
          <div className="text-gray-500 text-xs mt-2">
            Total for period
          </div>
        </div>
        <div className="p-4 bg-gray-900/70 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors duration-300">
          <div className="text-gray-400 mb-2 text-sm">ROI</div>
          <div className="font-bold text-blue-400">{roi.toFixed(2)}%</div>
          <div className="text-gray-500 text-xs mt-2">
            Return on investment
          </div>
        </div>
        <div className="p-4 bg-gray-900/70 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors duration-300">
          <div className="text-gray-400 mb-2 text-sm">Break Even</div>
          <div className="font-bold text-purple-400">Year {yearsToBreakEven}</div>
          <div className="text-gray-500 text-xs mt-2">
            Full system payback
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const withoutSolar = payload.find((p: any) => p.name === 'Without Solar')?.value || 0;
    const withSolar = payload.find((p: any) => p.name === 'With Solar')?.value || 0;
    const emiPayment = payload.find((p: any) => p.name === 'EMI Payment')?.value || 0;
    const cumulativeSavings = payload.find((p: any) => p.name === 'Cumulative Savings')?.value || 0;
    
    const totalCost = withSolar + emiPayment;
    const yearlyBenefit = withoutSolar - totalCost;

    return (
      <div className="bg-gray-800/95 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-yellow-500/20">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-700">
          <div className="w-2 h-2 rounded-full bg-yellow-500 animate-[pulse_1.5s_ease-in-out_infinite]"></div>
          <span className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            Year {label}
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between gap-6 text-sm items-center p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
            <span className="text-gray-300 font-medium">Without Solar:</span>
            <span className="font-semibold text-red-400">₹{withoutSolar.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-6 text-sm items-center p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
            <span className="text-gray-300 font-medium">With Solar:</span>
            <span className="font-semibold text-green-400">₹{withSolar.toLocaleString()}</span>
          </div>
          {emiPayment > 0 && (
            <div className="flex justify-between gap-6 text-sm items-center p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
              <span className="text-gray-300 font-medium">EMI Payment:</span>
              <span className="font-semibold text-blue-400">₹{emiPayment.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between gap-6 text-sm items-center p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
            <span className="text-gray-300 font-medium">Yearly Benefit:</span>
            <span className="font-semibold text-yellow-400">₹{yearlyBenefit.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-6 text-sm items-center p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 border-t border-gray-700 mt-3 pt-3">
            <span className="text-gray-300 font-medium">Cumulative Savings:</span>
            <span className="font-semibold text-purple-400">₹{cumulativeSavings.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6">
      {payload?.map((entry: any, index: number) => (
        <div
          key={generateUniqueKey('legend', index, 0)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/70 backdrop-blur-sm border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:scale-105"
        >
          <div 
            className="w-3 h-3 rounded-full"
            style={{ 
              backgroundColor: entry.color,
              boxShadow: `0 0 10px ${entry.color}60`
            }}
          />
          <span 
            className="text-sm font-medium"
            style={{ color: entry.color }}
          >
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export const ComparisonChart: React.FC<ComparisonChartProps> = ({ data, showEmi }) => {
  const [chartType, setChartType] = useState<ChartType>('area');
  const [focusBar, setFocusBar] = useState<string | null>(null);
  const [brushIndices, setBrushIndices] = useState<{ startIndex: number; endIndex: number }>({
    startIndex: 0,
    endIndex: Math.min(5, data.length - 1)
  });
  const windowSize = useWindowSize();

  const getMargins = () => {
    if (windowSize.width < 640) {
      return { top: 10, right: 10, left: 40, bottom: 40 };
    } else if (windowSize.width < 1024) {
      return { top: 15, right: 20, left: 50, bottom: 45 };
    }
    return { top: 20, right: 30, left: 60, bottom: 50 };
  };

  const getFontSize = () => {
    if (windowSize.width < 640) return 10;
    if (windowSize.width < 1024) return 12;
    return 14;
  };

  const getChartHeight = () => {
    const containerHeight = windowSize.height;
    if (containerHeight < 600) return 300;
    if (containerHeight < 800) return 400;
    if (containerHeight < 1000) return 500;
    return 600;
  };

  const breakEvenYear = data.findIndex(d => d.cumulativeSavings > 0) + 1;

  const chartColors = {
    withoutSolar: '#ef4444',
    withSolar: '#10b981',
    emiPayment: '#6366f1',
    savings: '#f59e0b'
  };

  const handleMouseEnter = (dataKey: string) => {
    setFocusBar(dataKey);
  };

  const handleMouseLeave = () => {
    setFocusBar(null);
  };

  const handleBrushChange = (brushData: any) => {
    if (brushData?.startIndex !== undefined && brushData?.endIndex !== undefined) {
      setBrushIndices({
        startIndex: brushData.startIndex,
        endIndex: brushData.endIndex
      });
    }
  };

  const getOpacity = (dataKey: string) => {
    if (!focusBar) return 1;
    return focusBar === 'all' || focusBar === dataKey ? 1 : 0.3;
  };

  const commonProps = {
    data,
    margin: getMargins(),
    className: "transition-all duration-500 ease-in-out",
    onMouseEnter: () => handleMouseEnter('all'),
    onMouseLeave: handleMouseLeave,
  };

  const commonAxisProps = {
    xAxis: (
      <XAxis 
        dataKey="year" 
        stroke="#64748b"
        tick={{ fill: '#64748b', fontSize: getFontSize() }}
        tickLine={{ stroke: '#64748b' }}
        axisLine={{ stroke: '#cbd5e1' }}
        minTickGap={windowSize.width < 640 ? 10 : 30}
      >
        <Label
          value="Years"
          position="insideBottom"
          offset={-5}
          style={{ 
            fill: '#64748b',
            fontSize: getFontSize(),
            fontWeight: 500,
            letterSpacing: '0.05em'
          }}
        />
      </XAxis>
    ),
    yAxis: (
      <YAxis 
        stroke="#64748b"
        tick={{ fill: '#64748b', fontSize: getFontSize() }}
        tickLine={{ stroke: '#64748b' }}
        axisLine={{ stroke: '#cbd5e1' }}
        tickFormatter={(value) => `₹${(value/1000).toFixed(0)}K`}
        width={windowSize.width < 640 ? 45 : 60}
      >
        <Label
          value="Amount (₹)"
          angle={-90}
          position="insideLeft"
          offset={10}
          style={{ 
            fill: '#64748b',
            fontSize: getFontSize(),
            fontWeight: 500,
            letterSpacing: '0.05em'
          }}
        />
      </YAxis>
    ),
  };

  const commonChartElements = (
    <>
      <defs>
        {Object.entries(chartColors).map(([key, color], index) => (
          <linearGradient 
            key={`gradient-yearly-${key}-${index}`} 
            id={`color${key}Yearly`} 
            x1="0" 
            y1="0" 
            x2="0" 
            y2="1"
          >
            <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
            <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
          </linearGradient>
        ))}
      </defs>
      
      <CartesianGrid 
        strokeDasharray="3 3" 
        stroke="#334155" 
        opacity={0.5}
        vertical={false}
      />
      
      {commonAxisProps.xAxis}
      {commonAxisProps.yAxis}
      
      <Tooltip 
        content={<CustomTooltip />}
        cursor={{ 
          stroke: '#475569', 
          strokeWidth: 1, 
          strokeDasharray: '5 5',
          radius: 4
        }}
        wrapperStyle={{ outline: 'none' }}
        animationDuration={200}
      />
      
      <Legend 
        content={<CustomLegend />}
        verticalAlign="top"
        height={50}
      />
      
      {breakEvenYear && (
        <ReferenceLine
          x={breakEvenYear}
          stroke="#22c55e"
          strokeDasharray="3 3"
          label={{
            value: `Break Even: Year ${breakEvenYear}`,
            position: 'top',
            fill: '#22c55e',
            fontSize: 12,
            fontWeight: 'bold',
            dy: -20
          }}
        />
      )}
      
      <ReferenceLine 
        y={0} 
        stroke="#475569" 
        strokeWidth={1}
      />

      <Brush
        dataKey="year"
        height={40}
        stroke="#475569"
        fill="#1e293b"
        tickFormatter={(value) => `Year ${value}`}
        startIndex={brushIndices.startIndex}
        endIndex={brushIndices.endIndex}
        onChange={handleBrushChange}
        travellerWidth={10}
      >
        <BarChart>
          <Bar 
            dataKey="cumulativeSavings" 
            fill={chartColors.savings} 
            radius={[2, 2, 0, 0]}
            key="brush-bar"
          />
        </BarChart>
      </Brush>
    </>
  );

  const renderChartElements = () => {
    const commonSeriesProps = {
      strokeWidth: 2,
      isAnimationActive: true,
      animationDuration: 1000,
      animationBegin: 0,
    };

    const dotProps = (color: string) => ({
      fill: color,
      r: 4,
      strokeWidth: 2,
      stroke: '#1e293b',
    });

    const activeDotProps = (color: string) => ({
      r: 6,
      strokeWidth: 2,
      stroke: '#1e293b',
      fill: color,
    });

    switch (chartType) {
      case 'area':
        return (
          <>
            <Area
              {...commonSeriesProps}
              type="monotone"
              dataKey="withoutSolar"
              name="Without Solar"
              stroke={chartColors.withoutSolar}
              fill={`url(#colorwithoutSolarYearly)`}
              dot={dotProps(chartColors.withoutSolar)}
              activeDot={activeDotProps(chartColors.withoutSolar)}
              opacity={getOpacity('withoutSolar')}
              onMouseEnter={() => handleMouseEnter('withoutSolar')}
              onMouseLeave={handleMouseLeave}
            />
            <Area
              {...commonSeriesProps}
              type="monotone"
              dataKey="withSolar"
              name="With Solar"
              stroke={chartColors.withSolar}
              fill={`url(#colorwithSolarYearly)`}
              dot={dotProps(chartColors.withSolar)}
              activeDot={activeDotProps(chartColors.withSolar)}
              opacity={getOpacity('withSolar')}
              onMouseEnter={() => handleMouseEnter('withSolar')}
              onMouseLeave={handleMouseLeave}
            />
            {showEmi && (
              <Area
                {...commonSeriesProps}
                type="monotone"
                dataKey="emiPayment"
                name="EMI Payment"
                stroke={chartColors.emiPayment}
                fill={`url(#coloremiPaymentYearly)`}
                strokeDasharray="5 5"
                dot={dotProps(chartColors.emiPayment)}
                activeDot={activeDotProps(chartColors.emiPayment)}
                opacity={getOpacity('emiPayment')}
                onMouseEnter={() => handleMouseEnter('emiPayment')}
                onMouseLeave={handleMouseLeave}
              />
            )}
            <Area
              {...commonSeriesProps}
              type="monotone"
              dataKey="cumulativeSavings"
              name="Cumulative Savings"
              stroke={chartColors.savings}
              fill={`url(#colorsavingsYearly)`}
              dot={dotProps(chartColors.savings)}
              activeDot={activeDotProps(chartColors.savings)}
              opacity={getOpacity('cumulativeSavings')}
              onMouseEnter={() => handleMouseEnter('cumulativeSavings')}
              onMouseLeave={handleMouseLeave}
            />
          </>
        );

      case 'bar':
        return (
          <>
            <Bar
              {...commonSeriesProps}
              key={generateUniqueKey('bar-withoutSolar', 0, 0)}
              dataKey="withoutSolar"
              name="Without Solar"
              fill={chartColors.withoutSolar}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
              opacity={getOpacity('withoutSolar')}
              onMouseEnter={() => handleMouseEnter('withoutSolar')}
              onMouseLeave={handleMouseLeave}
            />
            <Bar
              {...commonSeriesProps}
              key={generateUniqueKey('bar-withSolar', 0, 1)}
              dataKey="withSolar"
              name="With Solar"
              fill={chartColors.withSolar}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
              opacity={getOpacity('withSolar')}
              onMouseEnter={() => handleMouseEnter('withSolar')}
              onMouseLeave={handleMouseLeave}
            />
            {showEmi && (
              <Bar
                {...commonSeriesProps}
                key={generateUniqueKey('bar-emiPayment', 0, 2)}
                dataKey="emiPayment"
                name="EMI Payment"
                fill={chartColors.emiPayment}
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
                opacity={getOpacity('emiPayment')}
                onMouseEnter={() => handleMouseEnter('emiPayment')}
                onMouseLeave={handleMouseLeave}
              />
            )}
            <Bar
              {...commonSeriesProps}
              key={generateUniqueKey('bar-cumulativeSavings', 0, 3)}
              dataKey="cumulativeSavings"
              name="Cumulative Savings"
              fill={chartColors.savings}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
              opacity={getOpacity('cumulativeSavings')}
              onMouseEnter={() => handleMouseEnter('cumulativeSavings')}
              onMouseLeave={handleMouseLeave}
            />
          </>
        );

      case 'line':
        return (
          <>
            <Line
              {...commonSeriesProps}
              type="monotone"
              dataKey="withoutSolar"
              name="Without Solar"
              stroke={chartColors.withoutSolar}
              dot={dotProps(chartColors.withoutSolar)}
              activeDot={activeDotProps(chartColors.withoutSolar)}
              opacity={getOpacity('withoutSolar')}
              onMouseEnter={() => handleMouseEnter('withoutSolar')}
              onMouseLeave={handleMouseLeave}
            />
            <Line
              {...commonSeriesProps}
              type="monotone"
              dataKey="withSolar"
              name="With Solar"
              stroke={chartColors.withSolar}
              dot={dotProps(chartColors.withSolar)}
              activeDot={activeDotProps(chartColors.withSolar)}
              opacity={getOpacity('withSolar')}
              onMouseEnter={() => handleMouseEnter('withSolar')}
              onMouseLeave={handleMouseLeave}
            />
            {showEmi && (
              <Line
                {...commonSeriesProps}
                type="monotone"
                dataKey="emiPayment"
                name="EMI Payment"
                stroke={chartColors.emiPayment}
                strokeDasharray="5 5"
                dot={dotProps(chartColors.emiPayment)}
                activeDot={activeDotProps(chartColors.emiPayment)}
                opacity={getOpacity('emiPayment')}
                onMouseEnter={() => handleMouseEnter('emiPayment')}
                onMouseLeave={handleMouseLeave}
              />
            )}
            <Line
              {...commonSeriesProps}
              type="monotone"
              dataKey="cumulativeSavings"
              name="Cumulative Savings"
              stroke={chartColors.savings}
              dot={dotProps(chartColors.savings)}
              activeDot={activeDotProps(chartColors.savings)}
              opacity={getOpacity('cumulativeSavings')}
              onMouseEnter={() => handleMouseEnter('cumulativeSavings')}
              onMouseLeave={handleMouseLeave}
            />
          </>
        );

      case 'composed':
        return (
          <>
            <Bar
              {...commonSeriesProps}
              key={generateUniqueKey('composed-bar-withoutSolar', 0, 0)}
              dataKey="withoutSolar"
              name="Without Solar"
              fill={chartColors.withoutSolar}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
              opacity={getOpacity('withoutSolar')}
              onMouseEnter={() => handleMouseEnter('withoutSolar')}
              onMouseLeave={handleMouseLeave}
            />
            <Bar
              {...commonSeriesProps}
              key={generateUniqueKey('composed-bar-withSolar', 0, 1)}
              dataKey="withSolar"
              name="With Solar"
              fill={chartColors.withSolar}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
              opacity={getOpacity('withSolar')}
              onMouseEnter={() => handleMouseEnter('withSolar')}
              onMouseLeave={handleMouseLeave}
            />
            {showEmi && (
              <Line
                {...commonSeriesProps}
                type="monotone"
                dataKey="emiPayment"
                name="EMI Payment"
                stroke={chartColors.emiPayment}
                strokeDasharray="5 5"
                dot={dotProps(chartColors.emiPayment)}
                activeDot={activeDotProps(chartColors.emiPayment)}
                opacity={getOpacity('emiPayment')}
                onMouseEnter={() => handleMouseEnter('emiPayment')}
                onMouseLeave={handleMouseLeave}
              />
            )}
            <Line
              {...commonSeriesProps}
              type="monotone"
              dataKey="cumulativeSavings"
              name="Cumulative Savings"
              stroke={chartColors.savings}
              dot={dotProps(chartColors.savings)}
              activeDot={activeDotProps(chartColors.savings)}
              opacity={getOpacity('cumulativeSavings')}
              onMouseEnter={() => handleMouseEnter('cumulativeSavings')}
              onMouseLeave={handleMouseLeave}
            />
          </>
        );
    }
  };

  const renderChart = () => {
    if (chartType === 'line') {
      return (
        <LineChart {...commonProps}>
          {commonChartElements}
          {renderChartElements()}
        </LineChart>
      );
    }
    return (
      <ComposedChart {...commonProps}>
        {commonChartElements}
        {renderChartElements()}
      </ComposedChart>
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-2 sm:mb-4">
        <ChartTypeSwitcher value={chartType} onChange={setChartType} />
      </div>
      
      <div className="mb-2 sm:mb-4">
        <BrushAnalysis
          data={data}
          startIndex={brushIndices.startIndex}
          endIndex={brushIndices.endIndex}
          showEmi={showEmi || false}
        />
      </div>

      <div className="flex-1 min-h-0 relative bg-gray-900/30 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-2 sm:p-4">
        <ResponsiveContainer width="100%" height={getChartHeight()}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
