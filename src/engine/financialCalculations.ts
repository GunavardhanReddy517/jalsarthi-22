import {
  ExpenseBreakdown,
  InvestmentCalculation,
  ProfitEstimation,
  WhatIfScenario,
  AreaUnit
} from '../types';
import { convertAreaToAcres, HECTARE_TO_ACRES } from './waterBudget';

export const DEFAULT_EXPENSES: ExpenseBreakdown = {
  landPreparation: 4500,
  seeds: 2500,
  fertilizers: 5000,
  labour: 6000,
  irrigation: 2500,
  cropProtection: 3000,
  harvesting: 4500,
  transportation: 1500,
  otherExpenses: 1000
};

/**
 * Calculates total expenses and per-acre / per-hectare metrics safely.
 * Non-negative validation on all fields.
 */
export function calculateInvestment(
  expenses: ExpenseBreakdown,
  landArea: number,
  areaUnit: AreaUnit
): InvestmentCalculation {
  const safeArea = Math.max(0, landArea);
  const areaInAcres = convertAreaToAcres(safeArea, areaUnit);

  const cleanExpenses: ExpenseBreakdown = {
    landPreparation: Math.max(0, expenses.landPreparation || 0),
    seeds: Math.max(0, expenses.seeds || 0),
    fertilizers: Math.max(0, expenses.fertilizers || 0),
    labour: Math.max(0, expenses.labour || 0),
    irrigation: Math.max(0, expenses.irrigation || 0),
    cropProtection: Math.max(0, expenses.cropProtection || 0),
    harvesting: Math.max(0, expenses.harvesting || 0),
    transportation: Math.max(0, expenses.transportation || 0),
    otherExpenses: Math.max(0, expenses.otherExpenses || 0)
  };

  const totalExpenses =
    cleanExpenses.landPreparation +
    cleanExpenses.seeds +
    cleanExpenses.fertilizers +
    cleanExpenses.labour +
    cleanExpenses.irrigation +
    cleanExpenses.cropProtection +
    cleanExpenses.harvesting +
    cleanExpenses.transportation +
    cleanExpenses.otherExpenses;

  const costPerAcre = areaInAcres > 0 ? Math.round(totalExpenses / areaInAcres) : totalExpenses;
  // 1 hectare = 2.47105 acres => cost per hectare = cost per acre * 2.47105
  const costPerHectare = Math.round(costPerAcre * HECTARE_TO_ACRES);

  return {
    expenses: cleanExpenses,
    totalExpenses,
    landAreaInAcres: Math.round(areaInAcres * 100) / 100,
    costPerAcre,
    costPerHectare
  };
}

/**
 * Calculates gross revenue, net return, break-even price, and ROI.
 * Safely handles 0 yield and 0 investment.
 *
 * All primary calculations standardized to:
 * - Area: Acres
 * - Yield: Quintals (1 quintal = 100 kg)
 * - Selling price: INR / Quintal
 */
export function calculateProfit(
  landArea: number,
  areaUnit: AreaUnit,
  expectedYieldPerUnit: number, // quintals per acre or per hectare
  sellingPricePerQuintal: number, // INR / quintal
  totalCultivationExpenses: number
): ProfitEstimation {
  const safeArea = Math.max(0, landArea);
  const areaInAcres = convertAreaToAcres(safeArea, areaUnit);

  // If user entered yield per hectare, convert to yield per acre
  let yieldPerAcreQuintals = Math.max(0, expectedYieldPerUnit || 0);
  if (areaUnit === 'hectare' && yieldPerAcreQuintals > 0) {
    yieldPerAcreQuintals = yieldPerAcreQuintals / HECTARE_TO_ACRES;
  }

  const cleanPrice = Math.max(0, sellingPricePerQuintal || 0);
  const cleanExpenses = Math.max(0, totalCultivationExpenses || 0);

  const totalYieldQuintals = Math.round(areaInAcres * yieldPerAcreQuintals * 100) / 100;
  const totalYieldKg = Math.round(totalYieldQuintals * 100);

  const grossRevenue = Math.round(totalYieldQuintals * cleanPrice);
  const netReturn = Math.round(grossRevenue - cleanExpenses);
  const isProfit = netReturn >= 0;

  // Break-even selling price = Total expenses / Total yield
  let breakEvenPricePerQuintal = 0;
  if (totalYieldQuintals > 0) {
    breakEvenPricePerQuintal = Math.round(cleanExpenses / totalYieldQuintals);
  }

  // ROI (%) = (Net return / Total expenses) * 100
  let roiPercentage = 0;
  if (cleanExpenses > 0) {
    roiPercentage = Math.round((netReturn / cleanExpenses) * 1000) / 10;
  } else if (grossRevenue > 0) {
    roiPercentage = 100; // Zero investment infinite return handled gracefully
  }

  const sellingPricePerKg = Math.round((cleanPrice / 100) * 100) / 100;

  return {
    landAreaInAcres: Math.round(areaInAcres * 100) / 100,
    expectedYieldPerAcreQuintals: Math.round(yieldPerAcreQuintals * 100) / 100,
    totalYieldQuintals,
    totalYieldKg,
    sellingPricePerQuintal: cleanPrice,
    sellingPricePerKg,
    totalCultivationExpenses: cleanExpenses,
    grossRevenue,
    netReturn,
    isProfit,
    breakEvenPricePerQuintal,
    roiPercentage
  };
}

