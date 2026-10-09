import React from 'react';
import { Shuffle, ArrowRight, Droplets, Calendar, TrendingUp, Check, AlertCircle } from 'lucide-react';
import { AlternativeCropRecommendation } from '../types';
import { Language, TRANSLATIONS } from '../data/translations';

interface AlternativeCropsCardProps {
  language: Language;
  alternatives: AlternativeCropRecommendation[];
  onSelectAlternative: (cropId: string) => void;
}

export const AlternativeCropsCard: React.FC<AlternativeCropsCardProps> = ({
  language,
  alternatives,
  onSelectAlternative
}) => {
  const t = TRANSLATIONS[language];

  if (!alternatives || alternatives.length === 0) {
    return null;
  }

  return (
    <div id="alternative-crops" className="bg-white rounded-3xl shadow-lg border border-slate-200/80 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-800 text-xs font-bold mb-2">
          <Shuffle className="w-3.5 h-3.5" />
          <span>Rule-Based Crop Alternatives</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {t.alternativesTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Top viable options based on your soil type and current season. Diversifying crops reduces market and climate risk.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {alternatives.map((alt) => {
          const { crop } = alt;
          return (
            <div
              key={crop.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-violet-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div>
                {/* Image */}
                <div className="h-40 w-full relative overflow-hidden">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-black shadow-md ${
                        alt.suitabilityCategory === 'High'
                          ? 'bg-emerald-500 text-white'
                          : alt.suitabilityCategory === 'Moderate'
                          ? 'bg-amber-500 text-white'
                          : 'bg-rose-500 text-white'
                      }`}
                    >
                      {alt.suitabilityCategory} ({alt.suitabilityScore} pts)
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-extrabold text-lg leading-tight">
                      {language === 'kn' ? crop.kannadaName : crop.name}
                    </h3>
                    <p className="text-[11px] text-slate-200">
                      {crop.category} • {crop.scientificName}
                    </p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-4">
                  {/* Key Differences Alert */}
                  <div className="p-3 rounded-xl bg-violet-50 border border-violet-200 text-xs text-violet-950 font-medium">
                    <span className="font-bold">Key Difference: </span>
                    {alt.keyDifferencesFromSelected}
                  </div>

                  {/* Agronomic specs */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <div className="text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>Duration</span>
                      </div>
                      <div className="font-bold text-slate-800 mt-0.5">
                        {alt.maturityRange}
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <div className="text-slate-400 flex items-center gap-1">
                        <Droplets className="w-3 h-3 text-aqua-600" />
                        <span>Water</span>
                      </div>
                      <div className="font-bold text-slate-800 mt-0.5">
                        {crop.waterRequirementMm[0]}-{crop.waterRequirementMm[1]} mm
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <div className="text-slate-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-fresh-600" />
                        <span>Est. Yield</span>
                      </div>
                      <div className="font-bold text-slate-800 mt-0.5">
                        {alt.estimatedYieldRange}
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <div className="text-slate-400 flex items-center gap-1">
                        <span>Cost/Acre</span>
                      </div>
                      <div className="font-bold text-slate-800 mt-0.5">
                        {alt.estimatedCostRange}
                      </div>
                    </div>
                  </div>

                  {/* Advantages */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-fresh-600" />
                      <span>Advantages</span>
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {alt.advantages.map((adv, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-fresh-600 font-bold">•</span>
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Limitations if any */}
                  {alt.limitations.length > 0 && (
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Considerations</span>
                      </h4>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {alt.limitations.map((lim, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{lim}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectAlternative(crop.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-forest-brand text-slate-700 hover:text-white border border-slate-300 hover:border-forest-brand font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Analyse {crop.name} Instead</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
