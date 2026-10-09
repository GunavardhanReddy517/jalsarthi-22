import {
  FarmInputs,
  CropData,
  RecommendationResult,
  AlternativeCropRecommendation,
  SuitabilityCategory,
  ScoreBreakdown
} from '../types';
import { CROPS_DATABASE } from '../data/crops';

export function evaluateCropSuitability(
  crop: CropData,
  inputs: FarmInputs
): RecommendationResult {
  const reasons: string[] = [];
  const limitations: string[] = [];
  const practicalImprovements: string[] = [];
  const missingInformation: string[] = [];

  // 1. Season Scoring (Weight: 30%)
  let seasonScore = 0;
  if (crop.suitableSeasons.includes(inputs.season)) {
    seasonScore = 30;
    reasons.push(
      `Season compatibility: Perfect match. ${crop.name} is ideally suited for ${inputs.season} cultivation in this agro-climatic zone.`
    );
  } else {
    seasonScore = 5;
    limitations.push(
      `Season mismatch: ${crop.name} is conventionally grown in ${crop.suitableSeasons.join(
        ', '
      )}, but you selected ${inputs.season}. Risk of temperature extremes or poor flowering.`
    );
    practicalImprovements.push(
      `If sowing in off-season, select heat/cold-tolerant certified varieties and consider shade nets or micro-irrigation.`
    );
  }

  // 2. Soil Scoring (Weight: 25%)
  let soilScore = 0;
  const isDirectSoilMatch = crop.suitableSoils.includes(inputs.soilType);
  if (isDirectSoilMatch) {
    soilScore = 25;
    reasons.push(
      `Soil suitability: ${inputs.soilType} provides optimal root aeration and nutrient uptake for ${crop.name}.`
    );
  } else {
    // Check heavy soil vs root crops or drainage
    if (
      (inputs.soilType === 'Clay' || inputs.soilType === 'Black Soil') &&
      (crop.id === 'potato' || crop.id === 'groundnut')
    ) {
      soilScore = 8;
      limitations.push(
        `Heavy clay or black soil hardens upon drying and hinders underground tuber/pod development in ${crop.name}. Peg penetration or tuber expansion is restricted.`
      );
      practicalImprovements.push(
        `Cultivate on broad bed furrows (BBF) or ridges, and incorporate 8-10 tonnes of organic compost/sand to improve soil tilth.`
      );
    } else if (inputs.soilType === 'Sandy' && (crop.id === 'rice' || crop.id === 'sugarcane')) {
      soilScore = 5;
      limitations.push(
        `Sandy soil has very low water holding capacity and high percolation loss, making it uneconomical for high water-demand crops like ${crop.name}.`
      );
      practicalImprovements.push(
        `Apply tank silt or bentonite clay, and use heavy mulching to reduce excessive percolation.`
      );
    } else {
      soilScore = 14;
      reasons.push(
        `Soil compatibility: Moderate. ${inputs.soilType} can support ${crop.name} with appropriate management.`
      );
      practicalImprovements.push(
        `Apply 5-8 tonnes of well-decomposed FYM (Farm Yard Manure) per acre to improve soil structure.`
      );
    }
  }

  // 3. Water Availability Scoring (Weight: 25%)
  let waterScore = 0;
  const avgWaterReq = (crop.waterRequirementMm[0] + crop.waterRequirementMm[1]) / 2;

  if (inputs.waterAvailability === 'sufficient') {
    waterScore = 25;
    reasons.push(
      `Water availability: Sufficient supply ensures crop water requirements (${crop.waterRequirementMm[0]}-${crop.waterRequirementMm[1]} mm) can be fully met.`
    );
  } else if (inputs.waterAvailability === 'moderate') {
    if (avgWaterReq > 800) {
      waterScore = 15;
      limitations.push(
        `Moderate water availability is tight for high-demand crops like ${crop.name} (${crop.waterRequirementMm[0]}-${crop.waterRequirementMm[1]} mm). Critical growth stages could face deficit.`
      );
      practicalImprovements.push(
        `Adopt Drip or Alternate Wetting/Drying (AWD) irrigation to cut water usage by 30-40%.`
      );
    } else {
      waterScore = 22;
      reasons.push(
        `Moderate water availability is well-aligned with ${crop.name}'s moderate water footprint (${crop.waterRequirementMm[0]}-${crop.waterRequirementMm[1]} mm).`
      );
    }
  } else if (inputs.waterAvailability === 'limited') {
    if (avgWaterReq > 600) {
      waterScore = 6;
      limitations.push(
        `Critical water risk: Limited water supply is inadequate for ${crop.name} (${avgWaterReq} mm requirement). Yield losses could exceed 40-50% during dry spells.`
      );
      practicalImprovements.push(
        `Prioritize low-water alternatives (such as Ragi, Green Gram, or Mustard) or install precision drip with mulch.`
      );
    } else {
      waterScore = 18;
      reasons.push(
        `Crop is drought-tolerant and can complete its life cycle under limited irrigation with timely critical watering.`
      );
    }
  } else {
    // Missing water availability
    waterScore = 18;
    missingInformation.push(
      `Water availability was not specified. Evaluated assuming normal moderate access.`
    );
  }

  // 4. Drainage Scoring (Weight: 10%)
  let drainageScore = 0;
  if (crop.drainageRequirement === 'Tolerant of waterlogging') {
    drainageScore = 10;
    reasons.push(`Crop is highly tolerant of standing water and waterlogging.`);
  } else if (crop.drainageRequirement === 'Good') {
    if (inputs.soilType === 'Clay' || inputs.soilType === 'Black Soil') {
      drainageScore = 5;
      limitations.push(
        `Poor drainage in heavy clay/black soils poses root aeration and damping-off risks during intense rains.`
      );
      practicalImprovements.push(
        `Form drainage trenches at regular field intervals to channel excess monsoon runoff.`
      );
    } else {
      drainageScore = 10;
      reasons.push(`Drainage conditions match crop aeration requirements.`);
    }
  } else {
    drainageScore = 8;
  }

  // 5. pH and Location/Regional Score (Weight: 10%)
  let phOrRegionalScore = 0;
  if (inputs.soilPh !== undefined && inputs.soilPh > 0) {
    if (inputs.soilPh >= crop.optimalPhRange[0] && inputs.soilPh <= crop.optimalPhRange[1]) {
      phOrRegionalScore = 10;
      reasons.push(
        `Soil pH (${inputs.soilPh}) falls within the optimal physiological range (${crop.optimalPhRange[0]} - ${crop.optimalPhRange[1]}).`
      );
    } else if (inputs.soilPh < crop.optimalPhRange[0]) {
      phOrRegionalScore = 5;
      limitations.push(
        `Soil pH (${inputs.soilPh}) is below the optimal range (${crop.optimalPhRange[0]} - ${crop.optimalPhRange[1]}), indicating slight acidity.`
      );
      practicalImprovements.push(
        `Apply agricultural lime (calcium carbonate) or dolomite as per soil test recommendations to raise pH.`
      );
    } else {
      phOrRegionalScore = 5;
      limitations.push(
        `Soil pH (${inputs.soilPh}) is higher than optimal (${crop.optimalPhRange[0]} - ${crop.optimalPhRange[1]}), indicating alkaline/saline tendencies.`
      );
      practicalImprovements.push(
        `Apply gypsum or organic green manures (Dhaincha/Sunn hemp) to buffer alkalinity.`
      );
    }
  } else {
    phOrRegionalScore = 8;
    missingInformation.push(
      `Soil pH not provided. A laboratory soil health card test is recommended before applying chemical fertilizers.`
    );
  }

  if (!inputs.recentRainfallMm && inputs.recentRainfallMm !== 0) {
    missingInformation.push(
      `Recent rainfall history is unrecorded. Irrigation decisions must rely on manual soil moisture checks.`
    );
  }

  const totalScore = Math.round(
    seasonScore + soilScore + waterScore + drainageScore + phOrRegionalScore
  );

  let suitabilityCategory: SuitabilityCategory = 'Low';
  if (totalScore >= 80) {
    suitabilityCategory = 'High';
  } else if (totalScore >= 55) {
    suitabilityCategory = 'Moderate';
  } else {
    suitabilityCategory = 'Low';
  }

  const scoreBreakdown: ScoreBreakdown = {
    seasonScore,
    soilScore,
    waterScore,
    drainageScore,
    phOrRegionalScore,
    totalScore
  };

  return {
    crop,
    suitabilityCategory,
    suitabilityScore: totalScore,
    scoreBreakdown,
    reasons,
    limitations,
    practicalImprovements,
    missingInformation,
    sources: crop.sources
  };
}

