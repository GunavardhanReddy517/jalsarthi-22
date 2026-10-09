import React, { useState } from 'react';
import { Sliders, TrendingUp, TrendingDown, RefreshCw, BarChart2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { ProfitEstimation } from '../types';
import { generateWhatIfScenarios } from '../engine/financialCalculations';
import { Language, TRANSLATIONS } from '../data/translations';

interface WhatIfSimulatorCardProps {
  language: Language;
  baseProfit: ProfitEstimation;
  cropName: string;
}

export const WhatIfSimulatorCard: React.FC<WhatIfSimulatorCardProps> = ({
  language,
  baseProfit,
  cropName
}) => {
  const t = TRANSLATIONS[language];

  // Sliders for percentage adjustments
  const [conservativeYieldAdjust, setConservativeYieldAdjust] = useState<number>(-15);
  const [conservativePriceAdjust, setConservativePriceAdjust] = useState<number>(-10);
  const [conservativeExpenseAdjust, setConservativeExpenseAdjust] = useState<number>(10);

  const [optimisticYieldAdjust, setOptimisticYieldAdjust] = useState<number>(20);
  const [optimisticPriceAdjust, setOptimisticPriceAdjust] = useState<number>(15);
  const [optimisticExpenseAdjust, setOptimisticExpenseAdjust] = useState<number>(-5);

  const scenarios = generateWhatIfScenarios(
    baseProfit,
    conservativeYieldAdjust,
    conservativePriceAdjust,
    conservativeExpenseAdjust,
    optimisticYieldAdjust,
    optimisticPriceAdjust,
    optimisticExpenseAdjust
  );

  // Prepare Recharts chart data
  const chartData = scenarios.map((sc) => ({
    name: sc.name,
    'Gross Revenue (₹)': sc.grossRevenue,
    'Cultivation Cost (₹)': sc.totalExpenses,
    'Net Profit (₹)': sc.netReturn
  }));

  const resetSliders = () => {
    setConservativeYieldAdjust(-15);
    setConservativePriceAdjust(-10);
    setConservativeExpenseAdjust(10);
    setOptimisticYieldAdjust(20);
    setOptimisticPriceAdjust(15);
    setOptimisticExpenseAdjust(-5);
  };

  return (
    <div id="whatif-simulator" className="bg-white rounded-3xl shadow-lg border border-slate-200/80 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Risk & Sensitivity Simulator</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.whatIfTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Test how shifts in wholesale prices, harvest yields, and input inflation impact net farm income for {cropName}.
          </p>
        </div>

        <button
          type="button"
          onClick={resetSliders}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition border border-slate-200"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Sliders</span>
        </button>
      </div>

      {/* 3 Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {scenarios.map((sc) => {
          const isConservative = sc.name === 'Conservative';
          const isOptimistic = sc.name === 'Optimistic';

          return (
            <div
              key={sc.name}
              className={`p-5 rounded-2xl border transition-all ${
                isConservative
                  ? 'bg-rose-50/40 border-rose-200'
                  : isOptimistic
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : 'bg-blue-50/40 border-blue-200 ring-2 ring-blue-400/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-3 py-1 rounded-xl text-xs font-extrabold border ${
                    isConservative
                      ? 'bg-rose-100 text-rose-800 border-rose-300'
                      : isOptimistic
                      ? 'bg-emerald-100 text-forest-brand border-emerald-300'
                      : 'bg-blue-100 text-blue-900 border-blue-300'
                  }`}
                >
                  {sc.name} Case
                </span>
                <span className="text-xs font-bold text-slate-500">
                  ROI: {sc.roiPercentage}%
                </span>
              </div>

              <div className="mb-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Net Return
                </span>
                <div
                  className={`text-2xl font-black mt-0.5 ${
                    sc.netReturn >= 0 ? 'text-forest-brand' : 'text-rose-600'
                  }`}
                >
                  {sc.netReturn >= 0 ? '+' : ''}₹{sc.netReturn.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 border-t border-slate-200/80 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Yield:</span>
                  <span className="font-bold">{sc.totalYieldQuintals} Qtl</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Selling Price:</span>
                  <span className="font-bold">₹{sc.sellingPricePerQuintal}/Qtl</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Cultivation Cost:</span>
                  <span className="font-bold">₹{sc.totalExpenses.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Gross Revenue:</span>
                  <span className="font-bold">₹{sc.grossRevenue.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Break-Even Price:</span>
                  <span className="font-bold">₹{sc.breakEvenPrice}/Qtl</span>
                </div>
              </div>

              {/* Slider Controls for Conservative & Optimistic */}
              {isConservative && (
                <div className="mt-4 pt-3 border-t border-rose-200 space-y-2">
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-rose-900">
                      <span>Yield Shock:</span>
                      <span>{conservativeYieldAdjust}%</span>
                    </div>
                    <input
                      type="range"
                      min="-35"
                      max="0"
                      value={conservativeYieldAdjust}
                      onChange={(e) => setConservativeYieldAdjust(parseInt(e.target.value, 10))}
                      className="w-full accent-rose-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-rose-900">
                      <span>Price Drop:</span>
                      <span>{conservativePriceAdjust}%</span>
                    </div>
                    <input
                      type="range"
                      min="-30"
                      max="0"
                      value={conservativePriceAdjust}
                      onChange={(e) => setConservativePriceAdjust(parseInt(e.target.value, 10))}
                      className="w-full accent-rose-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-rose-900">
                      <span>Cost Inflation:</span>
                      <span>+{conservativeExpenseAdjust}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={conservativeExpenseAdjust}
                      onChange={(e) => setConservativeExpenseAdjust(parseInt(e.target.value, 10))}
                      className="w-full accent-rose-600"
                    />
                  </div>
                </div>
              )}

              {isOptimistic && (
                <div className="mt-4 pt-3 border-t border-emerald-200 space-y-2">
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-forest-brand">
                      <span>Favorable Yield:</span>
                      <span>+{optimisticYieldAdjust}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={optimisticYieldAdjust}
                      onChange={(e) => setOptimisticYieldAdjust(parseInt(e.target.value, 10))}
                      className="w-full accent-fresh-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-forest-brand">
                      <span>Premium Price:</span>
                      <span>+{optimisticPriceAdjust}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="35"
                      value={optimisticPriceAdjust}
                      onChange={(e) => setOptimisticPriceAdjust(parseInt(e.target.value, 10))}
                      className="w-full accent-fresh-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-forest-brand">
                      <span>Cost Savings:</span>
                      <span>{optimisticExpenseAdjust}%</span>
                    </div>
                    <input
                      type="range"
                      min="-20"
                      max="0"
                      value={optimisticExpenseAdjust}
                      onChange={(e) => setOptimisticExpenseAdjust(parseInt(e.target.value, 10))}
                      className="w-full accent-fresh-600"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Recharts Visual Comparison Chart */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
          <BarChart2 className="w-4 h-4 text-forest-brand" />
          <span>Scenario Comparison Visualizer (Recharts)</span>
        </h4>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#475569' }} />
              <YAxis
                tick={{ fontSize: 11, fill: '#475569' }}
                tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, '']}
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Gross Revenue (₹)" fill="#0284c7" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Cultivation Cost (₹)" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Net Profit (₹)" fill="#16a34a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
