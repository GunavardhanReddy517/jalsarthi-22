import React, { useState } from 'react';
import {
  Sprout,
  Compass,
  Layers,
  MapPin,
  Calendar,
  Droplets,
  CloudRain,
  TestTube,
  DollarSign,
  TrendingUp,
  AlertCircle,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { FarmInputs, Season, SoilType, AreaUnit, IrrigationSource, WaterAvailability } from '../types';
import { CROPS_DATABASE } from '../data/crops';
import { Language, TRANSLATIONS } from '../data/translations';

interface FarmInputFormProps {
  language: Language;
  initialInputs: FarmInputs;
  onAnalyse: (inputs: FarmInputs) => void;
  onReset: () => void;
}

const INDIAN_STATES = [
  'Karnataka',
  'Maharashtra',
  'Andhra Pradesh',
  'Telangana',
  'Tamil Nadu',
  'Madhya Pradesh',
  'Gujarat',
  'Rajasthan',
  'Uttar Pradesh',
  'Punjab',
  'Haryana',
  'Bihar',
  'West Bengal',
  'Odisha'
];

export const FarmInputForm: React.FC<FarmInputFormProps> = ({
  language,
  initialInputs,
  onAnalyse,
  onReset
}) => {
  const t = TRANSLATIONS[language];
  const [inputs, setInputs] = useState<FarmInputs>(initialInputs);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!inputs.season) {
      newErrors.season = 'Please select a farming season.';
    }
    if (!inputs.soilType) {
      newErrors.soilType = 'Please select your soil type.';
    }
    if (!inputs.cropId) {
      newErrors.cropId = 'Please select a target crop.';
    }
    if (inputs.landArea <= 0 || isNaN(inputs.landArea)) {
      newErrors.landArea = 'Land area must be greater than 0.';
    }
    if (inputs.soilPh !== undefined && (inputs.soilPh < 3 || inputs.soilPh > 11)) {
      newErrors.soilPh = 'Soil pH is typically between 3.5 and 10.0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onAnalyse(inputs);
    }
  };

  // When crop changes, update realistic default yield and price
  const handleCropChange = (cropId: string) => {
    const selectedCrop = CROPS_DATABASE.find((c) => c.id === cropId);
    if (selectedCrop) {
      const avgYield = Math.round(
        (selectedCrop.typicalYieldRangePerAcre[0] + selectedCrop.typicalYieldRangePerAcre[1]) / 2
      );
      const avgPrice = Math.round(
        (selectedCrop.typicalPricePerQuintal[0] + selectedCrop.typicalPricePerQuintal[1]) / 2
      );

      setInputs((prev) => ({
        ...prev,
        cropId,
        expectedYield: avgYield,
        expectedSellingPrice: avgPrice
      }));
    } else {
      setInputs((prev) => ({ ...prev, cropId }));
    }
  };

  return (
    <section id="farm-form" className="py-12 bg-slate-50 border-b border-emerald-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-forest-brand via-fresh-700 to-forest-dark p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold tracking-wide backdrop-blur-sm mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-fresh-200" />
                  {language === 'kn' ? 'ಸ್ಮಾರ್ಟ್ ಇನ್‌ಪುಟ್ ಫಾರ್ಮ್' : 'Interactive Decision Engine'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {t.formTitle}
                </h2>
                <p className="mt-1 text-sm text-emerald-100 font-normal">
                  {t.formSubtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setInputs(initialInputs);
                  setErrors({});
                  onReset();
                }}
                className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.btnResetForm}</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            {/* 1. REQUIRED FIELDS SECTION */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-forest-brand" />
                  <h3 className="font-extrabold text-slate-800 text-base uppercase tracking-wider">
                    {language === 'kn' ? 'ಅಗತ್ಯ ಕ್ಷೇತ್ರಗಳು' : 'Mandatory Agronomic Parameters'}
                  </h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700">
                  {t.requiredBadge}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Season */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-forest-brand" />
                    {t.seasonLabel} *
                  </label>
                  <select
                    value={inputs.season}
                    onChange={(e) => setInputs({ ...inputs, season: e.target.value as Season })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm focus:ring-2 focus:ring-forest-brand focus:border-forest-brand outline-none transition"
                  >
                    <option value="Rainy / Monsoon">{t.seasonMonsoon}</option>
                    <option value="Winter">{t.seasonWinter}</option>
                    <option value="Summer">{t.seasonSummer}</option>
                  </select>
                  {errors.season && (
                    <p className="mt-1 text-xs text-red-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.season}
                    </p>
                  )}
                </div>

                {/* Soil Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-amber-700" />
                    {t.soilTypeLabel} *
                  </label>
                  <select
                    value={inputs.soilType}
                    onChange={(e) => setInputs({ ...inputs, soilType: e.target.value as SoilType })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm focus:ring-2 focus:ring-forest-brand focus:border-forest-brand outline-none transition"
                  >
                    <option value="Sandy Loam">Sandy Loam (ಮರಳು ಮಿಶ್ರಿತ ಗೋಡು)</option>
                    <option value="Loamy">Loamy (ಗೋಡು ಮಣ್ಣು)</option>
                    <option value="Black Soil">Black Soil / Regur (ಕಪ್ಪು ಮಣ್ಣು)</option>
                    <option value="Red Soil">Red Soil (ಕೆಂಪು ಮಣ್ಣು)</option>
                    <option value="Clay Loam">Clay Loam (ಜಿಡ್ಡು ಗೋಡು)</option>
                    <option value="Clay">Clay Soil (ಜಿಡ್ಡು ಮಣ್ಣು)</option>
                    <option value="Sandy">Sandy Soil (ಮರಳು ಮಣ್ಣು)</option>
                  </select>
                  {errors.soilType && (
                    <p className="mt-1 text-xs text-red-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.soilType}
                    </p>
                  )}
                </div>

                {/* Target Crop */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Sprout className="w-4 h-4 text-fresh-600" />
                    {t.cropLabel} *
                  </label>
                  <select
                    value={inputs.cropId}
                    onChange={(e) => handleCropChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm focus:ring-2 focus:ring-forest-brand focus:border-forest-brand outline-none transition"
                  >
                    {CROPS_DATABASE.map((crop) => (
                      <option key={crop.id} value={crop.id}>
                        {language === 'kn' ? crop.kannadaName : crop.name} ({crop.category})
                      </option>
                    ))}
                  </select>
                  {errors.cropId && (
                    <p className="mt-1 text-xs text-red-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.cropId}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 2. LAND & LOCATION SECTION */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-aqua-600" />
                  <h3 className="font-extrabold text-slate-800 text-base uppercase tracking-wider">
                    {language === 'kn' ? 'ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ & ಸ್ಥಳ' : 'Land Size & Location Details'}
                  </h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {t.optionalBadge}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Land Area */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.landAreaLabel} *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={inputs.landArea}
                      onChange={(e) =>
                        setInputs({ ...inputs, landArea: parseFloat(e.target.value) || 0 })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm focus:ring-2 focus:ring-forest-brand focus:border-forest-brand outline-none"
                    />
                  </div>
                  {errors.landArea && (
                    <p className="mt-1 text-xs text-red-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.landArea}
                    </p>
                  )}
                </div>

                {/* Area Unit */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.areaUnitLabel}
                  </label>
                  <select
                    value={inputs.areaUnit}
                    onChange={(e) => setInputs({ ...inputs, areaUnit: e.target.value as AreaUnit })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm focus:ring-2 focus:ring-forest-brand focus:border-forest-brand outline-none"
                  >
                    <option value="acre">{t.acre} (ಎಕರೆ)</option>
                    <option value="hectare">{t.hectare} (ಹೆಕ್ಟೇರ್)</option>
                  </select>
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {t.stateLabel}
                  </label>
                  <select
                    value={inputs.state || 'Karnataka'}
                    onChange={(e) => setInputs({ ...inputs, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm focus:ring-2 focus:ring-forest-brand focus:border-forest-brand outline-none"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.districtLabel}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mandya, Pune, Belagavi"
                    value={inputs.district || ''}
                    onChange={(e) => setInputs({ ...inputs, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm focus:ring-2 focus:ring-forest-brand focus:border-forest-brand outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. WATER & IRRIGATION PROFILE */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <h3 className="font-extrabold text-slate-800 text-base uppercase tracking-wider">
                    {language === 'kn' ? 'ನೀರಾವರಿ & ಪರಿಸರ ಪರಿಸ್ಥಿತಿ' : 'Water Supply & Field History'}
                  </h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {t.optionalBadge}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Planting Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {t.plantingDateLabel}
                  </label>
                  <input
                    type="date"
                    value={inputs.plantingDate || ''}
                    onChange={(e) => setInputs({ ...inputs, plantingDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm focus:ring-2 focus:ring-forest-brand focus:border-forest-brand outline-none"
                  />
                </div>

                {/* Water Availability */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-aqua-600" />
                    {t.waterAvailabilityLabel}
                  </label>
                  <select
                    value={inputs.waterAvailability || 'moderate'}
                    onChange={(e) =>
                      setInputs({
                        ...inputs,
                        waterAvailability: e.target.value as WaterAvailability
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm focus:ring-2 focus:ring-forest-brand focus:border-forest-brand outline-none"
                  >
                    <option value="limited">{t.waterLimited}</option>
                    <option value="moderate">{t.waterModerate}</option>
                    <option value="sufficient">{t.waterSufficient}</option>
                  </select>
                </div>

                {/* Primary Irrigation Source */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.irrigationSourceLabel}
                  </label>
                  <select
                    value={inputs.irrigationSource || 'borewell'}
                    onChange={(e) =>
                      setInputs({
                        ...inputs,
                        irrigationSource: e.target.value as IrrigationSource
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm focus:ring-2 focus:ring-forest-brand focus:border-forest-brand outline-none"
                  >
                    <option value="borewell">Borewell (ಕೊಳವೆ ಬಾವಿ)</option>
                    <option value="canal">Canal (ಕಾಲುವೆ)</option>
                    <option value="open well">Open Well (ತೆರೆದ ಬಾವಿ)</option>
                    <option value="rainfall">Purely Rainfed (ಮಳೆಯಾಶ್ರಿತ)</option>
                    <option value="other">Farm Pond / Tank / Other</option>
                  </select>
                </div>

                {/* Recent Rainfall */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <CloudRain className="w-3.5 h-3.5 text-blue-500" />
                    {t.recentRainfallLabel}
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 25"
                    value={inputs.recentRainfallMm ?? ''}
                    onChange={(e) =>
                      setInputs({
                        ...inputs,
                        recentRainfallMm:
                          e.target.value === '' ? undefined : parseFloat(e.target.value) || 0
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm focus:ring-2 focus:ring-forest-brand focus:border-forest-brand outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 4. SOIL pH, VARIETY & FINANCIAL ASSUMPTIONS */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <h3 className="font-extrabold text-slate-800 text-base uppercase tracking-wider">
                    {language === 'kn' ? 'ಮಣ್ಣಿನ pH & ಆರ್ಥಿಕ ನಿರೀಕ್ಷೆಗಳು' : 'Soil pH & Economic Expectations'}
                  </h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {t.optionalBadge}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Soil pH */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <TestTube className="w-3.5 h-3.5 text-purple-500" />
                    {t.soilPhLabel}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="3.5"
                    max="10"
                    placeholder="e.g. 6.8"
                    value={inputs.soilPh ?? ''}
                    onChange={(e) =>
                      setInputs({
                        ...inputs,
                        soilPh:
                          e.target.value === '' ? undefined : parseFloat(e.target.value) || undefined
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm focus:ring-2 focus:ring-forest-brand focus:border-forest-brand outline-none"
                  />
                  {errors.soilPh && (
                    <p className="mt-1 text-xs text-red-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.soilPh}
                    </p>
                  )}
                </div>

                {/* Variety */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.cropVarietyLabel}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Arka Rakshak, TMV-2, Ganga-11"
                    value={inputs.cropVariety || ''}
                    onChange={(e) => setInputs({ ...inputs, cropVariety: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm focus:ring-2 focus:ring-forest-brand focus:border-forest-brand outline-none"
                  />
                </div>

                {/* Expected Yield */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-fresh-600" />
                    {t.expectedYieldLabel}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={inputs.expectedYield ?? ''}
                    onChange={(e) =>
                      setInputs({
                        ...inputs,
                        expectedYield:
                          e.target.value === '' ? undefined : parseFloat(e.target.value) || 0
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm focus:ring-2 focus:ring-forest-brand focus:border-forest-brand outline-none"
                  />
                </div>

                {/* Expected Price */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                    {t.expectedPriceLabel}
                  </label>
                  <input
                    type="number"
                    min="100"
                    value={inputs.expectedSellingPrice ?? ''}
                    onChange={(e) =>
                      setInputs({
                        ...inputs,
                        expectedSellingPrice:
                          e.target.value === '' ? undefined : parseFloat(e.target.value) || 0
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm focus:ring-2 focus:ring-forest-brand focus:border-forest-brand outline-none"
                  />
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-500 italic">
                {t.ruleBasedNotice}
              </p>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-forest-brand to-fresh-700 hover:from-forest-dark hover:to-fresh-800 text-white font-extrabold text-base tracking-wider uppercase shadow-lg shadow-emerald-900/20 hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Sprout className="w-5 h-5 text-emerald-300" />
                <span>{t.btnAnalyseFarm}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
