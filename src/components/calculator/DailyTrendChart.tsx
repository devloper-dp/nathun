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
  Label,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ComposedChart,
  Brush,
} from 'recharts';
import { DailyProfitLoss } from '../../types/calculator';
import { ChartTypeSwitcher, ChartType } from './ChartTypeSwitcher';
import { useWindowSize } from '../../utils/hooks';

interface DailyTrendChartProps {
  data: DailyProfitLoss[];
}

const generateUniqueKey = (prefix: string, value: number, index: number): string => {
  return `${prefix}-${value}-${index}`;
};

const BrushAnalysis: React.FC<{
  data: DailyProfitLoss[];
  startIndex: number;
  endIndex: number;
}> = ({ data, startIndex, endIndex }) => {
  if (!data || data.length === 0 || startIndex < 0 || endIndex >= data.length || startIndex > endIndex) {
    return null;
  }

  const selectedData = data.slice(startIndex, endIndex + 1);
  
  if (selectedData.length === 0) {
    return null;
  }

  const totalWithoutSolar = selectedData.reduce((sum, d) => sum + d.withoutSolar, 0);
  const totalWithSolar = selectedData.reduce((sum, d) => sum + d.withSolar, 0);
  const totalProfit = selectedData.reduce((sum, d) => sum + d.profit, 0);
  
  const daysSelected = selectedData.length;
  const avgDailyWithoutSolar = totalWithoutSolar / daysSelected;
  const avgDailyWithSolar = totalWithSolar / daysSelected;
  const avgDailyProfit = totalProfit / daysSelected;

  const initialInvestment = Math.abs(data[0]?.withoutSolar || 0);
  const roi = initialInvestment !== 0 
    ? ((totalProfit) / initialInvestment) * 100 
    : 0;

  return (
    <div className="p-3 sm:p-4 md:p-6 rounded-xl bg-gray-800/70 backdrop-blur-sm border border-yellow-500/20 shadow-lg">
      {/* Header Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
        <div className="text-xs sm:text-sm">
          <div className="font-medium text-gray-400 mb-1 sm:mb-2">Selected Period</div>
          <div className="text-base sm:text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            Day {startIndex + 1} - {endIndex + 1}
          </div>
        </div>
        <div className="text-xs sm:text-sm text-left sm:text-right">
          <div className="font-medium text-gray-400 mb-1 sm:mb-2">Total Savings</div>
          <div className="text-base sm:text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
            ₹{(totalWithoutSolar - totalWithSolar).toLocaleString()}
          </div>
        </div>
      </div>
      
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="p-3 sm:p-4 bg-gray-900/70 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors duration-300">
          <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">Without Solar</div>
          <div className="font-bold text-red-400 text-sm sm:text-base md:text-lg">₹{totalWithoutSolar.toLocaleString()}</div>
          <div className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2">
            Avg: ₹{avgDailyWithoutSolar.toFixed(2)}/day
          </div>
        </div>
        <div className="p-3 sm:p-4 bg-gray-900/70 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors duration-300">
          <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">With Solar</div>
          <div className="font-bold text-green-400 text-sm sm:text-base md:text-lg">₹{totalWithSolar.toLocaleString()}</div>
          <div className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2">
            Avg: ₹{avgDailyWithSolar.toFixed(2)}/day
          </div>
        </div>
        <div className="p-3 sm:p-4 bg-gray-900/70 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors duration-300">
          <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">Net Profit</div>
          <div className="font-bold text-yellow-400 text-sm sm:text-base md:text-lg">₹{totalProfit.toLocaleString()}</div>
          <div className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2">
            Avg: ₹{avgDailyProfit.toFixed(2)}/day
          </div>
        </div>
      </div>
      
      {/* Additional Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="p-3 sm:p-4 bg-gray-900/70 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors duration-300">
          <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">ROI for Period</div>
          <div className="font-bold text-blue-400 text-sm sm:text-base">{roi.toFixed(2)}%</div>
          <div className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2">
            Based on initial investment
          </div>
        </div>
        <div className="p-3 sm:p-4 bg-gray-900/70 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors duration-300">
          <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">Daily Savings Rate</div>
          <div className="font-bold text-purple-400 text-sm sm:text-base">
            ₹{(avgDailyWithoutSolar - avgDailyWithSolar).toFixed(2)}
          </div>
          <div className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2">
            Average per day
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
    const profit = payload.find((p: any) => p.name === 'Profit/Loss')?.value || 0;
    const savings = withoutSolar - withSolar;

    return (
      <div className="bg-gray-800/95 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-yellow-500/20">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-700">
          <div className="w-2 h-2 rounded-full bg-yellow-500 animate-[pulse_1.5s_ease-in-out_infinite]"></div>
          <span className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            Day {label}
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
          <div className="flex justify-between gap-6 text-sm items-center p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
            <span className="text-gray-300 font-medium">Daily Savings:</span>
            <span className="font-semibold text-blue-400">₹{savings.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-6 text-sm items-center p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
            <span className="text-gray-300 font-medium">Net Profit:</span>
            <span className="font-semibold text-yellow-400">₹{profit.toLocaleString()}</span>
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
          key={index}
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

export const DailyTrendChart: React.FC<DailyTrendChartProps> = ({ data }) => {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [focusBar, setFocusBar] = useState<string | null>(null);
  const [brushIndices, setBrushIndices] = useState<{ startIndex: number; endIndex: number }>({
    startIndex: 0,
    endIndex: 30
  });
  const windowSize = useWindowSize();

  const getMargins = () => {
    if (windowSize.width < 640) {
      return { top: 20, right: 20, left: 50, bottom: 60 };
    } else if (windowSize.width < 1024) {
      return { top: 30, right: 30, left: 60, bottom: 70 };
    }
    return { top: 40, right: 40, left: 70, bottom: 80 };
  };

  const getFontSize = () => {
    if (windowSize.width < 640) return 11;
    if (windowSize.width < 1024) return 13;
    return 14;
  };

  const getChartHeight = () => {
    if (windowSize.height < 600) return 400;
    if (windowSize.height < 800) return 500;
    if (windowSize.height < 1000) return 600;
    return 700;
  };

  const breakEvenDay = data.findIndex(d => d.profit > 0) + 1;
  
  const chartColors = {
    withoutSolar: '#f87171',
    withSolar: '#34d399',
    profit: '#fbbf24'
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
        dataKey="day" 
        stroke="#64748b"
        tick={{ fill: '#64748b', fontSize: getFontSize() }}
        tickLine={{ stroke: '#64748b', strokeWidth: 1.5 }}
        axisLine={{ stroke: '#cbd5e1', strokeWidth: 1.5 }}
        minTickGap={windowSize.width < 640 ? 30 : 50}
        padding={{ left: 10, right: 10 }}
      >
        <Label
          value="Days"
          position="bottom"
          offset={20}
          style={{ 
            fill: '#94a3b8',
            fontSize: getFontSize() + 2,
            fontWeight: 600,
            letterSpacing: '0.05em'
          }}
        />
      </XAxis>
    ),
    yAxis: (
      <YAxis 
        stroke="#64748b"
        tick={{ fill: '#64748b', fontSize: getFontSize() }}
        tickLine={{ stroke: '#64748b', strokeWidth: 1.5 }}
        axisLine={{ stroke: '#cbd5e1', strokeWidth: 1.5 }}
        tickFormatter={(value) => `₹${value.toFixed(0)}`}
        width={windowSize.width < 640 ? 55 : 70}
        padding={{ top: 20, bottom: 20 }}
      >
        <Label
          value="Amount (₹)"
          angle={-90}
          position="insideLeft"
          offset={-10}
          style={{ 
            fill: '#94a3b8',
            fontSize: getFontSize() + 2,
            fontWeight: 600,
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
            key={`gradient-daily-${key}-${index}`} 
            id={`color${key}Daily`} 
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
        opacity={0.3}
        horizontal={true}
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
        height={60}
        wrapperStyle={{
          paddingBottom: '20px'
        }}
      />
      
      {breakEvenDay && (
        <ReferenceLine
          x={breakEvenDay}
          stroke="#22c55e"
          strokeWidth={2}
          strokeDasharray="3 3"
          label={{
            value: `Break Even: Day ${breakEvenDay}`,
            position: 'top',
            fill: '#22c55e',
            fontSize: getFontSize() + 1,
            fontWeight: 'bold',
            dy: -25
          }}
        />
      )}
      
      <ReferenceLine 
        y={0} 
        stroke="#475569" 
        strokeWidth={1.5}
      />

      <Brush
        dataKey="day"
        height={50}
        stroke="#475569"
        fill="#1e293b"
        tickFormatter={(value) => `Day ${value}`}
        startIndex={brushIndices.startIndex}
        endIndex={brushIndices.endIndex}
        onChange={handleBrushChange}
        travellerWidth={10}
        gap={5}
        padding={{ top: 10 }}
      >
        <BarChart>
          <Bar 
            dataKey="profit"
            fill={chartColors.profit}
            radius={[2, 2, 0, 0]}
            key="daily-brush-bar"
          />
        </BarChart>
      </Brush>
    </>
  );

  const commonSeriesProps = {
    strokeWidth: 3,
    isAnimationActive: true,
    animationDuration: 1000,
    animationBegin: 0,
  };

  const dotProps = (color: string) => ({
    fill: color,
    r: 5,
    strokeWidth: 2,
    stroke: '#1e293b',
  });

  const activeDotProps = (color: string) => ({
    r: 7,
    strokeWidth: 2,
    stroke: '#1e293b',
    fill: color,
  });

  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            {commonChartElements}
            <Area
              {...commonSeriesProps}
              type="monotone"
              dataKey="withoutSolar"
              name="Without Solar"
              stroke={chartColors.withoutSolar}
              fill={`url(#colorwithoutSolarDaily)`}
              dot={dotProps(chartColors.withoutSolar)}
              activeDot={activeDotProps(chartColors.withoutSolar)}
              opacity={getOpacity('withoutSolar')}
              onMouseEnter={() => handleMouseEnter('withoutSolar')}
              onMouseLeave={handleMouseLeave}
              strokeWidth={4}
            />
            <Area
              {...commonSeriesProps}
              type="monotone"
              dataKey="withSolar"
              name="With Solar"
              stroke={chartColors.withSolar}
              fill={`url(#colorwithSolarDaily)`}
              dot={dotProps(chartColors.withSolar)}
              activeDot={activeDotProps(chartColors.withSolar)}
              opacity={getOpacity('withSolar')}
              onMouseEnter={() => handleMouseEnter('withSolar')}
              onMouseLeave={handleMouseLeave}
              strokeWidth={4}
            />
            <Area
              {...commonSeriesProps}
              type="monotone"
              dataKey="profit"
              name="Profit/Loss"
              stroke={chartColors.profit}
              fill={`url(#colorprofitDaily)`}
              dot={dotProps(chartColors.profit)}
              activeDot={activeDotProps(chartColors.profit)}
              opacity={getOpacity('profit')}
              onMouseEnter={() => handleMouseEnter('profit')}
              onMouseLeave={handleMouseLeave}
              strokeWidth={4}
            />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            {commonChartElements}
            <Bar
              {...commonSeriesProps}
              key="daily-bar-withoutSolar"
              dataKey="withoutSolar"
              name="Without Solar"
              fill={chartColors.withoutSolar}
              radius={[4, 4, 0, 0]}
              maxBarSize={30}
              opacity={getOpacity('withoutSolar')}
              onMouseEnter={() => handleMouseEnter('withoutSolar')}
              onMouseLeave={handleMouseLeave}
            />
            <Bar
              {...commonSeriesProps}
              key="daily-bar-withSolar"
              dataKey="withSolar"
              name="With Solar"
              fill={chartColors.withSolar}
              radius={[4, 4, 0, 0]}
              maxBarSize={30}
              opacity={getOpacity('withSolar')}
              onMouseEnter={() => handleMouseEnter('withSolar')}
              onMouseLeave={handleMouseLeave}
            />
            <Bar
              {...commonSeriesProps}
              key="daily-bar-profit"
              dataKey="profit"
              name="Profit/Loss"
              fill={chartColors.profit}
              radius={[4, 4, 0, 0]}
              maxBarSize={30}
              opacity={getOpacity('profit')}
              onMouseEnter={() => handleMouseEnter('profit')}
              onMouseLeave={handleMouseLeave}
            />
          </BarChart>
        );

      case 'composed':
        return (
          <ComposedChart {...commonProps}>
            {commonChartElements}
            <Bar
              {...commonSeriesProps}
              dataKey="withoutSolar"
              name="Without Solar"
              fill={chartColors.withoutSolar}
              radius={[4, 4, 0, 0]}
              maxBarSize={30}
              opacity={getOpacity('withoutSolar')}
              onMouseEnter={() => handleMouseEnter('withoutSolar')}
              onMouseLeave={handleMouseLeave}
            />
            <Bar
              {...commonSeriesProps}
              dataKey="withSolar"
              name="With Solar"
              fill={chartColors.withSolar}
              radius={[4, 4, 0, 0]}
              maxBarSize={30}
              opacity={getOpacity('withSolar')}
              onMouseEnter={() => handleMouseEnter('withSolar')}
              onMouseLeave={handleMouseLeave}
            />
            <Line
              {...commonSeriesProps}
              type="monotone"
              dataKey="profit"
              name="Profit/Loss"
              stroke={chartColors.profit}
              strokeWidth={4}
              dot={dotProps(chartColors.profit)}
              activeDot={activeDotProps(chartColors.profit)}
              opacity={getOpacity('profit')}
              onMouseEnter={() => handleMouseEnter('profit')}
              onMouseLeave={handleMouseLeave}
            />
          </ComposedChart>
        );

      default: // 'line'
        return (
          <LineChart {...commonProps}>
            {commonChartElements}
            <Line
              {...commonSeriesProps}
              type="monotone"
              dataKey="withoutSolar"
              name="Without Solar"
              stroke={chartColors.withoutSolar}
              strokeWidth={4}
              dot={dotProps(chartColors.withoutSolar)}
              activeDot={activeDotProps(chartColors.withoutSolar)}
              opacity={getOpacity('withoutSolar')}
              onMouseEnter={() => handleMouseEnter('withoutSolar')}
              onMouseLeave={handleMouseLeave}
            />
            <Line
              {...commonSeriesProps}
              dataKey="withSolar"
              name="With Solar"
              stroke={chartColors.withSolar}
              strokeWidth={4}
              dot={dotProps(chartColors.withSolar)}
              activeDot={activeDotProps(chartColors.withSolar)}
              opacity={getOpacity('withSolar')}
              onMouseEnter={() => handleMouseEnter('withSolar')}
              onMouseLeave={handleMouseLeave}
            />
            <Line
              {...commonSeriesProps}
              type="monotone"
              dataKey="profit"
              name="Profit/Loss"
              stroke={chartColors.profit}
              strokeWidth={4}
              dot={dotProps(chartColors.profit)}
              activeDot={activeDotProps(chartColors.profit)}
              opacity={getOpacity('profit')}
              onMouseEnter={() => handleMouseEnter('profit')}
              onMouseLeave={handleMouseLeave}
            />
          </LineChart>
        );
    }
  };

  return (
    <div className="w-full h-full flex flex-col space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-4">
        <ChartTypeSwitcher value={chartType} onChange={setChartType} />
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-4">
        <BrushAnalysis
          data={data}
          startIndex={brushIndices.startIndex}
          endIndex={brushIndices.endIndex}
        />
      </div>

      <div className="flex-1 min-h-[600px] bg-gray-800/50 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-6">
        <ResponsiveContainer width="100%" height={getChartHeight()}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};