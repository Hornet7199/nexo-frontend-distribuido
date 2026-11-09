# frontend-nexo-distribuido

Front-end Angular do Nexo, ajustado para os **quatro microserviços** (o monólito não é mais usado).

## Rodando

```bash
npm install
npm start          # http://localhost:4200
```

Suba antes os backends (cada um com o seed ligado e o mesmo `NEXO_JWT_SECRET`):

| Serviço | Porta | O que o front usa dele |
|---|---|---|
| usuario-api | 8081 | login, perfil, contas, fotos, configurações, cadastro de alunos e professores |
| pedagogico-api | 8082 | turmas, matérias, notas, frequência, avaliações, relatórios, evasão, auditoria |
| comunicacao-api | 8083 | chat, avisos, dúvidas e mensagens (o WebSocket vai direto, em `ws://localhost:8083/ws`) |
| gamificacao-api | 8084 | dashboard do aluno (XP, ranking), desafios, quiz e catálogo de desafios do admin |

O `ng serve` usa o `proxy.conf.js`, que reparte `/api` entre eles (vale a **primeira** regra que
casar). A API fica na mesma origem do front, então o cookie do refresh token funciona sem CORS.

Contas do seed (senha `123456`): `diretor`, `professor`, `aluno`, `admin`.

## Docker

```bash
docker compose up --build
```

O container fala com os backends que estão no host via `host.docker.internal`
(`BACKEND_HOST` no `proxy.conf.js`).

## Testes e build

```bash
npm run test:ci
npm run build
```

O `@angular/cdk` está declarado no `package.json` porque o `ng2-charts` o exige como peer
dependency (sem ele o `npm ci` falha com ERESOLVE).
