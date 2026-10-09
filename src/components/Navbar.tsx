import React from 'react';
import { Droplets, Sprout, History, BookOpen, Calculator, BarChart3, Globe } from 'lucide-react';
import { Language } from '../data/translations';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  savedFarmsCount: number;
  onOpenHistory: () => void;
  onOpenComparison: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  savedFarmsCount,
  onOpenHistory,
  onOpenComparison
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-emerald-100 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-forest-brand to-fresh-600 flex items-center justify-center shadow-md shadow-emerald-900/10">
              <Sprout className="w-6 h-6 text-emerald-200 absolute -top-0.5 -left-0.5" />
              <Droplets className="w-6 h-6 text-aqua-200 absolute bottom-1 right-1" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black tracking-tight text-forest-brand">
                  Jal<span className="text-fresh-600">Sarthi</span>
                </span>
                <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-forest-800">
                  {language === 'kn' ? 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿ' : 'Kisan Edition'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {language === 'kn'
                  ? 'ಸ್ಮಾರ್ಟ್ ನೀರು • ಉತ್ತಮ ಬೆಳೆಗಳು • ಉತ್ತಮ ಕೃಷಿ ನಿರ್ಧಾರಗಳು'
                  : 'Smart Water. Better Crops. Better Decisions.'}
              </p>
            </div>
          </div>

          {/* Nav Links & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <a
                href="#farm-form"
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-forest-brand hover:bg-emerald-50 transition"
              >
                {language === 'kn' ? 'ಜಮೀನು ವಿವರ' : 'Farm Profile'}
              </a>
              <a
                href="#irrigation-advisor"
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-forest-brand hover:bg-emerald-50 transition flex items-center gap-1.5"
              >
                <Droplets className="w-4 h-4 text-aqua-600" />
                {language === 'kn' ? 'ನೀರಾವರಿ' : 'Irrigation'}
              </a>
              <a
                href="#water-budget"
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-forest-brand hover:bg-emerald-50 transition flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-emerald-600" />
                {language === 'kn' ? 'ನೀರಿನ ಬಜೆಟ್' : 'Water Budget'}
              </a>
              <a
                href="#profit-estimator"
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-forest-brand hover:bg-emerald-50 transition flex items-center gap-1.5"
              >
                <Calculator className="w-4 h-4 text-amber-600" />
                {language === 'kn' ? 'ಲಾಭ ಲೆಕ್ಕ' : 'Profit Estimator'}
              </a>
              <button
                type="button"
                onClick={onOpenComparison}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-forest-brand hover:bg-emerald-50 transition flex items-center gap-1.5"
              >
                <BarChart3 className="w-4 h-4 text-blue-600" />
                {language === 'kn' ? 'ಬೆಳೆ ಹೋಲಿಕೆ' : 'Compare'}
              </button>
            </nav>

            {/* Saved History Button */}
            <button
              type="button"
              onClick={onOpenHistory}
              aria-label="View Saved Farm History"
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-emerald-100/70 text-slate-700 hover:text-forest-brand text-xs sm:text-sm font-semibold transition border border-slate-200"
            >
              <History className="w-4 h-4 text-forest-700" />
              <span className="hidden sm:inline">{language === 'kn' ? 'ಉಳಿಸಿದ ಕೃಷಿ' : 'Saved'}</span>
              {savedFarmsCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-forest-brand text-white text-xs font-bold">
                  {savedFarmsCount}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <Globe className="w-4 h-4 text-slate-500 ml-1.5 mr-1 hidden sm:inline" />
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  language === 'en'
                    ? 'bg-white text-forest-brand shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('kn')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  language === 'kn'
                    ? 'bg-forest-brand text-white shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ಕನ್ನಡ
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
