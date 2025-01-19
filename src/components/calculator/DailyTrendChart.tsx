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
import { DailyProfitLoss } from '../types/calculator';
import { ChartTypeSwitcher, ChartType } from './ChartTypeSwitcher';

interface DailyTrendChartProps {
  data: DailyProfitLoss[];
}

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

  const avgDailyProfit = totalProfit / selectedData.length;
  const profitGrowthRate = selectedData.length > 1
    ? ((selectedData[selectedData.length - 1].profit / selectedData[0].profit) - 1) * 100
    : 0;

  return (
    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-sm">
          <div className="font-medium text-slate-400 mb-1">Selected Period</div>
          <div className="font-bold text-slate-200">Day {startIndex + 1} - {endIndex + 1}</div>
        </div>
        <div className="text-sm text-right">
          <div className="font-medium text-slate-400 mb-1">Total Profit/Loss</div>
          <div className={`font-bold ${totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ₹{totalProfit.toLocaleString()}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 text-xs mb-3">
        <div className="p-3 bg-slate-700/50 rounded-lg">
          <div className="text-slate-400 mb-1">Without Solar</div>
          <div className="font-bold text-slate-200">₹{totalWithoutSolar.toLocaleString()}</div>
        </div>
        <div className="p-3 bg-slate-700/50 rounded-lg">
          <div className="text-slate-400 mb-1">With Solar</div>
          <div className="font-bold text-slate-200">₹{totalWithSolar.toLocaleString()}</div>
        </div>
        <div className="p-3 bg-slate-700/50 rounded-lg">
          <div className="text-slate-400 mb-1">Net Difference</div>
          <div className={`font-bold ${(totalWithoutSolar - totalWithSolar) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ₹{Math.abs(totalWithoutSolar - totalWithSolar).toLocaleString()}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-slate-700/50 rounded-lg">
          <div className="text-slate-400 mb-1">Avg. Daily Profit</div>
          <div className={`font-bold ${avgDailyProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ₹{avgDailyProfit.toLocaleString()}
          </div>
        </div>
        <div className="p-3 bg-slate-700/50 rounded-lg">
          <div className="text-slate-400 mb-1">Profit Growth</div>
          <div className={`font-bold ${profitGrowthRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {profitGrowthRate.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const totalAmount = payload.reduce((sum: number, entry: any) => 
      sum + Math.abs(entry.value), 0
    );

    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
          <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Day {label}
          </span>
        </div>
        <div className="space-y-2.5">
          {payload.map((entry: any, index: number) => (
            <div 
              key={index} 
              className="flex justify-between gap-4 text-sm items-center hover:bg-gray-50 p-2 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ 
                    backgroundColor: entry.color,
                    boxShadow: `0 0 8px ${entry.color}60`
                  }}
                />
                <span className="text-gray-600 font-medium">{entry.name}:</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-semibold">
                  ₹{Math.abs(entry.value).toLocaleString()}
                </span>
                <span className="text-xs text-gray-500">
                  {((Math.abs(entry.value) / totalAmount) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t border-gray-100">
          <div className="text-sm font-medium text-gray-600">
            Total: ₹{totalAmount.toLocaleString()}
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
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ 
            backgroundColor: `${entry.color}10`,
            boxShadow: `0 2px 8px ${entry.color}20`
          }}
        >
          <div 
            className="w-3 h-3 rounded-full ring-2 ring-opacity-30"
            style={{ 
              backgroundColor: entry.color,
              boxShadow: `0 0 8px ${entry.color}60`
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

  const breakEvenDay = data.findIndex(d => d.profit > 0) + 1;
  
  const chartColors = {
    withoutSolar: '#ef4444',
    withSolar: '#10b981',
    profit: '#f59e0b'
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
    margin: { top: 20, right: 30, left: 60, bottom: 50 },
    className: "transition-all duration-500 ease-in-out",
    onMouseEnter: () => handleMouseEnter('all'),
    onMouseLeave: handleMouseLeave,
  };

  const commonAxisProps = {
    xAxis: (
      <XAxis 
        dataKey="day" 
        stroke="#64748b"
        tick={{ fill: '#64748b', fontSize: 12 }}
        tickLine={{ stroke: '#64748b' }}
        axisLine={{ stroke: '#cbd5e1' }}
      >
        <Label
          value="Days"
          position="insideBottom"
          offset={-5}
          style={{ 
            fill: '#64748b',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.05em'
          }}
        />
      </XAxis>
    ),
    yAxis: (
      <YAxis 
        stroke="#64748b"
        tick={{ fill: '#64748b', fontSize: 12 }}
        tickLine={{ stroke: '#64748b' }}
        axisLine={{ stroke: '#cbd5e1' }}
        tickFormatter={(value) => `₹${(value/1000).toFixed(0)}K`}
      >
        <Label
          value={'Amount (₹)'}
          angle={-90}
          position="insideLeft"
          offset={10}
          style={{ 
            fill: '#64748b',
            fontSize: 12,
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
        {Object.entries(chartColors).map(([key, color]) => (
          <linearGradient key={key} id={`color${key}Daily`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
            <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
          </linearGradient>
        ))}
      </defs>
      
      <CartesianGrid 
        strokeDasharray="3 3" 
        stroke="#e5e7eb" 
        opacity={0.5}
        vertical={false}
      />
      
      {commonAxisProps.xAxis}
      {commonAxisProps.yAxis}
      
      <Tooltip 
        content={<CustomTooltip />}
        cursor={{ 
          stroke: '#94a3b8', 
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
      
      {breakEvenDay && (
        <ReferenceLine
          x={breakEvenDay}
          stroke="#16a34a"
          strokeDasharray="3 3"
          label={{
            value: `Break Even: Day ${breakEvenDay}`,
            position: 'top',
            fill: '#16a34a',
            fontSize: 12,
            fontWeight: 'bold',
            dy: -20
          }}
        />
      )}
      
      <ReferenceLine 
        y={0} 
        stroke="#94a3b8" 
        strokeWidth={1}
      />

      <Brush
        dataKey="day"
        height={40}
        stroke="#94a3b8"
        fill="#f8fafc"
        tickFormatter={(value) => `Day ${value}`}
        startIndex={brushIndices.startIndex}
        endIndex={brushIndices.endIndex}
        onChange={handleBrushChange}
        travellerWidth={10}
      >
        <BarChart>
          <Bar 
            dataKey="profit" 
            fill={chartColors.profit} 
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </Brush>
    </>
  );

  const renderChart = () => {
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
      stroke: '#fff',
    });

    const activeDotProps = (color: string) => ({
      r: 6,
      strokeWidth: 2,
      stroke: '#fff',
      fill: color,
    });

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
            />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            {commonChartElements}
            <Bar
              {...commonSeriesProps}
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
              dataKey="withSolar"
              name="With Solar"
              fill={chartColors.withSolar}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
              opacity={getOpacity('withSolar')}
              onMouseEnter={() => handleMouseEnter('withSolar')}
              onMouseLeave={handleMouseLeave}
            />
            <Bar
              {...commonSeriesProps}
              dataKey="profit"
              name="Profit/Loss"
              fill={chartColors.profit}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
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
              maxBarSize={50}
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
              maxBarSize={50}
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
            <Line
              {...commonSeriesProps}
              type="monotone"
              dataKey="profit"
              name="Profit/Loss"
              stroke={chartColors.profit}
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
    <div className="w-full h-full flex flex-col">
      <div className="mb-6">
        <ChartTypeSwitcher value={chartType} onChange={setChartType} />
      </div>
      
      {/* Analysis Panel */}
      <div className="mb-6">
        <BrushAnalysis
          data={data}
          startIndex={brushIndices.startIndex}
          endIndex={brushIndices.endIndex}
        />
      </div>

      {/* Chart Container */}
      <div className="flex-1 min-h-[400px] relative">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};