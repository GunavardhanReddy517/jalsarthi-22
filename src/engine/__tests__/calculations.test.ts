import { describe, it, expect } from 'vitest';
import {
  calculateInvestment,
  calculateProfit,
  generateWhatIfScenarios,
  DEFAULT_EXPENSES
} from '../financialCalculations';
import { calculateWaterBudget, convertAreaToAcres } from '../waterBudget';
import { evaluateCropSuitability, getAlternativeCrops } from '../cropRecommendation';
import { calculateGrowthTimeline } from '../growthTimeline';
import { CROPS_DATABASE } from '../../data/crops';
import { FarmInputs } from '../../types';

describe('Financial Calculations Engine', () => {
  it('correctly calculates cultivation expenses and area conversions', () => {
    const expenses = {
      ...DEFAULT_EXPENSES,
      seeds: 3000,
      labour: 7000
    };
    // 2 acres
    const result = calculateInvestment(expenses, 2, 'acre');
    expect(result.totalExpenses).toBeGreaterThan(0);
    expect(result.costPerAcre).toBe(Math.round(result.totalExpenses / 2));
    expect(result.costPerHectare).toBeGreaterThan(result.costPerAcre);
  });

  it('safely handles zero land area without throwing or division-by-zero', () => {
    const result = calculateInvestment(DEFAULT_EXPENSES, 0, 'acre');
    expect(result.landAreaInAcres).toBe(0);
    expect(result.costPerAcre).toBe(result.totalExpenses);
    expect(Number.isFinite(result.costPerAcre)).toBe(true);
  });

  it('accurately computes gross revenue, net profit, break-even price, and ROI', () => {
    // 2 acres, 20 quintals/acre = 40 quintals total
    // Selling price = ₹2,500/quintal => Gross = ₹1,00,000
    // Total expenses = ₹40,000 => Net = ₹60,000
    // Break-even = 40,000 / 40 = ₹1,000/quintal
    // ROI = (60,000 / 40,000) * 100 = 150%
    const profit = calculateProfit(2, 'acre', 20, 2500, 40000);
    expect(profit.totalYieldQuintals).toBe(40);
    expect(profit.grossRevenue).toBe(100000);
    expect(profit.netReturn).toBe(60000);
    expect(profit.isProfit).toBe(true);
    expect(profit.breakEvenPricePerQuintal).toBe(1000);
    expect(profit.roiPercentage).toBe(150);
  });

  it('handles negative profit (loss) correctly', () => {
    // Gross = 20 * 1,000 = ₹20,000. Expenses = ₹30,000 => Net = -₹10,000
    const profit = calculateProfit(1, 'acre', 20, 1000, 30000);
    expect(profit.netReturn).toBe(-10000);
    expect(profit.isProfit).toBe(false);
    expect(profit.roiPercentage).toBeCloseTo(-33.3, 1);
  });

  it('safely handles zero yield and zero investment', () => {
    const zeroYield = calculateProfit(1, 'acre', 0, 2000, 25000);
    expect(zeroYield.grossRevenue).toBe(0);
    expect(zeroYield.netReturn).toBe(-25000);
    expect(zeroYield.breakEvenPricePerQuintal).toBe(0);

    const zeroInvestment = calculateProfit(1, 'acre', 10, 2000, 0);
    expect(zeroInvestment.grossRevenue).toBe(20000);
    expect(zeroInvestment.netReturn).toBe(20000);
    expect(zeroInvestment.breakEvenPricePerQuintal).toBe(0);
    expect(Number.isFinite(zeroInvestment.roiPercentage)).toBe(true);
  });

  it('generates 3 distinct what-if scenarios with realistic adjustments', () => {
    const baseProfit = calculateProfit(2, 'acre', 20, 2500, 40000);
    const scenarios = generateWhatIfScenarios(baseProfit);
    expect(scenarios).toHaveLength(3);

    const [conservative, expected, optimistic] = scenarios;
    expect(conservative.name).toBe('Conservative');
    expect(expected.name).toBe('Expected');
    expect(optimistic.name).toBe('Optimistic');

    expect(conservative.netReturn).toBeLessThan(expected.netReturn);
    expect(optimistic.netReturn).toBeGreaterThan(expected.netReturn);
  });
});

