# JalSarthi — Smart Farming Assistant 🌱
### *Smart Water. Better Crops. Better Farming Decisions.*

JalSarthi is a decision-support web application tailored for Indian farmers, agricultural extension workers, and agronomists. It empowers farmers to make sound, evidence-based agronomic and financial decisions without requiring physical IoT sensors, field telemetry hardware, or paid APIs.

---

## 🌟 Key Features

1. **Smart Crop Recommendations**:
   - Transparent rule-based suitability scoring across 5 dimensions:
     - Season Compatibility (30%)
     - Soil Profile Fit (25%)
     - Water Availability (25%)
     - Drainage Conditions (10%)
     - Soil pH / Regional Data (10%)
   - Clear categorizations: **High**, **Moderate**, **Low**, or **Insufficient Data**.
   - Specific reasons, field limitations, practical improvements, and missing data warnings.

2. **Smart Irrigation Advisor (No Sensors)**:
   - Practical stage-specific irrigation strategies (Nursery, Vegetative, Flowering, Yield Formation, Ripening).
   - Soil moisture retention and drainage profiles for Sandy, Loamy, Clay, Black, and Red soils.
   - Risks of overwatering vs underwatering side-by-side.
   - Tailored water-saving practices: drip systems, alternate furrow irrigation (AFI), and surface mulching.

3. **Software-Only Water Budget Simulator**:
   - Compares available water volume (Litres or m³) against crop evapotranspiration water depth in mm.
   - Evaluates water adequacy across 15-day, 30-day, 60-day, or full crop cycle horizons.
   - Computes water deficit or surplus with actionable agronomic mitigation steps.

4. **Alternative Crops Suggester**:
   - Evaluates up to 3 viable alternatives with side-by-side maturity, yield, and water consumption differences.

5. **Crop Growth Timeline & Harvest Predictor**:
   - 7 distinct phenological stages from Planting to Harvest & Curing.
   - Calculates estimated calendar dates and harvest windows from the farmer's planting date.

6. **Soil Improvement & Health Guide**:
   - Soil tilth and structural advice for 7 Indian soil types.
   - Organic manure (FYM), vermicompost, and green manure guidelines.
   - Soil Health Card (SHC) testing checklist.
   - Interactive pH correction protocols (Lime/Dolomite for acidic soils; Gypsum/green manures for alkaline soils).

7. **Farm Investment Calculator**:
   - 9 editable expense categories: Land preparation, Seeds, Fertilizers, Labour, Irrigation, Crop protection, Harvesting, Transportation, and Other expenses.
   - Automatic calculations for Total Cultivation Cost, Cost per Acre, and Cost per Hectare.

8. **Profit & ROI Estimator**:
   - Calculates Total Estimated Yield (Quintals & Kg), Gross Revenue, Net Profit/Loss, Break-Even Price (₹/Qtl), and Return on Investment (ROI %).
   - Transparent mathematical formulas displayed inline. Safe handling of zero yield or zero investment.

9. **What-If Profit Sensitivity Simulator**:
   - Interactive sliders for wholesale price shifts, yield volatility, and input cost inflation.
   - 3 dynamic scenarios: **Conservative**, **Expected**, and **Optimistic**.
   - Visual multi-bar chart rendered using Recharts.

10. **Side-by-Side Crop Comparison Matrix**:
    - Detailed tabular comparison of target crop vs alternative crops.
    - Editable price, yield, and cost assumptions with instant recalculation.

11. **Printable Farm Report**:
    - Clean printable dossier (`window.print()` / Save as PDF) formatted with official letterhead, farm profile, irrigation schedule, finances, and academic citations.

12. **Bilingual Accessibility**:
    - Full toggle between **English** and **ಕನ್ನಡ (Kannada)** across all terms, buttons, and badges.

13. **Saved Farm History**:
    - LocalStorage persistence allowing farmers to save multiple farm analyses, reload them with one click, or delete old records.

---

## 🛠️ Technology Stack

- **Framework**: React 18 + TypeScript
- **Bundler**: Vite 5
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Testing**: Vitest (13 comprehensive automated unit tests covering formulas, zero-handling, and unit conversions)
- **Persistence**: LocalStorage API

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone or extract the project zip
cd jalsarthi

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your web browser.

### Running Unit Tests
```bash
npm run test
```

### Production Build
```bash
npm run build
```
Production assets are generated in the `dist/` directory.

---

## 📚 Agricultural Reference Sources
All crop benchmarks, nutrient requirements, water depth requirements, and soil guidelines are based on verified scientific literature:
- **ICAR** (Indian Council of Agricultural Research)
- **UAS Bengaluru & UAS Dharwad** (University of Agricultural Sciences)
- **TNAU Agritech Portal** (Tamil Nadu Agricultural University)
- **IIHR** (Indian Institute of Horticultural Research)
- **IIMR** (Indian Institute of Maize Research)
- **IIPR** (Indian Institute of Pulses Research)
- **CICR** (Central Institute for Cotton Research)

---

## 📜 Footer
*JalSarthi — Supporting smarter and more sustainable farming.*
