# EcoTrip - Simulador de Impacto Ambiental para Viagens

EcoTrip é um projeto fullstack educacional que simula o impacto ambiental de viagens.
A aplicação estima a emissão de carbono com base em:

- origem;
- destino;
- distância da rota;
- meio de transporte;
- perfil do trajeto;
- quantidade de passageiros.

O objetivo é ajudar o usuário a comparar opções de transporte e tomar decisões mais conscientes e sustentáveis.

## Estrutura do projeto

```text
ecotrip-fullstack/
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── config.js
│       ├── api.js
│       ├── ui.js
│       └── app.js
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── routes/
│   │   └── index.js
│   ├── services/
│   │   ├── carbonService.js
│   │   └── routeService.js
│   └── data/
│       ├── routes.json
│       └── config.json
├── docs/
│   └── api.md
├── .gitignore
└── README.md
```

## Como rodar o backend

Entre na pasta do backend:

```bash
cd backend
```

Execute:

```bash
npm start
```

O backend ficará disponível em:

```text
http://localhost:3000
```

## Como rodar o frontend

Abra o arquivo:

```text
frontend/index.html
```

no navegador.

Também é possível usar a extensão Live Server do VS Code.

## Endpoints

### Verificar status

```http
GET /api/health
```

### Listar rotas

```http
GET /api/routes
```

### Calcular impacto ambiental

```http
POST /api/calculate
```

Exemplo de body:

```json
{
  "origin": "São Paulo",
  "destination": "Rio de Janeiro",
  "transport": "car",
  "profile": "mixed",
  "passengers": 2
}
```

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript Vanilla
- Node.js
- API HTTP nativa do Node.js

## Observação

Os fatores de emissão usados são estimativas simplificadas para fins educacionais.