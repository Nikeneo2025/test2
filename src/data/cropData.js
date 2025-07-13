// Crop nutrient requirements and MSP data
export const cropData = {
  corn: {
    name: "Corn (Maize)",
    optimal: { N: [100, 180], P: [25, 40], K: [100, 180], pH: [6.0, 7.0], EC: [0.5, 1.5] },
    msp: 2575, // per quintal
  },
  paddy: {
    name: "Paddy",
    optimal: { N: [100, 150], P: [20, 30], K: [80, 120], pH: [6.0, 7.0], EC: [0.5, 1.5] },
    msp: 2438, // per quintal
  },
  wheat: {
    name: "Wheat",
    optimal: { N: [80, 120], P: [20, 30], K: [90, 150], pH: [6.0, 7.5], EC: [0.5, 1.5] },
    msp: 2575, // per quintal
  },
  ragi: {
    name: "Ragi",
    optimal: { N: [40, 60], P: [15, 25], K: [30, 50], pH: [6.0, 7.5], EC: [0.3, 1.0] },
    msp: 5482, // per quintal
  },
  cotton: {
    name: "Cotton",
    optimal: { N: [100, 150], P: [20, 40], K: [80, 120], pH: [6.0, 7.5], EC: [1.0, 2.5] },
    msp: 7622, // per quintal (Medium Staple)
  },
  jowar: {
    name: "Jowar",
    optimal: { N: [80, 120], P: [20, 30], K: [60, 90], pH: [6.0, 7.5], EC: [0.5, 1.5] },
    msp: 4027, // per quintal (Hybrid)
  },
  tur_dal: {
    name: "Tur Dal",
    optimal: { N: [20, 30], P: [40, 60], K: [20, 30], pH: [6.0, 7.5], EC: [0.3, 1.0] },
    msp: 8450, // per quintal
  },
  moong_dal: {
    name: "Moong Dal",
    optimal: { N: [20, 30], P: [40, 60], K: [20, 30], pH: [6.0, 7.5], EC: [0.3, 1.0] },
    msp: 8854, // per quintal
  },
  urad_dal: {
    name: "Urad Dal",
    optimal: { N: [20, 30], P: [40, 60], K: [20, 30], pH: [6.0, 7.5], EC: [0.3, 1.0] },
    msp: 8200, // per quintal
  },
  groundnut: {
    name: "Groundnut",
    optimal: { N: [20, 30], P: [40, 60], K: [20, 30], pH: [6.0, 7.5], EC: [0.3, 1.0] },
    msp: 7743, // per quintal
  },
  sunflower_seeds: {
    name: "Sunflower Seeds",
    optimal: { N: [60, 90], P: [30, 50], K: [60, 90], pH: [6.0, 7.5], EC: [0.5, 1.5] },
    msp: 8162, // per quintal
  },
  soya_bean: {
    name: "Soya Bean",
    optimal: { N: [80, 120], P: [40, 60], K: [40, 60], pH: [6.0, 7.5], EC: [0.5, 1.5] },
    msp: 5184, // per quintal (Yellow)
  },
  sesamum: {
    name: "Sesamum",
    optimal: { N: [40, 60], P: [20, 30], K: [20, 30], pH: [6.0, 7.5], EC: [0.3, 1.0] },
    msp: 9267, // per quintal
  },
  masur: {
    name: "Masur",
    optimal: { N: [20, 30], P: [40, 60], K: [20, 30], pH: [6.0, 7.5], EC: [0.3, 1.0] },
    msp: 6975, // per quintal (Lentil)
  },
  safflower: {
    name: "Safflower",
    optimal: { N: [40, 60], P: [20, 30], K: [20, 30], pH: [6.0, 7.5], EC: [0.3, 1.0] },
    msp: 6080, // per quintal
  },
  sugarcane: {
    name: "Sugarcane",
    optimal: { N: [150, 250], P: [40, 60], K: [120, 180], pH: [6.0, 7.5], EC: [1.0, 3.0] },
    msp: 355, // per quintal (FRP)
  },
};

