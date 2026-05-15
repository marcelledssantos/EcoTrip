function fillCitySelects(routes) {
  const originSelect = document.getElementById("origin");
  const destinationSelect = document.getElementById("destination");

  const cities = [...new Set(routes.flatMap(route => [route.origin, route.destination]))];

  originSelect.innerHTML = "";
  destinationSelect.innerHTML = "";

  cities.forEach(city => {
    originSelect.appendChild(createOption(city));
    destinationSelect.appendChild(createOption(city));
  });
}

function createOption(value) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = value;
  return option;
}

function showMessage(text) {
  document.getElementById("message").textContent = text;
}

function clearMessage() {
  document.getElementById("message").textContent = "";
}

function renderResult(data) {
  const result = document.getElementById("result");
  result.classList.remove("hidden");

  result.innerHTML = `
    <h2>Resultado da viagem</h2>

    <p><strong>Rota:</strong> ${data.origin} → ${data.destination}</p>
    <p><strong>Transporte:</strong> ${data.transportLabel}</p>
    <p><strong>Perfil:</strong> ${data.profileLabel}</p>

    <div class="result-grid">
      <div class="metric">
        <span>Distância</span>
        <strong>${data.distanceKm} km</strong>
      </div>

      <div class="metric">
        <span>Emissão total</span>
        <strong>${data.totalEmissionKg} kg CO₂</strong>
      </div>

      <div class="metric">
        <span>Por passageiro</span>
        <strong>${data.emissionPerPassengerKg} kg CO₂</strong>
      </div>

      <div class="metric">
        <span>Árvores estimadas</span>
        <strong>${data.estimatedTreesToOffset}</strong>
      </div>
    </div>

    <div class="recommendation">
      <strong>Recomendação:</strong>
      <p>${data.recommendation}</p>
    </div>

    <div class="comparison">
      <h3>Comparação por transporte</h3>
      <ul>
        ${data.comparison.map(item => `
          <li>${item.transportLabel}: ${item.totalEmissionKg} kg CO₂</li>
        `).join("")}
      </ul>
    </div>
  `;
}