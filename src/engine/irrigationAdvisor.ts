import { CropData, FarmInputs, IrrigationAdvice, SoilType } from '../types';

export function getSoilMoistureCharacteristics(soilType: SoilType): {
  retention: string;
  drainage: string;
  wateringFrequencyTip: string;
} {
  switch (soilType) {
    case 'Sandy':
      return {
        retention: 'Very low water retention. Coarse sand particles drain quickly and lose moisture rapidly under solar radiation.',
        drainage: 'Rapid excessive drainage with significant nutrient leaching vulnerability.',
        wateringFrequencyTip: 'Apply smaller volumes of water at higher frequency (every 2-3 days). Avoid deep flood irrigation.'
      };
    case 'Sandy Loam':
      return {
        retention: 'Moderate moisture retention with good capillary action. Receptive to both furrow and micro-irrigation.',
        drainage: 'Good natural drainage with minimal risk of root rot under standard irrigation.',
        wateringFrequencyTip: 'Water every 4-6 days depending on daytime temperatures and crop stage.'
      };
    case 'Loamy':
      return {
        retention: 'Ideal moisture holding capacity. Balanced mixture of sand, silt, and clay particles.',
        drainage: 'Excellent balanced drainage and healthy root aeration.',
        wateringFrequencyTip: 'Water every 6-8 days under moderate evaporation conditions.'
      };
    case 'Clay Loam':
      return {
        retention: 'High moisture retention capacity. Remains moist for extended intervals after soaking.',
        drainage: 'Moderately slow percolation. Care must be taken not to irrigate while subsurface is wet.',
        wateringFrequencyTip: 'Water every 7-10 days. Always inspect soil 2-3 inches below surface before irrigating.'
      };
    case 'Clay':
      return {
        retention: 'Extremely high moisture retention. Slow release of capillary water to roots.',
        drainage: 'Poor internal drainage; highly vulnerable to standing water and root suffocation.',
        wateringFrequencyTip: 'Water at longer intervals (10-14 days). Never irrigate immediately after unseasonal rain.'
      };
    case 'Black Soil':
      return {
        retention: 'Very high moisture storage capacity (deep vertisol). Swells when wet and develops deep shrinkage cracks when dry.',
        drainage: 'Slow drainage when wet. Cracks allow rapid initial water ingress followed by tight swelling.',
        wateringFrequencyTip: 'Irrigate before deep cracks form. Avoid heavy flooding as standing water damages root health.'
      };
    case 'Red Soil':
      return {
        retention: 'Low to moderate water retention. Generally shallow with open porous structure.',
        drainage: 'Fast to moderate drainage with good aeration.',
        wateringFrequencyTip: 'Irrigate at moderate intervals (4-6 days). Addition of organic manure improves retention noticeably.'
      };
  }
}

