import React from 'react';
import {
  Printer,
  Download,
  X,
  Sprout,
  Droplets,
  Calendar,
  Layers,
  Receipt,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Award
} from 'lucide-react';
import {
  FarmInputs,
  RecommendationResult,
  IrrigationAdvice,
  AlternativeCropRecommendation,
  InvestmentCalculation,
  ProfitEstimation,
  WaterBudgetResult
} from '../types';
import { calculateGrowthTimeline } from '../engine/growthTimeline';
import { getSoilGuide } from '../engine/soilGuide';
import { Language, TRANSLATIONS } from '../data/translations';

interface FarmReportModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  inputs: FarmInputs;
  recommendation: RecommendationResult;
  irrigationAdvice: IrrigationAdvice;
  alternatives: AlternativeCropRecommendation[];
  investment: InvestmentCalculation;
  profit: ProfitEstimation;
  waterBudget: WaterBudgetResult;
  onSaveAnalysis: () => void;
  onOpenComparison: () => void;
  onEditInputs: () => void;
}

export const FarmReportModal: React.FC<FarmReportModalProps> = ({
  language,
  isOpen,
  onClose,
  inputs,
  recommendation,
  irrigationAdvice,
  alternatives,
  investment,
  profit,
  waterBudget,
  onSaveAnalysis,
  onOpenComparison,
  onEditInputs
}) => {
  const t = TRANSLATIONS[language];
  const { crop, suitabilityCategory, suitabilityScore, reasons, limitations, practicalImprovements } = recommendation;
  const timeline = calculateGrowthTimeline(crop, inputs.plantingDate);
  const soilGuide = getSoilGuide(inputs.soilType, crop, inputs.soilPh);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Top Control Bar (Hidden in Print) */}
        <div className="no-print bg-slate-900 p-4 px-6 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm sm:text-base">
              JalSarthi Comprehensive Farm Advisory Dossier
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-fresh-600 font-bold">
              Ready to Export
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-brand hover:bg-forest-dark text-white text-xs font-bold transition shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              type="button"
              onClick={onSaveAnalysis}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Record</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenComparison();
              }}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20"
            >
              Compare
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onEditInputs();
              }}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20"
            >
              Edit Inputs
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Content */}
        <div className="p-6 sm:p-10 max-h-[85vh] overflow-y-auto space-y-8 bg-white text-slate-900 print:max-h-none print:overflow-visible print:p-0">
          {/* Letterhead */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-forest-brand gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-2xl bg-forest-brand flex items-center justify-center text-white font-black text-2xl shadow-sm">
                🌱
              </div>
              <div>
                <h1 className="text-3xl font-black text-forest-brand tracking-tight">
                  Jal<span className="text-fresh-600">Sarthi</span>
                </h1>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Smart Water • Better Crops • Better Farming Decisions
                </p>
                <p className="text-xs text-slate-400">
                  Government & University Extension Reference Framework
                </p>
              </div>
            </div>

            <div className="text-right text-xs text-slate-600">
              <div className="font-bold text-slate-900">Official Farmer Decision Record</div>
              <div>Generated: {currentDate}</div>
              <div>Location: {inputs.district || 'District Not Specified'}, {inputs.state || 'Karnataka'}</div>
            </div>
          </div>

          {/* 1. Farm Profile Summary */}
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-forest-brand mb-3 flex items-center gap-1.5 border-b pb-1">
              <Sprout className="w-4 h-4" />
              <span>1. Farm & Agro-Climatic Profile</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold">Target Crop</span>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5">{crop.name}</div>
                <div className="text-[11px] text-slate-500">{crop.scientificName}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold">Season & Soil</span>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5">{inputs.season}</div>
                <div className="text-[11px] text-slate-500">{inputs.soilType} Soil</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold">Land Extent</span>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5">{inputs.landArea} {inputs.areaUnit}</div>
                <div className="text-[11px] text-slate-500">({investment.landAreaInAcres} Acres)</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold">Water Access</span>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5 capitalize">{inputs.waterAvailability || 'Moderate'}</div>
                <div className="text-[11px] text-slate-500 capitalize">{inputs.irrigationSource || 'Borewell'}</div>
              </div>
            </div>
          </div>

          {/* 2. Crop Suitability Analysis */}
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-forest-brand mb-3 flex items-center gap-1.5 border-b pb-1">
              <Award className="w-4 h-4" />
              <span>2. Crop Suitability Evaluation</span>
            </h2>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500">Suitability Status:</span>
                  <span className="ml-2 px-3 py-1 rounded-lg text-xs font-extrabold bg-emerald-100 text-forest-brand border border-emerald-300">
                    {suitabilityCategory} ({suitabilityScore}/100 points)
                  </span>
                </div>
                <span className="text-xs text-slate-500">Maturity: {crop.maturityDurationDays[0]}-{crop.maturityDurationDays[1]} Days</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-forest-brand mb-1">Key Agronomic Drivers:</h4>
                  <ul className="space-y-1 text-slate-700">
                    {reasons.slice(0, 3).map((r, i) => (
                      <li key={i}>• {r}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-amber-900 mb-1">Recommended Adjustments:</h4>
                  <ul className="space-y-1 text-slate-700">
                    {practicalImprovements.slice(0, 3).map((imp, i) => (
                      <li key={i}>✓ {imp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Irrigation Advice & Water Budget */}
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-forest-brand mb-3 flex items-center gap-1.5 border-b pb-1">
              <Droplets className="w-4 h-4" />
              <span>3. Smart Irrigation & Stored Water Feasibility</span>
            </h2>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <p className="text-slate-800 leading-relaxed font-medium">
                {irrigationAdvice.generalWateringNeeds}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-slate-400 font-bold">Crop Requirement:</span>
                  <div className="font-extrabold text-slate-800">{crop.waterRequirementMm[0]}-{crop.waterRequirementMm[1]} mm</div>
                </div>
                <div>
                  <span className="text-slate-400 font-bold">Irrigation Methods:</span>
                  <div className="font-extrabold text-slate-800">{crop.recommendedIrrigationMethods.join(', ')}</div>
                </div>
                <div>
                  <span className="text-slate-400 font-bold">Water Budget Status:</span>
                  <div className="font-extrabold text-slate-800">{waterBudget.status} ({waterBudget.deficitOrSurplusMm} mm)</div>
                </div>
                <div>
                  <span className="text-slate-400 font-bold">Water Available / Acre:</span>
                  <div className="font-extrabold text-slate-800">{waterBudget.waterPerAcreCubicMetres} m³</div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Growth Timeline */}
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-forest-brand mb-3 flex items-center gap-1.5 border-b pb-1">
              <Calendar className="w-4 h-4" />
              <span>4. Growth Timeline & Harvest Window</span>
            </h2>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="font-bold text-slate-900 mb-2">
                Estimated Harvest Period: <span className="text-forest-brand">{timeline.estimatedHarvestRange}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {timeline.stages.slice(0, 4).map((st) => (
                  <div key={st.stageNumber} className="p-2 rounded bg-white border border-slate-200">
                    <div className="font-bold text-slate-800 truncate">{st.stageNumber}. {st.name}</div>
                    <div className="text-[11px] text-slate-500">Days {st.startDay}-{st.endDay}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Cultivation Expenses & Profit Breakdown */}
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-forest-brand mb-3 flex items-center gap-1.5 border-b pb-1">
              <Receipt className="w-4 h-4" />
              <span>5. Financial Investment & Return Estimates</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold">Total Expenses</span>
                <div className="font-extrabold text-slate-900 text-base mt-0.5">
                  ₹{investment.totalExpenses.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-slate-500">₹{investment.costPerAcre.toLocaleString('en-IN')}/acre</div>
              </div>
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
                <span className="text-sky-800 font-bold">Gross Revenue</span>
                <div className="font-extrabold text-sky-950 text-base mt-0.5">
                  ₹{profit.grossRevenue.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-sky-700">{profit.totalYieldQuintals} Qtl Yield</div>
              </div>
              <div className={`p-3 rounded-xl border ${profit.isProfit ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                <span className={`font-bold ${profit.isProfit ? 'text-forest-brand' : 'text-rose-700'}`}>
                  Estimated Net Return
                </span>
                <div className={`font-black text-base mt-0.5 ${profit.isProfit ? 'text-forest-dark' : 'text-rose-900'}`}>
                  {profit.isProfit ? '+' : ''}₹{profit.netReturn.toLocaleString('en-IN')}
                </div>
                <div className={`text-[11px] ${profit.isProfit ? 'text-forest-700' : 'text-rose-700'}`}>
                  ROI: {profit.roiPercentage}%
                </div>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-amber-800 font-bold">Break-Even Price</span>
                <div className="font-extrabold text-amber-950 text-base mt-0.5">
                  ₹{profit.breakEvenPricePerQuintal.toLocaleString('en-IN')}/Qtl
                </div>
                <div className="text-[11px] text-amber-700">Cost Recovery Rate</div>
              </div>
            </div>
          </div>

          {/* 6. Alternative Crops */}
          {alternatives.length > 0 && (
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-forest-brand mb-3 flex items-center gap-1.5 border-b pb-1">
                <TrendingUp className="w-4 h-4" />
                <span>6. Recommended Crop Alternatives</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {alternatives.map((alt) => (
                  <div key={alt.crop.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-extrabold text-slate-900 text-sm">{alt.crop.name}</div>
                    <div className="text-[11px] text-slate-500">{alt.maturityRange} • {alt.crop.waterRequirementMm[0]}-{alt.crop.waterRequirementMm[1]} mm water</div>
                    <p className="text-[11px] text-slate-700 mt-1 font-medium">{alt.keyDifferencesFromSelected}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimers & Official Citations */}
          <div className="pt-6 border-t-2 border-slate-200 text-xs text-slate-500 space-y-2">
            <div className="flex items-center gap-1 font-bold text-slate-700">
              <BookOpen className="w-4 h-4 text-forest-brand" />
              <span>Verified Agricultural Research Citations:</span>
            </div>
            <p>
              ICAR (Indian Council of Agricultural Research), State Agricultural Universities (UAS Bengaluru, Dharwad, TNAU), and Krishi Vigyan Kendras (KVK).
            </p>
            <div className="p-3 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-[11px]">
              <strong>Standard Agricultural Disclaimer:</strong> JalSarthi provides software-only decision support based on farmer-entered information and verified extension packages of practices. Actual crop performance depends on unpredictable field microclimates, weather extremes, pest infestations, and open market price dynamics. Always cross-verify critical input decisions with your local Village Agricultural Assistant or KVK specialist.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
