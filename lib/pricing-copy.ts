import type { Locale } from './i18n';

export type PricingPlanCopy = {
  name: string;
  eyebrow: string;
  description: string;
  price: string;
  cadence: string;
  originalPrice?: string;
  includesFrom?: string;
  features: string[];
  action: string;
};

export type PricingCopy = {
  metadata: { title: string; description: string };
  intro: { eyebrow: string; title: string; body: string };
  faqs: { eyebrow: string; title: string; items: { question: string; answer: string }[] };
  final: { eyebrow: string; title: string; body: string; action: string; docs: string };
  modeAriaLabel: string;
  modeLabels: { cloud: string; selfHosted: string };
  plans: { cloud: PricingPlanCopy[]; selfHosted: PricingPlanCopy[] };
  discount: string;
  everythingFrom: string;
  currentPlan: string;
  includedInPlan: string;
  comparison: {
    title: string;
    feature: string;
    included: string;
    notIncluded: string;
    features: Record<string, string>;
  };
  success: {
    eyebrow: string;
    checking: string;
    title: string;
    body: string;
    missingSession: string;
    loadError: string;
    planLabel: string;
    deploymentLabel: string;
    statusLabel: string;
    fallbackTitle: string;
    copied: string;
    copyKey: string;
    keyIssued: string;
    unknown: string;
    openApp: string;
    activationDocs: string;
    confirmedEyebrow: string;
    confirmedTitle: string;
    confirmedBody: string;
    workspace: string;
    plans: string;
    invalidEyebrow: string;
    invalidTitle: string;
    invalidBody: string;
    retry: string;
  };
};

