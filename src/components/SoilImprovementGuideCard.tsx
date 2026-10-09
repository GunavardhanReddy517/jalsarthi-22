import React from 'react';
import { Layers, TestTube, Recycle, Sprout, CheckSquare, Sparkles, AlertCircle } from 'lucide-react';
import { SoilType, CropData } from '../types';
import { getSoilGuide } from '../engine/soilGuide';
import { Language, TRANSLATIONS } from '../data/translations';

interface SoilImprovementGuideCardProps {
  language: Language;
  soilType: SoilType;
  crop?: CropData;
  soilPh?: number;
}

export const SoilImprovementGuideCard: React.FC<SoilImprovementGuideCardProps> = ({
  language,
  soilType,
  crop,
  soilPh
}) => {
  const t = TRANSLATIONS[language];
  const guide = getSoilGuide(soilType, crop, soilPh);

  return (
    <div id="soil-guide" className="bg-white rounded-3xl shadow-lg border border-slate-200/80 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
          <Layers className="w-3.5 h-3.5 text-amber-700" />
          <span>Soil Health & Fertility Regeneration</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {t.soilGuideTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Science-backed management practices tailored for <strong className="text-slate-800">{soilType}</strong> soil.
        </p>
      </div>

      {/* pH Correction Card if pH entered */}
      {guide.phAnalysis && (
        <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <TestTube className="w-5 h-5 text-purple-700" />
              <h3 className="font-extrabold text-purple-950 text-base">
                Soil Reaction Analysis: pH {guide.phAnalysis.enteredPh} ({guide.phAnalysis.status})
              </h3>
            </div>
            <span
              className={`px-3 py-1 rounded-xl text-xs font-bold border ${
                guide.phAnalysis.status === 'Neutral / Optimal'
                  ? 'bg-emerald-100 text-forest-brand border-emerald-300'
                  : 'bg-purple-100 text-purple-900 border-purple-300'
              }`}
            >
              {guide.phAnalysis.status}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-purple-900 leading-relaxed font-medium">
            {guide.phAnalysis.cropCompatibility}
          </p>

          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-800 mb-1.5">
              Recommended pH Amendment Protocol:
            </h4>
            <ul className="space-y-1 text-xs text-purple-950">
              {guide.phAnalysis.correctionPractices.map((practice, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>{practice}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Soil Characteristics & Drainage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Physical Profile & Soil Tilth
          </h3>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            {guide.characteristics}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Drainage & Retention Dynamics
          </h3>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            {guide.drainageAndRetention}
          </p>
        </div>
      </div>

      {/* Organic Matter, Mulching, and Crop Rotation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Organic Matter */}
        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-fresh-600" />
            <h4 className="font-extrabold text-forest-brand text-xs uppercase tracking-wider">
              Compost & Organic Carbon
            </h4>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {guide.organicMatterRecommendations.map((om, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-fresh-600 font-bold">•</span>
                <span>{om}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mulching */}
        <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-amber-700" />
            <h4 className="font-extrabold text-amber-900 text-xs uppercase tracking-wider">
              Moisture-Conserving Mulching
            </h4>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {guide.mulchingAdvice}
          </p>
        </div>

        {/* Crop Rotation */}
        <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200">
          <div className="flex items-center gap-2 mb-3">
            <Recycle className="w-4 h-4 text-teal-700" />
            <h4 className="font-extrabold text-teal-950 text-xs uppercase tracking-wider">
              Beneficial Crop Rotations
            </h4>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {guide.cropRotationSuggestions.map((rot, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-teal-600 font-bold">•</span>
                <span>{rot}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* General Nutrient Management (INM) & Soil Testing Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* INM */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <Sprout className="w-4 h-4 text-forest-brand" />
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
              Integrated Nutrient Management (INM) Principles
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {guide.generalNutrientManagement.map((inm, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-forest-brand font-bold">✓</span>
                <span>{inm}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Testing Checklist */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <CheckSquare className="w-4 h-4 text-blue-600" />
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
              Soil Health Card (SHC) Checklist
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {guide.soilTestingChecklist.map((chk, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-blue-600 font-bold">□</span>
                <span>{chk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cautious disclaimer against chemical dosage without lab test */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 italic flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
        <span>Agricultural Safety Notice: Precise fertilizer and chemical amendment quantities must never be applied blindly without a verified Soil Health Card test from your nearest KVK or government laboratory.</span>
      </div>
    </div>
  );
};
