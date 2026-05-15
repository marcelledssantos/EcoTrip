async function getRoutes() {
  const response = await fetch(`${API_BASE_URL}/api/routes`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar as rotas.");
  }

  return response.json();
}

async function calculateTripImpact(payload) {
  const response = await fetch(`${API_BASE_URL}/api/calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao calcular impacto ambiental.");
  }

  return data;
}