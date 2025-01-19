import React, { useState } from 'react';
import {
  Sun,
  Battery,
  IndianRupee,
  LineChart,
  PiggyBank,
  Leaf,
  Calendar,
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
  const [monthlyBill, setMonthlyBill] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(9);
  const [tenure, setTenure] = useState<number>(5);
  const [showLoanDetails, setShowLoanDetails] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<'upfront' | 'emi'>('upfront');
  const [autoCalculateInterest, setAutoCalculateInterest] = useState<boolean>(true);
  const [chartView, setChartView] = useState<'yearly' | 'daily'>('yearly');

  const solarDetails = calculateSolarDetails(monthlyBill);
  const loanDetails = calculateLoan(
    solarDetails.costAfterSubsidy,
    autoCalculateInterest ? 9 : interestRate,
    tenure,
    monthlyBill
  );
  const comparisonData = generateComparisonData(monthlyBill, 10, showLoanDetails ? loanDetails : undefined);
  const dailyTrendData = generateDailyProfitLoss(monthlyBill, 365);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4">
            Solar Investment Calculator
          </h1>
          <p className="text-lg text-gray-300">Calculate your potential savings with solar energy</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column */}
          <div className="flex flex-col gap-12">
            {/* Input Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-8">
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Monthly Electricity Bill (₹)
                </label>
                <input
                  type="number"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-gray-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:border-yellow-500/40">
                  <div className="flex items-center gap-3 mb-3">
                    <Sun className="w-6 h-6 text-yellow-500" />
                    <span className="font-medium text-gray-300">Required Capacity</span>
                  </div>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    {solarDetails.requiredCapacity.toFixed(1)} kW
                  </p>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:border-yellow-500/40">
                  <div className="flex items-center gap-3 mb-3">
                    <Battery className="w-6 h-6 text-yellow-500" />
                    <span className="font-medium text-gray-300">Daily Generation</span>
                  </div>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    {solarDetails.dailyGeneration.toFixed(1)} units
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Options Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-8">
              <h3 className="text-xl font-semibold text-gray-300 mb-6">Payment Options</h3>
              <div className="flex gap-6 mb-6">
                <button
                  onClick={() => {
                    setPaymentType('upfront');
                    setShowLoanDetails(false);
                  }}
                  className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 ${
                    paymentType === 'upfront'
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg'
                      : 'bg-gray-900/50 text-gray-300 hover:bg-gray-900/80 border border-yellow-500/20 hover:border-yellow-500/40'
                  }`}
                >
                  Upfront Payment
                </button>
                <button
                  onClick={() => {
                    setPaymentType('emi');
                    setShowLoanDetails(true);
                  }}
                  className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 ${
                    paymentType === 'emi'
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg'
                      : 'bg-gray-900/50 text-gray-300 hover:bg-gray-900/80 border border-yellow-500/20 hover:border-yellow-500/40'
                  }`}
                >
                  EMI
                </button>
              </div>

              {paymentType === 'emi' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      checked={autoCalculateInterest}
                      onChange={(e) => setAutoCalculateInterest(e.target.checked)}
                      className="w-5 h-5 rounded text-yellow-500 bg-gray-900/50 border-yellow-500/40 transition-all duration-200"
                    />
                    <label className="text-sm text-gray-300">Auto-calculate interest rate (9%)</label>
                  </div>

                  {!autoCalculateInterest && (
                    <div className="animate-fade-in">
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Interest Rate (%)
                      </label>
                      <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-yellow-500/40 rounded-lg text-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Loan Tenure (years)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full h-3 bg-gray-900/50 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #f59e0b ${(tenure - 1) * 10}%, #1f2937 ${(tenure - 1) * 10}%)`
                      }}
                    />
                    <div className="text-center text-sm text-gray-300 mt-3">{tenure} years</div>
                  </div>

                  <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20">
                    <div className="flex justify-between mb-3 text-gray-300">
                      <span>Monthly EMI:</span>
                      <span className="font-semibold">₹{loanDetails.emi.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-300">Monthly Bill Savings:</span>
                      <span className="font-semibold text-yellow-500">
                        ₹{loanDetails.monthlyBillSavings.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span className="text-gray-300">Net Monthly Cost:</span>
                      <span
                        className={
                          loanDetails.netMonthlyCost > 0
                            ? 'text-red-400'
                            : 'text-yellow-500'
                        }
                      >
                        ₹{Math.abs(loanDetails.netMonthlyCost).toFixed(2)}
                        {loanDetails.netMonthlyCost > 0 ? ' (Cost)' : ' (Savings)'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Environmental Impact Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Leaf className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-semibold text-gray-300">Environmental Impact</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20">
                  <p className="text-gray-300 text-lg mb-2">Annual CO₂ Reduction</p>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    {solarDetails.co2Reduction.toFixed(2)} kg
                  </p>
                </div>
                <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20">
                  <p className="text-gray-300 text-lg mb-2">Equivalent to Trees Planted</p>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    {Math.round(solarDetails.co2Reduction / 20)} trees
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            {/* Analysis Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-8">
              {/* Header and Controls */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h3 className="text-2xl font-semibold text-gray-300">Analysis</h3>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setChartView('yearly')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        chartView === 'yearly'
                          ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
                          : 'bg-gray-900/50 text-gray-300 hover:bg-gray-900/80 border border-yellow-500/20 hover:border-yellow-500/40'
                      }`}
                    >
                      <LineChart className="w-5 h-5" />
                      <span>Yearly</span>
                    </button>
                    <button
                      onClick={() => setChartView('daily')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        chartView === 'daily'
                          ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
                          : 'bg-gray-900/50 text-gray-300 hover:bg-gray-900/80 border border-yellow-500/20 hover:border-yellow-500/40'
                      }`}
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Daily</span>
                    </button>
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <IndianRupee className="w-6 h-6 text-yellow-500" />
                      <span className="text-base font-medium text-gray-300">Monthly Savings</span>
                    </div>
                    <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                      ₹{solarDetails.monthlySavings.toFixed(2)}
                    </p>
                  </div>

                  <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <PiggyBank className="w-6 h-6 text-yellow-500" />
                      <span className="text-base font-medium text-gray-300">Annual Savings</span>
                    </div>
                    <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                      ₹{solarDetails.annualSavings.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Chart Section */}
              <div className="h-[800px] relative">
                {chartView === 'yearly' ? (
                  <ComparisonChart data={comparisonData} showEmi={paymentType === 'emi'} />
                ) : (
                  <DailyTrendChart data={dailyTrendData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};