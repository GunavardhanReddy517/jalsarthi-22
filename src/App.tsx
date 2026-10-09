import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureGrid } from './components/FeatureGrid';
import { FarmInputForm } from './components/FarmInputForm';
import { RecommendationCard } from './components/RecommendationCard';
import { IrrigationAdvisorCard } from './components/IrrigationAdvisorCard';
import { WaterBudgetSimulatorCard } from './components/WaterBudgetSimulatorCard';
import { AlternativeCropsCard } from './components/AlternativeCropsCard';
import { CropTimelineCard } from './components/CropTimelineCard';
import { SoilImprovementGuideCard } from './components/SoilImprovementGuideCard';
import { InvestmentCalculatorCard } from './components/InvestmentCalculatorCard';
import { ProfitEstimatorCard } from './components/ProfitEstimatorCard';
import { WhatIfSimulatorCard } from './components/WhatIfSimulatorCard';
import { CropComparisonModal } from './components/CropComparisonModal';
import { FarmReportModal } from './components/FarmReportModal';
import { SavedHistoryDrawer } from './components/SavedHistoryDrawer';
import { Footer } from './components/Footer';

import {
  FarmInputs,
  ExpenseBreakdown,
  SavedAnalysis,
  CropData
} from './types';
import { CROPS_DATABASE } from './data/crops';
import { Language, TRANSLATIONS } from './data/translations';
import { evaluateCropSuitability, getAlternativeCrops } from './engine/cropRecommendation';
import { generateIrrigationAdvice } from './engine/irrigationAdvisor';
import { calculateWaterBudget } from './engine/waterBudget';
import {
  calculateInvestment,
  calculateProfit,
  DEFAULT_EXPENSES
} from './engine/financialCalculations';
import { Check, Bookmark, Printer, GitCompare } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'jalsarthi_saved_farms_v1';
const LANG_STORAGE_KEY = 'jalsarthi_language_v1';

