import React, { useState } from 'react';
import { Gauge, Droplets, AlertCircle, CheckCircle, Info, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { CropData, AreaUnit } from '../types';
import { calculateWaterBudget } from '../engine/waterBudget';
import { Language, TRANSLATIONS } from '../data/translations';

interface WaterBudgetSimulatorCardProps {
  language: Language;
  crop: CropData;
  landArea: number;
  areaUnit: AreaUnit;
}

export const WaterBudgetSimulatorCard: React.FC<WaterBudgetSimulatorCardProps> = ({
  language,
  crop,
  landArea,
  areaUnit
}) => {
  const t = TRANSLATIONS[language];
  const [waterVolume, setWaterVolume] = useState<number>(150000); // 1.5 Lakh litres default
  const [volumeUnit, setVolumeUnit] = useState<'litres' | 'cubic_metres'>('litres');
  const [planningPeriod, setPlanningPeriod] = useState<number>(30); // 30 days

  const budget = calculateWaterBudget(crop, waterVolume, volumeUnit, landArea, areaUnit, planningPeriod);

  return (
    <div id="water-budget" className="bg-white rounded-3xl shadow-lg border border-slate-200/80 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-2">
            <Gauge className="w-3.5 h-3.5" />
            <span>Software-Only Simulation • No Water Meters Needed</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.waterBudgetTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Test whether your stored farm pond, well, or tank water is sufficient for {crop.name}.
          </p>
        </div>

        {/* Compatibility Badge */}
        <div className="self-start sm:self-auto">
          {budget.status === 'Surplus' && (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-100 text-forest-brand border border-emerald-300 font-extrabold text-sm shadow-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Water Surplus (+{budget.deficitOrSurplusMm} mm)</span>
            </span>
          )}
          {budget.status === 'Adequate' && (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-blue-100 text-blue-900 border border-blue-300 font-extrabold text-sm shadow-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Adequate Water Budget</span>
            </span>
          )}
          {budget.status === 'Deficit' && (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-rose-100 text-rose-800 border border-rose-300 font-extrabold text-sm shadow-sm animate-pulse">
              <AlertCircle className="w-4 h-4" />
              <span>Water Deficit ({budget.deficitOrSurplusMm} mm)</span>
            </span>
          )}
          {budget.status === 'Insufficient Data' && (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-100 text-slate-700 border border-slate-300 font-extrabold text-sm shadow-sm">
              <span>Insufficient Data</span>
            </span>
          )}
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Available Water Stored / Allocated
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              step="1000"
              value={waterVolume}
              onChange={(e) => setWaterVolume(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 text-sm focus:ring-2 focus:ring-forest-brand outline-none"
            />
            <select
              value={volumeUnit}
              onChange={(e) => setVolumeUnit(e.target.value as 'litres' | 'cubic_metres')}
              className="px-2 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 focus:ring-2 focus:ring-forest-brand outline-none"
            >
              <option value="litres">Litres (L)</option>
              <option value="cubic_metres">m³ (kL)</option>
            </select>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            ≈ {budget.volumeInCubicMetres.toLocaleString('en-IN')} m³ total storage
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Planning Horizon (Days)
          </label>
          <select
            value={planningPeriod}
            onChange={(e) => setPlanningPeriod(parseInt(e.target.value, 10))}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 text-sm focus:ring-2 focus:ring-forest-brand outline-none"
          >
            <option value={15}>15 Days (Critical Growth Phase)</option>
            <option value={30}>30 Days (Standard 1-Month Window)</option>
            <option value={60}>60 Days (2-Month Vegetative/Reproductive)</option>
            <option value={Math.round((crop.maturityDurationDays[0] + crop.maturityDurationDays[1]) / 2)}>
              Full Crop Cycle (~{Math.round((crop.maturityDurationDays[0] + crop.maturityDurationDays[1]) / 2)} Days)
            </option>
          </select>
          <p className="text-[11px] text-slate-400 mt-1">
            Calculates evapotranspiration demand
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Simulated Farm Size
          </label>
          <div className="px-3 py-2 rounded-xl bg-white border border-slate-200 font-extrabold text-slate-900 text-sm flex items-center justify-between">
            <span>{landArea} {areaUnit}</span>
            <span className="text-xs font-medium text-slate-500">
              ({budget.landAreaInAcres} Acres)
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Synchronized with Farm Profile
          </p>
        </div>
      </div>

      {/* Calculations Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
          <span className="text-xs font-semibold text-sky-700">Available Depth</span>
          <div className="text-2xl font-black text-sky-950 mt-1">
            {budget.waterPerAcreMmEquivalent} <span className="text-sm font-bold text-sky-700">mm</span>
          </div>
          <p className="text-[11px] text-sky-700 mt-0.5">
            Equivalent water depth over {budget.landAreaInAcres} acres
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
          <span className="text-xs font-semibold text-forest-brand">Crop Requirement</span>
          <div className="text-2xl font-black text-forest-dark mt-1">
            {budget.cropRequirementMm} <span className="text-sm font-bold text-forest-brand">mm</span>
          </div>
          <p className="text-[11px] text-forest-700 mt-0.5">
            For {budget.periodDays} days ({crop.name})
          </p>
        </div>

        <div className={`p-4 rounded-2xl border ${budget.deficitOrSurplusMm >= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
          <span className={`text-xs font-semibold ${budget.deficitOrSurplusMm >= 0 ? 'text-forest-brand' : 'text-rose-700'}`}>
            {budget.deficitOrSurplusMm >= 0 ? 'Surplus Volume' : 'Water Deficit'}
          </span>
          <div className={`text-2xl font-black mt-1 flex items-center gap-1 ${budget.deficitOrSurplusMm >= 0 ? 'text-forest-dark' : 'text-rose-900'}`}>
            {budget.deficitOrSurplusMm >= 0 ? (
              <ArrowUpRight className="w-5 h-5 text-fresh-600" />
            ) : (
              <ArrowDownRight className="w-5 h-5 text-rose-600" />
            )}
            <span>{Math.abs(budget.deficitOrSurplusMm)} mm</span>
          </div>
          <p className={`text-[11px] mt-0.5 ${budget.deficitOrSurplusMm >= 0 ? 'text-forest-700' : 'text-rose-700'}`}>
            {Math.abs(budget.deficitOrSurplusCubicMetres).toLocaleString('en-IN')} m³ volume
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-semibold text-slate-500">Per Acre Allocation</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {budget.waterPerAcreCubicMetres} <span className="text-sm font-bold text-slate-500">m³</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            ≈ {Math.round(budget.waterPerAcreCubicMetres * 1000).toLocaleString('en-IN')} Litres/acre
          </p>
        </div>
      </div>

      {/* Recommendations & Actionable Guidance */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Droplets className="w-4 h-4 text-aqua-600" />
          <span>Water Management Guidance & Prescriptions</span>
        </h4>
        <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
          {budget.recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-aqua-600 font-bold">•</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 italic">
        <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <span>Planning estimate only. Does not measure real-time underground percolation rates, canal rotation schedules, or sudden rainfall changes.</span>
      </div>
    </div>
  );
};