export function getAlternativeCrops(
  selectedCropId: string,
  inputs: FarmInputs
): AlternativeCropRecommendation[] {
  const selectedCrop = CROPS_DATABASE.find((c) => c.id === selectedCropId);
  const otherCrops = CROPS_DATABASE.filter((c) => c.id !== selectedCropId);

  const evaluated = otherCrops.map((crop) => {
    const result = evaluateCropSuitability(crop, inputs);
    return {
      crop,
      result
    };
  });

  // Sort descending by suitability score
  evaluated.sort((a, b) => b.result.suitabilityScore - a.result.suitabilityScore);

  // Take up to top 3 alternatives
  const top3 = evaluated.slice(0, 3);

  return top3.map(({ crop, result }) => {
    // Generate key differences relative to selected crop
    let diff = '';
    if (selectedCrop) {
      const avgSelectedWater =
        (selectedCrop.waterRequirementMm[0] + selectedCrop.waterRequirementMm[1]) / 2;
      const avgAltWater = (crop.waterRequirementMm[0] + crop.waterRequirementMm[1]) / 2;
      const waterDiff = avgAltWater - avgSelectedWater;

      if (waterDiff < -150) {
        diff = `Uses significantly less water (approx. ${Math.abs(
          Math.round(waterDiff)
        )} mm lower than ${selectedCrop.name}). Ideal for water risk mitigation.`;
      } else if (waterDiff > 150) {
        diff = `Requires approximately ${Math.round(waterDiff)} mm more water than ${
          selectedCrop.name
        }, requiring reliable irrigation.`;
      } else {
        diff = `Comparable water demand to ${selectedCrop.name}, but differs in market demand and maturity window.`;
      }

      const avgSelectedDuration =
        (selectedCrop.maturityDurationDays[0] + selectedCrop.maturityDurationDays[1]) / 2;
      const avgAltDuration =
        (crop.maturityDurationDays[0] + crop.maturityDurationDays[1]) / 2;
      const daysDiff = avgAltDuration - avgSelectedDuration;

      if (daysDiff < -20) {
        diff += ` Matures ~${Math.abs(Math.round(daysDiff))} days earlier, vacating land quickly for a follow-up crop.`;
      } else if (daysDiff > 20) {
        diff += ` Longer duration crop (~${Math.round(daysDiff)} days longer) with extended field occupancy.`;
      }
    }

    return {
      crop,
      suitabilityCategory: result.suitabilityCategory,
      suitabilityScore: result.suitabilityScore,
      reasons: result.reasons.slice(0, 2),
      advantages: [
        `Suitable for ${crop.suitableSeasons.join('/')}`,
        `Typical maturity: ${crop.maturityDurationDays[0]} - ${crop.maturityDurationDays[1]} days`,
        `Estimated yield: ${crop.typicalYieldRangePerAcre[0]} - ${crop.typicalYieldRangePerAcre[1]} Qtl/acre`
      ],
      limitations: result.limitations.slice(0, 2),
      waterGuidance: `Requires ${crop.waterRequirementMm[0]} - ${crop.waterRequirementMm[1]} mm water throughout life cycle. Best irrigated via ${crop.recommendedIrrigationMethods.join(
        ' or '
      )}.`,
      maturityRange: `${crop.maturityDurationDays[0]} - ${crop.maturityDurationDays[1]} days`,
      estimatedCostRange: `₹${crop.typicalCostPerAcre[0].toLocaleString('en-IN')} - ₹${crop.typicalCostPerAcre[1].toLocaleString('en-IN')}/acre`,
      estimatedYieldRange: `${crop.typicalYieldRangePerAcre[0]} - ${crop.typicalYieldRangePerAcre[1]} Quintals/acre`,
      keyDifferencesFromSelected: diff || `Provides alternative crop rotation and market diversification.`
    };
  });
}
