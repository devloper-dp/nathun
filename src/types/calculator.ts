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
  monthlyGeneration: number; // Added for clarity
  yearlyGeneration: number; // Added for yearly calculations
  efficiency: number; // Added for panel efficiency
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
  deposit: number;
  processingFee?: number; // Added optional processing fee
  prepaymentPenalty?: number; // Added optional prepayment penalty
  insurancePremium?: number; // Added optional insurance premium
}

export interface ComparisonData {
  year: number;
  withSolar: number;
  withoutSolar: number;
  emiPayment?: number;
  cumulativeSavings: number;
  efficiency: number; // Added for panel degradation tracking
  maintenanceCost: number; // Added for maintenance tracking
  carbonSaved: number; // Added for environmental impact
}

export interface DailyProfitLoss {
  day: number;
  withSolar: number;
  withoutSolar: number;
  profit: number;
  cumulativeSavings: number;
  solarGeneration: number; // Added for generation tracking
  efficiency: number; // Added for daily efficiency
  weatherImpact: number; // Added for weather impact
}