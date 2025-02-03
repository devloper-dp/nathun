import React, { useState, useEffect, useCallback } from 'react';
import {
  Sun,
  Battery,
  IndianRupee,
  LineChart,
  PiggyBank,
  Leaf,
  Calendar,
  Zap,
  Percent,
  Clock,
  AlertCircle,
  Info
} from 'lucide-react';
import {
  calculateSolarDetails,
  calculateLoan,
  generateComparisonData,
  generateDailyProfitLoss,
} from '../utils/calculations';
import { ComparisonChart } from './calculator/ComparisonChart';
import { DailyTrendChart } from './calculator/DailyTrendChart';

export const Calculator: React.FC = () => {
  const [monthlyBill, setMonthlyBill] = useState<number>(3000);
  const [paymentType, setPaymentType] = useState<'upfront' | 'emi'>('upfront');
  const [chartView, setChartView] = useState<'yearly' | 'daily'>('yearly');
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [loanTenure, setLoanTenure] = useState<number>(5);
  const [error, setError] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const validateInput = useCallback((value: number) => {
    if (value < 500) {
      setError('Monthly bill should be at least ₹500');
      return false;
    }
    if (value > 100000) {
      setError('Monthly bill should not exceed ₹100,000');
      return false;
    }
    setError('');
    return true;
  }, []);

  const handleMonthlyBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMonthlyBill(value);
    validateInput(value);
  };

  const solarDetails = React.useMemo(() => {
    try {
      setIsCalculating(true);
      const details = calculateSolarDetails(monthlyBill);
      setIsCalculating(false);
      return details;
    } catch (err) {
      setError('Error calculating solar details. Please try again.');
      setIsCalculating(false);
      return null;
    }
  }, [monthlyBill]);

  const loanDetails = React.useMemo(() => {
    if (paymentType === 'emi' && solarDetails) {
      try {
        return calculateLoan(
          solarDetails.totalCost,
          interestRate,
          loanTenure,
          monthlyBill
        );
      } catch (err) {
        setError('Error calculating loan details. Please try again.');
        return null;
      }
    }
    return undefined;
  }, [paymentType, solarDetails, interestRate, loanTenure, monthlyBill]);

  const monthlyGeneration = solarDetails ? solarDetails.monthlyGeneration * 8 : 0;
  const monthlySavings = paymentType === 'emi' && loanDetails
    ? monthlyGeneration - (loanDetails.emi || 0)
    : solarDetails?.monthlySavings || 0;

  return (
    <div className="Calculator min-h-screen py-2 sm:py-4 md:py-6 lg:py-8 px-2 sm:px-4 md:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header Section */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2 sm:mb-3 md:mb-4">
            Solar Investment Calculator
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300">
            Calculate your potential savings with solar energy
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            <p className="text-sm sm:text-base text-red-500">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Left Column - Input and Details */}
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
            {/* Input Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-yellow-500/20 p-4 sm:p-6 md:p-8 relative">
              {isCalculating && (
                <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
                  <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                    <p className="text-yellow-500">Calculating...</p>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Monthly Electricity Bill (₹)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={monthlyBill}
                    onChange={handleMonthlyBillChange}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-gray-300 pr-10"
                    min="500"
                    max="100000"
                    step="100"
                  />
                  <IndianRupee className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Enter your average monthly electricity bill
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Required Capacity Card */}
                <div className="bg-gray-900/50 p-4 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium text-gray-300">Required Capacity</span>
                  </div>
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    {solarDetails?.requiredCapacity.toFixed(1)} kW
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Recommended solar system size
                  </p>
                </div>

                {/* Daily Generation Card */}
                <div className="bg-gray-900/50 p-4 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium text-gray-300">Daily Generation</span>
                  </div>
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    {solarDetails?.dailyGeneration.toFixed(1)} units
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Expected daily power generation
                  </p>
                </div>
              </div>
            </div>

            {/* Cost Details */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-yellow-500/20 p-4 sm:p-6 md:p-8">
              <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-yellow-500" />
                Cost Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all duration-300">
                  <span className="text-sm text-gray-300">Total Cost</span>
                  <span className="text-sm text-yellow-500 font-bold">₹{solarDetails?.totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">Subsidy</span>
                    <Info className="w-3 h-3 text-gray-400 cursor-help" title="Government subsidy based on system capacity" />
                  </div>
                  <span className="text-sm text-green-500 font-bold">₹{solarDetails?.subsidy.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all duration-300">
                  <span className="text-sm text-gray-300">Net Cost</span>
                  <span className="text-sm text-yellow-500 font-bold">₹{solarDetails?.costAfterSubsidy.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-yellow-500/20 p-4 sm:p-6 md:p-8">
              <h3 className="text-lg font-semibold text-gray-300 mb-4">Payment Options</h3>
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setPaymentType('upfront')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 text-sm ${
                    paymentType === 'upfront'
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg'
                      : 'bg-gray-900/50 text-gray-300 hover:bg-gray-900/80'
                  }`}
                >
                  Upfront Payment
                </button>
                <button
                  onClick={() => setPaymentType('emi')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 text-sm ${
                    paymentType === 'emi'
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg'
                      : 'bg-gray-900/50 text-gray-300 hover:bg-gray-900/80'
                  }`}
                >
                  EMI
                </button>
              </div>

              {paymentType === 'emi' && (
                <div className="space-y-4">
                  {/* Interest Rate Slider */}
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400">Interest Rate (%)</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="5"
                        max="15"
                        step="0.5"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full accent-yellow-500"
                      />
                      <span className="text-yellow-500 font-bold text-sm min-w-[3rem]">{interestRate}%</span>
                    </div>
                  </div>

                  {/* Loan Tenure Slider */}
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400">Loan Tenure (Years)</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="3"
                        max="10"
                        value={loanTenure}
                        onChange={(e) => setLoanTenure(Number(e.target.value))}
                        className="w-full accent-yellow-500"
                      />
                      <span className="text-yellow-500 font-bold text-sm min-w-[3rem]">{loanTenure} yrs</span>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 p-4 rounded-lg border border-yellow-500/20">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-xs text-gray-400">Required Deposit (20%)</span>
                        <p className="text-sm text-yellow-500 font-bold">₹{loanDetails?.deposit.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-400">Monthly EMI</span>
                        <p className="text-sm text-yellow-500 font-bold">₹{Math.round(loanDetails?.emi || 0).toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-400">Loan Amount</span>
                        <p className="text-sm text-yellow-500 font-bold">₹{Math.round(loanDetails?.principal || 0).toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-400">Total Interest</span>
                        <p className="text-sm text-yellow-500 font-bold">₹{Math.round(loanDetails?.totalInterest || 0).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 p-4 rounded-lg border border-yellow-500/20">
                    <h4 className="text-base font-semibold text-gray-300 mb-3">Monthly Savings</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-400">Current Bill</span>
                        <span className="text-xs text-red-500 font-bold">₹{monthlyBill.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-400">EMI Payment</span>
                        <span className="text-xs text-red-500 font-bold">₹{Math.round(loanDetails?.emi || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-400">Solar Generation</span>
                        <span className="text-xs text-green-500 font-bold">₹{Math.round(monthlyGeneration).toLocaleString()}</span>
                      </div>
                      <div className="border-t border-gray-700 pt-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-300 font-medium">Net Monthly Savings</span>
                          <span className={`text-sm font-bold ${monthlySavings >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            ₹{Math.abs(Math.round(monthlySavings)).toLocaleString()}
                            {monthlySavings >= 0 ? ' Saved' : ' Extra'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Environmental Impact */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-yellow-500/20 p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-semibold text-gray-300">Environmental Impact</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-900/50 p-4 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                  <p className="text-base text-gray-300 mb-2">Annual CO₂ Reduction</p>
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    {solarDetails?.co2Reduction.toFixed(2)} kg
                  </p>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                  <p className="text-base text-gray-300 mb-2">Trees Equivalent</p>
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    {Math.round((solarDetails?.co2Reduction || 0) / 20)} trees
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Analysis Section */}
          <div className="flex flex-col h-full">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-2 sm:p-4 flex flex-col h-full">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-300">Analysis</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setChartView('yearly')}
                    className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all duration-300 ${
                      chartView === 'yearly'
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg'
                        : 'bg-gray-900/50 text-gray-300 hover:bg-gray-900/80'
                    }`}
                  >
                    <LineChart className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Yearly</span>
                  </button>
                  <button
                    onClick={() => setChartView('daily')}
                    className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all duration-300 ${
                      chartView === 'daily'
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg'
                        : 'bg-gray-900/50 text-gray-300 hover:bg-gray-900/80'
                    }`}
                  >
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Daily</span>
                  </button>
                </div>
              </div>

              {/* Analysis Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-900/50 p-3 rounded-lg border border-yellow-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <IndianRupee className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-300">Monthly Savings</span>
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    ₹{Math.abs(Math.round(monthlySavings)).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Estimated monthly savings based on current consumption
                  </p>
                </div>

                <div className="bg-gray-900/50 p-3 rounded-lg border border-yellow-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <PiggyBank className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-300">Break-even Period</span>
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    {Math.ceil((solarDetails?.breakEvenPoint.daysToBreakEven || 0) / 365)} years
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Time to recover your initial investment
                  </p>
                </div>
              </div>

              {/* Chart Container */}
              <div className="flex-1 min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[550px]">
                {chartView === 'yearly' ? (
                  <ComparisonChart 
                    data={generateComparisonData(monthlyBill, 10, loanDetails)} 
                    showEmi={paymentType === 'emi'} 
                  />
                ) : (
                  <DailyTrendChart 
                    data={generateDailyProfitLoss(monthlyBill)} 
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};