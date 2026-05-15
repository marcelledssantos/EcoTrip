let availableRoutes = [];

async function init() {
  try {
    availableRoutes = await getRoutes();
    fillCitySelects(availableRoutes);
  } catch (error) {
    showMessage(error.message);
  }
}

document.getElementById("tripForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  clearMessage();

  const payload = {
    origin: document.getElementById("origin").value,
    destination: document.getElementById("destination").value,
    transport: document.getElementById("transport").value,
    profile: document.getElementById("profile").value,
    passengers: Number(document.getElementById("passengers").value)
  };

  try {
    const result = await calculateTripImpact(payload);
    renderResult(result);
  } catch (error) {
    showMessage(error.message);
  }
});

init();