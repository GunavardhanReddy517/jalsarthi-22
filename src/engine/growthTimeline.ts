import { CropData, TimelineStageEstimate } from '../types';

export function calculateGrowthTimeline(
  crop: CropData,
  plantingDateStr?: string
): {
  stages: TimelineStageEstimate[];
  estimatedHarvestRange: string;
  disclaimer: string;
} {
  const basePlantingDate = plantingDateStr ? new Date(plantingDateStr) : null;
  const isValidDate = basePlantingDate && !isNaN(basePlantingDate.getTime());

  // Define 7 standard agronomic stages mapping from crop growth stages
  const minMaturity = crop.maturityDurationDays[0];
  const maxMaturity = crop.maturityDurationDays[1];
  const avgMaturity = (minMaturity + maxMaturity) / 2;

  // Approximate relative progression percentages across the 7 milestones
  const stageDefs = [
    {
      stageNumber: 1,
      name: 'Planting / Sowing',
      ratioStart: 0,
      ratioEnd: 0.05,
      sensitivity: 'Moderate' as const,
      irrigation: 'Light pre-sowing or post-sowing soaking to ensure seed hydration and soil contact.',
      tips: 'Ensure proper sowing depth (3-5 cm for cereals, 2-3 cm for vegetables), certified seed treatments, and uniform spacing.'
    },
    {
      stageNumber: 2,
      name: 'Germination & Emergence',
      ratioStart: 0.05,
      ratioEnd: 0.15,
      sensitivity: 'Moderate' as const,
      irrigation: 'Keep topsoil moist; avoid water stagnation that causes seed decay or damping-off.',
      tips: 'Scout for uniform emergence within 7-10 days. Perform gap filling promptly.'
    },
    {
      stageNumber: 3,
      name: 'Vegetative Growth & Branching / Tillering',
      ratioStart: 0.15,
      ratioEnd: 0.40,
      sensitivity: 'Low' as const,
      irrigation: 'Moderate irrigation cycles. Avoid excessive nitrogen or moisture that causes soft vegetative lodging.',
      tips: 'Critical weed-free period (first 30-35 days). Apply split top-dress fertilizer and perform earthing up if relevant.'
    },
    {
      stageNumber: 4,
      name: 'Flowering & Pollination',
      ratioStart: 0.40,
      ratioEnd: 0.60,
      sensitivity: 'Critical' as const,
      irrigation: 'CRITICAL STAGE: Moisture stress here causes severe flower drop and sterile pollen.',
      tips: 'Avoid spraying chemical insecticides during active morning bee pollination hours. Maintain optimal soil moisture.'
    },
    {
      stageNumber: 5,
      name: 'Crop Development (Fruit / Pod / Grain Filling)',
      ratioStart: 0.60,
      ratioEnd: 0.85,
      sensitivity: 'High' as const,
      irrigation: 'Steady, regular moisture prevents pod abortion, fruit cracking, or ill-filled grains.',
      tips: 'Foliar spray of water-soluble potassium/micronutrients to enhance grain/fruit weight and quality.'
    },
    {
      stageNumber: 6,
      name: 'Physiological Maturity',
      ratioStart: 0.85,
      ratioEnd: 0.95,
      sensitivity: 'Low' as const,
      irrigation: 'Taper off irrigation. Soil should gradually dry to facilitate hardening and nutrient translocation.',
      tips: 'Look for maturity indicators (foliage yellowing, black layer in grains, husk drying, neck fall in onion).'
    },
    {
      stageNumber: 7,
      name: 'Harvest & Curing',
      ratioStart: 0.95,
      ratioEnd: 1.0,
      sensitivity: 'Low' as const,
      irrigation: 'Completely withhold irrigation 5-10 days prior to harvest to ease field work and prevent mould.',
      tips: 'Harvest during dry sunny morning hours. Dry to recommended moisture content (<12% for grains/pulses) before bagging.'
    }
  ];

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const stages: TimelineStageEstimate[] = stageDefs.map((def) => {
    const startDay = Math.round(def.ratioStart * avgMaturity);
    const endDay = Math.max(startDay + 1, Math.round(def.ratioEnd * avgMaturity));

    let estimatedStartDate: string | undefined = undefined;
    let estimatedEndDate: string | undefined = undefined;

    if (isValidDate) {
      const sDate = new Date(basePlantingDate.getTime() + startDay * 86400000);
      const eDate = new Date(basePlantingDate.getTime() + endDay * 86400000);
      estimatedStartDate = formatDate(sDate);
      estimatedEndDate = formatDate(eDate);
    }

    return {
      stageNumber: def.stageNumber,
      name: def.name,
      startDay,
      endDay,
      estimatedStartDate,
      estimatedEndDate,
      waterSensitivity: def.sensitivity,
      managementTips: def.tips,
      irrigationGuidance: def.irrigation
    };
  });

  let estimatedHarvestRange = `${minMaturity} to ${maxMaturity} days after planting`;
  if (isValidDate) {
    const minHarvestDate = new Date(basePlantingDate.getTime() + minMaturity * 86400000);
    const maxHarvestDate = new Date(basePlantingDate.getTime() + maxMaturity * 86400000);
    estimatedHarvestRange = `${formatDate(minHarvestDate)} — ${formatDate(maxHarvestDate)} (Day ${minMaturity}-${maxMaturity})`;
  }

  const disclaimer =
    'Note: Growth timeline and harvest windows are planning estimates based on standard university crop phenology models. Actual crop maturity varies by specific hybrid/variety, local temperature variations, sunlight duration, soil moisture status, and pest incidence.';

  return {
    stages,
    estimatedHarvestRange,
    disclaimer
  };
}
