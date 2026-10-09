import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  BookOpen,
  Info,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles
} from 'lucide-react';
import { RecommendationResult } from '../types';
import { Language, TRANSLATIONS } from '../data/translations';

interface RecommendationCardProps {
  language: Language;
  recommendation: RecommendationResult;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  language,
  recommendation
}) => {
  const t = TRANSLATIONS[language];
  const [showScoringDetails, setShowScoringDetails] = useState(false);
  const { crop, suitabilityCategory, suitabilityScore, scoreBreakdown, reasons, limitations, practicalImprovements, missingInformation, sources } = recommendation;

  const getBadgeStyle = () => {
    switch (suitabilityCategory) {
      case 'High':
        return 'bg-emerald-100 text-forest-brand border-emerald-300';
      case 'Moderate':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Low':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getScoreColor = () => {
    if (suitabilityScore >= 80) return 'text-forest-brand';
    if (suitabilityScore >= 55) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getProgressBarBg = () => {
    if (suitabilityScore >= 80) return 'bg-fresh-600';
    if (suitabilityScore >= 55) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div id="crop-recommendation" className="bg-white rounded-3xl shadow-lg border border-slate-200/80 overflow-hidden">
      {/* Top Banner with Crop Header */}
      <div className="relative">
        <div className="h-44 sm:h-52 w-full overflow-hidden relative">
          <img
            src={crop.image}
            alt={crop.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
              {crop.category} • {crop.scientificName}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
              {language === 'kn' ? crop.kannadaName : crop.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 line-clamp-1 max-w-xl">
              {crop.description}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className={`px-4 py-1.5 rounded-2xl border font-bold text-sm shadow-md flex items-center gap-1.5 ${getBadgeStyle()}`}>
              <Award className="w-4 h-4" />
              <span>
                {suitabilityCategory === 'High'
                  ? t.suitabilityHigh
                  : suitabilityCategory === 'Moderate'
                  ? t.suitabilityModerate
                  : suitabilityCategory === 'Low'
                  ? t.suitabilityLow
                  : t.suitabilityInsufficient}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Score Progress Bar & Rules */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Rule-Based Suitability Index
              </span>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-extrabold ${getScoreColor()}`}>
                  {suitabilityScore}
                </span>
                <span className="text-sm font-bold text-slate-400">/ 100 points</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowScoringDetails(!showScoringDetails)}
              className="flex items-center gap-1 text-xs font-bold text-forest-brand hover:text-forest-dark bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm"
            >
              <span>{showScoringDetails ? 'Hide Weights' : 'Scoring Breakdown'}</span>
              {showScoringDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Bar */}
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-700 ${getProgressBarBg()}`}
              style={{ width: `${Math.min(100, Math.max(5, suitabilityScore))}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-slate-500 italic">
            * Transparency note: This score reflects agronomic compatibility based on university extension manuals. It is never a guaranteed prediction of yield or commercial success.
          </p>

          {/* Collapsible Weights Breakdown */}
          {showScoringDetails && (
            <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <div className="font-semibold text-slate-500">Season Match</div>
                <div className="font-extrabold text-slate-800 text-sm mt-0.5">
                  {scoreBreakdown.seasonScore} <span className="text-slate-400 font-normal">/ 30</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <div className="font-semibold text-slate-500">Soil Fit</div>
                <div className="font-extrabold text-slate-800 text-sm mt-0.5">
                  {scoreBreakdown.soilScore} <span className="text-slate-400 font-normal">/ 25</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <div className="font-semibold text-slate-500">Water Supply</div>
                <div className="font-extrabold text-slate-800 text-sm mt-0.5">
                  {scoreBreakdown.waterScore} <span className="text-slate-400 font-normal">/ 25</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <div className="font-semibold text-slate-500">Drainage</div>
                <div className="font-extrabold text-slate-800 text-sm mt-0.5">
                  {scoreBreakdown.drainageScore} <span className="text-slate-400 font-normal">/ 10</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <div className="font-semibold text-slate-500">pH / Location</div>
                <div className="font-extrabold text-slate-800 text-sm mt-0.5">
                  {scoreBreakdown.phOrRegionalScore} <span className="text-slate-400 font-normal">/ 10</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4 Detail Grid: Reasons, Limitations, Improvements, Missing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Reasons */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-fresh-600" />
              <h3 className="font-bold text-forest-brand text-sm">
                Positive Agronomic Matches
              </h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-fresh-600 font-bold">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations */}
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-amber-900 text-sm">
                Identified Field Limitations & Constraints
              </h3>
            </div>
            {limitations.length > 0 ? (
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {limitations.map((l, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs sm:text-sm text-slate-600">
                No acute agronomic limitations detected for this crop under current inputs.
              </p>
            )}
          </div>

          {/* Practical Improvements */}
          <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-aqua-600" />
              <h3 className="font-bold text-blue-900 text-sm">
                Practical Field Improvements
              </h3>
            </div>
            {practicalImprovements.length > 0 ? (
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {practicalImprovements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-aqua-600 font-bold">✓</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs sm:text-sm text-slate-600">
                Maintain standard package of practices as recommended by your state agricultural university.
              </p>
            )}
          </div>

          {/* Missing Information / Alerts */}
          <div className="p-5 rounded-2xl bg-slate-100/70 border border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <h3 className="font-bold text-slate-700 text-sm">
                Missing Information Warnings
              </h3>
            </div>
            {missingInformation.length > 0 ? (
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                {missingInformation.map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-slate-400 font-bold">!</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs sm:text-sm text-slate-600">
                All major parameters entered. Recommended to confirm via physical Soil Health Card.
              </p>
            )}
          </div>
        </div>

        {/* Source References */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-forest-700 flex-shrink-0" />
            <span className="font-semibold text-slate-700">Verified Agronomic Sources:</span>
            <span>
              {sources.map((s) => `${s.organization} (${s.publication}, ${s.year})`).join(' • ')}
            </span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 italic">
            <Info className="w-3.5 h-3.5" />
            <span>Zero paid APIs or artificial claims</span>
          </div>
        </div>
      </div>
    </div>
  );
};
