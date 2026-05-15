const routes = require("../data/routes.json");

function getRoutes() {
  return routes;
}

function findRoute(origin, destination) {
  return routes.find(route =>
    route.origin === origin &&
    route.destination === destination
  );
}

module.exports = {
  getRoutes,
  findRoute
};