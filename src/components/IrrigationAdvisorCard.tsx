import React from 'react';
import {
  Droplets,
  AlertTriangle,
  Waves,
  ShieldAlert,
  Sparkles,
  CloudRain,
  ArrowRight
} from 'lucide-react';
import { IrrigationAdvice, CropData, SoilType } from '../types';
import { Language, TRANSLATIONS } from '../data/translations';

interface IrrigationAdvisorCardProps {
  language: Language;
  crop: CropData;
  soilType: SoilType;
  advice: IrrigationAdvice;
}

export const IrrigationAdvisorCard: React.FC<IrrigationAdvisorCardProps> = ({
  language,
  crop,
  soilType,
  advice
}) => {
  const t = TRANSLATIONS[language];

  const getSensitivityBadge = (sens: string) => {
    switch (sens) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'High':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Moderate':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
  };

  return (
    <div id="irrigation-advisor" className="bg-white rounded-3xl shadow-lg border border-slate-200/80 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-aqua-100 text-aqua-800 text-xs font-bold mb-2">
            <Droplets className="w-3.5 h-3.5" />
            <span>Smart Irrigation Advisor (No Hardware Sensors)</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.irrigationTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Crop-specific water regime for <strong className="text-slate-800">{crop.name}</strong> on <strong className="text-slate-800">{soilType}</strong> soil.
          </p>
        </div>
      </div>

      {/* Active Growth Stage Sensitivity Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-aqua-50 via-sky-50 to-emerald-50 border border-aqua-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-aqua-600" />
            <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">
              Active Stage: {advice.growthStageSpecificNeeds.currentStageName}
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              (Day {advice.growthStageSpecificNeeds.daysFromPlanting})
            </span>
          </div>
          <span className={`px-3 py-1 rounded-xl text-xs font-extrabold border ${getSensitivityBadge(advice.growthStageSpecificNeeds.waterSensitivity)}`}>
            Water Sensitivity: {advice.growthStageSpecificNeeds.waterSensitivity}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          {advice.growthStageSpecificNeeds.stageAdvice}
        </p>
      </div>

      {/* Rainfall / Water Availability Alert Callout */}
      {advice.rainfallImpactNotice && (
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
          <CloudRain className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-blue-900">
            <span className="font-bold">Rainfall Feedback: </span>
            {advice.rainfallImpactNotice}
          </div>
        </div>
      )}

      {/* Soil Dynamics & General Watering */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            General Watering Needs
          </h4>
          <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
            {advice.generalWateringNeeds}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Soil Moisture & Drainage Behavior ({soilType})
          </h4>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
            <strong className="text-slate-900">Moisture retention:</strong> {advice.soilMoistureRetention}
          </p>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed mt-1">
            <strong className="text-slate-900">Drainage profile:</strong> {advice.drainageBehaviour}
          </p>
        </div>
      </div>

      {/* Overwatering vs Underwatering Risks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Overwatering */}
        <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <h4 className="font-extrabold text-rose-950 text-xs uppercase tracking-wider">
              Risks of Over-Irrigation
            </h4>
          </div>
          <ul className="space-y-1.5 text-xs text-rose-900">
            {advice.overwateringRisks.map((risk, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-rose-500 font-bold">•</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Underwatering */}
        <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h4 className="font-extrabold text-amber-950 text-xs uppercase tracking-wider">
              Risks of Under-Irrigation
            </h4>
          </div>
          <ul className="space-y-1.5 text-xs text-amber-900">
            {advice.underwateringRisks.map((risk, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Irrigation Methods & Water-Saving Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-forest-brand mb-3 flex items-center gap-1.5">
            <Droplets className="w-4 h-4 text-fresh-600" />
            <span>Suitable Irrigation Methods</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {advice.recommendedMethods.map((m, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-white text-forest-brand border border-emerald-200 text-xs font-bold shadow-sm"
              >
                {m}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Select pressurized drip/sprinkler systems wherever government subsidies (PMKSY) are available in your district.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Practical Water-Saving Practices</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-teal-950">
            {advice.waterSavingPractices.slice(0, 3).map((tip, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Disclaimers & Advice Note */}
      <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 italic border border-slate-200">
        Important Agronomic Advisory: Real-world irrigation timing must always be verified by touching soil moisture 3-4 inches below the bed surface. Local wind, daily temperature spikes, and crop hybrid vigour cause variations.
      </div>
    </div>
  );
};