export const App: React.FC = () => {
  // Language State
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem(LANG_STORAGE_KEY);
      if (savedLang === 'en' || savedLang === 'kn') return savedLang;
    } catch {
      // ignore
    }
    return 'en';
  });

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const t = TRANSLATIONS[language];

  // Farm Inputs State with Realistic Defaults
  const [farmInputs, setFarmInputs] = useState<FarmInputs>(() => {
    const defaultCrop = CROPS_DATABASE[0]; // Tomato
    return {
      season: 'Rainy / Monsoon',
      soilType: 'Sandy Loam',
      cropId: defaultCrop.id,
      state: 'Karnataka',
      district: 'Mandya',
      landArea: 2.0,
      areaUnit: 'acre',
      plantingDate: new Date().toISOString().split('T')[0],
      irrigationSource: 'borewell',
      waterAvailability: 'moderate',
      recentRainfallMm: 20,
      soilPh: 6.8,
      cropVariety: 'Arka Rakshak',
      expectedSellingPrice: 1600,
      expectedYield: 180
    };
  });

  // Expenses State
  const [expenses, setExpenses] = useState<ExpenseBreakdown>(DEFAULT_EXPENSES);

  // Modals & Drawers
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Saved Analyses in LocalStorage
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>(() => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved farms from LocalStorage:', e);
    }
    return [];
  });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedAnalyses));
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
  }, [savedAnalyses]);

  // Derived Evaluations
  const currentCrop = useMemo<CropData>(() => {
    return CROPS_DATABASE.find((c) => c.id === farmInputs.cropId) || CROPS_DATABASE[0];
  }, [farmInputs.cropId]);

  const recommendation = useMemo(() => {
    return evaluateCropSuitability(currentCrop, farmInputs);
  }, [currentCrop, farmInputs]);

  const irrigationAdvice = useMemo(() => {
    return generateIrrigationAdvice(currentCrop, farmInputs);
  }, [currentCrop, farmInputs]);

  const alternatives = useMemo(() => {
    return getAlternativeCrops(farmInputs.cropId, farmInputs);
  }, [farmInputs.cropId, farmInputs]);

  const investment = useMemo(() => {
    return calculateInvestment(expenses, farmInputs.landArea, farmInputs.areaUnit);
  }, [expenses, farmInputs.landArea, farmInputs.areaUnit]);

  const profit = useMemo(() => {
    return calculateProfit(
      farmInputs.landArea,
      farmInputs.areaUnit,
      farmInputs.expectedYield || 0,
      farmInputs.expectedSellingPrice || 0,
      investment.totalExpenses
    );
  }, [farmInputs.landArea, farmInputs.areaUnit, farmInputs.expectedYield, farmInputs.expectedSellingPrice, investment.totalExpenses]);

  const waterBudget = useMemo(() => {
    return calculateWaterBudget(currentCrop, 150000, 'litres', farmInputs.landArea, farmInputs.areaUnit, 30);
  }, [currentCrop, farmInputs.landArea, farmInputs.areaUnit]);

  // Handlers
  const handleAnalyse = (newInputs: FarmInputs) => {
    setFarmInputs(newInputs);
    // Smooth scroll down to recommendation results
    const target = document.getElementById('crop-recommendation');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleReset = () => {
    const defaultCrop = CROPS_DATABASE[0];
    setFarmInputs({
      season: 'Rainy / Monsoon',
      soilType: 'Loamy',
      cropId: defaultCrop.id,
      state: 'Karnataka',
      district: '',
      landArea: 1.0,
      areaUnit: 'acre',
      waterAvailability: 'moderate',
      irrigationSource: 'borewell',
      expectedSellingPrice: 1500,
      expectedYield: 180
    });
    setExpenses(DEFAULT_EXPENSES);
  };

  const handleSaveAnalysis = () => {
    const newEntry: SavedAnalysis = {
      id: `farm_${Date.now()}`,
      timestamp: new Date().toISOString(),
      name: `${currentCrop.name} (${farmInputs.landArea} ${farmInputs.areaUnit}) - ${farmInputs.district || 'Farm'}`,
      inputs: farmInputs,
      expenses,
      recommendation,
      profit
    };

    setSavedAnalyses((prev) => [newEntry, ...prev.slice(0, 19)]); // keep recent 20
    setSaveSuccessMessage('Farm analysis saved successfully to local history!');
    setTimeout(() => setSaveSuccessMessage(null), 4000);
  };

  const handleLoadAnalysis = (analysis: SavedAnalysis) => {
    setFarmInputs(analysis.inputs);
    setExpenses(analysis.expenses);
    setSaveSuccessMessage(`Restored saved profile: ${analysis.name}`);
    setTimeout(() => setSaveSuccessMessage(null), 4000);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleDeleteAnalysis = (id: string) => {
    setSavedAnalyses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleClearAllHistory = () => {
    if (window.confirm('Are you sure you want to delete all saved farm records?')) {
      setSavedAnalyses([]);
    }
  };

  const handleSwitchCrop = (cropId: string) => {
    const selectedCrop = CROPS_DATABASE.find((c) => c.id === cropId);
    if (selectedCrop) {
      const avgYield = Math.round(
        (selectedCrop.typicalYieldRangePerAcre[0] + selectedCrop.typicalYieldRangePerAcre[1]) / 2
      );
      const avgPrice = Math.round(
        (selectedCrop.typicalPricePerQuintal[0] + selectedCrop.typicalPricePerQuintal[1]) / 2
      );
      const avgCost = Math.round(
        (selectedCrop.typicalCostPerAcre[0] + selectedCrop.typicalCostPerAcre[1]) / 2
      );

      setFarmInputs((prev) => ({
        ...prev,
        cropId,
        expectedYield: avgYield,
        expectedSellingPrice: avgPrice
      }));

      // Adjust expenses proportionally
      const scale = avgCost / (investment.costPerAcre || avgCost);
      if (scale > 0 && isFinite(scale)) {
        setExpenses((prev) => ({
          landPreparation: Math.round(prev.landPreparation * scale),
          seeds: Math.round(prev.seeds * scale),
          fertilizers: Math.round(prev.fertilizers * scale),
          labour: Math.round(prev.labour * scale),
          irrigation: Math.round(prev.irrigation * scale),
          cropProtection: Math.round(prev.cropProtection * scale),
          harvesting: Math.round(prev.harvesting * scale),
          transportation: Math.round(prev.transportation * scale),
          otherExpenses: Math.round(prev.otherExpenses * scale)
        }));
      }

      window.scrollTo({ top: 500, behavior: 'smooth' });
    }
  };

  const handleFeatureNavigate = (featureId: string) => {
    const map: Record<string, string> = {
      recommendation: 'crop-recommendation',
      irrigation: 'irrigation-advisor',
      timeline: 'crop-timeline',
      soil: 'soil-guide',
      investment: 'investment-calculator',
      profit: 'profit-estimator',
      alternatives: 'alternative-crops',
      waterbudget: 'water-budget',
      whatif: 'whatif-simulator'
    };

    if (featureId === 'comparison') {
      setIsComparisonOpen(true);
      return;
    }

    const targetId = map[featureId];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navbar */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        savedFarmsCount={savedAnalyses.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenComparison={() => setIsComparisonOpen(true)}
      />

      {/* Floating Save Toast Notification */}
      {saveSuccessMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-forest-brand text-white shadow-2xl flex items-center gap-2 text-sm font-bold border border-emerald-400 animate-bounce no-print">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{saveSuccessMessage}</span>
        </div>
      )}

      {/* Hero Section */}
      <Hero
        language={language}
        onStartFarming={() => {
          document.getElementById('farm-form')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onGetIrrigationAdvice={() => {
          document.getElementById('irrigation-advisor')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onCompareCrops={() => setIsComparisonOpen(true)}
        onCalculateProfit={() => {
          document.getElementById('profit-estimator')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 10 Feature Modules Grid */}
      <FeatureGrid language={language} onSelectFeature={handleFeatureNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Farm Input Form */}
        <FarmInputForm
          language={language}
          initialInputs={farmInputs}
          onAnalyse={handleAnalyse}
          onReset={handleReset}
        />

        {/* Action Bar for Report & Quick Utilities */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 px-6 rounded-2xl bg-white border border-slate-200 shadow-sm no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-fresh-600 animate-ping" />
            <span className="text-xs sm:text-sm font-bold text-slate-700">
              Active Evaluation: {currentCrop.name} ({farmInputs.landArea} {farmInputs.areaUnit})
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <button
              type="button"
              onClick={handleSaveAnalysis}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition border border-slate-200"
            >
              <Bookmark className="w-3.5 h-3.5 text-forest-brand" />
              <span>{t.btnSaveAnalysis}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsComparisonOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition border border-slate-200"
            >
              <GitCompare className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.btnCompareCrops}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsReportOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-brand hover:bg-forest-dark text-white text-xs font-extrabold transition shadow-md shadow-emerald-900/10"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-300" />
              <span>{t.btnPrintReport}</span>
            </button>
          </div>
        </div>

        {/* 1. Crop Suitability Recommendation Card */}
        <RecommendationCard
          language={language}
          recommendation={recommendation}
        />

        {/* 2. Smart Irrigation Advisor Card */}
        <IrrigationAdvisorCard
          language={language}
          crop={currentCrop}
          soilType={farmInputs.soilType}
          advice={irrigationAdvice}
        />

        {/* 3. Water Budget Simulator Card */}
        <WaterBudgetSimulatorCard
          language={language}
          crop={currentCrop}
          landArea={farmInputs.landArea}
          areaUnit={farmInputs.areaUnit}
        />

        {/* 4. Alternative Crops Suggestions */}
        <AlternativeCropsCard
          language={language}
          alternatives={alternatives}
          onSelectAlternative={handleSwitchCrop}
        />

        {/* 5. Crop Growth Phenology Timeline */}
        <CropTimelineCard
          language={language}
          crop={currentCrop}
          plantingDate={farmInputs.plantingDate}
        />

        {/* 6. Soil Improvement Guide */}
        <SoilImprovementGuideCard
          language={language}
          soilType={farmInputs.soilType}
          crop={currentCrop}
          soilPh={farmInputs.soilPh}
        />

        {/* 7. Cultivation Investment Calculator */}
        <InvestmentCalculatorCard
          language={language}
          expenses={expenses}
          landArea={farmInputs.landArea}
          areaUnit={farmInputs.areaUnit}
          onExpensesChange={setExpenses}
        />

        {/* 8. Profit & ROI Estimator */}
        <ProfitEstimatorCard
          language={language}
          profit={profit}
          cropName={currentCrop.name}
        />

        {/* 9. What-If Profit Scenario Simulator */}
        <WhatIfSimulatorCard
          language={language}
          baseProfit={profit}
          cropName={currentCrop.name}
        />
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Modals & Slide-out Drawers */}
      <CropComparisonModal
        language={language}
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        selectedCrop={currentCrop}
        alternatives={alternatives}
        farmInputs={farmInputs}
        onSelectCropToAnalyse={handleSwitchCrop}
      />

      <FarmReportModal
        language={language}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        inputs={farmInputs}
        recommendation={recommendation}
        irrigationAdvice={irrigationAdvice}
        alternatives={alternatives}
        investment={investment}
        profit={profit}
        waterBudget={waterBudget}
        onSaveAnalysis={handleSaveAnalysis}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onEditInputs={() => {
          document.getElementById('farm-form')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <SavedHistoryDrawer
        language={language}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedAnalyses={savedAnalyses}
        onLoadAnalysis={handleLoadAnalysis}
        onDeleteAnalysis={handleDeleteAnalysis}
        onClearAll={handleClearAllHistory}
      />
    </div>
  );
};

export default App;
