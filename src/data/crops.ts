import { CropData } from '../types';

export const CROPS_DATABASE: CropData[] = [
  {
    id: 'tomato',
    name: 'Tomato',
    kannadaName: 'ಟೊಮೆಟೊ (Tomato)',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetable',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    description: 'High-value horticultural crop widely grown across India. Highly responsive to drip irrigation and well-drained fertile soils.',
    suitableSeasons: ['Summer', 'Rainy / Monsoon', 'Winter'],
    suitableSoils: ['Sandy Loam', 'Loamy', 'Red Soil', 'Clay Loam'],
    waterRequirementMm: [400, 600],
    drainageRequirement: 'Good',
    maturityDurationDays: [110, 140],
    optimalPhRange: [6.0, 7.0],
    growthStages: [
      {
        name: 'Nursery & Transplanting',
        durationDays: [0, 25],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Light, frequent watering in nursery beds; immediate watering after field transplanting.',
        managementTips: 'Use healthy 25-day-old seedlings. Treat roots with Trichoderma viride to prevent damping-off.'
      },
      {
        name: 'Establishment & Early Vegetative',
        durationDays: [25, 45],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Maintain steady moisture (5-7 day interval for furrow, daily 1-2 hours for drip). Avoid water stagnation.',
        managementTips: 'Stake plants early. Carry out initial weeding and apply basal organic manure.'
      },
      {
        name: 'Flowering & Fruit Setting',
        durationDays: [45, 75],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Most moisture-sensitive stage. Water stress causes blossom drop; excessive watering causes vegetative excess.',
        managementTips: 'Provide balanced potassium and boron to enhance fruit set. Keep drip lines clean.'
      },
      {
        name: 'Fruit Enlargement',
        durationDays: [75, 105],
        waterSensitivity: 'High',
        irrigationGuidance: 'Uniform irrigation is essential. Irregular watering leads to Blossom End Rot and fruit cracking.',
        managementTips: 'Apply calcium nitrate if blossom end rot appears. Monitor for fruit borer.'
      },
      {
        name: 'Maturity & Harvesting',
        durationDays: [105, 140],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Gradually reduce irrigation 4-5 days prior to picking to improve shelf life and firmness.',
        managementTips: 'Harvest at breaker or pink stage for distant markets, and ripe stage for immediate local sales.'
      }
    ],
    nutrientRequirements: {
      n: '40 - 50 kg',
      p: '25 - 30 kg',
      k: '30 - 40 kg',
      guidelines: 'Split nitrogen: 50% basal, 25% at 30 days, 25% at 55 days. Apply 10 tonnes well-decomposed Farm Yard Manure (FYM) per acre.'
    },
    commonCultivationRisks: [
      'Bacterial wilt and early blight in humid rainy seasons',
      'Fruit cracking due to irregular irrigation intervals',
      'Blossom end rot caused by calcium deficiency and erratic watering',
      'Price volatility in open wholesale markets'
    ],
    typicalYieldRangePerAcre: [140, 240], // quintals (14 - 24 tonnes)
    typicalCostPerAcre: [35000, 55000], // INR
    typicalPricePerQuintal: [800, 2200], // INR
    recommendedIrrigationMethods: ['Drip Irrigation with fertigation', 'Furrow Irrigation'],
    sources: [
      {
        organization: 'ICAR - Indian Institute of Horticultural Research (IIHR), Bengaluru',
        publication: 'Package of Practices for Commercial Vegetable Crops',
        year: 2023
      },
      {
        organization: 'University of Horticultural Sciences (UHS), Bagalkot',
        publication: 'Horticultural Crop Management Guide',
        year: 2022
      }
    ]
  },
  {
    id: 'groundnut',
    name: 'Groundnut / Peanut',
    kannadaName: 'ಕಡಲೆಕಾಯಿ (Groundnut)',
    scientificName: 'Arachis hypogaea',
    category: 'Oilseed',
    image: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&w=800&q=80',
    description: 'Vital oilseed and cash crop well-suited to light, well-drained sandy loam and red soils. Highly valued for oil and fodder.',
    suitableSeasons: ['Rainy / Monsoon', 'Summer'],
    suitableSoils: ['Sandy Loam', 'Loamy', 'Red Soil'],
    waterRequirementMm: [400, 550],
    drainageRequirement: 'Good',
    maturityDurationDays: [100, 120],
    optimalPhRange: [6.0, 7.5],
    growthStages: [
      {
        name: 'Germination & Emergence',
        durationDays: [0, 15],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Pre-sowing irrigation or adequate soil moisture needed for uniform germination.',
        managementTips: 'Treat seeds with Rhizobium culture and Trichoderma.'
      },
      {
        name: 'Vegetative Growth',
        durationDays: [15, 35],
        waterSensitivity: 'Low',
        irrigationGuidance: 'Moderate water deficit during early vegetative growth promotes deep root penetration.',
        managementTips: 'Inter-cultivation and hand weeding before pegging begins.'
      },
      {
        name: 'Flowering & Peg Penetration',
        durationDays: [35, 60],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Crucial stage. Moisture stress prevents peg entry into the soil, sharply reducing pod formation.',
        managementTips: 'Do not disturb soil with mechanical implements after pegging starts.'
      },
      {
        name: 'Pod Development & Seed Filling',
        durationDays: [60, 95],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Adequate moisture prevents ill-filled pods (pops). Irrigate at 7-10 day intervals.',
        managementTips: 'Apply gypsum at 200 kg/acre at pegging stage for calcium enrichment.'
      },
      {
        name: 'Maturity & Pod Drying',
        durationDays: [95, 120],
        waterSensitivity: 'Low',
        irrigationGuidance: 'Withhold irrigation 7-10 days before harvest. Light watering 1-2 days before pulling eases harvesting in dry soil.',
        managementTips: 'Harvest when inner shell turns dark brownish.'
      }
    ],
    nutrientRequirements: {
      n: '10 - 15 kg',
      p: '20 - 25 kg',
      k: '15 - 20 kg',
      guidelines: 'Gypsum (200 kg/acre) at 40-45 DAS is mandatory for shell calcification and kernel development.'
    },
    commonCultivationRisks: [
      'Tikka leaf spot and collar rot in humid wet weather',
      'Pegging failure if soil becomes hard and dry',
      'Aflatoxin contamination if pods are stored with excess moisture'
    ],
    typicalYieldRangePerAcre: [8, 16], // quintals (800 - 1600 kg)
    typicalCostPerAcre: [18000, 26000], // INR
    typicalPricePerQuintal: [5500, 7200], // INR
    recommendedIrrigationMethods: ['Sprinkler Irrigation', 'Check Basin / Border Strip'],
    sources: [
      {
        organization: 'ICAR - Directorate of Groundnut Research (DGR), Junagadh',
        publication: 'Good Agricultural Practices for Groundnut',
        year: 2023
      },
      {
        organization: 'University of Agricultural Sciences (UAS), Dharwad',
        publication: 'Oilseeds Package of Practices',
        year: 2022
      }
    ]
  },
  {
    id: 'maize',
    name: 'Maize / Corn',
    kannadaName: 'ಮೆಕ್ಕೆಜೋಳ (Maize)',
    scientificName: 'Zea mays',
    category: 'Cereal',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    description: 'High-yielding staple cereal and cattle/poultry feed crop. Adaptable to diverse soil types with moderate water needs.',
    suitableSeasons: ['Rainy / Monsoon', 'Winter', 'Summer'],
    suitableSoils: ['Loamy', 'Clay Loam', 'Black Soil', 'Red Soil', 'Sandy Loam'],
    waterRequirementMm: [450, 650],
    drainageRequirement: 'Good',
    maturityDurationDays: [95, 115],
    optimalPhRange: [6.0, 7.8],
    growthStages: [
      {
        name: 'Germination & Seedling',
        durationDays: [0, 15],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Ensure good moisture at planting. Avoid waterlogging which rots seedlings.',
        managementTips: 'Plant at 60 cm x 20 cm spacing with certified hybrid seeds.'
      },
      {
        name: 'Knee-High Stage',
        durationDays: [15, 35],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Irrigate at 8-10 day intervals depending on soil texture.',
        managementTips: 'Top dress 1st split of Urea and earthing up to prevent lodging.'
      },
      {
        name: 'Tasseling & Silking',
        durationDays: [35, 65],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Most critical stage. Even 2-3 days of severe drought causes pollen sterility and empty cobs.',
        managementTips: 'Inspect for Fall Armyworm (Spodoptera frugiperda) and manage promptly.'
      },
      {
        name: 'Milking & Dough Stage',
        durationDays: [65, 90],
        waterSensitivity: 'High',
        irrigationGuidance: 'Maintain steady moisture to ensure full grain weight and cob filling.',
        managementTips: 'Ensure proper drainage if unexpected heavy downpours occur.'
      },
      {
        name: 'Maturity & Cob Drying',
        durationDays: [90, 115],
        waterSensitivity: 'Low',
        irrigationGuidance: 'Stop irrigation when black layer forms at the tip of the grain.',
        managementTips: 'Harvest when husk turns straw-colored and dry.'
      }
    ],
    nutrientRequirements: {
      n: '45 - 60 kg',
      p: '25 - 30 kg',
      k: '15 - 20 kg',
      guidelines: 'Nitrogen split: 25% basal, 50% at knee-high stage (30 DAS), 25% at tasseling (50 DAS).'
    },
    commonCultivationRisks: [
      'Fall Armyworm attack during early to mid vegetative stages',
      'Water stagnation causing root asphyxiation in heavy clay',
      'Moisture deficit during tasseling leading to poor grain fill'
    ],
    typicalYieldRangePerAcre: [22, 35], // quintals (2200 - 3500 kg)
    typicalCostPerAcre: [16000, 24000], // INR
    typicalPricePerQuintal: [1950, 2500], // INR
    recommendedIrrigationMethods: ['Furrow Irrigation', 'Drip Irrigation', 'Sprinkler'],
    sources: [
      {
        organization: 'ICAR - Indian Institute of Maize Research (IIMR), Ludhiana',
        publication: 'Standard Maize Cultivation Manual',
        year: 2023
      },
      {
        organization: 'UAS Bengaluru',
        publication: 'Field Crops Guide',
        year: 2023
      }
    ]
  },
  {
    id: 'green_gram',
    name: 'Green Gram / Moong',
    kannadaName: 'ಹೆಸರುಕಾಳು (Moong)',
    scientificName: 'Vigna radiata',
    category: 'Pulse',
    image: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=800&q=80',
    description: 'Short-duration, drought-hardy legume that enriches soil through atmospheric nitrogen fixation. Ideal for crop rotations.',
    suitableSeasons: ['Summer', 'Rainy / Monsoon'],
    suitableSoils: ['Sandy Loam', 'Loamy', 'Black Soil', 'Red Soil'],
    waterRequirementMm: [250, 350],
    drainageRequirement: 'Good',
    maturityDurationDays: [60, 75],
    optimalPhRange: [6.5, 7.5],
    growthStages: [
      {
        name: 'Germination',
        durationDays: [0, 8],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Light pre-sowing irrigation or moist soil bed is adequate.',
        managementTips: 'Rhizobium seed inoculation provides 30% of nitrogen needs.'
      },
      {
        name: 'Vegetative Growth',
        durationDays: [8, 25],
        waterSensitivity: 'Low',
        irrigationGuidance: 'Only 1 irrigation needed if soil is dry; excessive water induces heavy foliage without pods.',
        managementTips: 'Hand weeding at 15-20 days.'
      },
      {
        name: 'Flowering & Pod Initiation',
        durationDays: [25, 45],
        waterSensitivity: 'High',
        irrigationGuidance: 'Crucial irrigation window. Provide 1 life-saving watering if rain ceases.',
        managementTips: 'Spray 2% DAP or pulse wonder to maximize flower retention.'
      },
      {
        name: 'Pod Filling & Maturity',
        durationDays: [45, 70],
        waterSensitivity: 'Low',
        irrigationGuidance: 'Do not over-irrigate during ripening; pods will shatter or re-flower.',
        managementTips: 'Pick mature pods in 1 or 2 pickings before shell dehiscing.'
      }
    ],
    nutrientRequirements: {
      n: '8 - 10 kg',
      p: '16 - 20 kg',
      k: '8 - 10 kg',
      guidelines: 'Basal application only. Fixes atmospheric nitrogen, requiring minimal synthetic N.'
    },
    commonCultivationRisks: [
      'Yellow Mosaic Virus spread by whitefly',
      'Pod borer damage during pod formation',
      'Heavy rain at maturity causing pod sprouting'
    ],
    typicalYieldRangePerAcre: [4, 7], // quintals
    typicalCostPerAcre: [8000, 13000], // INR
    typicalPricePerQuintal: [6800, 8800], // INR
    recommendedIrrigationMethods: ['Sprinkler Irrigation', 'Border Strip'],
    sources: [
      {
        organization: 'ICAR - Indian Institute of Pulses Research (IIPR), Kanpur',
        publication: 'Mungbean Production Technology',
        year: 2023
      }
    ]
  },
  {
    id: 'black_gram',
    name: 'Black Gram / Urad',
    kannadaName: 'ಉದ್ದಿನಕಾಳು (Urad)',
    scientificName: 'Vigna mungo',
    category: 'Pulse',
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=800&q=80',
    description: 'High-protein pulse crop that thrives in tropical and subtropical regions. Enhances soil structure and fertility.',
    suitableSeasons: ['Rainy / Monsoon', 'Summer', 'Winter'],
    suitableSoils: ['Black Soil', 'Clay Loam', 'Loamy', 'Red Soil'],
    waterRequirementMm: [250, 400],
    drainageRequirement: 'Good',
    maturityDurationDays: [70, 85],
    optimalPhRange: [6.5, 7.8],
    growthStages: [
      {
        name: 'Germination',
        durationDays: [0, 10],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Requires adequate moisture for quick seed activation.',
        managementTips: 'Seed treatment with bio-fertilizers.'
      },
      {
        name: 'Vegetative Phase',
        durationDays: [10, 30],
        waterSensitivity: 'Low',
        irrigationGuidance: 'Can tolerate dry spells. Give 1 light watering if soil cracks.',
        managementTips: 'Weed control in first 3 weeks is crucial.'
      },
      {
        name: 'Flowering & Pod Setting',
        durationDays: [30, 55],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Provide life-saving irrigation at 30-35 DAS if no rain occurs.',
        managementTips: 'Foliar spray of 1% KNO3 to boost pod filling.'
      },
      {
        name: 'Pod Maturation & Harvest',
        durationDays: [55, 80],
        waterSensitivity: 'Low',
        irrigationGuidance: 'Withhold water to facilitate even drying.',
        managementTips: 'Harvest when 80% pods turn black.'
      }
    ],
    nutrientRequirements: {
      n: '8 - 12 kg',
      p: '16 - 20 kg',
      k: '8 - 10 kg',
      guidelines: 'All applied as basal dose at time of sowing.'
    },
    commonCultivationRisks: [
      'Powdery mildew and Cercospora leaf spot in cool humid weather',
      'Water stagnation in heavy black soils causing root decay'
    ],
    typicalYieldRangePerAcre: [4, 8], // quintals
    typicalCostPerAcre: [9000, 14000], // INR
    typicalPricePerQuintal: [6500, 8500], // INR
    recommendedIrrigationMethods: ['Check Basin', 'Sprinkler'],
    sources: [
      {
        organization: 'ICAR - Indian Institute of Pulses Research (IIPR), Kanpur',
        publication: 'Pulses Production and Protection Guide',
        year: 2023
      }
    ]
  },
  {
    id: 'rice',
    name: 'Rice / Paddy',
    kannadaName: 'ಭತ್ತ (Paddy/Rice)',
    scientificName: 'Oryza sativa',
    category: 'Cereal',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80',
    description: 'Primary staple food crop of India. Requires high water availability, clayey water-retaining soils, or System of Rice Intensification (SRI).',
    suitableSeasons: ['Rainy / Monsoon', 'Summer'],
    suitableSoils: ['Clay', 'Clay Loam', 'Black Soil', 'Loamy'],
    waterRequirementMm: [1100, 1400],
    drainageRequirement: 'Tolerant of waterlogging',
    maturityDurationDays: [120, 150],
    optimalPhRange: [5.5, 7.0],
    growthStages: [
      {
        name: 'Nursery & Transplanting',
        durationDays: [0, 25],
        waterSensitivity: 'High',
        irrigationGuidance: 'Continuous thin film of 2-3 cm water in nursery; 3-5 cm in puddle field during transplanting.',
        managementTips: 'Transplant 2-3 seedlings per hill at 20 cm x 15 cm spacing.'
      },
      {
        name: 'Tillering Phase',
        durationDays: [25, 55],
        waterSensitivity: 'High',
        irrigationGuidance: 'Alternate Wetting and Drying (AWD) can save 25-30% water without reducing yield.',
        managementTips: 'Apply second split of nitrogen; weed with cono-weeder.'
      },
      {
        name: 'Panicle Initiation & Booting',
        durationDays: [55, 85],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Critical stage. Maintain 3-5 cm standing water. Water stress results in high spikelet sterility.',
        managementTips: 'Monitor for stem borer and leaf folder.'
      },
      {
        name: 'Flowering & Grain Filling',
        durationDays: [85, 115],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Keep soil saturated. Water shortage leads to unfilled grains (chaffy paddy).',
        managementTips: 'Avoid insecticides during peak active pollination.'
      },
      {
        name: 'Ripening & Harvest',
        durationDays: [115, 145],
        waterSensitivity: 'Low',
        irrigationGuidance: 'Drain water completely 10-14 days before harvest to facilitate mechanical harvesting.',
        managementTips: 'Harvest when 85% of panicles turn golden yellow.'
      }
    ],
    nutrientRequirements: {
      n: '40 - 55 kg',
      p: '20 - 25 kg',
      k: '20 - 25 kg',
      guidelines: 'Split nitrogen: 50% basal/active tillering, 25% panicle initiation, 25% heading. Apply Zinc Sulphate 10 kg/acre.'
    },
    commonCultivationRisks: [
      'High vulnerability to drought or irregular canal releases',
      'Blast disease and bacterial leaf blight during cloudy damp weather',
      'Stem borer and brown planthopper attacks'
    ],
    typicalYieldRangePerAcre: [20, 32], // quintals (2000 - 3200 kg)
    typicalCostPerAcre: [22000, 32000], // INR
    typicalPricePerQuintal: [2183, 2800], // Minimum Support Price benchmark
    recommendedIrrigationMethods: ['Alternate Wetting and Drying (AWD)', 'Flooding / Basin'],
    sources: [
      {
        organization: 'ICAR - National Rice Research Institute (NRRI), Cuttack',
        publication: 'Rice Production Technologies for India',
        year: 2023
      },
      {
        organization: 'UAS Bengaluru & Dharwad',
        publication: 'Paddy Package of Practices',
        year: 2023
      }
    ]
  },
  {
    id: 'ragi',
    name: 'Ragi / Finger Millet',
    kannadaName: 'ರಾಗಿ (Finger Millet)',
    scientificName: 'Eleusine coracana',
    category: 'Millet',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    description: 'Climate-resilient super-millet with high calcium and iron content. Requires minimal water and survives prolonged dry spells.',
    suitableSeasons: ['Rainy / Monsoon', 'Summer'],
    suitableSoils: ['Red Soil', 'Sandy Loam', 'Loamy', 'Clay Loam'],
    waterRequirementMm: [300, 450],
    drainageRequirement: 'Good',
    maturityDurationDays: [95, 115],
    optimalPhRange: [5.5, 7.5],
    growthStages: [
      {
        name: 'Germination & Seedling',
        durationDays: [0, 20],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Light irrigation or sowing with onset of monsoon rains.',
        managementTips: 'Direct sowing with seed drill or transplant 20-day seedlings.'
      },
      {
        name: 'Tillering Phase',
        durationDays: [20, 45],
        waterSensitivity: 'Low',
        irrigationGuidance: 'Drought-tolerant. 1 light watering during extended dry breaks is beneficial.',
        managementTips: 'Inter-cultivation with bullock/power weeder at 25-30 days.'
      },
      {
        name: 'Earhead Emergence & Flowering',
        durationDays: [45, 70],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Critical period for earhead size and grain numbers.',
        managementTips: 'Provide life-saving irrigation if monsoon fails.'
      },
      {
        name: 'Grain Filling & Maturity',
        durationDays: [70, 110],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Grain hardening requires dry weather.',
        managementTips: 'Harvest when earheads turn brown and dry.'
      }
    ],
    nutrientRequirements: {
      n: '20 - 30 kg',
      p: '15 - 20 kg',
      k: '10 - 15 kg',
      guidelines: 'Incorporate 5 tonnes FYM per acre. Split N into basal and 30 DAS.'
    },
    commonCultivationRisks: [
      'Blast disease during prolonged cloudy weather',
      'Bird damage during grain maturity',
      'Lodging in tall traditional varieties with excessive nitrogen'
    ],
    typicalYieldRangePerAcre: [12, 20], // quintals
    typicalCostPerAcre: [11000, 17000], // INR
    typicalPricePerQuintal: [3846, 4500], // MSP benchmark
    recommendedIrrigationMethods: ['Border Strip', 'Sprinkler', 'Rainfed with life-saving irrigation'],
    sources: [
      {
        organization: 'ICAR - Indian Institute of Millets Research (IIMR), Hyderabad',
        publication: 'Millets Production Compendium',
        year: 2023
      },
      {
        organization: 'UAS Bengaluru',
        publication: 'Package of Practices for Finger Millet',
        year: 2023
      }
    ]
  },
  {
    id: 'wheat',
    name: 'Wheat',
    kannadaName: 'ಗೋಧಿ (Wheat)',
    scientificName: 'Triticum aestivum',
    category: 'Cereal',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    description: 'Major rabi (winter) cereal crop of North and Central India requiring cool climate during vegetative growth and warm weather during ripening.',
    suitableSeasons: ['Winter'],
    suitableSoils: ['Loamy', 'Clay Loam', 'Black Soil', 'Sandy Loam'],
    waterRequirementMm: [350, 500],
    drainageRequirement: 'Good',
    maturityDurationDays: [110, 135],
    optimalPhRange: [6.0, 7.5],
    growthStages: [
      {
        name: 'Crown Root Initiation (CRI)',
        durationDays: [0, 25],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Most critical stage at 20-25 DAS. Delay reduces tillers and yield drastically.',
        managementTips: 'Ensure uniform seed depth (4-5 cm).'
      },
      {
        name: 'Tillering & Jointing',
        durationDays: [25, 55],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Second irrigation at jointing stage (40-45 DAS).',
        managementTips: 'Apply second dose of nitrogen.'
      },
      {
        name: 'Flowering & Boot Stage',
        durationDays: [55, 80],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Third critical irrigation at boot/flowering (60-65 DAS).',
        managementTips: 'Check for rusts and foliar blights.'
      },
      {
        name: 'Milking & Dough Stage',
        durationDays: [80, 110],
        waterSensitivity: 'High',
        irrigationGuidance: 'Irrigate at grain filling. Avoid windy days to prevent lodging.',
        managementTips: 'Monitor for terminal heat stress.'
      },
      {
        name: 'Maturity',
        durationDays: [110, 135],
        waterSensitivity: 'Low',
        irrigationGuidance: 'Withhold irrigation to enable grain drying.',
        managementTips: 'Harvest when grain moisture drops below 14%.'
      }
    ],
    nutrientRequirements: {
      n: '45 - 55 kg',
      p: '25 - 30 kg',
      k: '15 - 20 kg',
      guidelines: 'Half N + full P & K basal; remaining half N top-dressed at first irrigation.'
    },
    commonCultivationRisks: [
      'Terminal heat stress in late-sown wheat during March',
      'Yellow and brown rust infestations',
      'Lodging caused by high winds after irrigation'
    ],
    typicalYieldRangePerAcre: [16, 24], // quintals
    typicalCostPerAcre: [14000, 20000], // INR
    typicalPricePerQuintal: [2275, 2700], // MSP benchmark
    recommendedIrrigationMethods: ['Border Strip', 'Sprinkler Irrigation'],
    sources: [
      {
        organization: 'ICAR - Indian Institute of Wheat and Barley Research (IIWBR), Karnal',
        publication: 'Wheat Production Guidelines',
        year: 2023
      }
    ]
  },
  {
    id: 'soybean',
    name: 'Soybean',
    kannadaName: 'ಸೋಯಾಬೀನ್ (Soybean)',
    scientificName: 'Glycine max',
    category: 'Oilseed',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    description: 'High-protein, high-oil legume cultivated predominantly in black and clay soils of Central and Peninsular India.',
    suitableSeasons: ['Rainy / Monsoon'],
    suitableSoils: ['Black Soil', 'Clay Loam', 'Loamy'],
    waterRequirementMm: [450, 600],
    drainageRequirement: 'Good',
    maturityDurationDays: [90, 105],
    optimalPhRange: [6.5, 7.5],
    growthStages: [
      {
        name: 'Germination & Emergence',
        durationDays: [0, 12],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Optimum moisture for germination. Cannot tolerate crusting or flooding.',
        managementTips: 'Inoculate with Bradyrhizobium japonicum.'
      },
      {
        name: 'Vegetative Stage',
        durationDays: [12, 35],
        waterSensitivity: 'Low',
        irrigationGuidance: 'Monsoon rainfall is usually sufficient. Provide drainage if water accumulates.',
        managementTips: 'Weed free period up to 30 days.'
      },
      {
        name: 'Flowering & Pod Setting',
        durationDays: [35, 65],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Water stress causes high flower and pod abortion. Life-saving irrigation vital if dry spell exceeds 10 days.',
        managementTips: 'Scout for girdle beetle and spodoptera.'
      },
      {
        name: 'Seed Development & Ripening',
        durationDays: [65, 100],
        waterSensitivity: 'High',
        irrigationGuidance: 'Adequate soil moisture maximizes seed size and oil content.',
        managementTips: 'Harvest when leaves turn yellow and drop off.'
      }
    ],
    nutrientRequirements: {
      n: '12 - 15 kg',
      p: '25 - 30 kg',
      k: '15 - 20 kg',
      guidelines: 'Rhizobium provides majority of nitrogen; focus on balanced phosphate and sulfur.'
    },
    commonCultivationRisks: [
      'Girdle beetle and semilooper insect pressure',
      'Water stagnation in heavy black clay reducing nodulation',
      'Pod shattering if harvest is delayed after field drying'
    ],
    typicalYieldRangePerAcre: [8, 14], // quintals
    typicalCostPerAcre: [13000, 19000], // INR
    typicalPricePerQuintal: [4600, 5400], // MSP benchmark
    recommendedIrrigationMethods: ['Broad Bed Furrow (BBF)', 'Sprinkler', 'Furrow'],
    sources: [
      {
        organization: 'ICAR - Indian Institute of Soybean Research (IISR), Indore',
        publication: 'Soybean Production Manual',
        year: 2023
      }
    ]
  },
  {
    id: 'cotton',
    name: 'Cotton',
    kannadaName: 'ಹತ್ತಿ (Cotton)',
    scientificName: 'Gossypium hirsutum',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1594904351111-a072f80b1a71?auto=format&fit=crop&w=800&q=80',
    description: 'Major commercial fiber crop of India. Well-suited to deep black soils (regur) with high water retention.',
    suitableSeasons: ['Rainy / Monsoon'],
    suitableSoils: ['Black Soil', 'Clay Loam', 'Loamy', 'Red Soil'],
    waterRequirementMm: [700, 1100],
    drainageRequirement: 'Good',
    maturityDurationDays: [150, 180],
    optimalPhRange: [6.5, 8.0],
    growthStages: [
      {
        name: 'Germination & Establishment',
        durationDays: [0, 20],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Light irrigation or pre-monsoon planting with drip. Avoid flooding.',
        managementTips: 'Gap filling within 7 days to maintain optimum plant population.'
      },
      {
        name: 'Vegetative & Square Formation',
        durationDays: [20, 60],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Moderate water schedule to avoid excessive vegetative growth over square production.',
        managementTips: 'Inspect for sucking pests (thrips, aphids, jassids).'
      },
      {
        name: 'Flowering & Boll Development',
        durationDays: [60, 120],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Peak water requirement stage. Water deficit triggers severe boll shedding.',
        managementTips: 'Install pheromone traps for Pink Bollworm (Pectinophora gossypiella).'
      },
      {
        name: 'Boll Bursting & Harvesting',
        durationDays: [120, 175],
        waterSensitivity: 'Low',
        irrigationGuidance: 'Withhold irrigation to encourage even boll opening and prevent staining of lint.',
        managementTips: 'Pick clean, trash-free cotton in sunny morning hours.'
      }
    ],
    nutrientRequirements: {
      n: '45 - 60 kg',
      p: '25 - 30 kg',
      k: '25 - 30 kg',
      guidelines: 'Split nitrogen in 3 doses: 25% basal, 50% at square formation, 25% at boll formation.'
    },
    commonCultivationRisks: [
      'Pink Bollworm infestation in late stage',
      'Waterlogging causing root rot in poorly drained black soils',
      'Market price fluctuations and grading penalties'
    ],
    typicalYieldRangePerAcre: [8, 16], // quintals of seed cotton (kapas)
    typicalCostPerAcre: [24000, 36000], // INR
    typicalPricePerQuintal: [6800, 8200], // MSP benchmark
    recommendedIrrigationMethods: ['Drip Irrigation', 'Alternate Furrow Irrigation'],
    sources: [
      {
        organization: 'ICAR - Central Institute for Cotton Research (CICR), Nagpur',
        publication: 'Cotton Production Technology Guide',
        year: 2023
      }
    ]
  },
  {
    id: 'onion',
    name: 'Onion',
    kannadaName: 'ಈರುಳ್ಳಿ (Onion)',
    scientificName: 'Allium cepa',
    category: 'Vegetable',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    description: 'Vital culinary vegetable with shallow root system requiring frequent light irrigations and friable, well-drained soils.',
    suitableSeasons: ['Winter', 'Rainy / Monsoon', 'Summer'],
    suitableSoils: ['Sandy Loam', 'Loamy', 'Clay Loam', 'Red Soil'],
    waterRequirementMm: [350, 550],
    drainageRequirement: 'Good',
    maturityDurationDays: [110, 130],
    optimalPhRange: [6.0, 7.5],
    growthStages: [
      {
        name: 'Nursery & Transplanting',
        durationDays: [0, 35],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Keep nursery moist. Provide immediate irrigation upon field transplanting.',
        managementTips: 'Transplant 6-7 week seedlings on raised beds or flat beds.'
      },
      {
        name: 'Vegetative Growth',
        durationDays: [35, 65],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Irrigate at 5-7 day intervals. Shallow roots mean soil cannot dry out completely.',
        managementTips: 'Weeding is critical due to poor competitive foliage.'
      },
      {
        name: 'Bulb Initiation & Development',
        durationDays: [65, 105],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Most critical stage. Dry spells followed by heavy irrigation cause splitting and double bulbs.',
        managementTips: 'Apply potassium sulphate for bulb size and skin color.'
      },
      {
        name: 'Neck Fall & Maturity',
        durationDays: [105, 125],
        waterSensitivity: 'Low',
        irrigationGuidance: 'Completely stop irrigation 10-15 days before harvesting when 50% tops fall over.',
        managementTips: 'Field curing of harvested bulbs for 3-5 days in shade.'
      }
    ],
    nutrientRequirements: {
      n: '35 - 45 kg',
      p: '20 - 25 kg',
      k: '35 - 45 kg',
      guidelines: 'Sulphur (15-20 kg/acre) significantly improves bulb pungency, firmness, and storage life.'
    },
    commonCultivationRisks: [
      'Purple blotch and Stemphylium blight during humid foggy weather',
      'Thrips infestation causing silver leaves',
      'Rotting in transit/storage due to poor curing or pre-harvest watering'
    ],
    typicalYieldRangePerAcre: [80, 150], // quintals (8 - 15 tonnes)
    typicalCostPerAcre: [28000, 42000], // INR
    typicalPricePerQuintal: [1200, 3000], // INR
    recommendedIrrigationMethods: ['Drip Irrigation', 'Micro-Sprinkler', 'Short Furrow'],
    sources: [
      {
        organization: 'ICAR - Directorate of Onion and Garlic Research (DOGR), Pune',
        publication: 'Package of Practices for Commercial Onion',
        year: 2023
      }
    ]
  },
  {
    id: 'potato',
    name: 'Potato',
    kannadaName: 'ಆಲೂಗಡ್ಡೆ (Potato)',
    scientificName: 'Solanum tuberosum',
    category: 'Vegetable',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    description: 'High-calorie tuber crop requiring friable, loose soils for proper tuber expansion and cool growing season temperatures.',
    suitableSeasons: ['Winter'],
    suitableSoils: ['Sandy Loam', 'Loamy', 'Clay Loam'],
    waterRequirementMm: [400, 600],
    drainageRequirement: 'Good',
    maturityDurationDays: [80, 105],
    optimalPhRange: [5.2, 6.8],
    growthStages: [
      {
        name: 'Sprouting & Emergence',
        durationDays: [0, 20],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Light irrigation after planting tubers on ridges.',
        managementTips: 'Plant certified, well-sprouted disease-free seed tubers.'
      },
      {
        name: 'Vegetative Growth & Tuber Initiation',
        durationDays: [20, 45],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Water stress at stolon formation and tuber initiation reduces total tuber count.',
        managementTips: 'Earthing up at 30 days to cover expanding tubers and prevent greening.'
      },
      {
        name: 'Tuber Bulking',
        durationDays: [45, 80],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Maintain consistent soil moisture. Fluctuation leads to hollow heart and knobby tubers.',
        managementTips: 'Foliar nutrition with potassium and micro-nutrients.'
      },
      {
        name: 'Dehaulming & Harvest',
        durationDays: [80, 100],
        waterSensitivity: 'Low',
        irrigationGuidance: 'Cut haulms (green tops) 10 days before digging; keep soil dry to harden skins.',
        managementTips: 'Cure tubers in cool shade for 10-15 days before cold storage.'
      }
    ],
    nutrientRequirements: {
      n: '45 - 60 kg',
      p: '35 - 45 kg',
      k: '45 - 60 kg',
      guidelines: 'Heavy feeder. Incorporate 12-15 tonnes FYM per acre. Split nitrogen 50% planting, 50% earthing up.'
    },
    commonCultivationRisks: [
      'Late blight (Phytophthora infestans) during overcast, foggy winter days',
      'Tuber greening due to shallow earthing up',
      'High seed tuber cost and storage expenses'
    ],
    typicalYieldRangePerAcre: [80, 140], // quintals
    typicalCostPerAcre: [38000, 58000], // INR (seed tubers form significant cost)
    typicalPricePerQuintal: [900, 1800], // INR
    recommendedIrrigationMethods: ['Drip Irrigation', 'Sprinkler', 'Furrow on Ridges'],
    sources: [
      {
        organization: 'ICAR - Central Potato Research Institute (CPRI), Shimla',
        publication: 'Potato Cultivation Manual',
        year: 2023
      }
    ]
  },
  {
    id: 'mustard',
    name: 'Mustard / Rapeseed',
    kannadaName: 'ಸಾಸಿವೆ (Mustard)',
    scientificName: 'Brassica juncea',
    category: 'Oilseed',
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80',
    description: 'Major rabi oilseed crop requiring minimal water, cool winter weather, and light to medium soils.',
    suitableSeasons: ['Winter'],
    suitableSoils: ['Sandy Loam', 'Loamy', 'Clay Loam', 'Red Soil'],
    waterRequirementMm: [250, 400],
    drainageRequirement: 'Good',
    maturityDurationDays: [100, 125],
    optimalPhRange: [6.0, 7.5],
    growthStages: [
      {
        name: 'Germination & Seedling',
        durationDays: [0, 20],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Pre-sowing irrigation is essential for good emergence.',
        managementTips: 'Thinning at 15-20 days to ensure 10-12 cm spacing between plants.'
      },
      {
        name: 'Branching & Pre-Flowering',
        durationDays: [20, 45],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'First irrigation at 30-35 DAS (flowering initiation) yields major return.',
        managementTips: 'Top dress remaining nitrogen before first watering.'
      },
      {
        name: 'Siliqua (Pod) Formation',
        durationDays: [45, 80],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Second irrigation at pod development (65-70 DAS) maximizes oil content and seed size.',
        managementTips: 'Monitor closely for mustard aphid (Lipaphis erysimi).'
      },
      {
        name: 'Ripening',
        durationDays: [80, 115],
        waterSensitivity: 'Low',
        irrigationGuidance: 'No irrigation needed. Dry weather promotes seed drying.',
        managementTips: 'Harvest when 75% siliquae turn golden.'
      }
    ],
    nutrientRequirements: {
      n: '25 - 35 kg',
      p: '15 - 20 kg',
      k: '10 - 15 kg',
      guidelines: 'Sulphur (15 kg/acre) increases seed yield and oil percentage by 12-15%.'
    },
    commonCultivationRisks: [
      'Aphid infestation during cloudy winter spells',
      'White rust and Alternaria blight',
      'Frost injury in Northern India during December-January'
    ],
    typicalYieldRangePerAcre: [6, 11], // quintals
    typicalCostPerAcre: [9000, 14000], // INR
    typicalPricePerQuintal: [5450, 6200], // MSP benchmark
    recommendedIrrigationMethods: ['Sprinkler Irrigation', 'Check Basin'],
    sources: [
      {
        organization: 'ICAR - Directorate of Rapeseed-Mustard Research (DRMR), Bharatpur',
        publication: 'Rapeseed-Mustard Technology Handbook',
        year: 2023
      }
    ]
  },
  {
    id: 'chickpea',
    name: 'Chickpea / Bengal Gram',
    kannadaName: 'ಕಡಲೆ (Bengal Gram)',
    scientificName: 'Cicer arietinum',
    category: 'Pulse',
    image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
    description: 'Premier rabi pulse crop of India. Highly efficient in utilizing residual soil moisture in black and alluvial soils.',
    suitableSeasons: ['Winter'],
    suitableSoils: ['Black Soil', 'Clay Loam', 'Loamy', 'Red Soil'],
    waterRequirementMm: [250, 350],
    drainageRequirement: 'Good',
    maturityDurationDays: [95, 120],
    optimalPhRange: [6.5, 8.0],
    growthStages: [
      {
        name: 'Germination & Branching',
        durationDays: [0, 30],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Sown on conserved moisture after kharif crop. Avoid early heavy watering.',
        managementTips: 'Nipping/topping at 30-35 days promotes profuse branching.'
      },
      {
        name: 'Pre-Flowering',
        durationDays: [30, 60],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'One light irrigation at pre-flowering stage (45 DAS) boosts branches and pod count.',
        managementTips: 'Do not irrigate at peak blooming (causes flower drop).'
      },
      {
        name: 'Pod Development',
        durationDays: [60, 95],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Second irrigation at early pod development (70 DAS) if soil is dry.',
        managementTips: 'Install bird perches and pheromone traps for Helicoverpa armigera.'
      },
      {
        name: 'Maturity',
        durationDays: [95, 115],
        waterSensitivity: 'Low',
        irrigationGuidance: 'Requires dry conditions for crisp pod drying.',
        managementTips: 'Harvest when leaves turn yellow and pods rattle.'
      }
    ],
    nutrientRequirements: {
      n: '8 - 12 kg',
      p: '20 - 25 kg',
      k: '8 - 12 kg',
      guidelines: 'Inoculate with Mesorhizobium ciceri and PSB before sowing.'
    },
    commonCultivationRisks: [
      'Helicoverpa armigera (pod borer) larvae eating developing seeds',
      'Fusarium wilt in hot dry soil conditions',
      'Overwatering causing excessive foliage and zero pods'
    ],
    typicalYieldRangePerAcre: [7, 12], // quintals
    typicalCostPerAcre: [11000, 16000], // INR
    typicalPricePerQuintal: [5440, 6400], // MSP benchmark
    recommendedIrrigationMethods: ['Sprinkler Irrigation', 'Border Strip'],
    sources: [
      {
        organization: 'ICAR - Indian Institute of Pulses Research (IIPR), Kanpur',
        publication: 'Chickpea Production Compendium',
        year: 2023
      }
    ]
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    kannadaName: 'ಕಬ್ಬು (Sugarcane)',
    scientificName: 'Saccharum officinarum',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1527842891421-42eec6e703ea?auto=format&fit=crop&w=800&q=80',
    description: 'Long-duration cash crop requiring heavy water inputs and fertile, deep soils with reliable canal or borewell irrigation.',
    suitableSeasons: ['Summer', 'Rainy / Monsoon', 'Winter'],
    suitableSoils: ['Clay Loam', 'Black Soil', 'Loamy', 'Clay'],
    waterRequirementMm: [1500, 2200],
    drainageRequirement: 'Good',
    maturityDurationDays: [300, 360],
    optimalPhRange: [6.5, 8.0],
    growthStages: [
      {
        name: 'Germination Phase',
        durationDays: [0, 45],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Light irrigation every 7-10 days for sett sprouting.',
        managementTips: 'Plant 2-budded or 3-budded setts treated with fungicide.'
      },
      {
        name: 'Formative / Tillering Phase',
        durationDays: [45, 120],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Water requirement rises rapidly. Moisture stress here restricts tiller formation.',
        managementTips: 'Earthing up and weed control at 90 days.'
      },
      {
        name: 'Grand Growth Phase',
        durationDays: [120, 270],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Longest phase with highest water intake. Maintain field capacity.',
        managementTips: 'Trash mulching between rows saves 30% moisture.'
      },
      {
        name: 'Ripening & Maturation',
        durationDays: [270, 360],
        waterSensitivity: 'Low',
        irrigationGuidance: 'Taper off irrigation 25-30 days prior to cutting to concentrate sucrose.',
        managementTips: 'Harvest with sharp knives close to ground level.'
      }
    ],
    nutrientRequirements: {
      n: '80 - 110 kg',
      p: '35 - 45 kg',
      k: '40 - 50 kg',
      guidelines: 'Apply FYM 15 tonnes/acre. Split N into 3 doses up to 90 days.'
    },
    commonCultivationRisks: [
      'High vulnerability during water shortages and drought years',
      'Early shoot borer and internode borer',
      'Red rot disease in waterlogged soils'
    ],
    typicalYieldRangePerAcre: [350, 550], // quintals (35 - 55 tonnes)
    typicalCostPerAcre: [45000, 65000], // INR
    typicalPricePerQuintal: [315, 380], // Statutory Fair & Remunerative Price (FRP)
    recommendedIrrigationMethods: ['Drip Irrigation (saves 40-50% water)', 'Furrow Irrigation'],
    sources: [
      {
        organization: 'ICAR - Sugarcane Breeding Institute (SBI), Coimbatore',
        publication: 'Precision Sugarcane Management Manual',
        year: 2023
      }
    ]
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    kannadaName: 'ಸೂರ್ಯಕಾಂತಿ (Sunflower)',
    scientificName: 'Helianthus annuus',
    category: 'Oilseed',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
    description: 'Photo-insensitive oilseed crop that fits into diverse cropping systems throughout the year.',
    suitableSeasons: ['Summer', 'Rainy / Monsoon', 'Winter'],
    suitableSoils: ['Black Soil', 'Clay Loam', 'Loamy', 'Red Soil'],
    waterRequirementMm: [350, 500],
    drainageRequirement: 'Good',
    maturityDurationDays: [85, 100],
    optimalPhRange: [6.5, 8.0],
    growthStages: [
      {
        name: 'Germination & Seedling',
        durationDays: [0, 18],
        waterSensitivity: 'Moderate',
        irrigationGuidance: 'Pre-sowing irrigation or adequate soil moisture at sowing.',
        managementTips: 'Maintain plant spacing of 60 cm x 30 cm.'
      },
      {
        name: 'Button & Flowering Stage',
        durationDays: [18, 55],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Water stress at buttoning to flowering drastically limits head diameter and seed filling.',
        managementTips: 'Keep honeybee colonies nearby to ensure cross-pollination.'
      },
      {
        name: 'Seed Setting & Filling',
        durationDays: [55, 80],
        waterSensitivity: 'Critical',
        irrigationGuidance: 'Irrigate to avoid hollow seeds in the center of the head.',
        managementTips: 'Spray 0.2% Borax at ray floret opening stage.'
      },
      {
        name: 'Ripening',
        durationDays: [80, 95],
        waterSensitivity: 'Low',
        irrigationGuidance: 'Dry weather required for heads to dry.',
        managementTips: 'Harvest when back of the head turns lemon yellow.'
      }
    ],
    nutrientRequirements: {
      n: '25 - 35 kg',
      p: '20 - 25 kg',
      k: '15 - 20 kg',
      guidelines: 'Boron application (Borax 4 kg/acre in soil or 0.2% spray) is essential for seed setting.'
    },
    commonCultivationRisks: [
      'Parrot and bird damage during seed maturity',
      'Poor seed filling in center if honeybee activity is low',
      'Alternaria blight during damp monsoon weather'
    ],
    typicalYieldRangePerAcre: [6, 11], // quintals
    typicalCostPerAcre: [12000, 18000], // INR
    typicalPricePerQuintal: [6200, 7200], // MSP benchmark
    recommendedIrrigationMethods: ['Furrow Irrigation', 'Sprinkler'],
    sources: [
      {
        organization: 'ICAR - Indian Institute of Oilseeds Research (IIOR), Hyderabad',
        publication: 'Sunflower Production Technology',
        year: 2023
      }
    ]
  }
];
