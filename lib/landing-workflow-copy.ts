import type { Locale } from './i18n';

export const landingWorkflowCopy = {
  en: {
    install: {
      eyebrow: 'One CLI. Your entire stack.',
      title: 'From your terminal to runtz.',
      body: 'Install once, connect your workspace, and send your first security scan.',
      steps: ['Install', 'Connect', 'Scan', 'Receive'],
      ready: 'CLI ready',
      connected: 'Workspace connected',
      login: 'Connect once with',
      docs: 'CLI setup guide',
      receipt: 'Scan received by runtz',
      sending: 'Sending results to your workspace',
      scanning: 'Scanning your selected target',
      waiting: 'Your results arrive in one workspace',
      receiptBody: 'Ready to explore, prioritize, and share.',
      demo: 'Illustrative workflow',
    },
    ai: {
      title: 'Bring security context to AI',
      titleAccent: 'with runtz MCP server.',
      body: 'Connect Claude, Codex, or Gemini to runtz through MCP and skills. Run security scans and bring findings into the workflow you already use.',
    },
  },
  'pt-br': {
    install: {
      eyebrow: 'Uma CLI. Toda a sua stack.',
      title: 'Do seu terminal para o runtz.',
      body: 'Instale uma vez, conecte seu workspace e envie seu primeiro scan de segurança.',
      steps: ['Instalar', 'Conectar', 'Escanear', 'Receber'],
      ready: 'CLI pronta',
      connected: 'Workspace conectado',
      login: 'Conecte uma vez com',
      docs: 'Guia de instalação da CLI',
      receipt: 'Scan recebido no runtz',
      sending: 'Enviando resultados para seu workspace',
      scanning: 'Escaneando o alvo selecionado',
      waiting: 'Seus resultados chegam a um só workspace',
      receiptBody: 'Pronto para explorar, priorizar e compartilhar.',
      demo: 'Demonstração ilustrativa',
    },
    ai: {
      title: 'Leve contexto de segurança à IA',
      titleAccent: 'com o runtz MCP server.',
      body: 'Conecte Claude, Codex ou Gemini ao runtz com MCP e skills. Execute scans de segurança e leve os achados para o fluxo que você já usa.',
    },
  },
  es: {
    install: {
      eyebrow: 'Una CLI. Todo tu stack.',
      title: 'De tu terminal a runtz.',
      body: 'Instala una vez, conecta tu espacio y envía tu primer análisis de seguridad.',
      steps: ['Instalar', 'Conectar', 'Analizar', 'Recibir'],
      ready: 'CLI lista',
      connected: 'Espacio conectado',
      login: 'Conecta una vez con',
      docs: 'Guía de instalación de la CLI',
      receipt: 'Análisis recibido en runtz',
      sending: 'Enviando resultados a tu espacio',
      scanning: 'Analizando el objetivo seleccionado',
      waiting: 'Tus resultados llegan a un solo espacio',
      receiptBody: 'Listo para explorar, priorizar y compartir.',
      demo: 'Demostración ilustrativa',
    },
    ai: {
      title: 'Lleva contexto de seguridad a tu IA',
      titleAccent: 'con runtz MCP server.',
      body: 'Conecta Claude, Codex o Gemini a runtz mediante MCP y skills. Ejecuta análisis de seguridad y lleva los hallazgos al flujo que ya utilizas.',
    },
  },
} satisfies Record<Locale, { install: Record<string, string | string[]>; ai: Record<string, string> }>;

export type InstallJourneyCopy = (typeof landingWorkflowCopy)[Locale]['install'];

export type AiAssistantDemoCopy = {
  question: string;
  answer: string;
  label: string;
  pause: string;
  play: string;
  replay: string;
};

export const aiAssistantDemoCopy: Record<Locale, AiAssistantDemoCopy> = {
  en: {
    question: 'Any critical CVEs in payments-api right now?',
    answer: 'payments-api has 1 critical: axios 1.7.4 (CVE-2025-27152). Bumping to 1.8.2 clears it. Want the PR?',
    label: 'Illustrative conversation from the runtz product demo.',
    pause: 'Pause conversation animation',
    play: 'Resume conversation animation',
    replay: 'Replay conversation',
  },
  'pt-br': {
    question: 'Existe alguma CVE crítica em payments-api agora?',
    answer: 'payments-api tem 1 crítica: axios 1.7.4 (CVE-2025-27152). Atualizar para 1.8.2 corrige a falha. Quer o PR?',
    label: 'Conversa ilustrativa do vídeo de demonstração do runtz.',
    pause: 'Pausar animação da conversa',
    play: 'Retomar animação da conversa',
    replay: 'Repetir conversa',
  },
  es: {
    question: '¿Hay alguna CVE crítica en payments-api ahora?',
    answer: 'payments-api tiene 1 crítica: axios 1.7.4 (CVE-2025-27152). Actualizar a 1.8.2 lo resuelve. ¿Quieres el PR?',
    label: 'Conversación ilustrativa del vídeo de demostración de runtz.',
    pause: 'Pausar animación de la conversación',
    play: 'Reanudar animación de la conversación',
    replay: 'Repetir conversación',
  },
};
