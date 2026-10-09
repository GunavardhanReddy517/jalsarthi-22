export type Language = 'en' | 'kn';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  welcomeHeading: string;
  welcomeSubtitle: string;

  // Nav
  navHome: string;
  navAdvisor: string;
  navCalculator: string;
  navComparison: string;
  navHistory: string;

  // CTA buttons
  btnStartSmartFarming: string;
  btnGetIrrigationAdvice: string;
  btnCompareCrops: string;
  btnCalculateFarmProfit: string;
  btnAnalyseFarm: string;
  btnRecalculate: string;
  btnResetForm: string;
  btnSaveAnalysis: string;
  btnPrintReport: string;
  btnSavedHistory: string;

  // Features
  featuresTitle: string;
  featuresSubtitle: string;
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
  feature5: string;
  feature6: string;
  feature7: string;
  feature8: string;
  feature9: string;
  feature10: string;

  // Form Fields
  formTitle: string;
  formSubtitle: string;
  requiredBadge: string;
  optionalBadge: string;
  seasonLabel: string;
  soilTypeLabel: string;
  cropLabel: string;
  stateLabel: string;
  districtLabel: string;
  landAreaLabel: string;
  areaUnitLabel: string;
  plantingDateLabel: string;
  irrigationSourceLabel: string;
  waterAvailabilityLabel: string;
  recentRainfallLabel: string;
  soilPhLabel: string;
  cropVarietyLabel: string;
  expectedPriceLabel: string;
  expectedYieldLabel: string;

  // Options
  seasonSummer: string;
  seasonMonsoon: string;
  seasonWinter: string;
  waterLimited: string;
  waterModerate: string;
  waterSufficient: string;
  acre: string;
  hectare: string;

  // Results sections
  suitabilityTitle: string;
  irrigationTitle: string;
  timelineTitle: string;
  soilGuideTitle: string;
  investmentTitle: string;
  profitTitle: string;
  whatIfTitle: string;
  waterBudgetTitle: string;
  alternativesTitle: string;
  comparisonTitle: string;

  // Suitability badges
  suitabilityHigh: string;
  suitabilityModerate: string;
  suitabilityLow: string;
  suitabilityInsufficient: string;

  // Disclaimers
  footerNote: string;
  ruleBasedNotice: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'JalSarthi',
    tagline: 'Smart Water. Better Crops. Better Farming Decisions.',
    welcomeHeading: 'Welcome to JalSarthi',
    welcomeSubtitle:
      'Your personal smart farming companion. Make better decisions about crops, water, soil, and farm investments.',

    navHome: 'Home',
    navAdvisor: 'Advisory',
    navCalculator: 'Profit & Budget',
    navComparison: 'Compare',
    navHistory: 'Saved Farms',

    btnStartSmartFarming: 'Start Smart Farming',
    btnGetIrrigationAdvice: 'Get Irrigation Advice',
    btnCompareCrops: 'Compare Crops',
    btnCalculateFarmProfit: 'Calculate Farm Profit',
    btnAnalyseFarm: 'ANALYSE MY FARM',
    btnRecalculate: 'Recalculate',
    btnResetForm: 'Reset Form',
    btnSaveAnalysis: 'Save Analysis',
    btnPrintReport: 'Download / Print Report',
    btnSavedHistory: 'Farm History',

    featuresTitle: 'Complete Farming Decision Suite',
    featuresSubtitle: 'Transparent, rule-based agronomic guidance tailored for Indian agriculture without requiring expensive sensors.',
    feature1: 'Smart Crop Recommendations',
    feature2: 'Irrigation Advisor (No Sensors)',
    feature3: 'Crop Growth Predictor',
    feature4: 'Soil Improvement Guide',
    feature5: 'Farm Investment Calculator',
    feature6: 'Profit Estimator',
    feature7: 'Alternative Crop Suggestions',
    feature8: 'Crop Comparison Matrix',
    feature9: 'Water Budget Simulator',
    feature10: 'What-if Profit Simulator',

    formTitle: 'Farm Profile & Conditions',
    formSubtitle: 'Enter your field conditions below. Calculations are transparent and rule-based.',
    requiredBadge: 'Required',
    optionalBadge: 'Optional',
    seasonLabel: 'Current / Planned Season',
    soilTypeLabel: 'Soil Type',
    cropLabel: 'Target Crop',
    stateLabel: 'State',
    districtLabel: 'District',
    landAreaLabel: 'Land Area',
    areaUnitLabel: 'Unit',
    plantingDateLabel: 'Planting / Sowing Date',
    irrigationSourceLabel: 'Primary Irrigation Source',
    waterAvailabilityLabel: 'Water Availability',
    recentRainfallLabel: 'Recent Rainfall (Last 7-10 Days, mm)',
    soilPhLabel: 'Soil pH (If Known, e.g. 6.5)',
    cropVarietyLabel: 'Crop Variety (If Known)',
    expectedPriceLabel: 'Expected Price (₹ / Quintal)',
    expectedYieldLabel: 'Expected Yield (Quintals / Acre)',

    seasonSummer: 'Summer (Zaid)',
    seasonMonsoon: 'Rainy / Monsoon (Kharif)',
    seasonWinter: 'Winter (Rabi)',
    waterLimited: 'Limited (Water Scarcity)',
    waterModerate: 'Moderate (Normal Access)',
    waterSufficient: 'Sufficient (Canal / Reliable Borewell)',
    acre: 'Acre',
    hectare: 'Hectare',

    suitabilityTitle: 'Crop Suitability Evaluation',
    irrigationTitle: 'Smart Irrigation Advisor',
    timelineTitle: 'Crop Growth Timeline & Harvest Window',
    soilGuideTitle: 'Soil Improvement & Health Guide',
    investmentTitle: 'Farm Cultivation Investment Calculator',
    profitTitle: 'Profit & Return on Investment (ROI)',
    whatIfTitle: 'What-If Scenario Simulator',
    waterBudgetTitle: 'Water Budget Simulator',
    alternativesTitle: 'Recommended Alternative Crops',
    comparisonTitle: 'Comparative Crop Matrix',

    suitabilityHigh: 'High Suitability',
    suitabilityModerate: 'Moderate Suitability',
    suitabilityLow: 'Low Suitability',
    suitabilityInsufficient: 'Insufficient Data',

    footerNote: 'JalSarthi — Supporting smarter and more sustainable farming.',
    ruleBasedNotice: 'Note: This tool uses verified agricultural reference manuals (ICAR, UAS, TNAU) and farmer-entered parameters. No hardware sensors required.'
  },
  kn: {
    appName: 'ಜಲಸಾರಥಿ (JalSarthi)',
    tagline: 'ಸ್ಮಾರ್ಟ್ ನೀರು. ಉತ್ತಮ ಬೆಳೆಗಳು. ಉತ್ತಮ ಕೃಷಿ ನಿರ್ಧಾರಗಳು.',
    welcomeHeading: 'ಜಲಸಾರಥಿಗೆ ಸ್ವಾಗತ',
    welcomeSubtitle:
      'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಂಗಾತಿ. ಬೆಳೆ, ನೀರು, ಮಣ್ಣು ಮತ್ತು ಕೃಷಿ ಹೂಡಿಕೆಗಳ ಬಗ್ಗೆ ಉತ್ತಮ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ.',

    navHome: 'ಮುಖಪುಟ',
    navAdvisor: 'ಸಲಹೆಗಳು',
    navCalculator: 'ಲಾಭ & ಆಯವ್ಯಯ',
    navComparison: 'ಹೋಲಿಕೆ',
    navHistory: 'ಉಳಿಸಿದ ಕೃಷಿ ದಾಖಲೆಗಳು',

    btnStartSmartFarming: 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಪ್ರಾರಂಭಿಸಿ',
    btnGetIrrigationAdvice: 'ನೀರಾವರಿ ಸಲಹೆ ಪಡೆಯಿರಿ',
    btnCompareCrops: 'ಬೆಳೆಗಳನ್ನು ಹೋಲಿಸಿ',
    btnCalculateFarmProfit: 'ಕೃಷಿ ಲಾಭ ಲೆಕ್ಕ ಹಾಕಿ',
    btnAnalyseFarm: 'ನನ್ನ ಜಮೀನನ್ನು ವಿಶ್ಲೇಷಿಸಿ',
    btnRecalculate: 'ಮರು ಲೆಕ್ಕಾಚಾರ',
    btnResetForm: 'ಮರುಹೊಂದಿಸಿ',
    btnSaveAnalysis: 'ವಿಶ್ಲೇಷಣೆ ಉಳಿಸಿ',
    btnPrintReport: 'ವರದಿ ಡೌನ್‌ಲೋಡ್ / ಮುದ್ರಿಸಿ',
    btnSavedHistory: 'ಕೃಷಿ ಇತಿಹಾಸ',

    featuresTitle: 'ಸಂಪೂರ್ಣ ಕೃಷಿ ನಿರ್ಧಾರ ವೇದಿಕೆ',
    featuresSubtitle: 'ಭಾರತೀಯ ರೈತರಿಗೆ ಪಾರದರ್ಶಕ ಮತ್ತು ನಿಯಮ-ಆಧಾರಿತ ಕೃಷಿ ಮಾರ್ಗದರ್ಶನ. ಯಾವುದೇ ದುಬಾರಿ ಸಂವೇದಕಗಳ ಅಗತ್ಯವಿಲ್ಲ.',
    feature1: 'ಸ್ಮಾರ್ಟ್ ಬೆಳೆ ಶಿಫಾರಸು',
    feature2: 'ನೀರಾವರಿ ಸಲಹೆಗಾರ (ಸಂವೇದಕಗಳಿಲ್ಲದೆ)',
    feature3: 'ಬೆಳೆ ಬೆಳವಣಿಗೆಯ ಅಂದಾಜು',
    feature4: 'ಮಣ್ಣಿನ ಸುಧಾರಣೆ ಮಾರ್ಗದರ್ಶಿ',
    feature5: 'ಕೃಷಿ ವೆಚ್ಚ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
    feature6: 'ಲಾಭ ಅಂದಾಜುಗಾರ',
    feature7: 'ಪರ್ಯಾಯ ಬೆಳೆಗಳ ಸಲಹೆಗಳು',
    feature8: 'ಬೆಳೆ ಹೋಲಿಕೆ ಕೋಷ್ಟಕ',
    feature9: 'ನೀರಿನ ಆಯವ್ಯಯ ಸಿಮ್ಯುಲೇಟರ್',
    feature10: 'ಲಾಭದ ಸಿಮ್ಯುಲೇಟರ್',

    formTitle: 'ಜಮೀನಿನ ವಿವರ ಮತ್ತು ಪರಿಸ್ಥಿತಿಗಳು',
    formSubtitle: 'ನಿಮ್ಮ ಜಮೀನಿನ ವಿವರಗಳನ್ನು ಕೆಳಗೆ ನಮೂದಿಸಿ. ಎಲ್ಲಾ ಲೆಕ್ಕಾಚಾರಗಳು ಪಾರದರ್ಶಕವಾಗಿವೆ.',
    requiredBadge: 'ಅಗತ್ಯ',
    optionalBadge: 'ಐಚ್ಛಿಕ',
    seasonLabel: 'ಪ್ರಸ್ತುತ / ಯೋಜಿತ ಋತು',
    soilTypeLabel: 'ಮಣ್ಣಿನ ವಿಧ',
    cropLabel: 'ಉದ್ದೇಶಿತ ಬೆಳೆ',
    stateLabel: 'ರಾಜ್ಯ',
    districtLabel: 'ಜಿಲ್ಲೆ',
    landAreaLabel: 'ಭೂಪ್ರದೇಶ ವಿಸ್ತೀರ್ಣ',
    areaUnitLabel: 'ಮಾನಕ',
    plantingDateLabel: 'ಬಿತ್ತನೆ / ನಾಟಿ ದಿನಾಂಕ',
    irrigationSourceLabel: 'ಮುಖ್ಯ ನೀರಾವರಿ ಮೂಲ',
    waterAvailabilityLabel: 'ನೀರಿನ ಲಭ್ಯತೆ',
    recentRainfallLabel: 'ಇತ್ತೀಚಿನ ಮಳೆ (ಕಳೆದ 7-10 ದಿನಗಳು, ಮಿಮೀ)',
    soilPhLabel: 'ಮಣ್ಣಿನ ಪಿ.ಹೆಚ್ (ತಿಳಿದಿದ್ದರೆ, ಉದಾ 6.5)',
    cropVarietyLabel: 'ಬೆಳೆಯ ತಳಿ (ತಿಳಿದಿದ್ದರೆ)',
    expectedPriceLabel: 'ನಿರೀಕ್ಷಿತ ಬೆಲೆ (₹ / ಕ್ವಿಂಟಾಲ್‌ಗೆ)',
    expectedYieldLabel: 'ನಿರೀಕ್ಷಿತ ಇಳುವರಿ (ಕ್ವಿಂಟಾಲ್ / ಎಕರೆಗೆ)',

    seasonSummer: 'ಬೇಸಿಗೆ (Zaid)',
    seasonMonsoon: 'ಮುಂಗಾರು (Kharif)',
    seasonWinter: 'ಹಿಂಗಾರು (Rabi)',
    waterLimited: 'ಸೀಮಿತ (ನೀರಿನ ಕೊರತೆ)',
    waterModerate: 'ಸಾಧಾರಣ (ಸಾಮಾನ್ಯ)',
    waterSufficient: 'ಸಾಕಷ್ಟು (ಕಾಲುವೆ / ಕೊಳವೆ ಬಾವಿ)',
    acre: 'ಎಕರೆ',
    hectare: 'ಹೆಕ್ಟೇರ್',

    suitabilityTitle: 'ಬೆಳೆ ಹೊಂದಾಣಿಕೆ ಮೌಲ್ಯಮಾಪನ',
    irrigationTitle: 'ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ ಸಲಹೆಗಾರ',
    timelineTitle: 'ಬೆಳೆ ಬೆಳವಣಿಗೆಯ ಹಂತಗಳು ಮತ್ತು ಕೊಯ್ಲು ದಿನಾಂಕ',
    soilGuideTitle: 'ಮಣ್ಣಿನ ಸುಧಾರಣೆ ಮತ್ತು ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶಿ',
    investmentTitle: 'ಕೃಷಿ ವೆಚ್ಚ ಲೆಕ್ಕಾಚಾರ',
    profitTitle: 'ಲಾಭ ಮತ್ತು ಹೂಡಿಕೆಯ ಮೇಲಿನ ಆದಾಯ (ROI)',
    whatIfTitle: 'ಲಾಭದ ಸಿಮ್ಯುಲೇಶನ್',
    waterBudgetTitle: 'ನೀರಿನ ಬಜೆಟ್ ಸಿಮ್ಯುಲೇಟರ್',
    alternativesTitle: 'ಶಿಫಾರಸು ಮಾಡಿದ ಪರ್ಯಾಯ ಬೆಳೆಗಳು',
    comparisonTitle: 'ಬೆಳೆಗಳ ಹೋಲಿಕೆ ಕೋಷ್ಟಕ',

    suitabilityHigh: 'ಹೆಚ್ಚಿನ ಹೊಂದಾಣಿಕೆ',
    suitabilityModerate: 'ಮಧ್ಯಮ ಹೊಂದಾಣಿಕೆ',
    suitabilityLow: 'ಕಡಿಮೆ ಹೊಂದಾಣಿಕೆ',
    suitabilityInsufficient: 'ಮಾಹಿತಿ ಅಲಭ್ಯ',

    footerNote: 'ಜಲಸಾರಥಿ — ಬುದ್ಧಿವಂತ ಮತ್ತು ಸುಸ್ಥಿರ ಕೃಷಿಗೆ ನಿಮ್ಮ ಆಪ್ತ ಮಿತ್ರ.',
    ruleBasedNotice: 'ಗಮನಿಸಿ: ಈ ಸಾಧನವು ಪರಿಶೀಲಿಸಿದ ಕೃಷಿ ಮಾರ್ಗದರ್ಶಿಗಳು (ICAR, UAS) ಮತ್ತು ರೈತರು ನಮೂದಿಸಿದ ವಿವರಗಳನ್ನು ಆಧರಿಸಿದೆ. ಯಾವುದೇ ಸೆನ್ಸರ್‌ಗಳ ಅಗತ್ಯವಿಲ್ಲ.'
  }
};
