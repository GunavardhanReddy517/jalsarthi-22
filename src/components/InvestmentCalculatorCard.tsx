import React from 'react';
import { Receipt, DollarSign, PieChart, ShieldAlert } from 'lucide-react';
import { ExpenseBreakdown, AreaUnit } from '../types';
import { calculateInvestment } from '../engine/financialCalculations';
import { Language, TRANSLATIONS } from '../data/translations';

interface InvestmentCalculatorCardProps {
  language: Language;
  expenses: ExpenseBreakdown;
  landArea: number;
  areaUnit: AreaUnit;
  onExpensesChange: (updated: ExpenseBreakdown) => void;
}

export const InvestmentCalculatorCard: React.FC<InvestmentCalculatorCardProps> = ({
  language,
  expenses,
  landArea,
  areaUnit,
  onExpensesChange
}) => {
  const t = TRANSLATIONS[language];
  const calculation = calculateInvestment(expenses, landArea, areaUnit);

  const handleFieldChange = (field: keyof ExpenseBreakdown, val: number) => {
    const safeVal = Math.max(0, isNaN(val) ? 0 : val);
    onExpensesChange({
      ...expenses,
      [field]: safeVal
    });
  };

  const fields: { key: keyof ExpenseBreakdown; label: string; iconColor: string }[] = [
    { key: 'landPreparation', label: 'Land Preparation & Plowing', iconColor: 'text-amber-600' },
    { key: 'seeds', label: 'Seeds / Planting Material', iconColor: 'text-emerald-600' },
    { key: 'fertilizers', label: 'Fertilizers & FYM / Compost', iconColor: 'text-blue-600' },
    { key: 'labour', label: 'Field Labour (Sowing, Weeding)', iconColor: 'text-purple-600' },
    { key: 'irrigation', label: 'Irrigation & Pumping Electricity/Fuel', iconColor: 'text-aqua-600' },
    { key: 'cropProtection', label: 'Crop Protection (Bio/Pesticides)', iconColor: 'text-rose-600' },
    { key: 'harvesting', label: 'Harvesting & Threshing Machinery', iconColor: 'text-teal-600' },
    { key: 'transportation', label: 'Transport & Mandi Marketing', iconColor: 'text-slate-600' },
    { key: 'otherExpenses', label: 'Contingency & Miscellaneous', iconColor: 'text-slate-500' }
  ];

  return (
    <div id="investment-calculator" className="bg-white rounded-3xl shadow-lg border border-slate-200/80 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-2">
            <Receipt className="w-3.5 h-3.5" />
            <span>Farm Cost Accounting</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.investmentTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Breakdown across 9 cultivation stages. Edit inputs below to recalculate totals immediately.
          </p>
        </div>

        {/* Total Cost Badges */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="p-3 px-4 rounded-2xl bg-forest-brand text-white shadow-md">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
              Total Cultivation Cost
            </div>
            <div className="text-xl sm:text-2xl font-black mt-0.5">
              ₹{calculation.totalExpenses.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Per Acre and Per Hectare Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Total Farm Investment
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            ₹{calculation.totalExpenses.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Across {landArea} {areaUnit} ({calculation.landAreaInAcres} Acres)
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
          <span className="text-xs font-bold text-forest-brand uppercase tracking-wider">
            Cost per Acre
          </span>
          <div className="text-2xl font-black text-forest-dark mt-1">
            ₹{calculation.costPerAcre.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-forest-700 mt-0.5">
            Standard agronomic benchmark
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
          <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
            Cost per Hectare
          </span>
          <div className="text-2xl font-black text-sky-950 mt-1">
            ₹{calculation.costPerHectare.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-sky-700 mt-0.5">
            1 Hectare ≈ 2.471 Acres
          </p>
        </div>
      </div>

      {/* Editable 9 Inputs Grid */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <DollarSign className="w-4 h-4 text-forest-brand" />
          <span>Editable Expense Categories (INR ₹)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fields.map(({ key, label, iconColor }) => {
            const val = calculation.expenses[key];
            const pct = calculation.totalExpenses > 0 ? Math.round((val / calculation.totalExpenses) * 100) : 0;

            return (
              <div
                key={key}
                className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 transition focus-within:ring-2 focus-within:ring-forest-brand focus-within:bg-white"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                  <span className="truncate pr-2">{label}</span>
                  <span className={`text-[11px] font-extrabold ${iconColor}`}>{pct}%</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={val === 0 ? '' : val}
                    placeholder="0"
                    onChange={(e) => handleFieldChange(key, parseFloat(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-1.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 text-sm focus:outline-none"
                  />
                </div>
                {/* Visual mini bar */}
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-fresh-600 transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 italic">
        <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
        <span>Negative expenses are automatically rejected. Totals update instantaneously.</span>
      </div>
    </div>
  );
};