export function generateIrrigationAdvice(
  crop: CropData,
  inputs: FarmInputs
): IrrigationAdvice {
  const soilInfo = getSoilMoistureCharacteristics(inputs.soilType);

  // Growth stage determination based on planting date if entered
  let daysFromPlanting = 30; // default mid-vegetative
  if (inputs.plantingDate) {
    const planted = new Date(inputs.plantingDate).getTime();
    const now = Date.now();
    const diffDays = Math.floor((now - planted) / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays <= 400) {
      daysFromPlanting = diffDays;
    }
  }

  // Find active stage
  let activeStage = crop.growthStages[1] || crop.growthStages[0];
  for (const stage of crop.growthStages) {
    if (daysFromPlanting >= stage.durationDays[0] && daysFromPlanting <= stage.durationDays[1]) {
      activeStage = stage;
      break;
    }
  }

  // Rainfall notice
  let rainfallImpactNotice: string | undefined = undefined;
  if (inputs.recentRainfallMm !== undefined) {
    if (inputs.recentRainfallMm > 50) {
      rainfallImpactNotice = `Substantial rainfall (${inputs.recentRainfallMm} mm) recorded recently. Defer scheduled irrigation until the top 3-4 inches of ${inputs.soilType} dries sufficiently. Inspect drains for stagnant water.`;
    } else if (inputs.recentRainfallMm > 15) {
      rainfallImpactNotice = `Moderate rainfall (${inputs.recentRainfallMm} mm) received. Postpone next watering by 2 to 4 days based on field touch test.`;
    } else if (inputs.recentRainfallMm === 0) {
      rainfallImpactNotice = `No recent rainfall reported. Rely fully on scheduled irrigation sources.`;
    } else {
      rainfallImpactNotice = `Light shower (${inputs.recentRainfallMm} mm) recorded; does not replace root-zone irrigation depth.`;
    }
  } else {
    rainfallImpactNotice = `No recent rainfall data entered. Note: Actual irrigation timing must always be verified by checking field soil moisture at root depth.`;
  }

  // Water availability strategy
  let waterAvailabilityAdvice = '';
  if (inputs.waterAvailability === 'limited') {
    waterAvailabilityAdvice =
      'DEFICIT IRRIGATION PROTOCOL: Prioritize water strictly during critical stages (Flowering & Grain/Fruit set). Use alternate furrow irrigation or drip systems to halve conveyance losses. Mulch soil surface immediately.';
  } else if (inputs.waterAvailability === 'sufficient') {
    waterAvailabilityAdvice =
      'FULL IRRIGATION MANAGEMENT: Maintain soil moisture between 60% and 80% of available field capacity. Avoid over-watering as excess water leaches costly nutrients and promotes fungal soil diseases.';
  } else {
    waterAvailabilityAdvice =
      'BALANCED REGIME: Follow regular irrigation cycles adjusted for seasonal temperature. Monitor for weather forecasts before operating pumps.';
  }

  return {
    generalWateringNeeds: `${crop.name} requires approximately ${crop.waterRequirementMm[0]} - ${crop.waterRequirementMm[1]} mm of total water depth across its growing cycle of ${crop.maturityDurationDays[0]}-${crop.maturityDurationDays[1]} days. ${soilInfo.wateringFrequencyTip}`,
    soilMoistureRetention: soilInfo.retention,
    drainageBehaviour: soilInfo.drainage,
    overwateringRisks: [
      'Root zone hypoxia (oxygen starvation) causing yellowing of leaves and root decay',
      'Increased susceptibility to damping-off, collar rot, and Fusarium wilt',
      'Leaching of mobile soil nutrients (especially nitrates and potassium) below root zone',
      'Excessive vegetative growth at the expense of flowers and fruit setting'
    ],
    underwateringRisks: [
      'Flower drop and poor fruit/pod setting during critical reproductive windows',
      'Stunted vegetative growth and premature leaf senescence',
      'Shriveled grains or hollow fruits reducing market grade',
      'Salt concentration buildup around root rhizosphere in dry weather'
    ],
    recommendedMethods: crop.recommendedIrrigationMethods,
    waterSavingPractices: [
      'Install drip irrigation with inline drippers to save 40-50% water and apply soluble fertilizers directly',
      'Apply organic straw or plastic mulch (25-30 micron) to cut soil evaporation by 30-45%',
      'Irrigate during early morning or late evening hours to minimize evaporation losses',
      'Practice Alternate Furrow Irrigation (AFI) for row crops to cut water use by 35% with minimal yield impact',
      'Perform regular inter-cultivation/hoeing to break soil capillary pores and reduce moisture evaporation'
    ],
    growthStageSpecificNeeds: {
      currentStageName: activeStage.name,
      daysFromPlanting,
      stageAdvice: `${activeStage.irrigationGuidance} Management tip: ${activeStage.managementTips}`,
      waterSensitivity: activeStage.waterSensitivity
    },
    rainfallImpactNotice,
    waterAvailabilityAdvice
  };
}
