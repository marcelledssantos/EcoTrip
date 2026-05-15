const http = require("http");
const routes = require("./routes");

const PORT = 3000;

const server = http.createServer((request, response) => {
  routes(request, response);
});

server.listen(PORT, () => {
  console.log(`EcoTrip backend rodando em http://localhost:${PORT}`);
});