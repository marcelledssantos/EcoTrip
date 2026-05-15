# Documentação da API EcoTrip

## Base URL

```text
http://localhost:3000
```

## GET /api/health

Retorna o status da API.

### Resposta

```json
{
  "status": "online",
  "project": "EcoTrip"
}
```

## GET /api/routes

Retorna as rotas disponíveis para simulação.

## POST /api/calculate

Calcula a emissão de carbono estimada da viagem.

### Body

```json
{
  "origin": "São Paulo",
  "destination": "Rio de Janeiro",
  "transport": "car",
  "profile": "mixed",
  "passengers": 2
}
```

### Campos aceitos

Transportes:

- `car`
- `bus`
- `plane`
- `train`
- `motorcycle`

Perfis:

- `urban`
- `highway`
- `mixed`

### Resposta

```json
{
  "origin": "São Paulo",
  "destination": "Rio de Janeiro",
  "distanceKm": 430,
  "transport": "car",
  "transportLabel": "Carro",
  "profile": "mixed",
  "profileLabel": "Misto",
  "passengers": 2,
  "totalEmissionKg": 89.16,
  "emissionPerPassengerKg": 44.58,
  "estimatedTreesToOffset": 5,
  "recommendation": "Considere compartilhar a viagem com mais passageiros ou comparar com ônibus e trem.",
  "comparison": []
}
```