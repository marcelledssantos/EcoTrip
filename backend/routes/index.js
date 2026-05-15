const { getRoutes } = require("../services/routeService");
const { calculateImpact } = require("../services/carbonService");

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });

  response.end(JSON.stringify(data));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", chunk => {
      body += chunk.toString();
    });

    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("JSON inválido."));
      }
    });
  });
}

async function routes(request, response) {
  if (request.method === "OPTIONS") {
    return sendJson(response, 204, {});
  }

  if (request.method === "GET" && request.url === "/api/health") {
    return sendJson(response, 200, {
      status: "online",
      project: "EcoTrip"
    });
  }

  if (request.method === "GET" && request.url === "/api/routes") {
    return sendJson(response, 200, getRoutes());
  }

  if (request.method === "POST" && request.url === "/api/calculate") {
    try {
      const body = await readBody(request);
      const result = calculateImpact(body);
      return sendJson(response, 200, result);
    } catch (error) {
      return sendJson(response, 400, {
        error: error.message
      });
    }
  }

  return sendJson(response, 404, {
    error: "Rota não encontrada."
  });
}

module.exports = routes;