/**
 * Desenvolvimento: a API é relativa ('/api') e o `ng serve` a reparte entre os backends
 * conforme o `proxy.conf.js` (usuario-api :8081, pedagogico-api :8082, comunicacao-api
 * :8083 e gamificacao-api :8084). Mesma origem do front,
 * então o cookie do refresh token (SameSite=Strict) funciona sem CORS.
 * O WebSocket do chat vai direto ao comunicacao-api (:8083), que é quem o serve.
 */
export const environment = {
  production: false,
  apiUrl: '/api',
  wsUrl: 'ws://localhost:8083/ws',
};
