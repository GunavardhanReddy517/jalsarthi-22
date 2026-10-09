import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Target, Percent, Scale, Info } from 'lucide-react';
import { ProfitEstimation } from '../types';
import { Language, TRANSLATIONS } from '../data/translations';

interface ProfitEstimatorCardProps {
  language: Language;
  profit: ProfitEstimation;
  cropName: string;
}

export const ProfitEstimatorCard: React.FC<ProfitEstimatorCardProps> = ({
  language,
  profit,
  cropName
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div id="profit-estimator" className="bg-white rounded-3xl shadow-lg border border-slate-200/80 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fresh-100 text-forest-brand text-xs font-bold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Farm Economics & Financial Viability</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.profitTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Illustrative net return and return on capital based on {profit.landAreaInAcres} acres of {cropName}.
          </p>
        </div>

        {/* Big Profit / Loss Result Badge */}
        <div className="self-start sm:self-auto">
          <div
            className={`px-5 py-3 rounded-2xl border shadow-md flex items-center gap-3 ${
              profit.isProfit
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-900/10'
                : 'bg-rose-500 text-white border-rose-600 shadow-rose-900/10'
            }`}
          >
            {profit.isProfit ? (
              <TrendingUp className="w-6 h-6 text-emerald-100" />
            ) : (
              <TrendingDown className="w-6 h-6 text-rose-100" />
            )}
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-100">
                {profit.isProfit ? 'Estimated Net Profit' : 'Estimated Net Loss'}
              </div>
              <div className="text-xl sm:text-2xl font-black">
                {profit.isProfit ? '+' : ''}₹{profit.netReturn.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Yield */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
            <span>Total Saleable Yield</span>
            <Scale className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {profit.totalYieldQuintals.toLocaleString('en-IN')} <span className="text-sm font-bold text-slate-500">Qtl</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            ≈ {profit.totalYieldKg.toLocaleString('en-IN')} kg total crop
          </p>
        </div>

        {/* Gross Revenue */}
        <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200">
          <div className="flex items-center justify-between text-sky-800 text-xs font-bold uppercase tracking-wider mb-1">
            <span>Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-sky-950 mt-1">
            ₹{profit.grossRevenue.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-sky-700 mt-0.5">
            @ ₹{profit.sellingPricePerQuintal.toLocaleString('en-IN')}/Qtl (₹{profit.sellingPricePerKg}/kg)
          </p>
        </div>

        {/* Break-even Price */}
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
          <div className="flex items-center justify-between text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
            <span>Break-Even Price</span>
            <Target className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-950 mt-1">
            ₹{profit.breakEvenPricePerQuintal.toLocaleString('en-IN')} <span className="text-sm font-bold text-amber-700">/Qtl</span>
          </div>
          <p className="text-xs text-amber-700 mt-0.5">
            Minimum price required to cover ₹{profit.totalCultivationExpenses.toLocaleString('en-IN')} cost
          </p>
        </div>

        {/* ROI */}
        <div className={`p-5 rounded-2xl border ${profit.isProfit ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
          <div className={`flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-1 ${profit.isProfit ? 'text-forest-brand' : 'text-rose-700'}`}>
            <span>Return on Investment</span>
            <Percent className="w-4 h-4" />
          </div>
          <div className={`text-2xl font-black mt-1 ${profit.isProfit ? 'text-forest-dark' : 'text-rose-900'}`}>
            {profit.roiPercentage}%
          </div>
          <p className={`text-xs mt-0.5 ${profit.isProfit ? 'text-forest-700' : 'text-rose-700'}`}>
            {profit.isProfit ? 'Positive return on spent capital' : 'Capital deficit under current assumptions'}
          </p>
        </div>
      </div>

      {/* Transparent Calculation Formulas */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Transparent Financial Formulas Applied
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-mono">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200">
            • Gross Revenue = {profit.totalYieldQuintals} Qtl × ₹{profit.sellingPricePerQuintal} = ₹{profit.grossRevenue.toLocaleString('en-IN')}
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-slate-200">
            • Net Return = ₹{profit.grossRevenue.toLocaleString('en-IN')} - ₹{profit.totalCultivationExpenses.toLocaleString('en-IN')} = ₹{profit.netReturn.toLocaleString('en-IN')}
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-slate-200">
            • Break-Even = ₹{profit.totalCultivationExpenses.toLocaleString('en-IN')} ÷ {profit.totalYieldQuintals || 1} Qtl = ₹{profit.breakEvenPricePerQuintal}/Qtl
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-slate-200">
            • ROI = (₹{profit.netReturn.toLocaleString('en-IN')} ÷ ₹{profit.totalCultivationExpenses || 1}) × 100 = {profit.roiPercentage}%
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 italic">
        <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <span>Estimates are strictly illustrative models. Realized market mandi prices and actual harvest yields will vary based on weather, pest attacks, and trade conditions.</span>
      </div>
    </div>
  );
};
