import React from 'react';
import { Language, TRANSLATIONS } from '../data/translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-forest-brand flex items-center justify-center text-white font-black text-xl">
                🌱
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Jal<span className="text-fresh-500">Sarthi</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {t.footerNote}
            </p>
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              Transparent, rule-based decision support system for Indian farmers. Designed for zero-cost operation without requiring expensive IoT sensors, paid telemetry APIs, or proprietary hardware.
            </p>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Key Capabilities
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Rule-Based Crop Matching</li>
              <li>• Stage-Wise Irrigation Guidance</li>
              <li>• Software Water Budgeting</li>
              <li>• 7-Stage Phenology Timeline</li>
              <li>• Soil Profile & pH Correction</li>
              <li>• What-If Sensitivity Simulator</li>
            </ul>
          </div>

          {/* Research & Data Sources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Knowledge Base
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• ICAR Institutes (IIHR, IIMR, IIPR, CICR)</li>
              <li>• University of Agricultural Sciences, Bengaluru & Dharwad</li>
              <li>• Tamil Nadu Agricultural University (TNAU)</li>
              <li>• Krishi Vigyan Kendras (KVK)</li>
              <li>• Soil Health Card (SHC) Guidelines</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} JalSarthi — Supporting smarter and more sustainable farming.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with dedication for India's farming community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
