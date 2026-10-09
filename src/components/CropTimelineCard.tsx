import React from 'react';
import { CalendarDays, Clock, Droplets, Info } from 'lucide-react';
import { CropData } from '../types';
import { calculateGrowthTimeline } from '../engine/growthTimeline';
import { Language, TRANSLATIONS } from '../data/translations';

interface CropTimelineCardProps {
  language: Language;
  crop: CropData;
  plantingDate?: string;
}

export const CropTimelineCard: React.FC<CropTimelineCardProps> = ({
  language,
  crop,
  plantingDate
}) => {
  const t = TRANSLATIONS[language];
  const { stages, estimatedHarvestRange, disclaimer } = calculateGrowthTimeline(crop, plantingDate);

  const getSensitivityColor = (sens: string) => {
    switch (sens) {
      case 'Critical':
        return 'bg-red-500 text-white';
      case 'High':
        return 'bg-amber-500 text-white';
      case 'Moderate':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-emerald-500 text-white';
    }
  };

  return (
    <div id="crop-timeline" className="bg-white rounded-3xl shadow-lg border border-slate-200/80 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold mb-2">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Crop Phenology & Maturity Predictor</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.timelineTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Standard 7-stage physiological growth trajectory for {crop.name} ({crop.maturityDurationDays[0]}-{crop.maturityDurationDays[1]} days cycle).
          </p>
        </div>

        {/* Harvest Window Callout */}
        <div className="p-3.5 rounded-2xl bg-forest-brand text-white shadow-md self-start sm:self-auto max-w-sm">
          <div className="text-[11px] uppercase font-bold tracking-wider text-emerald-200 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Estimated Harvest Window</span>
          </div>
          <div className="text-sm sm:text-base font-black mt-0.5">
            {estimatedHarvestRange}
          </div>
        </div>
      </div>

      {/* 7-Stage Horizontal / Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-200 space-y-6 ml-3 sm:ml-4 py-2">
        {stages.map((stage) => {
          return (
            <div key={stage.stageNumber} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full bg-white border-4 border-emerald-600 flex items-center justify-center shadow-sm group-hover:scale-125 transition-transform" />

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-forest-brand text-white text-[11px] font-black flex items-center justify-center">
                      {stage.stageNumber}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {stage.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {stage.estimatedStartDate && stage.estimatedEndDate ? (
                      <span className="text-xs font-bold text-forest-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg">
                        {stage.estimatedStartDate} — {stage.estimatedEndDate}
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-slate-500 bg-slate-200/70 px-2.5 py-0.5 rounded-lg">
                        Days {stage.startDay} - {stage.endDay}
                      </span>
                    )}

                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${getSensitivityColor(stage.waterSensitivity)}`}>
                      {stage.waterSensitivity}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mt-3 pt-3 border-t border-slate-200/60">
                  <div>
                    <span className="font-bold text-slate-600 flex items-center gap-1 mb-1">
                      <Droplets className="w-3.5 h-3.5 text-aqua-600" />
                      <span>Water Strategy:</span>
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      {stage.irrigationGuidance}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-600 flex items-center gap-1 mb-1">
                      <span>Field Management:</span>
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      {stage.managementTips}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Phenology Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 italic flex items-start gap-2">
        <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
        <span>{disclaimer}</span>
      </div>
    </div>
  );
};
