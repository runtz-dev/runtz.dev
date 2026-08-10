import type { Locale } from './i18n';

export type AssistantShowcaseCopy = {
  ariaLabel: string;
  assistants: {
    claude: { tagline: string; points: string[] };
    codex: { location: string; tagline: string; points: string[] };
    gemini: { location: string; tagline: string; points: string[] };
  };
};

type AiCopy = {
  metadata: { title: string; description: string };
  intro: { eyebrow: string; title: string; body: string };
  mcp: {
    eyebrow: string;
    title: string;
    body: string;
    setup: string;
    token: string;
    configLabel: string;
    yourAi: string;
    scans: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    body: string;
    github: string;
    showcaseLabel: string;
  };
  final: { title: string; body: string; setup: string; token: string };
  showcase: AssistantShowcaseCopy;
};

export const aiCopy: Record<Locale, AiCopy> = {
  en: {
    metadata: {
      title: 'AI',
      description:
        'Plug runtz into your favorite AI. Give Claude, Codex, or Gemini the tools and context to run security scans directly from your workflow.',
    },
    intro: {
      eyebrow: 'runtz for AI agents',
      title: 'Plug runtz into your favorite AI.',
      body: 'Connect runtz to Claude, Codex, or Gemini and bring security scans directly into the AI workflow you already use.',
    },
    mcp: {
      eyebrow: 'runtz MCP server',
      title: 'Use the runtz MCP server.',
      body: 'Connect once and give your AI direct access to runtz scans and offline documentation. The MCP server keeps every tool available from the chat, without adding credentials to your prompts.',
      setup: 'Set up runtz MCP',
      token: 'Get a token',
      configLabel: 'One config block. Every scan.',
      yourAi: 'Your AI',
      scans: 'secure scans',
    },
    skills: {
      eyebrow: 'runtz skills',
      title: "There's a runtz skill for your AI.",
      body: 'Use Claude, Codex, or Gemini? Add the matching skill and teach your assistant when to scan, which runtz tool to run, and how to return the results.',
      github: 'Browse skills on GitHub',
      showcaseLabel: 'Native to every assistant',
    },
    final: {
      title: 'Give your agent the keys to runtz.',
      body: "Build the MCP server, add it to your assistant's config, and install the matching skill. The full setup lives in the docs.",
      setup: 'MCP setup',
      token: 'Get a token',
    },
    showcase: {
      ariaLabel: 'AI assistant',
      assistants: {
        claude: {
          tagline:
            'A Claude Code & Desktop skill that activates the moment you ask for a security scan.',
          points: [
            'Ships a full CLI reference alongside SKILL.md',
            'Routes each request to the right scan automatically',
            'Prefers the MCP tools, falls back to the CLI',
          ],
        },
        codex: {
          location: 'project root',
          tagline:
            'An AGENTS.md skill that drops into any repo and teaches Codex which scan fits the task.',
          points: [
            'Zero config — just commit AGENTS.md',
            'Confirms the target before scanning',
            'Summarizes findings with concrete fixes',
          ],
        },
        gemini: {
          location: 'project root or ~/.gemini/',
          tagline:
            'A GEMINI.md skill the Gemini CLI loads as context and runs against the MCP tools.',
          points: [
            'Works as project or global context',
            'Keeps the token out of every prompt',
            'Reads the docs when it is unsure',
          ],
        },
      },
    },
  },
  'pt-br': {
    metadata: {
      title: 'IA',
      description:
        'Conecte o runtz à sua IA favorita. Dê ao Claude, Codex ou Gemini as ferramentas e o contexto para executar scans de segurança direto no seu fluxo de trabalho.',
    },
    intro: {
      eyebrow: 'runtz para agentes de IA',
      title: 'Conecte o runtz à sua IA favorita.',
      body: 'Integre o runtz ao Claude, Codex ou Gemini e leve os scans de segurança direto para o fluxo de IA que você já usa.',
    },
    mcp: {
      eyebrow: 'servidor MCP do runtz',
      title: 'Use o servidor MCP do runtz.',
      body: 'Conecte uma vez e dê à sua IA acesso direto aos scans do runtz e à documentação offline. O servidor MCP mantém todas as ferramentas disponíveis no chat sem expor credenciais nos seus prompts.',
      setup: 'Configurar o MCP do runtz',
      token: 'Obter um token',
      configLabel: 'Um bloco de configuração. Todos os scans.',
      yourAi: 'Sua IA',
      scans: 'scans seguros',
    },
    skills: {
      eyebrow: 'skills do runtz',
      title: 'Existe uma skill do runtz para a sua IA.',
      body: 'Usa Claude, Codex ou Gemini? Adicione a skill correspondente e ensine seu assistente quando fazer um scan, qual ferramenta do runtz executar e como apresentar os resultados.',
      github: 'Ver skills no GitHub',
      showcaseLabel: 'Nativo em cada assistente',
    },
    final: {
      title: 'Dê ao seu agente acesso ao runtz.',
      body: 'Compile o servidor MCP, adicione-o à configuração do seu assistente e instale a skill correspondente. O passo a passo completo está na documentação.',
      setup: 'Configurar MCP',
      token: 'Obter um token',
    },
    showcase: {
      ariaLabel: 'Assistente de IA',
      assistants: {
        claude: {
          tagline:
            'Uma skill para Claude Code e Desktop que entra em ação assim que você pede um scan de segurança.',
          points: [
            'Inclui uma referência completa da CLI junto ao SKILL.md',
            'Direciona cada pedido para o scan certo automaticamente',
            'Prioriza as ferramentas MCP e usa a CLI como alternativa',
          ],
        },
        codex: {
          location: 'raiz do projeto',
          tagline:
            'Uma skill em AGENTS.md que funciona em qualquer repositório e ensina ao Codex qual scan usar em cada tarefa.',
          points: [
            'Configuração zero — basta versionar o AGENTS.md',
            'Confirma o alvo antes de executar o scan',
            'Resume os achados com correções concretas',
          ],
        },
        gemini: {
          location: 'raiz do projeto ou ~/.gemini/',
          tagline:
            'Uma skill em GEMINI.md que a Gemini CLI carrega como contexto e executa com as ferramentas MCP.',
          points: [
            'Funciona como contexto do projeto ou global',
            'Mantém o token fora de todos os prompts',
            'Consulta a documentação quando tem dúvidas',
          ],
        },
      },
    },
  },
  es: {
    metadata: {
      title: 'IA',
      description:
        'Conecta runtz con tu IA favorita. Dale a Claude, Codex o Gemini las herramientas y el contexto para ejecutar análisis de seguridad desde tu flujo de trabajo.',
    },
    intro: {
      eyebrow: 'runtz para agentes de IA',
      title: 'Conecta runtz con tu IA favorita.',
      body: 'Integra runtz con Claude, Codex o Gemini y lleva los análisis de seguridad directamente al flujo de IA que ya utilizas.',
    },
    mcp: {
      eyebrow: 'servidor MCP de runtz',
      title: 'Usa el servidor MCP de runtz.',
      body: 'Conéctalo una vez y dale a tu IA acceso directo a los análisis de runtz y a la documentación sin conexión. El servidor MCP mantiene todas las herramientas disponibles en el chat sin exponer credenciales en tus prompts.',
      setup: 'Configurar el MCP de runtz',
      token: 'Obtener un token',
      configLabel: 'Un bloque de configuración. Todos los análisis.',
      yourAi: 'Tu IA',
      scans: 'análisis seguros',
    },
    skills: {
      eyebrow: 'skills de runtz',
      title: 'Hay una skill de runtz para tu IA.',
      body: '¿Usas Claude, Codex o Gemini? Añade la skill correspondiente y enséñale a tu asistente cuándo analizar, qué herramienta de runtz ejecutar y cómo presentar los resultados.',
      github: 'Ver skills en GitHub',
      showcaseLabel: 'Nativo en cada asistente',
    },
    final: {
      title: 'Dale a tu agente acceso a runtz.',
      body: 'Compila el servidor MCP, añádelo a la configuración de tu asistente e instala la skill correspondiente. La guía completa está en la documentación.',
      setup: 'Configurar MCP',
      token: 'Obtener un token',
    },
    showcase: {
      ariaLabel: 'Asistente de IA',
      assistants: {
        claude: {
          tagline:
            'Una skill para Claude Code y Desktop que se activa cuando solicitas un análisis de seguridad.',
          points: [
            'Incluye una referencia completa de la CLI junto a SKILL.md',
            'Dirige cada solicitud al análisis correcto automáticamente',
            'Prioriza las herramientas MCP y usa la CLI como alternativa',
          ],
        },
        codex: {
          location: 'raíz del proyecto',
          tagline:
            'Una skill en AGENTS.md que funciona en cualquier repositorio y enseña a Codex qué análisis corresponde a cada tarea.',
          points: [
            'Sin configuración: solo versiona AGENTS.md',
            'Confirma el objetivo antes de analizar',
            'Resume los hallazgos con soluciones concretas',
          ],
        },
        gemini: {
          location: 'raíz del proyecto o ~/.gemini/',
          tagline:
            'Una skill en GEMINI.md que Gemini CLI carga como contexto y ejecuta con las herramientas MCP.',
          points: [
            'Funciona como contexto global o del proyecto',
            'Mantiene el token fuera de todos los prompts',
            'Consulta la documentación cuando tiene dudas',
          ],
        },
      },
    },
  },
};