/**
 * Generates 3 What-If Scenarios:
 * 1. Conservative (Yield -15%, Price -10%, Expenses +10%)
 * 2. Expected (Current parameters)
 * 3. Optimistic (Yield +20%, Price +15%, Expenses -5%)
 */
export function generateWhatIfScenarios(
  baseProfit: ProfitEstimation,
  conservativeYieldAdjust: number = -15, // %
  conservativePriceAdjust: number = -10, // %
  conservativeExpenseAdjust: number = 10, // %
  optimisticYieldAdjust: number = 20, // %
  optimisticPriceAdjust: number = 15, // %
  optimisticExpenseAdjust: number = -5 // %
): WhatIfScenario[] {
  const area = baseProfit.landAreaInAcres;
  const baseYield = baseProfit.expectedYieldPerAcreQuintals;
  const basePrice = baseProfit.sellingPricePerQuintal;
  const baseExpenses = baseProfit.totalCultivationExpenses;

  // 1. Conservative
  const cYield = Math.max(0, baseYield * (1 + conservativeYieldAdjust / 100));
  const cPrice = Math.max(0, basePrice * (1 + conservativePriceAdjust / 100));
  const cExp = Math.max(0, baseExpenses * (1 + conservativeExpenseAdjust / 100));
  const cTotYield = Math.round(area * cYield * 100) / 100;
  const cGross = Math.round(cTotYield * cPrice);
  const cNet = Math.round(cGross - cExp);
  const cBreakEven = cTotYield > 0 ? Math.round(cExp / cTotYield) : 0;
  const cRoi = cExp > 0 ? Math.round((cNet / cExp) * 1000) / 10 : 0;

  // 2. Expected
  const eTotYield = baseProfit.totalYieldQuintals;
  const eGross = baseProfit.grossRevenue;
  const eNet = baseProfit.netReturn;
  const eBreakEven = baseProfit.breakEvenPricePerQuintal;
  const eRoi = baseProfit.roiPercentage;

  // 3. Optimistic
  const oYield = Math.max(0, baseYield * (1 + optimisticYieldAdjust / 100));
  const oPrice = Math.max(0, basePrice * (1 + optimisticPriceAdjust / 100));
  const oExp = Math.max(0, baseExpenses * (1 + optimisticExpenseAdjust / 100));
  const oTotYield = Math.round(area * oYield * 100) / 100;
  const oGross = Math.round(oTotYield * oPrice);
  const oNet = Math.round(oGross - oExp);
  const oBreakEven = oTotYield > 0 ? Math.round(oExp / oTotYield) : 0;
  const oRoi = oExp > 0 ? Math.round((oNet / oExp) * 1000) / 10 : 0;

  return [
    {
      name: 'Conservative',
      yieldMultiplier: 1 + conservativeYieldAdjust / 100,
      priceMultiplier: 1 + conservativePriceAdjust / 100,
      expenseMultiplier: 1 + conservativeExpenseAdjust / 100,
      yieldPerAcre: Math.round(cYield * 100) / 100,
      totalYieldQuintals: cTotYield,
      sellingPricePerQuintal: Math.round(cPrice),
      totalExpenses: Math.round(cExp),
      grossRevenue: cGross,
      netReturn: cNet,
      breakEvenPrice: cBreakEven,
      roiPercentage: cRoi
    },
    {
      name: 'Expected',
      yieldMultiplier: 1.0,
      priceMultiplier: 1.0,
      expenseMultiplier: 1.0,
      yieldPerAcre: baseYield,
      totalYieldQuintals: eTotYield,
      sellingPricePerQuintal: basePrice,
      totalExpenses: baseExpenses,
      grossRevenue: eGross,
      netReturn: eNet,
      breakEvenPrice: eBreakEven,
      roiPercentage: eRoi
    },
    {
      name: 'Optimistic',
      yieldMultiplier: 1 + optimisticYieldAdjust / 100,
      priceMultiplier: 1 + optimisticPriceAdjust / 100,
      expenseMultiplier: 1 + optimisticExpenseAdjust / 100,
      yieldPerAcre: Math.round(oYield * 100) / 100,
      totalYieldQuintals: oTotYield,
      sellingPricePerQuintal: Math.round(oPrice),
      totalExpenses: Math.round(oExp),
      grossRevenue: oGross,
      netReturn: oNet,
      breakEvenPrice: oBreakEven,
      roiPercentage: oRoi
    }
  ];
}
