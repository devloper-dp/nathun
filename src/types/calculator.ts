export interface SolarCalculation {
  monthlyBill: number;
  requiredCapacity: number;
  dailyGeneration: number;
  maxDailyGeneration: number;
  monthlySavings: number;
  annualSavings: number;
  subsidy: number;
  costAfterSubsidy: number;
  co2Reduction: number;
  breakEvenPoint: {
    units: number;
    sales: number;
    daysToBreakEven: number;
  };
  totalCost: number;
}

export interface LoanCalculation {
  principal: number;
  interestRate: number;
  tenure: number;
  emi: number;
  totalInterest: number;
  totalAmount: number;
  monthlyBillSavings: number;
  netMonthlyCost: number;
}

export interface ComparisonData {
  year: number;
  withSolar: number;
  withoutSolar: number;
  emiPayment?: number;
  cumulativeSavings: number;
}

export interface DailyProfitLoss {
  day: number;
  withSolar: number;
  withoutSolar: number;
  profit: number;
  cumulativeSavings: number;
}