export type Season = 'Summer' | 'Rainy / Monsoon' | 'Winter';

export type SoilType =
  | 'Sandy'
  | 'Sandy Loam'
  | 'Loamy'
  | 'Clay'
  | 'Clay Loam'
  | 'Black Soil'
  | 'Red Soil';

export type AreaUnit = 'acre' | 'hectare';

export type IrrigationSource =
  | 'rainfall'
  | 'canal'
  | 'borewell'
  | 'open well'
  | 'other';

export type WaterAvailability = 'limited' | 'moderate' | 'sufficient';

export type SuitabilityCategory = 'High' | 'Moderate' | 'Low' | 'Insufficient Data';

export interface GrowthStage {
  name: string;
  durationDays: [number, number]; // e.g. [0, 10]
  waterSensitivity: 'Low' | 'Moderate' | 'High' | 'Critical';
  irrigationGuidance: string;
  managementTips: string;
}

export interface CropData {
  id: string;
  name: string;
  kannadaName: string;
  scientificName: string;
  category: 'Cereal' | 'Pulse' | 'Oilseed' | 'Vegetable' | 'Commercial' | 'Millet';
  image: string;
  description: string;
  suitableSeasons: Season[];
  suitableSoils: SoilType[];
  waterRequirementMm: [number, number]; // mm per crop cycle
  drainageRequirement: 'Good' | 'Moderate' | 'High' | 'Tolerant of waterlogging';
  maturityDurationDays: [number, number]; // min and max days
  optimalPhRange: [number, number];
  growthStages: GrowthStage[];
  nutrientRequirements: {
    n: string; // kg/acre
    p: string;
    k: string;
    guidelines: string;
  };
  commonCultivationRisks: string[];
  typicalYieldRangePerAcre: [number, number]; // in quintals (1 quintal = 100 kg)
  typicalCostPerAcre: [number, number]; // in INR
  typicalPricePerQuintal: [number, number]; // in INR
  recommendedIrrigationMethods: string[];
  sources: {
    organization: string;
    publication: string;
    year: number;
    url?: string;
  }[];
}

export interface FarmInputs {
  // Required
  season: Season;
  soilType: SoilType;
  cropId: string;

  // Optional
  state?: string;
  district?: string;
  landArea: number;
  areaUnit: AreaUnit;
  plantingDate?: string;
  irrigationSource?: IrrigationSource;
  waterAvailability?: WaterAvailability;
  recentRainfallMm?: number;
  soilPh?: number;
  cropVariety?: string;
  expectedSellingPrice?: number; // per quintal
  expectedYield?: number; // quintals per unit area
}

export interface ScoreBreakdown {
  seasonScore: number; // max 30
  soilScore: number; // max 25
  waterScore: number; // max 25
  drainageScore: number; // max 10
  phOrRegionalScore: number; // max 10
  totalScore: number; // max 100
}

export interface RecommendationResult {
  crop: CropData;
  suitabilityCategory: SuitabilityCategory;
  suitabilityScore: number;
  scoreBreakdown: ScoreBreakdown;
  reasons: string[];
  limitations: string[];
  practicalImprovements: string[];
  missingInformation: string[];
  sources: CropData['sources'];
}

export interface IrrigationAdvice {
  generalWateringNeeds: string;
  soilMoistureRetention: string;
  drainageBehaviour: string;
  overwateringRisks: string[];
  underwateringRisks: string[];
  recommendedMethods: string[];
  waterSavingPractices: string[];
  growthStageSpecificNeeds: {
    currentStageName: string;
    daysFromPlanting: number;
    stageAdvice: string;
    waterSensitivity: 'Low' | 'Moderate' | 'High' | 'Critical';
  };
  rainfallImpactNotice?: string;
  waterAvailabilityAdvice: string;
}

export interface WaterBudgetResult {
  waterVolumeEntered: number;
  volumeUnit: 'litres' | 'cubic_metres';
  volumeInCubicMetres: number;
  volumeInLitres: number;
  landAreaInAcres: number;
  waterPerAcreCubicMetres: number;
  waterPerAcreMmEquivalent: number;
  cropRequirementMm: number;
  periodDays: number;
  deficitOrSurplusMm: number;
  deficitOrSurplusCubicMetres: number;
  isCompatible: boolean;
  status: 'Surplus' | 'Adequate' | 'Deficit' | 'Insufficient Data';
  recommendations: string[];
}

export interface AlternativeCropRecommendation {
  crop: CropData;
  suitabilityCategory: SuitabilityCategory;
  suitabilityScore: number;
  reasons: string[];
  advantages: string[];
  limitations: string[];
  waterGuidance: string;
  maturityRange: string;
  estimatedCostRange: string;
  estimatedYieldRange: string;
  keyDifferencesFromSelected: string;
}

export interface TimelineStageEstimate {
  stageNumber: number;
  name: string;
  startDay: number;
  endDay: number;
  estimatedStartDate?: string;
  estimatedEndDate?: string;
  waterSensitivity: 'Low' | 'Moderate' | 'High' | 'Critical';
  managementTips: string;
  irrigationGuidance: string;
}

export interface ExpenseBreakdown {
  landPreparation: number;
  seeds: number;
  fertilizers: number;
  labour: number;
  irrigation: number;
  cropProtection: number;
  harvesting: number;
  transportation: number;
  otherExpenses: number;
}

export interface InvestmentCalculation {
  expenses: ExpenseBreakdown;
  totalExpenses: number;
  landAreaInAcres: number;
  costPerAcre: number;
  costPerHectare: number;
}

export interface ProfitEstimation {
  landAreaInAcres: number;
  expectedYieldPerAcreQuintals: number;
  totalYieldQuintals: number;
  totalYieldKg: number;
  sellingPricePerQuintal: number;
  sellingPricePerKg: number;
  totalCultivationExpenses: number;
  grossRevenue: number;
  netReturn: number;
  isProfit: boolean;
  breakEvenPricePerQuintal: number;
  roiPercentage: number;
}

export interface WhatIfScenario {
  name: 'Conservative' | 'Expected' | 'Optimistic';
  yieldMultiplier: number;
  priceMultiplier: number;
  expenseMultiplier: number;
  yieldPerAcre: number;
  totalYieldQuintals: number;
  sellingPricePerQuintal: number;
  totalExpenses: number;
  grossRevenue: number;
  netReturn: number;
  breakEvenPrice: number;
  roiPercentage: number;
}

export interface SoilGuideResult {
  soilName: SoilType;
  characteristics: string;
  drainageAndRetention: string;
  organicMatterRecommendations: string[];
  mulchingAdvice: string;
  cropRotationSuggestions: string[];
  generalNutrientManagement: string[];
  soilTestingChecklist: string[];
  phAnalysis?: {
    enteredPh: number;
    status: 'Acidic' | 'Neutral / Optimal' | 'Alkaline';
    cropCompatibility: string;
    correctionPractices: string[];
  };
}

export interface SavedAnalysis {
  id: string;
  timestamp: string;
  name: string;
  inputs: FarmInputs;
  expenses: ExpenseBreakdown;
  recommendation: RecommendationResult;
  profit: ProfitEstimation;
}
