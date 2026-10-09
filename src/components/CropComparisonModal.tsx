import React, { useState } from 'react';
import { X, GitCompare, Edit3, Check, RotateCcw } from 'lucide-react';
import { CropData, AlternativeCropRecommendation, FarmInputs } from '../types';
import { CROPS_DATABASE } from '../data/crops';
import { Language, TRANSLATIONS } from '../data/translations';

interface CropComparisonModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  selectedCrop: CropData;
  alternatives: AlternativeCropRecommendation[];
  farmInputs: FarmInputs;
  onSelectCropToAnalyse: (cropId: string) => void;
}

interface CropFinancialOverride {
  yieldPerAcre: number;
  sellingPrice: number;
  costPerAcre: number;
}

export const CropComparisonModal: React.FC<CropComparisonModalProps> = ({
  language,
  isOpen,
  onClose,
  selectedCrop,
  alternatives,
  farmInputs,
  onSelectCropToAnalyse
}) => {
  const t = TRANSLATIONS[language];

  // Combine selected crop and alternatives
  const allComparisonCrops = [
    {
      crop: selectedCrop,
      isPrimary: true,
      suitabilityCategory: 'Selected Target',
      suitabilityScore: '-'
    },
    ...alternatives.map((a) => ({
      crop: a.crop,
      isPrimary: false,
      suitabilityCategory: a.suitabilityCategory,
      suitabilityScore: `${a.suitabilityScore} pts`
    }))
  ];

  // State for editable financial assumptions per crop
  const [financialOverrides, setFinancialOverrides] = useState<Record<string, CropFinancialOverride>>(() => {
    const init: Record<string, CropFinancialOverride> = {};
    allComparisonCrops.forEach(({ crop }) => {
      const avgYield = Math.round((crop.typicalYieldRangePerAcre[0] + crop.typicalYieldRangePerAcre[1]) / 2);
      const avgPrice = Math.round((crop.typicalPricePerQuintal[0] + crop.typicalPricePerQuintal[1]) / 2);
      const avgCost = Math.round((crop.typicalCostPerAcre[0] + crop.typicalCostPerAcre[1]) / 2);
      init[crop.id] = { yieldPerAcre: avgYield, sellingPrice: avgPrice, costPerAcre: avgCost };
    });
    return init;
  });

  const [editingCropId, setEditingCropId] = useState<string | null>(null);

  if (!isOpen) return null;

  const area = farmInputs.landArea || 1;

  const handleUpdate = (cropId: string, field: keyof CropFinancialOverride, val: number) => {
    setFinancialOverrides((prev) => ({
      ...prev,
      [cropId]: {
        ...prev[cropId],
        [field]: Math.max(0, val)
      }
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto no-print">
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-forest-brand p-5 sm:p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10">
              <GitCompare className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black">
                {t.comparisonTitle}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200">
                Side-by-side comparison matrix for {area} {farmInputs.areaUnit} ({farmInputs.season} season).
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Table */}
        <div className="p-4 sm:p-6 overflow-x-auto max-h-[75vh]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-50">
                <th className="p-3 font-extrabold text-slate-700 uppercase tracking-wider min-w-[160px]">
                  Comparison Parameter
                </th>
                {allComparisonCrops.map(({ crop, isPrimary }) => (
                  <th
                    key={crop.id}
                    className={`p-3 font-extrabold text-sm min-w-[210px] ${
                      isPrimary ? 'bg-emerald-50/80 text-forest-brand' : 'text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span>{crop.name}</span>
                      {isPrimary && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-forest-brand text-white font-bold">
                          Primary
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-normal text-slate-500">
                      {crop.category} • {crop.scientificName}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* Suitability */}
              <tr className="hover:bg-slate-50/60">
                <td className="p-3 font-bold text-slate-700 bg-slate-50/40">
                  Suitability Status
                </td>
                {allComparisonCrops.map(({ crop, suitabilityCategory, suitabilityScore, isPrimary }) => (
                  <td key={crop.id} className={`p-3 font-semibold ${isPrimary ? 'bg-emerald-50/30' : ''}`}>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-slate-100 text-slate-800 border border-slate-200">
                      {suitabilityCategory} {suitabilityScore !== '-' && `(${suitabilityScore})`}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Maturity */}
              <tr className="hover:bg-slate-50/60">
                <td className="p-3 font-bold text-slate-700 bg-slate-50/40">
                  Maturity Duration
                </td>
                {allComparisonCrops.map(({ crop, isPrimary }) => (
                  <td key={crop.id} className={`p-3 ${isPrimary ? 'bg-emerald-50/30 font-bold' : ''}`}>
                    {crop.maturityDurationDays[0]} — {crop.maturityDurationDays[1]} days
                  </td>
                ))}
              </tr>

              {/* Water Needs */}
              <tr className="hover:bg-slate-50/60">
                <td className="p-3 font-bold text-slate-700 bg-slate-50/40">
                  Water Requirement
                </td>
                {allComparisonCrops.map(({ crop, isPrimary }) => (
                  <td key={crop.id} className={`p-3 ${isPrimary ? 'bg-emerald-50/30 font-bold' : ''}`}>
                    {crop.waterRequirementMm[0]} — {crop.waterRequirementMm[1]} mm
                  </td>
                ))}
              </tr>

              {/* Irrigation Methods */}
              <tr className="hover:bg-slate-50/60">
                <td className="p-3 font-bold text-slate-700 bg-slate-50/40">
                  Recommended Irrigation
                </td>
                {allComparisonCrops.map(({ crop, isPrimary }) => (
                  <td key={crop.id} className={`p-3 text-[11px] ${isPrimary ? 'bg-emerald-50/30' : ''}`}>
                    {crop.recommendedIrrigationMethods.join(', ')}
                  </td>
                ))}
              </tr>

              {/* Cultivation Expenses (Editable) */}
              <tr className="hover:bg-amber-50/30 bg-amber-50/10">
                <td className="p-3 font-bold text-slate-800 bg-slate-50/40">
                  <div>Est. Cultivation Cost</div>
                  <div className="text-[10px] text-slate-400 font-normal">Editable assumption</div>
                </td>
                {allComparisonCrops.map(({ crop, isPrimary }) => {
                  const fin = financialOverrides[crop.id] || { yieldPerAcre: 10, sellingPrice: 2000, costPerAcre: 20000 };
                  const isEditing = editingCropId === crop.id;
                  const totalCost = Math.round(fin.costPerAcre * area);

                  return (
                    <td key={crop.id} className={`p-3 ${isPrimary ? 'bg-emerald-50/30' : ''}`}>
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-slate-400">₹</span>
                          <input
                            type="number"
                            value={fin.costPerAcre}
                            onChange={(e) => handleUpdate(crop.id, 'costPerAcre', parseFloat(e.target.value) || 0)}
                            className="w-24 px-2 py-1 rounded border border-slate-300 font-bold text-xs"
                          />
                        </div>
                      ) : (
                        <div>
                          <span className="font-bold text-slate-900">₹{fin.costPerAcre.toLocaleString('en-IN')}/acre</span>
                          <div className="text-[11px] text-slate-500">Total: ₹{totalCost.toLocaleString('en-IN')}</div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Expected Yield (Editable) */}
              <tr className="hover:bg-amber-50/30 bg-amber-50/10">
                <td className="p-3 font-bold text-slate-800 bg-slate-50/40">
                  <div>Expected Yield / Acre</div>
                  <div className="text-[10px] text-slate-400 font-normal">Editable assumption</div>
                </td>
                {allComparisonCrops.map(({ crop, isPrimary }) => {
                  const fin = financialOverrides[crop.id] || { yieldPerAcre: 10, sellingPrice: 2000, costPerAcre: 20000 };
                  const isEditing = editingCropId === crop.id;
                  const totalYield = Math.round(fin.yieldPerAcre * area * 10) / 10;

                  return (
                    <td key={crop.id} className={`p-3 ${isPrimary ? 'bg-emerald-50/30' : ''}`}>
                      {isEditing ? (
                        <input
                          type="number"
                          value={fin.yieldPerAcre}
                          onChange={(e) => handleUpdate(crop.id, 'yieldPerAcre', parseFloat(e.target.value) || 0)}
                          className="w-20 px-2 py-1 rounded border border-slate-300 font-bold text-xs"
                        />
                      ) : (
                        <div>
                          <span className="font-bold text-slate-900">{fin.yieldPerAcre} Qtl/acre</span>
                          <div className="text-[11px] text-slate-500">Total: {totalYield} Qtl</div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Assumed Selling Price (Editable) */}
              <tr className="hover:bg-amber-50/30 bg-amber-50/10">
                <td className="p-3 font-bold text-slate-800 bg-slate-50/40">
                  <div>Assumed Selling Price</div>
                  <div className="text-[10px] text-slate-400 font-normal">Editable assumption</div>
                </td>
                {allComparisonCrops.map(({ crop, isPrimary }) => {
                  const fin = financialOverrides[crop.id] || { yieldPerAcre: 10, sellingPrice: 2000, costPerAcre: 20000 };
                  const isEditing = editingCropId === crop.id;

                  return (
                    <td key={crop.id} className={`p-3 ${isPrimary ? 'bg-emerald-50/30' : ''}`}>
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-slate-400">₹</span>
                          <input
                            type="number"
                            value={fin.sellingPrice}
                            onChange={(e) => handleUpdate(crop.id, 'sellingPrice', parseFloat(e.target.value) || 0)}
                            className="w-24 px-2 py-1 rounded border border-slate-300 font-bold text-xs"
                          />
                        </div>
                      ) : (
                        <span className="font-bold text-slate-900">₹{fin.sellingPrice.toLocaleString('en-IN')}/Qtl</span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Gross Revenue */}
              <tr className="hover:bg-slate-50/60 font-semibold">
                <td className="p-3 font-bold text-slate-700 bg-slate-50/40">
                  Gross Revenue
                </td>
                {allComparisonCrops.map(({ crop, isPrimary }) => {
                  const fin = financialOverrides[crop.id] || { yieldPerAcre: 10, sellingPrice: 2000, costPerAcre: 20000 };
                  const totalYield = fin.yieldPerAcre * area;
                  const gross = Math.round(totalYield * fin.sellingPrice);

                  return (
                    <td key={crop.id} className={`p-3 text-sky-900 ${isPrimary ? 'bg-emerald-50/30 font-bold' : ''}`}>
                      ₹{gross.toLocaleString('en-IN')}
                    </td>
                  );
                })}
              </tr>

              {/* Net Return */}
              <tr className="hover:bg-slate-50/60 font-extrabold text-sm">
                <td className="p-3 font-black text-slate-800 bg-slate-50/40">
                  Estimated Net Return
                </td>
                {allComparisonCrops.map(({ crop, isPrimary }) => {
                  const fin = financialOverrides[crop.id] || { yieldPerAcre: 10, sellingPrice: 2000, costPerAcre: 20000 };
                  const totalYield = fin.yieldPerAcre * area;
                  const gross = Math.round(totalYield * fin.sellingPrice);
                  const totalCost = Math.round(fin.costPerAcre * area);
                  const net = gross - totalCost;

                  return (
                    <td
                      key={crop.id}
                      className={`p-3 ${net >= 0 ? 'text-forest-brand' : 'text-rose-600'} ${
                        isPrimary ? 'bg-emerald-50/40' : ''
                      }`}
                    >
                      {net >= 0 ? '+' : ''}₹{net.toLocaleString('en-IN')}
                    </td>
                  );
                })}
              </tr>

              {/* Main Risks */}
              <tr className="hover:bg-slate-50/60">
                <td className="p-3 font-bold text-slate-700 bg-slate-50/40">
                  Key Cultivation Risks
                </td>
                {allComparisonCrops.map(({ crop, isPrimary }) => (
                  <td key={crop.id} className={`p-3 text-[11px] text-slate-600 ${isPrimary ? 'bg-emerald-50/30' : ''}`}>
                    {crop.commonCultivationRisks.slice(0, 2).join('; ')}
                  </td>
                ))}
              </tr>

              {/* Data Confidence / Reference */}
              <tr className="hover:bg-slate-50/60">
                <td className="p-3 font-bold text-slate-700 bg-slate-50/40">
                  Data Confidence
                </td>
                {allComparisonCrops.map(({ crop, isPrimary }) => (
                  <td key={crop.id} className={`p-3 text-[11px] text-slate-500 ${isPrimary ? 'bg-emerald-50/30' : ''}`}>
                    {crop.sources[0]?.organization || 'State Agricultural University Reference'}
                  </td>
                ))}
              </tr>

              {/* Action Buttons */}
              <tr>
                <td className="p-3 bg-slate-50/40"></td>
                {allComparisonCrops.map(({ crop, isPrimary }) => {
                  const isEditing = editingCropId === crop.id;

                  return (
                    <td key={crop.id} className={`p-3 ${isPrimary ? 'bg-emerald-50/30' : ''}`}>
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingCropId(isEditing ? null : crop.id)}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 font-bold text-xs text-slate-700 flex items-center justify-center gap-1"
                        >
                          {isEditing ? <Check className="w-3.5 h-3.5 text-fresh-600" /> : <Edit3 className="w-3.5 h-3.5" />}
                          <span>{isEditing ? 'Save Inputs' : 'Edit Prices'}</span>
                        </button>

                        {!isPrimary && (
                          <button
                            type="button"
                            onClick={() => {
                              onSelectCropToAnalyse(crop.id);
                              onClose();
                            }}
                            className="px-3 py-1.5 rounded-lg bg-forest-brand hover:bg-forest-dark text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm"
                          >
                            <span>Switch Farm To This</span>
                          </button>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 px-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            * Missing parameters display "Not available". All calculations use consistent units.
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-800 font-bold transition border border-slate-300"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