export const pricingCopy: Record<Locale, PricingCopy> = {
  en: {
    metadata: {
      title: 'Pricing',
      description:
        'Start free in the cloud or self-host runtz. Upgrade for team workspaces, alerts, reports, and stronger authentication.',
    },
    intro: {
      eyebrow: 'pricing',
      title: 'Get started with runtz',
      body: 'Security that scales from solo developers to companies of every size.',
    },
    faqs: {
      eyebrow: 'faq',
      title: 'Clear answers before you choose.',
      items: [
        {
          question: 'Which plan should I start with?',
          answer:
            "We recommend starting with Free Cloud — you'll have security scans running in minutes, with no infrastructure to set up. Choose Self-hosted Free instead if your scan data needs to stay inside your own infrastructure from day one.",
        },
        {
          question: 'Can I cancel or downgrade anytime?',
          answer:
            'Yes. Change plans or cancel whenever you need to, right from your workspace — no long-term contract, no penalties.',
        },
        {
          question: 'Can I keep all data inside my infrastructure?',
          answer:
            'Yes. Self-hosted plans run entirely in your own environment, so your data stays fully under your control.',
        },
        {
          question: 'Do I need a security team to use runtz?',
          answer:
            "No. runtz is built so any developer can run a scan and act on the results — you don't need in-house security expertise to get value from day one.",
        },
        {
          question: 'Does self-hosted support Google and GitHub authentication?',
          answer:
            "Google authentication is included on every self-hosted plan, including Free. GitHub authentication is cloud-only and isn't available for self-hosted deployments.",
        },
      ],
    },
    final: {
      eyebrow: 'start now',
      title: 'Start scanning today.',
      body: 'Secure your environment with runtz.',
      action: 'Start for free',
      docs: 'Docs',
    },
    modeAriaLabel: 'Choose pricing card hosting model',
    modeLabels: { cloud: 'Cloud', selfHosted: 'Self-hosted' },
    plans: {
      cloud: [
        {
          name: 'Free',
          eyebrow: 'personal',
          description: 'A hosted workspace for developers who want to start scanning now.',
          price: '$0',
          cadence: 'forever',
          features: ['All security scans', 'Personal workspace', 'No infrastructure to run'],
          action: 'Start for free',
        },
        {
          name: 'Pro',
          eyebrow: 'team',
          description: 'Comfortable limits — built for small and medium teams.',
          price: '$20',
          cadence: '/month',
          includesFrom: 'Free',
          features: ['Shared workspaces', 'Smart reports', 'Smart alerts'],
          action: 'Choose Pro',
        },
        {
          name: 'Enterprise',
          eyebrow: 'launch offer',
          description: 'Security at scale for large and growing organizations.',
          price: '$99',
          cadence: '/month',
          originalPrice: '$199/month',
          includesFrom: 'Pro',
          features: [
            'Custom platform limits',
            'Dedicated Slack support',
            'Implementation support',
          ],
          action: 'Choose Enterprise',
        },
      ],
      selfHosted: [
        {
          name: 'Free',
          eyebrow: 'open source',
          description:
            'Run runtz on your own infrastructure when you need to keep data in-house.',
          price: '$0',
          cadence: 'forever',
          features: ['All security scans', 'Shared workspaces', 'Runs in your infrastructure'],
          action: 'Self-host runtz',
        },
        {
          name: 'Pro',
          eyebrow: 'team',
          description: 'Comfortable limits — built for small and medium teams.',
          price: '$20',
          cadence: '/month',
          includesFrom: 'Free',
          features: ['Smart email reports', 'Smart alerts'],
          action: 'Choose Pro',
        },
        {
          name: 'Enterprise',
          eyebrow: 'launch offer',
          description: 'Security at scale for large and growing organizations.',
          price: '$99',
          cadence: '/month',
          originalPrice: '$199/month',
          includesFrom: 'Pro',
          features: [
            'Custom platform limits',
            'Dedicated Slack support',
            'Self-host implementation support',
          ],
          action: 'Choose Enterprise',
        },
      ],
    },
    discount: '50% off until Jan 2027',
    everythingFrom: 'Everything from {plan}, plus:',
    currentPlan: 'Your current plan',
    includedInPlan: 'Included in your plan',
    comparison: {
      title: 'Plan comparison',
      feature: 'Feature',
      included: 'Included',
      notIncluded: 'Not included',
      features: {
        cloudWorkspace: 'Cloud workspace',
        selfHostedDeployment: 'Self-hosted deployment',
        dataInInfrastructure: 'Data stays in your infrastructure',
        dashboards: 'All dashboards',
        googleAuth: 'Google authentication',
        githubAuth: 'GitHub authentication',
        sharedWorkspace: 'Shared workspace',
        emailReports: 'Smart email reports',
        alerts: 'Smart alerts',
        slackSupport: 'Dedicated Slack support',
        selfHostSupport: 'Self-host support',
        implementation: 'Implementation support',
      },
    },
    success: {
      eyebrow: 'checkout complete',
      checking: 'Loading checkout status…',
      title: 'Your runtz plan is ready.',
      body: 'Stripe confirmed the subscription. Cloud plans are available after login with the same billing email. Self-hosted purchases started inside your installation activate automatically; public-site purchases can use the fallback key below.',
      missingSession: 'Missing checkout session.',
      loadError: 'Unable to load checkout.',
      planLabel: 'Plan',
      deploymentLabel: 'Deployment',
      statusLabel: 'Status',
      fallbackTitle: 'Self-hosted fallback key',
      copied: 'Copied',
      copyKey: 'Copy key',
      keyIssued:
        'This key was already issued. Use the key you copied after checkout or contact support with prefix',
      unknown: 'unknown',
      openApp: 'Open runtz app',
      activationDocs: 'Activation docs',
      confirmedEyebrow: 'payment confirmed',
      confirmedTitle: 'Your plan is active.',
      confirmedBody: 'Your workspace has been updated. You can return to the platform now.',
      workspace: 'Open workspace',
      plans: 'View plans',
      invalidEyebrow: 'payment pending',
      invalidTitle: 'We could not confirm this checkout.',
      invalidBody:
        'Open your workspace to check the current plan, or return to pricing and try again.',
      retry: 'Back to pricing',
    },
  },
  'pt-br': {
    metadata: {
      title: 'Preços',
      description:
        'Comece grátis na nuvem ou hospede o runtz na sua infraestrutura. Faça upgrade para workspaces de equipe, alertas, relatórios e autenticação avançada.',
    },
    intro: {
      eyebrow: 'preços',
      title: 'Comece com o runtz',
      body: 'Segurança que acompanha desde desenvolvedores independentes até empresas de qualquer porte.',
    },
    faqs: {
      eyebrow: 'dúvidas frequentes',
      title: 'Respostas claras antes da sua escolha.',
      items: [
        {
          question: 'Com qual plano devo começar?',
          answer:
            'Recomendamos começar com o Cloud Free: você terá scans de segurança em poucos minutos, sem precisar configurar infraestrutura. Escolha o Self-hosted Free se os dados dos scans precisarem permanecer na sua própria infraestrutura desde o primeiro dia.',
        },
        {
          question: 'Posso cancelar ou fazer downgrade a qualquer momento?',
          answer:
            'Sim. Altere o plano ou cancele quando precisar, direto no seu workspace — sem contrato de longo prazo nem multas.',
        },
        {
          question: 'Posso manter todos os dados na minha infraestrutura?',
          answer:
            'Sim. Os planos self-hosted rodam inteiramente no seu ambiente, então os dados permanecem sob seu controle.',
        },
        {
          question: 'Preciso de uma equipe de segurança para usar o runtz?',
          answer:
            'Não. O runtz foi criado para qualquer pessoa desenvolvedora executar um scan e agir sobre os resultados — sem exigir experiência interna em segurança para gerar valor desde o primeiro dia.',
        },
        {
          question: 'O self-hosted aceita autenticação com Google e GitHub?',
          answer:
            'A autenticação com Google está incluída em todos os planos self-hosted, inclusive no Free. A autenticação com GitHub é exclusiva da nuvem e não está disponível no self-hosted.',
        },
      ],
    },
    final: {
      eyebrow: 'comece agora',
      title: 'Comece a fazer scans hoje.',
      body: 'Proteja seu ambiente com o runtz.',
      action: 'Começar grátis',
      docs: 'Documentação',
    },
    modeAriaLabel: 'Escolher modelo de hospedagem dos planos',
    modeLabels: { cloud: 'Nuvem', selfHosted: 'Self-hosted' },
    plans: {
      cloud: [
        {
          name: 'Free',
          eyebrow: 'pessoal',
          description: 'Um workspace hospedado para começar a fazer scans agora.',
          price: '$0',
          cadence: 'para sempre',
          features: ['Todos os scans de segurança', 'Workspace pessoal', 'Sem infraestrutura para manter'],
          action: 'Começar grátis',
        },
        {
          name: 'Pro',
          eyebrow: 'equipe',
          description: 'Limites confortáveis para equipes pequenas e médias.',
          price: '$20',
          cadence: '/mês',
          includesFrom: 'Free',
          features: ['Workspaces compartilhados', 'Relatórios inteligentes', 'Alertas inteligentes'],
          action: 'Escolher Pro',
        },
        {
          name: 'Enterprise',
          eyebrow: 'oferta de lançamento',
          description: 'Segurança em escala para organizações grandes e em crescimento.',
          price: '$99',
          cadence: '/mês',
          originalPrice: '$199/mês',
          includesFrom: 'Pro',
          features: [
            'Limites personalizados da plataforma',
            'Suporte dedicado no Slack',
            'Suporte na implementação',
          ],
          action: 'Escolher Enterprise',
        },
      ],
      selfHosted: [
        {
          name: 'Free',
          eyebrow: 'open source',
          description:
            'Rode o runtz na sua infraestrutura quando precisar manter os dados dentro de casa.',
          price: '$0',
          cadence: 'para sempre',
          features: ['Todos os scans de segurança', 'Workspaces compartilhados', 'Roda na sua infraestrutura'],
          action: 'Hospedar o runtz',
        },
        {
          name: 'Pro',
          eyebrow: 'equipe',
          description: 'Limites confortáveis para equipes pequenas e médias.',
          price: '$20',
          cadence: '/mês',
          includesFrom: 'Free',
          features: ['Relatórios inteligentes por e-mail', 'Alertas inteligentes'],
          action: 'Escolher Pro',
        },
        {
          name: 'Enterprise',
          eyebrow: 'oferta de lançamento',
          description: 'Segurança em escala para organizações grandes e em crescimento.',
          price: '$99',
          cadence: '/mês',
          originalPrice: '$199/mês',
          includesFrom: 'Pro',
          features: [
            'Limites personalizados da plataforma',
            'Suporte dedicado no Slack',
            'Suporte na implementação self-hosted',
          ],
          action: 'Escolher Enterprise',
        },
      ],
    },
    discount: '50% de desconto até jan. de 2027',
    everythingFrom: 'Tudo do plano {plan}, mais:',
    currentPlan: 'Seu plano atual',
    includedInPlan: 'Incluído no seu plano',
    comparison: {
      title: 'Comparação de planos',
      feature: 'Recurso',
      included: 'Incluído',
      notIncluded: 'Não incluído',
      features: {
        cloudWorkspace: 'Workspace na nuvem',
        selfHostedDeployment: 'Implantação self-hosted',
        dataInInfrastructure: 'Dados permanecem na sua infraestrutura',
        dashboards: 'Todos os dashboards',
        googleAuth: 'Autenticação com Google',
        githubAuth: 'Autenticação com GitHub',
        sharedWorkspace: 'Workspace compartilhado',
        emailReports: 'Relatórios inteligentes por e-mail',
        alerts: 'Alertas inteligentes',
        slackSupport: 'Suporte dedicado no Slack',
        selfHostSupport: 'Suporte para self-hosted',
        implementation: 'Suporte na implementação',
      },
    },
    success: {
      eyebrow: 'compra concluída',
      checking: 'Carregando o status da compra…',
      title: 'Seu plano runtz está pronto.',
      body: 'A Stripe confirmou a assinatura. Os planos Cloud ficam disponíveis após o login com o mesmo e-mail da cobrança. Compras self-hosted iniciadas dentro da sua instalação são ativadas automaticamente; compras feitas pelo site público podem usar a chave alternativa abaixo.',
      missingSession: 'Sessão de compra não encontrada.',
      loadError: 'Não foi possível carregar a compra.',
      planLabel: 'Plano',
      deploymentLabel: 'Implantação',
      statusLabel: 'Status',
      fallbackTitle: 'Chave alternativa para self-hosted',
      copied: 'Copiada',
      copyKey: 'Copiar chave',
      keyIssued:
        'Esta chave já foi emitida. Use a chave copiada após a compra ou fale com o suporte informando o prefixo',
      unknown: 'desconhecido',
      openApp: 'Abrir o app runtz',
      activationDocs: 'Documentação de ativação',
      confirmedEyebrow: 'pagamento confirmado',
      confirmedTitle: 'Seu plano está ativo.',
      confirmedBody: 'Seu workspace foi atualizado. Você já pode voltar para a plataforma.',
      workspace: 'Abrir workspace',
      plans: 'Ver planos',
      invalidEyebrow: 'pagamento pendente',
      invalidTitle: 'Não foi possível confirmar esta compra.',
      invalidBody:
        'Abra seu workspace para verificar o plano atual ou volte aos preços e tente novamente.',
      retry: 'Voltar aos preços',
    },
  },
  es: {
    metadata: {
      title: 'Precios',
      description:
        'Empieza gratis en la nube o aloja runtz en tu infraestructura. Mejora tu plan para obtener espacios de equipo, alertas, informes y autenticación avanzada.',
    },
    intro: {
      eyebrow: 'precios',
      title: 'Empieza con runtz',
      body: 'Seguridad que escala desde desarrolladores independientes hasta empresas de cualquier tamaño.',
    },
    faqs: {
      eyebrow: 'preguntas frecuentes',
      title: 'Respuestas claras antes de elegir.',
      items: [
        {
          question: '¿Con qué plan debería empezar?',
          answer:
            'Recomendamos empezar con Cloud Free: tendrás análisis de seguridad en minutos, sin infraestructura que configurar. Elige Self-hosted Free si los datos de tus análisis deben permanecer en tu propia infraestructura desde el primer día.',
        },
        {
          question: '¿Puedo cancelar o bajar de plan en cualquier momento?',
          answer:
            'Sí. Cambia de plan o cancela cuando lo necesites desde tu espacio de trabajo, sin contratos a largo plazo ni penalizaciones.',
        },
        {
          question: '¿Puedo mantener todos los datos en mi infraestructura?',
          answer:
            'Sí. Los planes self-hosted se ejecutan por completo en tu entorno, así que los datos permanecen bajo tu control.',
        },
        {
          question: '¿Necesito un equipo de seguridad para usar runtz?',
          answer:
            'No. runtz está diseñado para que cualquier desarrollador pueda ejecutar un análisis y actuar sobre los resultados, sin necesitar experiencia interna en seguridad desde el primer día.',
        },
        {
          question: '¿Self-hosted admite autenticación con Google y GitHub?',
          answer:
            'La autenticación con Google está incluida en todos los planes self-hosted, incluso Free. La autenticación con GitHub es exclusiva de la nube y no está disponible en self-hosted.',
        },
      ],
    },
    final: {
      eyebrow: 'empieza ahora',
      title: 'Empieza a analizar hoy.',
      body: 'Protege tu entorno con runtz.',
      action: 'Empezar gratis',
      docs: 'Documentación',
    },
    modeAriaLabel: 'Elegir el modelo de alojamiento de los planes',
    modeLabels: { cloud: 'Nube', selfHosted: 'Self-hosted' },
    plans: {
      cloud: [
        {
          name: 'Free',
          eyebrow: 'personal',
          description: 'Un espacio alojado para empezar a analizar ahora.',
          price: '$0',
          cadence: 'para siempre',
          features: ['Todos los análisis de seguridad', 'Espacio personal', 'Sin infraestructura que mantener'],
          action: 'Empezar gratis',
        },
        {
          name: 'Pro',
          eyebrow: 'equipo',
          description: 'Límites cómodos para equipos pequeños y medianos.',
          price: '$20',
          cadence: '/mes',
          includesFrom: 'Free',
          features: ['Espacios compartidos', 'Informes inteligentes', 'Alertas inteligentes'],
          action: 'Elegir Pro',
        },
        {
          name: 'Enterprise',
          eyebrow: 'oferta de lanzamiento',
          description: 'Seguridad a escala para organizaciones grandes y en crecimiento.',
          price: '$99',
          cadence: '/mes',
          originalPrice: '$199/mes',
          includesFrom: 'Pro',
          features: [
            'Límites personalizados de la plataforma',
            'Soporte dedicado por Slack',
            'Soporte de implementación',
          ],
          action: 'Elegir Enterprise',
        },
      ],
      selfHosted: [
        {
          name: 'Free',
          eyebrow: 'código abierto',
          description:
            'Ejecuta runtz en tu infraestructura cuando necesites mantener los datos dentro de tu organización.',
          price: '$0',
          cadence: 'para siempre',
          features: ['Todos los análisis de seguridad', 'Espacios compartidos', 'Se ejecuta en tu infraestructura'],
          action: 'Alojar runtz',
        },
        {
          name: 'Pro',
          eyebrow: 'equipo',
          description: 'Límites cómodos para equipos pequeños y medianos.',
          price: '$20',
          cadence: '/mes',
          includesFrom: 'Free',
          features: ['Informes inteligentes por correo', 'Alertas inteligentes'],
          action: 'Elegir Pro',
        },
        {
          name: 'Enterprise',
          eyebrow: 'oferta de lanzamiento',
          description: 'Seguridad a escala para organizaciones grandes y en crecimiento.',
          price: '$99',
          cadence: '/mes',
          originalPrice: '$199/mes',
          includesFrom: 'Pro',
          features: [
            'Límites personalizados de la plataforma',
            'Soporte dedicado por Slack',
            'Soporte de implementación self-hosted',
          ],
          action: 'Elegir Enterprise',
        },
      ],
    },
    discount: '50% de descuento hasta ene. de 2027',
    everythingFrom: 'Todo lo del plan {plan}, más:',
    currentPlan: 'Tu plan actual',
    includedInPlan: 'Incluido en tu plan',
    comparison: {
      title: 'Comparación de planes',
      feature: 'Función',
      included: 'Incluido',
      notIncluded: 'No incluido',
      features: {
        cloudWorkspace: 'Espacio en la nube',
        selfHostedDeployment: 'Implementación self-hosted',
        dataInInfrastructure: 'Los datos permanecen en tu infraestructura',
        dashboards: 'Todos los dashboards',
        googleAuth: 'Autenticación con Google',
        githubAuth: 'Autenticación con GitHub',
        sharedWorkspace: 'Espacio compartido',
        emailReports: 'Informes inteligentes por correo',
        alerts: 'Alertas inteligentes',
        slackSupport: 'Soporte dedicado por Slack',
        selfHostSupport: 'Soporte para self-hosted',
        implementation: 'Soporte de implementación',
      },
    },
    success: {
      eyebrow: 'compra completada',
      checking: 'Cargando el estado de la compra…',
      title: 'Tu plan de runtz está listo.',
      body: 'Stripe confirmó la suscripción. Los planes Cloud estarán disponibles después de iniciar sesión con el mismo correo de facturación. Las compras self-hosted iniciadas desde tu instalación se activan automáticamente; las compras del sitio público pueden usar la clave alternativa de abajo.',
      missingSession: 'No se encontró la sesión de compra.',
      loadError: 'No se pudo cargar la compra.',
      planLabel: 'Plan',
      deploymentLabel: 'Implementación',
      statusLabel: 'Estado',
      fallbackTitle: 'Clave alternativa para self-hosted',
      copied: 'Copiada',
      copyKey: 'Copiar clave',
      keyIssued:
        'Esta clave ya fue emitida. Usa la clave que copiaste después de la compra o contacta con soporte e indica el prefijo',
      unknown: 'desconocido',
      openApp: 'Abrir la app de runtz',
      activationDocs: 'Documentación de activación',
      confirmedEyebrow: 'pago confirmado',
      confirmedTitle: 'Tu plan está activo.',
      confirmedBody: 'Tu espacio de trabajo se actualizó. Ya puedes volver a la plataforma.',
      workspace: 'Abrir espacio de trabajo',
      plans: 'Ver planes',
      invalidEyebrow: 'pago pendiente',
      invalidTitle: 'No pudimos confirmar esta compra.',
      invalidBody:
        'Abre tu espacio de trabajo para comprobar el plan actual o vuelve a precios e inténtalo de nuevo.',
      retry: 'Volver a precios',
    },
  },
};
