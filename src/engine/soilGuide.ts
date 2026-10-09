import { CropData, SoilType, SoilGuideResult } from '../types';

export function getSoilGuide(
  soilType: SoilType,
  crop?: CropData,
  soilPh?: number
): SoilGuideResult {
  let characteristics = '';
  let drainageAndRetention = '';
  const organicMatterRecommendations: string[] = [];
  let mulchingAdvice = '';
  const cropRotationSuggestions: string[] = [];
  const generalNutrientManagement: string[] = [];
  const soilTestingChecklist: string[] = [];

  switch (soilType) {
    case 'Sandy':
      characteristics =
        'Coarse-textured soil with high porosity, low organic matter, and rapid aeration. Tends to dry out quickly and leaches soluble nutrients easily.';
      drainageAndRetention =
        'Excessively fast drainage with low water holding capacity. Irrigation water percolates rapidly past shallow roots.';
      organicMatterRecommendations.push(
        'Incorporate 10-12 tonnes of well-rotted Farm Yard Manure (FYM) or composted pressmud per acre annually.'
      );
      organicMatterRecommendations.push(
        'Apply tank silt (lake silt / pond silt) at 15-20 tonnes/acre to permanently increase clay fraction and water retention.'
      );
      mulchingAdvice =
        'Heavy surface mulching (crop residues, dry leaves, or straw at 3-4 inches thickness) is essential to shield soil from midday solar radiation and retard evaporation.';
      cropRotationSuggestions.push(
        'Rotate with deep-rooted leguminous green manure crops like Sunn hemp (Crotalaria juncea) or Dhaincha (Sesbania aculeata) before major cash crops.'
      );
      break;

    case 'Sandy Loam':
      characteristics =
        'Friable, easily workable soil combining good aeration of sand with adequate moisture and nutrient retention of loam. Highly versatile for vegetables and pulses.';
      drainageAndRetention =
        'Good internal drainage without water stagnation risks. Retains adequate capillary moisture for 4-6 days.';
      organicMatterRecommendations.push(
        'Apply 8-10 tonnes of decomposed cattle manure or 3-4 tonnes vermicompost per acre during secondary tillage.'
      );
      mulchingAdvice =
        'Organic mulching preserves moisture and suppresses weeds during the initial 30-40 days of crop establishment.';
      cropRotationSuggestions.push(
        'Follow cereal-pulse rotations (e.g., Maize followed by Chickpea or Green Gram) to sustain soil fertility.'
      );
      break;

    case 'Loamy':
      characteristics =
        'The gold standard of agricultural soils. Balanced proportions of sand, silt, and clay with rich biological activity and high nutrient exchange capacity.';
      drainageAndRetention =
        'Optimal balance between moisture retention and free gravitational drainage. Excellent root aeration.';
      organicMatterRecommendations.push(
        'Maintain organic carbon levels by incorporating 6-8 tonnes of FYM per acre or returning crop residues directly to the soil.'
      );
      mulchingAdvice =
        'Mulch between crop rows to regulate soil temperature and feed beneficial earthworm and microbial populations.';
      cropRotationSuggestions.push(
        'Rotate between heavy nutrient feeders (e.g., Tomato, Maize) and restorative legumes (e.g., Green Gram, Groundnut).'
      );
      break;

    case 'Clay Loam':
      characteristics =
        'Medium-to-fine textured soil with good nutrient-holding capacity and fertility. Moderately heavy to plow when either too wet or too dry.';
      drainageAndRetention =
        'High water holding capacity with moderate internal drainage. Can become compacted if worked when saturated.';
      organicMatterRecommendations.push(
        'Apply 8 tonnes of FYM or compost along with coarse organic matter to loosen soil consistency and prevent crusting.'
      );
      mulchingAdvice =
        'Light straw mulch prevents crust formation from raindrop impact on bare soil.';
      cropRotationSuggestions.push(
        'Integrate deep-taprooted crops (like Cotton or Pigeonpea) to break subsurface plow pans naturally.'
      );
      break;

    case 'Clay':
      characteristics =
        'Very fine particles, plastic and sticky when wet, hard and cloddy when dry. Extremely rich in mineral nutrients but susceptible to poor aeration.';
      drainageAndRetention =
        'Very slow drainage with significant water stagnation risk during monsoon downpours. High capillary water retention.';
      organicMatterRecommendations.push(
        'Heavy additions of organic compost, coir pith, or sand help loosen dense clay aggregates and promote root penetration.'
      );
      mulchingAdvice =
        'Ensure soil surface is not smothered by impermeable layers; use loose straw mulch to moderate rapid drying and cracking.';
      cropRotationSuggestions.push(
        'Rotate paddy with rabi pulses (Urad, Chickpea) utilizing residual moisture without requiring intensive tillage.'
      );
      break;

    case 'Black Soil':
      characteristics =
        'Deep vertisol soil with high montmorillonite clay content. Highly fertile, self-plowing with deep seasonal cracking during dry periods.';
      drainageAndRetention =
        'Exceptional moisture retention that supports dryland crops across winter. Poor internal drainage when saturated.';
      organicMatterRecommendations.push(
        'Incorporate 5-8 tonnes of FYM per acre. Gypsum application (200-300 kg/acre) improves flocculation and structural stability in sodic black soils.'
      );
      mulchingAdvice =
        'Dust mulching (shallow inter-cultivation) or crop residue mulching seals superficial cracks and prevents deep subsoil evaporation.';
      cropRotationSuggestions.push(
        'Alternate Soybean/Cotton with Wheat, Chickpea, or Sorghum to break pest and disease cycles.'
      );
      break;

    case 'Red Soil':
      characteristics =
        'Formed from crystalline granitic rocks, rich in iron oxides giving distinct red coloration. Generally porous, slightly acidic to neutral, and low in organic nitrogen and phosphorus.';
      drainageAndRetention =
        'Good to rapid drainage, moderate moisture retention. Susceptible to erosion on slopes.';
      organicMatterRecommendations.push(
        'Apply 10 tonnes of FYM or green leaf manuring (Glyricidia, Pongamia) to compensate for low native organic carbon.'
      );
      mulchingAdvice =
        'Organic mulch is highly recommended to protect shallow red soils from intense heat and wind erosion.';
      cropRotationSuggestions.push(
        'Rotate Finger Millet (Ragi) with Groundnut, Cowpea, or Red Gram for sustainable dryland productivity.'
      );
      break;
  }

  // General nutrient management
  generalNutrientManagement.push(
    'Practice Integrated Nutrient Management (INM): Combine organic manure (FYM/vermicompost) with biofertilizers (Azotobacter, Rhizobium, PSB) and targeted mineral fertilizers.'
  );
  generalNutrientManagement.push(
    'Split application of Nitrogen: Avoid single heavy doses. Apply in 2-3 splits matching active crop uptake periods to prevent leaching and volatilization.'
  );
  generalNutrientManagement.push(
    'Incorporate secondary and micronutrients (Zinc, Boron, Sulphur) based on crop sensitivity and regional deficiency patterns rather than blind application.'
  );

  // Soil testing checklist
  soilTestingChecklist.push(
    'Collect soil samples in a zig-zag pattern across the plot from 8-10 spots at 15 cm (plow) depth, avoiding field bunds, compost heaps, and shade trees.'
  );
  soilTestingChecklist.push(
    'Mix sub-samples thoroughly, dry in shade, and prepare a 500g composite sample using the quartering method.'
  );
  soilTestingChecklist.push(
    'Submit to nearest Krishi Vigyan Kendra (KVK) or government Soil Testing Laboratory for Soil Health Card (SHC) parameter testing: pH, EC, Organic Carbon, Available N, P, K, and Micronutrients (Zn, Fe, Cu, Mn, B).'
  );
  soilTestingChecklist.push(
    'Use SHC test results to calculate exact customized fertilizer dosages rather than generic estimates.'
  );

  // pH analysis if provided
  let phAnalysis: SoilGuideResult['phAnalysis'] = undefined;
  if (soilPh !== undefined && soilPh > 0) {
    let status: 'Acidic' | 'Neutral / Optimal' | 'Alkaline' = 'Neutral / Optimal';
    let compatibility = '';
    const corrections: string[] = [];

    if (soilPh < 6.0) {
      status = 'Acidic';
      compatibility = `pH ${soilPh} is moderately acidic. Availability of phosphorus, calcium, and magnesium is reduced, while aluminum/manganese toxicity may arise in sensitive crops.`;
      corrections.push(
        'Apply Agricultural Lime (Calcium Carbonate - CaCO3) or Dolomite (CaMg(CO3)2) as per buffer test recommendations (typically 200-500 kg/acre depending on soil texture).'
      );
      corrections.push(
        'Apply rock phosphate or SSP (Single Superphosphate) along with organic compost to boost phosphorus availability.'
      );
      corrections.push(
        'Grow acid-tolerant crops or varieties like Tea, Potato, Ragi, or Rice until pH is amended.'
      );
    } else if (soilPh > 8.0) {
      status = 'Alkaline';
      compatibility = `pH ${soilPh} is alkaline/sodic. Micronutrients like Zinc, Iron, and Manganese become immobilized and deficient despite being present in soil.`;
      corrections.push(
        'Apply Agricultural Gypsum (Calcium Sulphate - CaSO4.2H2O) at 500-1000 kg/acre to replace exchangeable sodium with calcium, followed by flushing if drainage allows.'
      );
      corrections.push(
        'Incorporate green manures like Dhaincha (Sesbania) which produce organic acids during decomposition, naturally lowering surface pH.'
      );
      corrections.push(
        'Use acid-forming fertilizers such as Ammonium Sulphate or Single Superphosphate rather than alkaline amendments.'
      );
    } else {
      status = 'Neutral / Optimal';
      compatibility = `pH ${soilPh} is within the ideal range (6.0 - 8.0) where most essential plant nutrients remain soluble and readily absorbable.`;
      corrections.push(
        'No major chemical pH correction needed. Focus on maintaining biological soil health through regular additions of organic compost and mulching.'
      );
    }

    if (crop) {
      const [optMin, optMax] = crop.optimalPhRange;
      if (soilPh < optMin) {
        compatibility += ` Note: ${crop.name} prefers a pH between ${optMin} and ${optMax}.`;
      } else if (soilPh > optMax) {
        compatibility += ` Note: ${crop.name} performs best in a pH between ${optMin} and ${optMax}.`;
      } else {
        compatibility += ` Perfectly matched with ${crop.name}'s optimal range (${optMin} - ${optMax}).`;
      }
    }

    phAnalysis = {
      enteredPh: soilPh,
      status,
      cropCompatibility: compatibility,
      correctionPractices: corrections
    };
  }

  return {
    soilName: soilType,
    characteristics,
    drainageAndRetention,
    organicMatterRecommendations,
    mulchingAdvice,
    cropRotationSuggestions,
    generalNutrientManagement,
    soilTestingChecklist,
    phAnalysis
  };
}
