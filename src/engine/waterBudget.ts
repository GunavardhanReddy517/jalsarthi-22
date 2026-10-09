import { CropData, WaterBudgetResult, AreaUnit } from '../types';

export const ACRE_TO_SQ_METERS = 4046.8564224;
export const HECTARE_TO_ACRES = 2.47105;

/**
 * Converts land area to acres
 */
export function convertAreaToAcres(area: number, unit: AreaUnit): number {
  if (area <= 0) return 0;
  return unit === 'hectare' ? area * HECTARE_TO_ACRES : area;
}

/**
 * 1 mm of water depth over 1 acre = 4.046856 m³ = 4,046.856 litres
 * 1 mm depth over 1 m² = 1 litre = 0.001 m³
 */
export function calculateWaterBudget(
  crop: CropData | undefined,
  waterVolume: number, // volume entered
  volumeUnit: 'litres' | 'cubic_metres',
  landArea: number,
  areaUnit: AreaUnit,
  planningPeriodDays: number = 30 // default 30-day window
): WaterBudgetResult {
  const safeArea = Math.max(0, landArea);
  const areaInAcres = convertAreaToAcres(safeArea, areaUnit);

  let volumeInLitres = 0;
  let volumeInCubicMetres = 0;

  if (waterVolume > 0) {
    if (volumeUnit === 'litres') {
      volumeInLitres = waterVolume;
      volumeInCubicMetres = waterVolume / 1000;
    } else {
      volumeInCubicMetres = waterVolume;
      volumeInLitres = waterVolume * 1000;
    }
  }

  if (areaInAcres <= 0 || !crop) {
    return {
      waterVolumeEntered: waterVolume,
      volumeUnit,
      volumeInCubicMetres,
      volumeInLitres,
      landAreaInAcres: 0,
      waterPerAcreCubicMetres: 0,
      waterPerAcreMmEquivalent: 0,
      cropRequirementMm: 0,
      periodDays: planningPeriodDays,
      deficitOrSurplusMm: 0,
      deficitOrSurplusCubicMetres: 0,
      isCompatible: false,
      status: 'Insufficient Data',
      recommendations: ['Please enter a valid land area and select a target crop to simulate water budget.']
    };
  }

  // Water per acre
  const waterPerAcreCubicMetres = volumeInCubicMetres / areaInAcres;
  // 1 mm depth on 1 acre = 4.046856 m³
  const waterPerAcreMmEquivalent = waterPerAcreCubicMetres / 4.046856;

  // Crop water demand estimation for period
  const avgDuration = (crop.maturityDurationDays[0] + crop.maturityDurationDays[1]) / 2;
  const avgCycleWaterMm = (crop.waterRequirementMm[0] + crop.waterRequirementMm[1]) / 2;
  const dailyRequirementMm = avgCycleWaterMm / avgDuration;
  const periodRequirementMm = Math.round(dailyRequirementMm * planningPeriodDays);

  const deficitOrSurplusMm = Math.round((waterPerAcreMmEquivalent - periodRequirementMm) * 10) / 10;
  const deficitOrSurplusCubicMetres = Math.round(deficitOrSurplusMm * 4.046856 * areaInAcres);

  const isCompatible = deficitOrSurplusMm >= -15; // Within 15mm tolerable deficit
  let status: WaterBudgetResult['status'] = 'Adequate';
  if (deficitOrSurplusMm > 20) {
    status = 'Surplus';
  } else if (deficitOrSurplusMm < -20) {
    status = 'Deficit';
  } else {
    status = 'Adequate';
  }

  const recommendations: string[] = [];
  if (status === 'Deficit') {
    recommendations.push(
      `Water Deficit Warning: Available water provides only ${Math.round(
        waterPerAcreMmEquivalent
      )} mm compared to the required ${periodRequirementMm} mm for ${planningPeriodDays} days.`
    );
    recommendations.push(
      'Adopt micro-drip irrigation immediately: Drip systems deliver water directly to the root zone at 90-95% application efficiency, reducing volumetric requirement by 35-50%.'
    );
    recommendations.push(
      'Apply organic straw or silver-black plastic mulch to reduce surface evaporation losses by up to 40%.'
    );
    recommendations.push(
      'Consider staggering sowing or downsizing irrigated acreage to match available storage capacity safely.'
    );
  } else if (status === 'Surplus') {
    recommendations.push(
      `Comfortable Water Reserve: Available water depth (${Math.round(
        waterPerAcreMmEquivalent
      )} mm) exceeds planned requirement (${periodRequirementMm} mm).`
    );
    recommendations.push(
      'Avoid over-irrigation. Excessive watering causes root rot, nutrient leaching, and unnecessary pump electricity or fuel expenditure.'
    );
    recommendations.push(
      'Surplus water could support intercropping (e.g. pulses or short-duration vegetables) or extend to a subsequent rabi crop.'
    );
  } else {
    recommendations.push(
      `Balanced Budget: Entered water volume matches crop requirements for the ${planningPeriodDays}-day window with disciplined scheduling.`
    );
    recommendations.push(
      'Monitor weather forecasts: If rainfall occurs, defer scheduled irrigation to save reservoir reserves.'
    );
  }

  return {
    waterVolumeEntered: waterVolume,
    volumeUnit,
    volumeInCubicMetres: Math.round(volumeInCubicMetres * 100) / 100,
    volumeInLitres: Math.round(volumeInLitres),
    landAreaInAcres: Math.round(areaInAcres * 100) / 100,
    waterPerAcreCubicMetres: Math.round(waterPerAcreCubicMetres * 10) / 10,
    waterPerAcreMmEquivalent: Math.round(waterPerAcreMmEquivalent * 10) / 10,
    cropRequirementMm: periodRequirementMm,
    periodDays: planningPeriodDays,
    deficitOrSurplusMm,
    deficitOrSurplusCubicMetres,
    isCompatible,
    status,
    recommendations
  };
}
