import React from 'react';
import {
  Sprout,
  Droplets,
  CalendarDays,
  Layers,
  Receipt,
  TrendingUp,
  Shuffle,
  GitCompare,
  Gauge,
  Sliders
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface FeatureGridProps {
  language: Language;
  onSelectFeature: (featureId: string) => void;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ language, onSelectFeature }) => {
  const t = TRANSLATIONS[language];

  const features = [
    {
      id: 'recommendation',
      icon: Sprout,
      title: t.feature1,
      color: 'from-emerald-500 to-forest-brand',
      bgLight: 'bg-emerald-50 text-forest-brand',
      desc: language === 'kn'
        ? 'ಋತು, ಮಣ್ಣು ಮತ್ತು ನೀರಿನ ಲಭ್ಯತೆಗೆ ಸೂಕ್ತವಾದ ಬೆಳೆಗಳನ್ನು ಪಾರದರ್ಶಕ ನಿಯಮಗಳ ಮೂಲಕ ಪರಿಶೀಲಿಸಿ.'
        : 'Transparent rule-based scoring matching your soil, season, and water conditions.'
    },
    {
      id: 'irrigation',
      icon: Droplets,
      title: t.feature2,
      color: 'from-aqua-500 to-blue-600',
      bgLight: 'bg-aqua-50 text-aqua-700',
      desc: language === 'kn'
        ? 'ಯಾವುದೇ ಸಂವೇದಕಗಳಿಲ್ಲದೆ ಬೆಳೆಯ ಹಂತ ಮತ್ತು ಮಣ್ಣಿನ ತೇವಾಂಶದ ನಡವಳಿಕೆಯ ಆಧಾರದ ಮೇಲೆ ನೀರಾವರಿ ಮಾರ್ಗದರ್ಶನ.'
        : 'Practical watering frequency, soil moisture retention behavior, and water-saving methods.'
    },
    {
      id: 'timeline',
      icon: CalendarDays,
      title: t.feature3,
      color: 'from-teal-500 to-emerald-700',
      bgLight: 'bg-teal-50 text-teal-800',
      desc: language === 'kn'
        ? 'ಬಿತ್ತನೆಯಿಂದ ಕೊಯ್ಲಿನವರೆಗೆ 7 ಪ್ರಮುಖ ಹಂತಗಳು ಮತ್ತು ನಿರೀಕ್ಷಿತ ಕೊಯ್ಲು ದಿನಾಂಕದ ಅಂದಾಜು.'
        : '7 growth stages from emergence to harvest window calculated from your planting date.'
    },
    {
      id: 'soil',
      icon: Layers,
      title: t.feature4,
      color: 'from-amber-600 to-earth-800',
      bgLight: 'bg-amber-50 text-amber-900',
      desc: language === 'kn'
        ? 'ಕಾಂಪೋಸ್ಟ್, ಹೊದಿಕೆ (ಮಲ್ಚಿಂಗ್), ಬೆಳೆ ಪರಿವರ್ತನೆ ಮತ್ತು ಪಿ.ಹೆಚ್ ತಿದ್ದುಪಡಿಯ ನೈಸರ್ಗಿಕ ಸಲಹೆಗಳು.'
        : 'Organic compost, mulching, crop rotation, and pH correction without blind chemical dosing.'
    },
    {
      id: 'investment',
      icon: Receipt,
      title: t.feature5,
      color: 'from-blue-600 to-indigo-700',
      bgLight: 'bg-blue-50 text-blue-900',
      desc: language === 'kn'
        ? 'ಭೂಮಿ ಸಿದ್ಧತೆ, ಬೀಜ, ಗೊಬ್ಬರ, ಕೂಲಿ ಸೇರಿದಂತೆ 9 ಪ್ರಮುಖ ವಿಭಾಗಗಳಲ್ಲಿ ಎಕರೆ/ಹೆಕ್ಟೇರ್ ವೆಚ್ಚದ ಲೆಕ್ಕ.'
        : 'Editable inputs across 9 expense categories with automatic per-acre and per-hectare totals.'
    },
    {
      id: 'profit',
      icon: TrendingUp,
      title: t.feature6,
      color: 'from-fresh-600 to-emerald-800',
      bgLight: 'bg-emerald-50 text-forest-brand',
      desc: language === 'kn'
        ? 'ಒಟ್ಟು ಆದಾಯ, ನಿವ್ವಳ ಲಾಭ, ಸಮಸ್ಥಿತಿ (ಬ್ರೇಕ್-ಈವನ್) ಬೆಲೆ ಮತ್ತು ಹೂಡಿಕೆಯ ಲಾಭಾಂಶ (ROI) ಲೆಕ್ಕಾಚಾರ.'
        : 'Gross revenue, net returns, break-even selling price, and return on investment.'
    },
    {
      id: 'alternatives',
      icon: Shuffle,
      title: t.feature7,
      color: 'from-violet-600 to-purple-800',
      bgLight: 'bg-violet-50 text-violet-900',
      desc: language === 'kn'
        ? 'ಕಡಿಮೆ ನೀರಿನ ಅಥವಾ ಹೆಚ್ಚಿನ ಲಾಭದ 3 ಪರ್ಯಾಯ ಬೆಳೆಗಳ ವಿವರ ಮತ್ತು ಹೋಲಿಕೆ.'
        : 'Up to 3 viable alternatives with pros, cons, and water-footprint comparison.'
    },
    {
      id: 'comparison',
      icon: GitCompare,
      title: t.feature8,
      color: 'from-cyan-600 to-teal-800',
      bgLight: 'bg-cyan-50 text-cyan-900',
      desc: language === 'kn'
        ? 'ಆಯ್ದ ಬೆಳೆ ಮತ್ತು ಪರ್ಯಾಯ ಬೆಳೆಗಳ ನಡುವಿನ ಸಮಗ್ರ ಪಕ್ಕ-ಪಕ್ಕ ಹೋಲಿಕೆ ಕೋಷ್ಟಕ.'
        : 'Side-by-side evaluation matrix with editable prices, yields, and risk factors.'
    },
    {
      id: 'waterbudget',
      icon: Gauge,
      title: t.feature9,
      color: 'from-sky-500 to-blue-700',
      bgLight: 'bg-sky-50 text-sky-900',
      desc: language === 'kn'
        ? 'ಲಭ್ಯವಿರುವ ನೀರಿನ ಪ್ರಮಾಣ (ಲೀಟರ್ ಅಥವಾ ಘನ ಮೀಟರ್) ಮತ್ತು ಬೆಳೆಯ ಅಗತ್ಯತೆಯ ಕೊರತೆ/ಹೆಚ್ಚುವರಿ ಲೆಕ್ಕ.'
        : 'Simulate water sufficiency in litres or m³ against crop evapotranspiration depth.'
    },
    {
      id: 'whatif',
      icon: Sliders,
      title: t.feature10,
      color: 'from-orange-500 to-amber-700',
      bgLight: 'bg-orange-50 text-orange-900',
      desc: language === 'kn'
        ? 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ, ಇಳುವರಿ ಮತ್ತು ವೆಚ್ಚದ ವ್ಯತ್ಯಾಸಗಳಿಗೆ ಅನುಗುಣವಾಗಿ 3 ಸನ್ನಿವೇಶಗಳ ಪರೀಕ್ಷೆ.'
        : 'Interactive sensitivity testing for Conservative, Expected, and Optimistic outcomes.'
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.featuresTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {t.featuresSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                onClick={() => onSelectFeature(feature.id)}
                className="group relative p-5 rounded-2xl bg-slate-50/70 border border-slate-200/90 hover:border-emerald-300 hover:bg-white hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl ${feature.bgLight} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-forest-brand transition-colors line-clamp-2">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {feature.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-forest-brand">
                  <span>{language === 'kn' ? 'ತೆರೆಯಿರಿ' : 'Open Module'}</span>
                  <span className="text-emerald-500 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
