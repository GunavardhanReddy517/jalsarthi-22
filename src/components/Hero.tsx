import React from 'react';
import { Sprout, Droplets, BarChart3, Calculator, ArrowRight, CheckCircle2, ShieldCheck, Database } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface HeroProps {
  language: Language;
  onStartFarming: () => void;
  onGetIrrigationAdvice: () => void;
  onCompareCrops: () => void;
  onCalculateProfit: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onStartFarming,
  onGetIrrigationAdvice,
  onCompareCrops,
  onCalculateProfit
}) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 border-b border-emerald-100 py-12 md:py-20">
      {/* Background Subtle Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-aqua-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-200 text-forest-brand text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-fresh-600 animate-pulse" />
            <span>
              {language === 'kn'
                ? 'ರೈತರಿಗಾಗಿ ಪಾರದರ್ಶಕ ಕೃಷಿ ನಿರ್ಧಾರ ವೇದಿಕೆ'
                : '100% Software-Only • No Expensive Sensors Required'}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            {t.welcomeHeading}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-brand via-fresh-600 to-aqua-600">
              🌱
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
            {t.welcomeSubtitle}
          </p>

          {/* 4 Prominent Action Buttons */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            <button
              type="button"
              onClick={onStartFarming}
              className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-forest-brand hover:bg-forest-dark text-white font-bold text-sm shadow-lg shadow-forest-brand/20 hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sprout className="w-5 h-5 text-emerald-300" />
              <span>{t.btnStartSmartFarming}</span>
              <ArrowRight className="w-4 h-4 text-emerald-300/80 ml-0.5" />
            </button>

            <button
              type="button"
              onClick={onGetIrrigationAdvice}
              className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-sm shadow-lg shadow-aqua-600/20 hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Droplets className="w-5 h-5 text-aqua-200" />
              <span>{t.btnGetIrrigationAdvice}</span>
            </button>

            <button
              type="button"
              onClick={onCompareCrops}
              className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-white hover:bg-emerald-50 text-forest-brand border-2 border-emerald-300 font-bold text-sm shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <BarChart3 className="w-5 h-5 text-fresh-600" />
              <span>{t.btnCompareCrops}</span>
            </button>

            <button
              type="button"
              onClick={onCalculateProfit}
              className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-lg shadow-emerald-900/20 hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calculator className="w-5 h-5 text-amber-300" />
              <span>{t.btnCalculateFarmProfit}</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-fresh-600" />
              <span>{language === 'kn' ? 'ನಿಯಮ-ಆಧಾರಿತ ಲೆಕ್ಕಾಚಾರಗಳು' : 'Rule-Based & Explainable'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Database className="w-4 h-4 text-aqua-600" />
              <span>{language === 'kn' ? 'ICAR & ಕೃಷಿ ವಿವಿ ಉಲ್ಲೇಖಗಳು' : 'ICAR & University Research'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-forest-700" />
              <span>{language === 'kn' ? 'ಉಚಿತ ಮತ್ತು ಮುಕ್ತ ಪ್ರವೇಶ' : 'Zero Paid APIs Required'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
