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
import { ComparisonData } from '../types/calculator';
import { ChartTypeSwitcher, ChartType } from './ChartTypeSwitcher';

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

  const totalWithoutSolar = selectedData.reduce((sum, d) => sum + (d?.withoutSolar || 0), 0);
  const totalWithSolar = selectedData.reduce((sum, d) => sum + (d?.withSolar || 0), 0);
  const totalEmi = showEmi ? selectedData.reduce((sum, d) => sum + (d?.emiPayment || 0), 0) : 0;

  const endSavings = selectedData[selectedData.length - 1]?.cumulativeSavings || 0;
  const startSavings = startIndex > 0 && data[startIndex - 1] 
    ? data[startIndex - 1].cumulativeSavings 
    : 0;

  const netSavings = endSavings - startSavings;
  const avgSavingsPerYear = selectedData.length > 0 ? netSavings / selectedData.length : 0;

  const startValue = selectedData[0]?.cumulativeSavings || 0;
  const endValue = selectedData[selectedData.length - 1]?.cumulativeSavings || 0;
  const savingsGrowthRate = startValue !== 0 
    ? ((endValue / startValue) - 1) * 100 
    : 0;

  return (
    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-sm">
          <div className="font-medium text-slate-400 mb-1">Selected Period</div>
          <div className="font-bold text-slate-200">Year {startIndex + 1} - {endIndex + 1}</div>
        </div>
        <div className="text-sm text-right">
          <div className="font-medium text-slate-400 mb-1">Net Savings</div>
          <div className="font-bold text-green-400">₹{netSavings.toLocaleString()}</div>
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
        {showEmi && (
          <div className="p-3 bg-slate-700/50 rounded-lg">
            <div className="text-slate-400 mb-1">EMI Total</div>
            <div className="font-bold text-slate-200">₹{totalEmi.toLocaleString()}</div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-slate-700/50 rounded-lg">
          <div className="text-slate-400 mb-1">Avg. Yearly Savings</div>
          <div className="font-bold text-slate-200">₹{avgSavingsPerYear.toLocaleString()}</div>
        </div>
        <div className="p-3 bg-slate-700/50 rounded-lg">
          <div className="text-slate-400 mb-1">Savings Growth</div>
          <div className="font-bold text-slate-200">{savingsGrowthRate.toFixed(1)}%</div>
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
            Year {label}
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
            className="w-3 h-3 rounded-full"
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

export const ComparisonChart: React.FC<ComparisonChartProps> = ({ data, showEmi }) => {
  const [chartType, setChartType] = useState<ChartType>('area');
  const [focusBar, setFocusBar] = useState<string | null>(null);
  const [brushIndices, setBrushIndices] = useState<{ startIndex: number; endIndex: number }>({
    startIndex: 0,
    endIndex: Math.min(5, data.length - 1)
  });

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
    margin: { top: 20, right: 30, left: 60, bottom: 50 },
    className: "transition-all duration-500 ease-in-out",
    onMouseEnter: () => handleMouseEnter('all'),
    onMouseLeave: handleMouseLeave,
  };

  const commonAxisProps = {
    xAxis: (
      <XAxis 
        dataKey="year" 
        stroke="#64748b"
        tick={{ fill: '#64748b', fontSize: 12 }}
        tickLine={{ stroke: '#64748b' }}
        axisLine={{ stroke: '#cbd5e1' }}
      >
        <Label
          value="Years"
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
          value="Amount (₹)"
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
          <linearGradient key={key} id={`color${key}Yearly`} x1="0" y1="0" x2="0" y2="1">
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
      
      {breakEvenYear && (
        <ReferenceLine
          x={breakEvenYear}
          stroke="#16a34a"
          strokeDasharray="3 3"
          label={{
            value: `Break Even: Year ${breakEvenYear}`,
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
        dataKey="year"
        height={40}
        stroke="#94a3b8"
        fill="#f8fafc"
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
            {showEmi && (
              <Bar
                {...commonSeriesProps}
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
          <LineChart {...commonProps}>
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
          </LineChart>
        );

      case 'composed':
        return (
          <>
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
          showEmi={showEmi || false}
        />
      </div>

      {/* Chart Container */}
      <div className="flex-1 min-h-[400px] relative">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart {...commonProps}>
              {commonChartElements}
              {renderChartElements()}
            </LineChart>
          ) : (
            <ComposedChart {...commonProps}>
              {commonChartElements}
              {renderChartElements()}
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};