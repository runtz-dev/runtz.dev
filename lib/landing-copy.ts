import type { Locale } from './i18n';

type LinkCopy = {
  title: string;
  body: string;
};

export type ProductConsoleCopy = {
  screens: {
    overview: string;
    scanType: string;
    details: string;
  };
  sidebar: {
    platform: string;
    overview: string;
    code: string;
    hosts: string;
    containers: string;
  };
  chart: {
    vulnerabilityTrend: string;
    scansPerDay: string;
  };
  overview: {
    eyebrow: string;
    title: string;
    description: string;
    assets: string;
    scans: string;
    vulnerabilities: string;
    criticalHigh: string;
    vulnerabilityTrend: string;
    severities: string;
    latestScans: string;
    containerScanning: string;
    hostScanning: string;
  };
  scanType: {
    eyebrow: string;
    title: string;
    description: string;
    app: string;
    vulnerabilities: string;
    vulnerabilitiesShort: string;
  };
  detail: {
    eyebrow: string;
    latestScan: string;
    scanReceived: string;
    dependencies: string;
    vulnerabilities: string;
    scans: string;
    cvesFound: string;
    packageId: string;
    fix: string;
  };
  severity: {
    critical: string;
    high: string;
    medium: string;
    low: string;
  };
  assetsLabel: string;
  dashboardLevels: string;
};

export type LandingCopy = {
  metadata: {
    title: string;
    description: string;
    openGraphLocale: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body: string;
    primaryCta: string;
    playgroundCta: string;
  };
  platform: {
    eyebrow: string;
    title: string;
    body: string;
    cards: Array<{
      title: string;
      body: string;
    }>;
  };
  developerWorkflow: {
    cliTitle: string;
    cliBody: string;
    installMethodLabel: string;
    unixLabel: string;
    windowsLabel: string;
    copyCommand: string;
    copied: string;
    vscodeTitle: string;
    vscodeBody: string;
    explorerLabel: string;
    contextMenu: {
      open: string;
      openToSide: string;
      copyPath: string;
      scan: string;
    };
  };
  deployment: {
    eyebrow: string;
    title: string;
    body: string;
    installMethodLabel: string;
    copyCommand: string;
    copied: string;
  };
  openSource: {
    title: string;
    storyTitle: string;
    storyBody: string;
    sourceCta: string;
    docsTitle: string;
    docsBody: string;
    docsCta: string;
  };
  footer: {
    status: string;
    runtzLinksLabel: string;
    companyLinksLabel: string;
    login: LinkCopy;
    docs: LinkCopy;
    playground: LinkCopy;
    pricing: LinkCopy;
    legal: LinkCopy;
    roadmap: LinkCopy;
  };
  console: ProductConsoleCopy;
};

