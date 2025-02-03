import { SolarCalculation, LoanCalculation, ComparisonData, DailyProfitLoss } from '../types/calculator';

// Constants
const UNIT_PRICE = 8; // ₹8 per unit
const DAILY_GENERATION_FACTOR = 4.1;
const DAYS_PER_MONTH = 30.5;
const ANNUAL_MAINTENANCE_COST = 2400; // ₹2,400 per year

const PLANT_COSTS = {
  3: 200000, // ₹2,00,000
  4: 250000, // ₹2,50,000
  5: 275000  // ₹2,75,000
} as const;

// Subsidy calculation
const getSubsidy = (capacity: number): number => {
  if (capacity <= 1) return 30000;
  if (capacity <= 2) return 60000;
  if (capacity <= 3) return 78000;
  return 78000; // Max subsidy
};

// Calculate required capacity based on monthly bill
const calculateRequiredCapacity = (monthlyBill: number): number => {
  const requiredKW = (monthlyBill * 1.20) / (UNIT_PRICE * DAILY_GENERATION_FACTOR * DAYS_PER_MONTH);
  return roundOffPlantSize(requiredKW);
};

// Round off plant size according to specified ranges
const roundOffPlantSize = (calculatedSize: number): number => {
  if (calculatedSize >= 3.1 && calculatedSize <= 3.3) return 3;
  if (calculatedSize >= 3.3 && calculatedSize <= 3.5) return 3.5;
  if (calculatedSize >= 3.6 && calculatedSize <= 3.9) return 4;
  return Math.ceil(calculatedSize);
};

// Get plant cost based on capacity
const getPlantCost = (capacity: number): number => {
  if (capacity <= 3) return PLANT_COSTS[3];
  if (capacity <= 4) return PLANT_COSTS[4];
  return PLANT_COSTS[5];
};

export const calculateSolarDetails = (monthlyBill: number): SolarCalculation => {
  const requiredCapacity = calculateRequiredCapacity(monthlyBill);
  const totalCost = getPlantCost(requiredCapacity);
  const subsidy = getSubsidy(requiredCapacity);
  const costAfterSubsidy = totalCost - subsidy;
  
  const dailyGeneration = requiredCapacity * DAILY_GENERATION_FACTOR;
  const monthlyGeneration = dailyGeneration * DAYS_PER_MONTH;
  const monthlyGenerationValue = monthlyGeneration * UNIT_PRICE;
  
  const monthlySavings = monthlyGenerationValue - monthlyBill;
  const annualSavings = monthlySavings * 12;
  const co2Reduction = monthlyGeneration * 0.85 * 12;

  return {
    monthlyBill,
    requiredCapacity,
    dailyGeneration,
    monthlySavings,
    annualSavings,
    subsidy,
    costAfterSubsidy,
    co2Reduction,
    totalCost,
    monthlyGeneration,
    yearlyGeneration: monthlyGeneration * 12,
    breakEvenPoint: {
      daysToBreakEven: Math.ceil(costAfterSubsidy / (monthlyBill / 30))
    }
  };
};

export const calculateLoan = (
  totalCost: number,
  interestRate: number = 7.5,
  tenure: number = 5,
  monthlyBill: number
): LoanCalculation => {
  const deposit = totalCost * 0.20;
  const requiredCapacity = calculateRequiredCapacity(monthlyBill);
  const subsidy = getSubsidy(requiredCapacity);
  const loanAmount = totalCost - deposit - subsidy;

  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenure * 12;
  const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
              (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalAmount = emi * totalMonths;
  const totalInterest = totalAmount - loanAmount;

  return {
    principal: loanAmount,
    interestRate,
    tenure,
    emi,
    totalInterest,
    totalAmount,
    netMonthlyCost: emi,
    deposit,
  };
};


export const generateComparisonData = (
  monthlyBill: number,
  years: number = 10,
  loanDetails?: LoanCalculation
): ComparisonData[] => {
  const solarDetails = calculateSolarDetails(monthlyBill);
  
  return Array.from({ length: years }, (_, i) => {
    const withoutSolar = monthlyBill * 12;
    const withSolar = ANNUAL_MAINTENANCE_COST;
    const emiPayment = loanDetails && i < loanDetails.tenure ? loanDetails.emi * 12 : 0;
    
    const previousYearsSavings = i > 0 
      ? Array.from({ length: i }, (_, j) => {
          const yearlyBill = monthlyBill * 12;
          const yearlyEmi = loanDetails && j < loanDetails.tenure ? loanDetails.emi * 12 : 0;
          return yearlyBill - yearlyEmi - ANNUAL_MAINTENANCE_COST;
        }).reduce((sum, val) => sum + val, 0)
      : -solarDetails.costAfterSubsidy;

    const currentYearSavings = withoutSolar - emiPayment - withSolar;
    const cumulativeSavings = previousYearsSavings + currentYearSavings;

    return {
      year: i + 1,
      withoutSolar,
      withSolar,
      emiPayment: loanDetails ? emiPayment : undefined,
      cumulativeSavings,
      efficiency: Math.pow(0.993, i), // 0.7% annual degradation
      maintenanceCost: ANNUAL_MAINTENANCE_COST,
      carbonSaved: solarDetails.co2Reduction * Math.pow(0.993, i)
    };
  });
};

export const generateDailyProfitLoss = (
  monthlyBill: number,
  days: number = 365
): DailyProfitLoss[] => {
  const solarDetails = calculateSolarDetails(monthlyBill);
  const dailyBillWithoutSolar = monthlyBill / DAYS_PER_MONTH;
  const dailyMaintenanceCost = ANNUAL_MAINTENANCE_COST / 365;
  
  return Array.from({ length: days }, (_, i) => {
    const day = i + 1;
    const withoutSolar = dailyBillWithoutSolar;
    const withSolar = dailyMaintenanceCost;
    const profit = withoutSolar - withSolar;
    const cumulativeSavings = (profit * day) - solarDetails.costAfterSubsidy;

    return {
      day,
      withSolar: Math.max(withSolar, 1),
      withoutSolar: Math.max(withoutSolar, 1),
      profit: Math.max(profit, 1),
      cumulativeSavings,
      solarGeneration: solarDetails.dailyGeneration,
      efficiency: 1,
      weatherImpact: 1
    };
  });
};