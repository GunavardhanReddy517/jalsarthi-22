import React from 'react';
import { X, History, Trash2, ArrowRight, Calendar, Sprout, TrendingUp, AlertCircle } from 'lucide-react';
import { SavedAnalysis } from '../types';
import { Language, TRANSLATIONS } from '../data/translations';

interface SavedHistoryDrawerProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  savedAnalyses: SavedAnalysis[];
  onLoadAnalysis: (analysis: SavedAnalysis) => void;
  onDeleteAnalysis: (id: string) => void;
  onClearAll: () => void;
}

export const SavedHistoryDrawer: React.FC<SavedHistoryDrawerProps> = ({
  language,
  isOpen,
  onClose,
  savedAnalyses,
  onLoadAnalysis,
  onDeleteAnalysis,
  onClearAll
}) => {
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm no-print">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Drawer Header */}
        <div className="p-5 bg-forest-brand text-white flex items-center justify-between border-b border-forest-dark">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-300" />
            <h2 className="text-lg font-black">{t.navHistory}</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 font-bold">
              {savedAnalyses.length}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {savedAnalyses.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-forest-brand flex items-center justify-center mx-auto">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">No Saved Analyses Yet</h3>
              <p className="text-xs text-slate-500">
                After evaluating your farm conditions, click "Save Analysis" to store records securely in your browser's LocalStorage.
              </p>
            </div>
          ) : (
            savedAnalyses.map((item) => {
              const formattedDate = new Date(item.timestamp).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        {item.name}
                      </h4>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        <span>{formattedDate}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDeleteAnalysis(item.id)}
                      title="Delete saved farm"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold block">Extent & Season</span>
                      <span className="font-bold text-slate-800">
                        {item.inputs.landArea} {item.inputs.areaUnit} • {item.inputs.season}
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold block">Net Profit</span>
                      <span className={`font-extrabold ${item.profit.isProfit ? 'text-forest-brand' : 'text-rose-600'}`}>
                        {item.profit.isProfit ? '+' : ''}₹{item.profit.netReturn.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-forest-brand">
                      {item.recommendation.suitabilityCategory} ({item.recommendation.suitabilityScore} pts)
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onLoadAnalysis(item);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-forest-brand hover:bg-forest-dark text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
                    >
                      <span>Load Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {savedAnalyses.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All History</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