export const landingCopy: Record<Locale, LandingCopy> = {
  en: {
    metadata: {
      title: 'Open source DevSecOps scans',
      description:
        'Open source DevSecOps platform for SCA, SAST, host, container, and Kubernetes scans from one workspace.',
      openGraphLocale: 'en_US',
    },
    hero: {
      eyebrow: 'open source security scans platform',
      title: 'Security scans made easy',
      titleAccent: ' for AI-era developers.',
      body:
        'Everything developers need to keep code and environments secure end to end. Gain clear visibility across your stack, avoid exposure to known CVEs and already-fixed issues, and build more securely in the AI era.',
      primaryCta: 'Start for free',
      playgroundCta: 'Playground',
    },
    platform: {
      eyebrow: 'platform',
      title: 'Complete visibility from code to environment.',
      body:
        'Run security scans across your applications, infrastructure, and runtime surface from one open source workspace.',
      cards: [
        {
          title: 'SCA',
          body: 'Track vulnerable dependencies and keep package risk visible across every project.',
        },
        {
          title: 'Container scanning',
          body: 'Inspect images before release and see the vulnerable packages inside your containers.',
        },
        {
          title: 'Host scanning',
          body: 'Audit Linux hosts and root filesystems so infrastructure risk stays in view.',
        },
        {
          title: 'SAST',
          body: 'Find security issues in source code and route findings into one triage workflow.',
        },
        {
          title: 'DAST',
          body: 'Test running applications for exposed behavior before attackers can rely on it.',
        },
        {
          title: 'Kubernetes scanning',
          body: 'Review clusters, workloads, exposure, and RBAC posture from the same workspace.',
        },
      ],
    },
    developerWorkflow: {
      cliTitle: 'Install runtz-cli and start scanning in seconds',
      cliBody:
        'Install the runtz CLI, scan a project, and uncover dependency risk without breaking your flow.',
      installMethodLabel: 'Choose your operating system',
      unixLabel: 'Linux & macOS',
      windowsLabel: 'Windows',
      copyCommand: 'Copy command',
      copied: 'Copied',
      vscodeTitle: 'Scan easily with the Runtz VS Code Extension',
      vscodeBody:
        'Right-click a supported manifest and run an SCA scan directly from the Explorer.',
      explorerLabel: 'Explorer',
      contextMenu: {
        open: 'Open',
        openToSide: 'Open to the Side',
        copyPath: 'Copy Path',
        scan: 'Runtz: SCA Scan',
      },
    },
    deployment: {
      eyebrow: 'cloud or self-hosted',
      title: 'Start now in the cloud, or run it in your own infrastructure.',
      body:
        'Get started with a managed workspace and bring security visibility to your team in minutes. For stricter data requirements, self-host the platform and keep every scan, finding, and environment detail inside your own infrastructure.',
      installMethodLabel: 'Install method',
      copyCommand: 'Copy command',
      copied: 'Copied',
    },
    openSource: {
      title: 'Open source by design.',
      storyTitle: 'Security scanning standards.',
      storyBody:
        'runtz is an open source platform, so you can inspect it, extend it, and run it in your own environment when privacy, compliance, or internal policy requires it. Keep scans, findings, and reports under your control with no vendor lock-in.',
      sourceCta: 'View source on GitHub',
      docsTitle: 'Read the docs',
      docsBody: 'Follow the docs and start scanning in minutes.',
      docsCta: 'Open documentation',
    },
    footer: {
      status: 'All systems operational',
      runtzLinksLabel: 'Runtz links',
      companyLinksLabel: 'Company links',
      login: {
        title: 'Login',
        body: 'Sign in to your cloud workspace.',
      },
      docs: {
        title: 'Read Docs',
        body: 'Guides to deploy, scan, and triage.',
      },
      playground: {
        title: 'Playground',
        body: 'Try runtz in a live sandbox.',
      },
      pricing: {
        title: 'Compare Plans',
        body: 'Free, self-hosted, and team tiers.',
      },
      legal: {
        title: 'Terms and Legal',
        body: 'Policies and legal documents.',
      },
      roadmap: {
        title: 'Roadmap',
        body: 'See what we are building next.',
      },
    },
    console: {
      screens: {
        overview: 'Overview',
        scanType: 'Scan type',
        details: 'Details',
      },
      sidebar: {
        platform: 'DevSecOps Platform',
        overview: 'Overview',
        code: 'Code',
        hosts: 'Hosts',
        containers: 'Containers',
      },
      chart: {
        vulnerabilityTrend: 'Vulnerability trend',
        scansPerDay: 'Scans per day',
      },
      overview: {
        eyebrow: 'Platform / Overview',
        title: 'Overview',
        description: 'Scans and vulnerabilities across all assets.',
        assets: 'Assets',
        scans: 'Scans',
        vulnerabilities: 'Vulnerabilities',
        criticalHigh: 'Critical/High',
        vulnerabilityTrend: 'Vulnerability trend',
        severities: 'Severities',
        latestScans: 'Latest scans',
        containerScanning: 'Container scanning',
        hostScanning: 'Host scanning',
      },
      scanType: {
        eyebrow: 'Code / SCA',
        title: 'Apps',
        description: 'Application dependencies per workspace.',
        app: 'App',
        vulnerabilities: 'Vulnerabilities',
        vulnerabilitiesShort: 'vulns',
      },
      detail: {
        eyebrow: 'SCA / Apps',
        latestScan: 'Latest scan on May 29, 2026, 5:18 AM',
        scanReceived: 'scan received',
        dependencies: 'dependencies',
        vulnerabilities: 'vulnerabilities',
        scans: 'scans',
        cvesFound: 'CVEs found',
        packageId: 'Package / ID',
        fix: 'Fix',
      },
      severity: {
        critical: 'critical',
        high: 'high',
        medium: 'medium',
        low: 'low',
      },
      assetsLabel: 'assets',
      dashboardLevels: 'Dashboard levels',
    },
  },
  'pt-br': {
    metadata: {
      title: 'Análises de segurança DevSecOps open source',
      description:
        'Plataforma DevSecOps open source para análises SCA, SAST, de hosts, contêineres e Kubernetes em um único workspace.',
      openGraphLocale: 'pt_BR',
    },
    hero: {
      eyebrow: 'plataforma open source de análises de segurança',
      title: 'Análises de segurança sem complicação',
      titleAccent: ' para quem desenvolve na era da IA.',
      body:
        'Tudo o que sua equipe de desenvolvimento precisa para proteger código e ambientes de ponta a ponta. Tenha visibilidade clara de toda a sua stack, evite a exposição a CVEs conhecidas e problemas que já têm correção disponível e desenvolva com mais segurança na era da IA.',
      primaryCta: 'Comece grátis',
      playgroundCta: 'Playground',
    },
    platform: {
      eyebrow: 'plataforma',
      title: 'Visibilidade completa, do código ao ambiente.',
      body:
        'Execute análises de segurança em aplicações, infraestrutura e ambientes em execução a partir de um único workspace open source.',
      cards: [
        {
          title: 'SCA',
          body: 'Monitore dependências vulneráveis e mantenha o risco dos pacotes visível em todos os projetos.',
        },
        {
          title: 'Análise de contêineres',
          body: 'Inspecione imagens antes da publicação e identifique os pacotes vulneráveis dentro dos contêineres.',
        },
        {
          title: 'Análise de hosts',
          body: 'Audite hosts Linux e sistemas de arquivos raiz para manter os riscos da infraestrutura sempre visíveis.',
        },
        {
          title: 'SAST',
          body: 'Encontre falhas de segurança no código-fonte e centralize os achados em um único fluxo de triagem.',
        },
        {
          title: 'DAST',
          body: 'Teste aplicações em execução e encontre comportamentos expostos antes que sejam explorados.',
        },
        {
          title: 'Análise de Kubernetes',
          body: 'Revise clusters, workloads, exposição e postura de RBAC no mesmo workspace.',
        },
      ],
    },
    developerWorkflow: {
      cliTitle: 'Instale a runtz-cli e comece a analisar em segundos',
      cliBody:
        'Instale a CLI da runtz, analise um projeto e encontre riscos nas dependências sem interromper seu fluxo.',
      installMethodLabel: 'Escolha seu sistema operacional',
      unixLabel: 'Linux e macOS',
      windowsLabel: 'Windows',
      copyCommand: 'Copiar comando',
      copied: 'Copiado',
      vscodeTitle: 'Analise facilmente com a extensão Runtz para VS Code',
      vscodeBody:
        'Clique com o botão direito em um manifest compatível e execute um scan SCA direto pelo Explorer.',
      explorerLabel: 'Explorer',
      contextMenu: {
        open: 'Abrir',
        openToSide: 'Abrir ao lado',
        copyPath: 'Copiar caminho',
        scan: 'Runtz: SCA Scan',
      },
    },
    deployment: {
      eyebrow: 'nuvem ou infraestrutura própria',
      title: 'Comece agora na nuvem ou execute na sua própria infraestrutura.',
      body:
        'Comece com um workspace gerenciado e leve visibilidade de segurança para sua equipe em poucos minutos. Se os requisitos de dados forem mais rigorosos, hospede a plataforma por conta própria e mantenha análises, achados e detalhes dos ambientes dentro da sua infraestrutura.',
      installMethodLabel: 'Método de instalação',
      copyCommand: 'Copiar comando',
      copied: 'Copiado',
    },
    openSource: {
      title: 'Open source desde a concepção.',
      storyTitle: 'Análises de segurança com transparência.',
      storyBody:
        'A runtz é uma plataforma open source: você pode inspecionar, ampliar e executar tudo no seu próprio ambiente quando privacidade, conformidade ou políticas internas exigirem. Mantenha análises, achados e relatórios sob seu controle, sem dependência de fornecedor.',
      sourceCta: 'Ver código-fonte no GitHub',
      docsTitle: 'Leia a documentação',
      docsBody: 'Siga os guias e comece a executar análises em poucos minutos.',
      docsCta: 'Abrir documentação',
    },
    footer: {
      status: 'Todos os sistemas estão operacionais',
      runtzLinksLabel: 'Links da Runtz',
      companyLinksLabel: 'Links da empresa',
      login: {
        title: 'Entrar',
        body: 'Acesse seu workspace na nuvem.',
      },
      docs: {
        title: 'Leia a documentação',
        body: 'Guias para implantar, analisar e fazer a triagem.',
      },
      playground: {
        title: 'Playground',
        body: 'Experimente a runtz em um ambiente interativo.',
      },
      pricing: {
        title: 'Compare os planos',
        body: 'Opções gratuitas, self-hosted e para equipes.',
      },
      legal: {
        title: 'Termos e informações legais',
        body: 'Políticas e documentos legais.',
      },
      roadmap: {
        title: 'Roadmap',
        body: 'Veja o que estamos construindo.',
      },
    },
    console: {
      screens: {
        overview: 'Visão geral',
        scanType: 'Tipo de análise',
        details: 'Detalhes',
      },
      sidebar: {
        platform: 'Plataforma DevSecOps',
        overview: 'Visão geral',
        code: 'Código',
        hosts: 'Hosts',
        containers: 'Contêineres',
      },
      chart: {
        vulnerabilityTrend: 'Tendência de vulnerabilidades',
        scansPerDay: 'Análises por dia',
      },
      overview: {
        eyebrow: 'Plataforma / Visão geral',
        title: 'Visão geral',
        description: 'Análises e vulnerabilidades em todos os ativos.',
        assets: 'Ativos',
        scans: 'Análises',
        vulnerabilities: 'Vulnerabilidades',
        criticalHigh: 'Críticas/Altas',
        vulnerabilityTrend: 'Tendência de vulnerabilidades',
        severities: 'Severidades',
        latestScans: 'Últimas análises',
        containerScanning: 'Análise de contêineres',
        hostScanning: 'Análise de hosts',
      },
      scanType: {
        eyebrow: 'Código / SCA',
        title: 'Aplicações',
        description: 'Dependências das aplicações por workspace.',
        app: 'Aplicação',
        vulnerabilities: 'Vulnerabilidades',
        vulnerabilitiesShort: 'vulnerabilidades',
      },
      detail: {
        eyebrow: 'SCA / Aplicações',
        latestScan: 'Última análise em 29 de maio de 2026, às 5h18',
        scanReceived: 'análise recebida',
        dependencies: 'dependências',
        vulnerabilities: 'vulnerabilidades',
        scans: 'análises',
        cvesFound: 'CVEs encontradas',
        packageId: 'Pacote / ID',
        fix: 'Correção',
      },
      severity: {
        critical: 'crítica',
        high: 'alta',
        medium: 'média',
        low: 'baixa',
      },
      assetsLabel: 'ativos',
      dashboardLevels: 'Níveis do dashboard',
    },
  },
  es: {
    metadata: {
      title: 'Análisis de seguridad DevSecOps de código abierto',
      description:
        'Plataforma DevSecOps de código abierto para análisis SCA, SAST, de hosts, contenedores y Kubernetes en un solo espacio de trabajo.',
      openGraphLocale: 'es_419',
    },
    hero: {
      eyebrow: 'plataforma de código abierto para análisis de seguridad',
      title: 'Análisis de seguridad sin complicaciones',
      titleAccent: ' para quienes desarrollan en la era de la IA.',
      body:
        'Todo lo que tu equipo de desarrollo necesita para proteger el código y los entornos de principio a fin. Obtén una visión clara de toda tu stack, evita la exposición a CVE conocidas y problemas que ya tienen solución, y desarrolla con mayor seguridad en la era de la IA.',
      primaryCta: 'Comenzar gratis',
      playgroundCta: 'Playground',
    },
    platform: {
      eyebrow: 'plataforma',
      title: 'Visibilidad completa, desde el código hasta el entorno.',
      body:
        'Ejecuta análisis de seguridad en aplicaciones, infraestructura y entornos en ejecución desde un único espacio de trabajo de código abierto.',
      cards: [
        {
          title: 'SCA',
          body: 'Supervisa las dependencias vulnerables y mantén visible el riesgo de los paquetes en todos tus proyectos.',
        },
        {
          title: 'Análisis de contenedores',
          body: 'Inspecciona las imágenes antes de publicarlas e identifica los paquetes vulnerables dentro de los contenedores.',
        },
        {
          title: 'Análisis de hosts',
          body: 'Audita hosts Linux y sistemas de archivos raíz para mantener visibles los riesgos de la infraestructura.',
        },
        {
          title: 'SAST',
          body: 'Encuentra problemas de seguridad en el código fuente y centraliza los hallazgos en un solo flujo de priorización.',
        },
        {
          title: 'DAST',
          body: 'Prueba aplicaciones en ejecución y detecta comportamientos expuestos antes de que puedan ser aprovechados.',
        },
        {
          title: 'Análisis de Kubernetes',
          body: 'Revisa clústeres, cargas de trabajo, exposición y postura de RBAC desde el mismo espacio de trabajo.',
        },
      ],
    },
    developerWorkflow: {
      cliTitle: 'Instala runtz-cli y comienza a analizar en segundos',
      cliBody:
        'Instala la CLI de runtz, analiza un proyecto y detecta riesgos en las dependencias sin interrumpir tu flujo.',
      installMethodLabel: 'Elige tu sistema operativo',
      unixLabel: 'Linux y macOS',
      windowsLabel: 'Windows',
      copyCommand: 'Copiar comando',
      copied: 'Copiado',
      vscodeTitle: 'Analiza fácilmente con la extensión Runtz para VS Code',
      vscodeBody:
        'Haz clic derecho en un manifiesto compatible y ejecuta un análisis SCA directamente desde el Explorador.',
      explorerLabel: 'Explorador',
      contextMenu: {
        open: 'Abrir',
        openToSide: 'Abrir a un lado',
        copyPath: 'Copiar ruta',
        scan: 'Runtz: SCA Scan',
      },
    },
    deployment: {
      eyebrow: 'nube o infraestructura propia',
      title: 'Comienza ahora en la nube o ejecútalo en tu propia infraestructura.',
      body:
        'Comienza con un espacio de trabajo administrado y brinda visibilidad de seguridad a tu equipo en minutos. Si tus requisitos de datos son más estrictos, aloja la plataforma por tu cuenta y mantén los análisis, hallazgos y detalles de los entornos dentro de tu propia infraestructura.',
      installMethodLabel: 'Método de instalación',
      copyCommand: 'Copiar comando',
      copied: 'Copiado',
    },
    openSource: {
      title: 'Código abierto desde el diseño.',
      storyTitle: 'Análisis de seguridad con transparencia.',
      storyBody:
        'runtz es una plataforma de código abierto: puedes inspeccionarla, ampliarla y ejecutarla en tu propio entorno cuando la privacidad, el cumplimiento o las políticas internas lo requieran. Mantén los análisis, hallazgos e informes bajo tu control, sin depender de un proveedor.',
      sourceCta: 'Ver el código fuente en GitHub',
      docsTitle: 'Lee la documentación',
      docsBody: 'Sigue las guías y comienza a ejecutar análisis en minutos.',
      docsCta: 'Abrir documentación',
    },
    footer: {
      status: 'Todos los sistemas están operativos',
      runtzLinksLabel: 'Enlaces de Runtz',
      companyLinksLabel: 'Enlaces de la empresa',
      login: {
        title: 'Ingresar',
        body: 'Accede a tu espacio de trabajo en la nube.',
      },
      docs: {
        title: 'Lee la documentación',
        body: 'Guías para desplegar, analizar y priorizar hallazgos.',
      },
      playground: {
        title: 'Playground',
        body: 'Prueba runtz en un entorno interactivo.',
      },
      pricing: {
        title: 'Compara los planes',
        body: 'Opciones gratuitas, self-hosted y para equipos.',
      },
      legal: {
        title: 'Términos e información legal',
        body: 'Políticas y documentos legales.',
      },
      roadmap: {
        title: 'Roadmap',
        body: 'Descubre lo que estamos construyendo.',
      },
    },
    console: {
      screens: {
        overview: 'Vista general',
        scanType: 'Tipo de análisis',
        details: 'Detalles',
      },
      sidebar: {
        platform: 'Plataforma DevSecOps',
        overview: 'Vista general',
        code: 'Código',
        hosts: 'Hosts',
        containers: 'Contenedores',
      },
      chart: {
        vulnerabilityTrend: 'Tendencia de vulnerabilidades',
        scansPerDay: 'Análisis por día',
      },
      overview: {
        eyebrow: 'Plataforma / Vista general',
        title: 'Vista general',
        description: 'Análisis y vulnerabilidades de todos los activos.',
        assets: 'Activos',
        scans: 'Análisis',
        vulnerabilities: 'Vulnerabilidades',
        criticalHigh: 'Críticas/Altas',
        vulnerabilityTrend: 'Tendencia de vulnerabilidades',
        severities: 'Severidades',
        latestScans: 'Últimos análisis',
        containerScanning: 'Análisis de contenedores',
        hostScanning: 'Análisis de hosts',
      },
      scanType: {
        eyebrow: 'Código / SCA',
        title: 'Aplicaciones',
        description: 'Dependencias de las aplicaciones por espacio de trabajo.',
        app: 'Aplicación',
        vulnerabilities: 'Vulnerabilidades',
        vulnerabilitiesShort: 'vulnerabilidades',
      },
      detail: {
        eyebrow: 'SCA / Aplicaciones',
        latestScan: 'Último análisis: 29 de mayo de 2026, 5:18',
        scanReceived: 'análisis recibido',
        dependencies: 'dependencias',
        vulnerabilities: 'vulnerabilidades',
        scans: 'análisis',
        cvesFound: 'CVE encontradas',
        packageId: 'Paquete / ID',
        fix: 'Corrección',
      },
      severity: {
        critical: 'crítica',
        high: 'alta',
        medium: 'media',
        low: 'baja',
      },
      assetsLabel: 'activos',
      dashboardLevels: 'Niveles del panel',
    },
  },
};
