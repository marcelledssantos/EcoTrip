const { findRoute } = require("./routeService");
const config = require("../data/config.json");

function calculateImpact({ origin, destination, transport, profile, passengers }) {
  validateInput({ origin, destination, transport, profile, passengers });

  const route = findRoute(origin, destination);

  if (!route) {
    throw new Error("Rota não encontrada para a origem e destino informados.");
  }

  const transportData = config.transportFactors[transport];
  const profileData = config.profileMultipliers[profile];

  const totalEmissionKg = route.distanceKm * transportData.factorKgPerKm * profileData.multiplier;
  const emissionPerPassengerKg = totalEmissionKg / passengers;
  const estimatedTreesToOffset = Math.ceil(totalEmissionKg / config.kgCO2AbsorbedByTreePerYear);

  return {
    origin,
    destination,
    distanceKm: route.distanceKm,
    transport,
    transportLabel: transportData.label,
    profile,
    profileLabel: profileData.label,
    passengers,
    totalEmissionKg: round(totalEmissionKg),
    emissionPerPassengerKg: round(emissionPerPassengerKg),
    estimatedTreesToOffset,
    recommendation: buildRecommendation(transport, totalEmissionKg),
    comparison: buildComparison(route.distanceKm, profileData.multiplier)
  };
}

function validateInput({ origin, destination, transport, profile, passengers }) {
  if (!origin || !destination || !transport || !profile) {
    throw new Error("Preencha todos os campos obrigatórios.");
  }

  if (origin === destination) {
    throw new Error("Origem e destino precisam ser diferentes.");
  }

  if (!config.transportFactors[transport]) {
    throw new Error("Meio de transporte inválido.");
  }

  if (!config.profileMultipliers[profile]) {
    throw new Error("Perfil de trajeto inválido.");
  }

  if (!Number.isInteger(passengers) || passengers <= 0) {
    throw new Error("A quantidade de passageiros precisa ser maior que zero.");
  }
}

function buildRecommendation(transport, emission) {
  if (transport === "train" || transport === "bus") {
    return "Boa escolha. Esse meio de transporte costuma ter menor emissão por quilômetro.";
  }

  if (emission > 200) {
    return "Esta viagem tem impacto elevado. Considere ônibus, trem, carona compartilhada ou compensação de carbono.";
  }

  return "Considere compartilhar a viagem com mais passageiros ou comparar com ônibus e trem.";
}

function buildComparison(distanceKm, profileMultiplier) {
  return Object.entries(config.transportFactors)
    .map(([transport, data]) => ({
      transport,
      transportLabel: data.label,
      totalEmissionKg: round(distanceKm * data.factorKgPerKm * profileMultiplier)
    }))
    .sort((a, b) => a.totalEmissionKg - b.totalEmissionKg);
}

function round(value) {
  return Number(value.toFixed(2));
}

module.exports = {
  calculateImpact
};