describe('Water Budget Simulator', () => {
  it('accurately converts litres to m³ and computes depth equivalent', () => {
    const tomato = CROPS_DATABASE.find((c) => c.id === 'tomato')!;
    // 40,468.56 litres = ~40.47 m³ on 1 acre => ~10 mm depth
    const budget = calculateWaterBudget(tomato, 40468.56, 'litres', 1, 'acre', 30);
    expect(budget.volumeInCubicMetres).toBeCloseTo(40.47, 1);
    expect(budget.waterPerAcreMmEquivalent).toBeCloseTo(10, 1);
  });

  it('detects deficit when water supply is insufficient', () => {
    const rice = CROPS_DATABASE.find((c) => c.id === 'rice')!;
    // Very low water: 5,000 litres on 1 acre for rice
    const budget = calculateWaterBudget(rice, 5000, 'litres', 1, 'acre', 30);
    expect(budget.status).toBe('Deficit');
    expect(budget.isCompatible).toBe(false);
    expect(budget.recommendations.length).toBeGreaterThan(0);
  });

  it('safely handles 0 area or 0 water volume', () => {
    const tomato = CROPS_DATABASE.find((c) => c.id === 'tomato')!;
    const budget = calculateWaterBudget(tomato, 0, 'litres', 0, 'acre', 30);
    expect(budget.status).toBe('Insufficient Data');
    expect(budget.isCompatible).toBe(false);
  });
});

describe('Crop Recommendation and Alternatives Engine', () => {
  it('gives high suitability for well-matched season and soil', () => {
    const tomato = CROPS_DATABASE.find((c) => c.id === 'tomato')!;
    const inputs: FarmInputs = {
      season: 'Winter',
      soilType: 'Loamy',
      cropId: 'tomato',
      landArea: 2,
      areaUnit: 'acre',
      waterAvailability: 'sufficient',
      soilPh: 6.5
    };

    const evaluation = evaluateCropSuitability(tomato, inputs);
    expect(evaluation.suitabilityCategory).toBe('High');
    expect(evaluation.suitabilityScore).toBeGreaterThanOrEqual(80);
    expect(evaluation.reasons.length).toBeGreaterThan(0);
    expect(evaluation.sources.length).toBeGreaterThan(0);
  });

  it('gives low or moderate suitability when season or soil mismatch', () => {
    const wheat = CROPS_DATABASE.find((c) => c.id === 'wheat')!;
    const inputs: FarmInputs = {
      season: 'Summer', // Wheat is winter rabi only
      soilType: 'Sandy',
      cropId: 'wheat',
      landArea: 1,
      areaUnit: 'acre',
      waterAvailability: 'limited'
    };

    const evaluation = evaluateCropSuitability(wheat, inputs);
    expect(['Moderate', 'Low']).toContain(evaluation.suitabilityCategory);
    expect(evaluation.limitations.length).toBeGreaterThan(0);
  });

  it('generates up to 3 viable alternative crops with transparent comparisons', () => {
    const inputs: FarmInputs = {
      season: 'Rainy / Monsoon',
      soilType: 'Black Soil',
      cropId: 'rice',
      landArea: 3,
      areaUnit: 'acre',
      waterAvailability: 'moderate'
    };

    const alternatives = getAlternativeCrops('rice', inputs);
    expect(alternatives.length).toBeLessThanOrEqual(3);
    expect(alternatives.length).toBeGreaterThan(0);
    expect(alternatives[0].crop.id).not.toBe('rice');
    expect(alternatives[0].keyDifferencesFromSelected).toBeTruthy();
  });
});

describe('Growth Timeline Engine', () => {
  it('produces 7 chronological stages with calculated harvest window', () => {
    const maize = CROPS_DATABASE.find((c) => c.id === 'maize')!;
    const timeline = calculateGrowthTimeline(maize, '2026-06-15');
    expect(timeline.stages).toHaveLength(7);
    expect(timeline.stages[0].name).toContain('Planting');
    expect(timeline.stages[6].name).toContain('Harvest');
    expect(timeline.stages[0].estimatedStartDate).toBeTruthy();
    expect(timeline.estimatedHarvestRange).toContain('2026');
  });
});
