import { SolarCalculation, LoanCalculation, ComparisonData, DailyProfitLoss } from '../types/calculator';

const UNIT_PRICE = 9; // ₹9 per unit
const COST_PER_KW = 90000; // Cost per kW of solar installation
const BASE_GENERATION = 3.8; // Average daily generation units per 1kW (considering 365 days average)
const MAX_GENERATION = 4.2; // Maximum daily generation units per 1kW (on optimal days)
const YEARLY_MAINTENANCE = 0.01; // 1% of total cost per year for maintenance
// const MAX_SUBSIDY = 78000; // Maximum government subsidy

const calculateBreakEvenPoint = (
  fixedCosts: number,
  sellingPricePerUnit: number,
  variableCostPerUnit: number,
  maintenanceCost: number
) => {
  const effectiveFixedCosts = fixedCosts;
  const effectiveVariableCost = variableCostPerUnit + maintenanceCost;
  
  const bepUnits = effectiveFixedCosts / (sellingPricePerUnit - effectiveVariableCost);
  const bepSales = bepUnits * sellingPricePerUnit;

  const daysToBreakEven = Math.ceil(bepUnits / (BASE_GENERATION * Math.ceil(bepUnits / BASE_GENERATION)));

  return {
    units: bepUnits,
    sales: bepSales,
    daysToBreakEven
  };
};

export const calculateSolarDetails = (monthlyBill: number): SolarCalculation => {
  const unitsPerDay = monthlyBill / (30 * UNIT_PRICE);
  const requiredCapacity = Math.ceil(unitsPerDay / BASE_GENERATION);
  
  const dailyGeneration = requiredCapacity * BASE_GENERATION;
  const maxDailyGeneration = requiredCapacity * MAX_GENERATION;
  
  const monthlySavings = dailyGeneration * 30 * UNIT_PRICE;
  const annualSavings = monthlySavings * 12;
  
  // Calculate subsidy based on capacity with exact values
  let subsidy = 0;
  if (requiredCapacity <= 1) {
    subsidy = 30000; // 1kW subsidy
  } else if (requiredCapacity <= 2) {
    subsidy = 60000; // 2kW subsidy
  } else if (requiredCapacity <= 3) {
    subsidy = 78000; // 3kW subsidy
  } else {
    subsidy = 78000; // More than 3kW subsidy capped at 78000
  }

  const totalCost = requiredCapacity * COST_PER_KW;
  const costAfterSubsidy = totalCost - subsidy;
  
  const annualMaintenance = totalCost * YEARLY_MAINTENANCE;
  const dailyMaintenance = annualMaintenance / 365;
  
  const co2Reduction = dailyGeneration * 0.85 * 365;

  const breakEvenPoint = calculateBreakEvenPoint(
    costAfterSubsidy,
    UNIT_PRICE,
    0,
    dailyMaintenance / dailyGeneration
  );
  
  return {
    monthlyBill,
    requiredCapacity,
    dailyGeneration,
    maxDailyGeneration,
    monthlySavings,
    annualSavings,
    subsidy,
    costAfterSubsidy,
    co2Reduction,
    breakEvenPoint,
    totalCost
  };
};

export const calculateLoan = (
  principal: number,
  interestRate: number,
  tenure: number,
  monthlyBill: number
): LoanCalculation => {
  const monthlyRate = interestRate / (12 * 100);
  const numberOfPayments = tenure * 12;
  
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  const totalAmount = emi * numberOfPayments;
  const totalInterest = totalAmount - principal;
  const monthlyBillSavings = monthlyBill;
  const netMonthlyCost = emi - monthlyBillSavings;

  return {
    principal,
    interestRate,
    tenure,
    emi,
    totalInterest,
    totalAmount,
    monthlyBillSavings,
    netMonthlyCost
  };
};

export const generateComparisonData = (
  monthlyBill: number,
  years: number,
  loanDetails?: LoanCalculation
): ComparisonData[] => {
  const annualBill = monthlyBill * 12;
  const yearlyIncrease = 0.05; // 5% yearly increase in electricity costs
  const solarCalculation = calculateSolarDetails(monthlyBill);
  const annualMaintenance = solarCalculation.totalCost * YEARLY_MAINTENANCE;
  
  return Array.from({ length: years }, (_, i) => {
    const withoutSolar = annualBill * Math.pow(1 + yearlyIncrease, i);
    const withSolar = i === 0 ? solarCalculation.costAfterSubsidy : annualMaintenance;
    const emiPayment = loanDetails && i < loanDetails.tenure ? loanDetails.emi * 12 : 0;
    
    const previousYearsSavings = i > 0 
      ? Array.from({ length: i }, (_, j) => 
          (annualBill * Math.pow(1 + yearlyIncrease, j)) - 
          (j === 0 ? solarCalculation.costAfterSubsidy : annualMaintenance) - 
          (loanDetails && j < loanDetails.tenure ? loanDetails.emi * 12 : 0)
        ).reduce((sum, val) => sum + val, 0)
      : 0;

    const currentYearSavings = withoutSolar - withSolar - emiPayment;
    const cumulativeSavings = previousYearsSavings + currentYearSavings;
    
    return {
      year: i + 1,
      withoutSolar,
      withSolar,
      emiPayment: loanDetails ? emiPayment : undefined,
      cumulativeSavings
    };
  });
};

export const generateDailyProfitLoss = (
  monthlyBill: number,
  days: number
): DailyProfitLoss[] => {
  const solarDetails = calculateSolarDetails(monthlyBill);
  const dailyBillWithoutSolar = monthlyBill / 30;
  const dailySavings = solarDetails.dailyGeneration * UNIT_PRICE;
  const dailyMaintenance = (solarDetails.totalCost * YEARLY_MAINTENANCE) / 365;

  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    withSolar: solarDetails.costAfterSubsidy + (dailyMaintenance * i),
    withoutSolar: dailyBillWithoutSolar * i,
    profit: (dailySavings * i) - solarDetails.costAfterSubsidy - (dailyMaintenance * i),
    cumulativeSavings: (dailyBillWithoutSolar * i) - solarDetails.costAfterSubsidy - (dailyMaintenance * i)
  }));
};