/**
 * Proxy do `ng serve`: a API é uma só para o front ('/api'), mas atrás dela há quatro
 * backends. A ordem importa — vale a PRIMEIRA regra que casar, então as mais específicas
 * vêm antes das genéricas (ex.: /api/professores antes de /api/professor).
 *
 *   usuario-api   :8081  login, perfil, contas, alunos e professores (cadastro/listas)
 *   pedagogico-api :8082  turmas, matérias, notas, frequência, avaliações, relatórios…
 *   comunicacao-api :8083  chat, avisos, dúvidas e mensagens (o WebSocket vai direto, ver
 *                         environment.development.ts)
 *   gamificacao-api :8084  dashboard do aluno (XP, ranking), desafios e quiz
 */
// Onde estão os backends. No host é localhost; dentro do Docker, BACKEND_HOST=host.docker.internal.
const HOST = process.env.BACKEND_HOST || 'localhost';
const alvo = (porta) => ({ target: `http://${HOST}:${porta}`, secure: false });

const USUARIO = alvo(8081);
const PEDAGOGICO = alvo(8082);
const COMUNICACAO = alvo(8083);
const GAMIFICACAO = alvo(8084);

module.exports = {
  // ── usuario-api ──
  '/api/auth': USUARIO,
  '/api/usuarios': USUARIO,
  '/api/fotos': USUARIO,
  '/api/configuracoes': USUARIO,
  '/api/admin/contas': USUARIO,
  '/api/professores': USUARIO,
  // /api/alunos e /api/alunos/{id}: lista, detalhe e cadastro. As notas e observações do
  // aluno (/api/alunos/{id}/notas…) são do pedagógico e casam mais abaixo.
  '^/api/alunos(/[0-9]+)?/?([?].*)?$': USUARIO,

  // ── gamificacao-api — antes das regras genéricas do pedagógico ──
  '^/api/admin/catalogo/desafios': GAMIFICACAO,
  '^/api/aluno/(dashboard|desafios)': GAMIFICACAO,

  // ── pedagogico-api ──
  '^/api/alunos/[0-9]+/(notas|observacoes)': PEDAGOGICO,
  '^/api/aluno/(notas|materias|conteudos)': PEDAGOGICO,
  '/api/professor': PEDAGOGICO,
  '/api/turmas': PEDAGOGICO,
  '/api/materias': PEDAGOGICO,
  '/api/inscricoes': PEDAGOGICO,
  '/api/avaliacoes': PEDAGOGICO,
  '/api/questoes': PEDAGOGICO,
  '/api/evasao': PEDAGOGICO,
  '/api/relatorios': PEDAGOGICO,
  '/api/auditoria': PEDAGOGICO,
  '/api/monitoramento': PEDAGOGICO,
  '/api/admin': PEDAGOGICO,

  // ── comunicacao-api ──
  '/api/chat': COMUNICACAO,
  '/api/avisos': COMUNICACAO,
  '/api/duvidas': COMUNICACAO,
  '/api/mensagens': COMUNICACAO,

};
