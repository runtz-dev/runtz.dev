import {
  Code2,
  Container,
  GitBranch,
  HeartHandshake,
  PackageCheck,
  Radar,
  Server,
  ShipWheel,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Locale } from './i18n';

export type PlatformPage = {
  slug: string;
  label: string;
  title: string;
  eyebrow: string;
  summary: string;
  status: string;
  command: string;
  icon: LucideIcon;
  highlights: string[];
  details: {
    title: string;
    body: string;
  }[];
};

export const platformPages: PlatformPage[] = [
  {
    slug: 'sca',
    label: 'SCA',
    eyebrow: 'software composition analysis',
    title: 'Find dependency risk before it ships.',
    summary:
      'Run SCA from the runtz CLI, match npm dependencies against GitHub Global Security Advisories, and review the result by workspace.',
    status: 'Available now',
    command:
      'runtz sca ./',
    icon: PackageCheck,
    highlights: ['npm package.json input', 'GHSA matching', 'workspace dashboard'],
    details: [
      {
        title: 'Dependency inventory',
        body: 'Collect package names and versions from project manifests without pushing source code to a hosted scanner.',
      },
      {
        title: 'Advisory context',
        body: 'Surface package, severity, advisory ID, and scan history in a dashboard built for repeated review.',
      },
      {
        title: 'CLI friendly',
        body: 'Use flags or environment variables to wire SCA into local scripts and CI jobs.',
      },
    ],
  },
  {
    slug: 'sast',
    label: 'SAST',
    eyebrow: 'static application security testing',
    title: 'Catch source findings before they ship.',
    summary:
      'Run local static rules for source code, normalize findings, and review them beside dependency, host, container and Kubernetes results.',
    status: 'Available now',
    command:
      'runtz sast ./src',
    icon: Code2,
    highlights: ['source rules', 'secret checks', 'same workspace model'],
    details: [
      {
        title: 'Local source scan',
        body: 'Scan source files locally with initial high-signal rules for secrets, dynamic execution, disabled TLS verification and weak hashing.',
      },
      {
        title: 'Developer context',
        body: 'Findings keep file, line, category, severity and remediation context so developers can triage without raw report dumps.',
      },
      {
        title: 'Same ingest model',
        body: 'The token generated in the platform resolves the workspace automatically and stores SAST with the same scan history model.',
      },
    ],
  },
  {
    slug: 'dast',
    label: 'DAST',
    eyebrow: 'dynamic application security testing',
    title: 'Runtime web checks for deployed surfaces.',
    summary:
      'DAST is planned as a future scan family for HTTP applications, focused on repeatable evidence and manageable triage.',
    status: 'Coming soon',
    command:
      'runtz dast --target https://app.example.com',
    icon: Radar,
    highlights: ['target-based scans', 'runtime evidence', 'triage-ready reports'],
    details: [
      {
        title: 'Target driven',
        body: 'Future DAST scans should start from a clear URL target and produce findings that map back to routes.',
      },
      {
        title: 'Evidence first',
        body: 'Runtime checks need enough request and response context to be useful without overwhelming the dashboard.',
      },
      {
        title: 'Separate from SAST',
        body: 'DAST gets its own page and workflow because runtime findings behave differently from code findings.',
      },
    ],
  },
  {
    slug: 'container-scanning',
    label: 'Container scanning',
    eyebrow: 'image package inventory',
    title: 'Inspect the packages inside container images.',
    summary:
      'Pull from a registry or read a local Docker image, inspect Debian and Ubuntu package metadata, and ingest CVE matches.',
    status: 'Available now',
    command:
      'runtz container ubuntu:22.04',
    icon: Container,
    highlights: ['registry or local Docker', 'dpkg inventory', 'OSV package CVEs'],
    details: [
      {
        title: 'Image aware',
        body: 'Container scans look at package inventories inside the image rather than only application manifests.',
      },
      {
        title: 'Local image support',
        body: 'Use the local Docker daemon for images that are not pushed to a registry yet.',
      },
      {
        title: 'Debian and Ubuntu first',
        body: 'The current implementation supports dpkg-based images and keeps unsupported scope explicit.',
      },
    ],
  },
  {
    slug: 'kubernetes-scanning',
    label: 'Kubernetes scanning',
    eyebrow: 'cluster posture',
    title: 'Scan connected Kubernetes clusters for posture risk.',
    summary:
      'Use kubectl against the current cluster context, check workload posture and RBAC risk, and send Kubernetes findings to the platform.',
    status: 'Available now',
    command:
      'runtz k8s',
    icon: ShipWheel,
    highlights: ['kubectl context', 'workload posture', 'RBAC checks'],
    details: [
      {
        title: 'Cluster first',
        body: 'The default workflow runs kubectl get against the connected cluster and scans the resources the current identity can read.',
      },
      {
        title: 'Operator context',
        body: 'Findings keep resource kind, resource name, namespace, file and remediation context for quick review.',
      },
      {
        title: 'Security posture',
        body: 'Rules cover privileged containers, mutable image tags, host namespace usage, public exposure and broad RBAC.',
      },
    ],
  },
  {
    slug: 'host-scanning',
    label: 'Host scanning',
    eyebrow: 'linux package inventory',
    title: 'Scan dpkg-based hosts and root filesystems.',
    summary:
      'Inventory packages from Ubuntu or Debian style systems, query CVE data, and keep host findings alongside application scans.',
    status: 'Available now',
    command:
      'runtz host',
    icon: Server,
    highlights: ['Ubuntu and Debian support', 'rootfs input', 'OSV CVE matching'],
    details: [
      {
        title: 'Host inventory',
        body: 'Read os-release and dpkg status data to normalize package findings for server environments.',
      },
      {
        title: 'Same ingest model',
        body: 'Host scans use the same backend and workspace model as application and container scans.',
      },
      {
        title: 'Operator friendly',
        body: 'The CLI can run from the machine being inspected or against a root filesystem path.',
      },
    ],
  },
  {
    slug: 'open-source',
    label: 'Open Source',
    eyebrow: 'inspectable by design',
    title: 'A DevSecOps stack your team can read.',
    summary:
      'runtz is built from straightforward parts: Go scanner CLI, Go backend, Next.js frontend, and MongoDB persistence.',
    status: 'Open source',
    command: `curl -fsSL https://runtz.dev/docker-compose.yml -o docker-compose.yml
docker compose up -d`,
    icon: HeartHandshake,
    highlights: ['local Docker Compose', 'documented API routes', 'clear extension points'],
    details: [
      {
        title: 'Transparent architecture',
        body: 'The frontend, CLI, and backend are split so teams can understand and change the pieces independently.',
      },
      {
        title: 'No hosted dependency required',
        body: 'The free self-hosted workflow runs locally and keeps scan data in a database you control.',
      },
      {
        title: 'Built to extend',
        body: 'Future scan families can join the same workspace and ingest model without replacing the whole product.',
      },
    ],
  },
];

export const platformPageBySlug = new Map(
  platformPages.map((page) => [page.slug, page]),
);

type PlatformPageTranslation = Pick<
  PlatformPage,
  'label' | 'title' | 'eyebrow' | 'summary' | 'status' | 'highlights' | 'details'
>;

const platformTranslations: Record<
  Exclude<Locale, 'en'>,
  Record<string, PlatformPageTranslation>
> = {
  'pt-br': {
    sca: {
      label: 'SCA',
      eyebrow: 'análise de composição de software',
      title: 'Encontre riscos nas dependências antes do deploy.',
      summary:
        'Execute SCA pela CLI do runtz, compare dependências npm com os GitHub Global Security Advisories e revise os resultados por workspace.',
      status: 'Disponível agora',
      highlights: ['entrada via package.json do npm', 'correspondência com GHSA', 'dashboard por workspace'],
      details: [
        { title: 'Inventário de dependências', body: 'Colete nomes e versões dos pacotes nos manifests do projeto sem enviar o código-fonte para um scanner hospedado.' },
        { title: 'Contexto dos alertas', body: 'Veja pacote, severidade, ID do alerta e histórico de scans em um dashboard feito para revisões recorrentes.' },
        { title: 'Pronto para a CLI', body: 'Use flags ou variáveis de ambiente para integrar o SCA a scripts locais e pipelines de CI.' },
      ],
    },
    sast: {
      label: 'SAST',
      eyebrow: 'teste estático de segurança de aplicações',
      title: 'Encontre problemas no código antes do deploy.',
      summary: 'Execute regras estáticas locais no código-fonte, normalize os achados e revise tudo junto aos resultados de dependências, hosts, containers e Kubernetes.',
      status: 'Disponível agora',
      highlights: ['regras de código', 'verificação de segredos', 'mesmo modelo de workspace'],
      details: [
        { title: 'Scan local do código', body: 'Analise arquivos localmente com regras iniciais de alto sinal para segredos, execução dinâmica, TLS desabilitado e hashes fracos.' },
        { title: 'Contexto para quem desenvolve', body: 'Os achados preservam arquivo, linha, categoria, severidade e orientação de correção para facilitar a triagem.' },
        { title: 'Mesmo modelo de ingestão', body: 'O token da plataforma resolve o workspace automaticamente e armazena o SAST no mesmo histórico de scans.' },
      ],
    },
    dast: {
      label: 'DAST',
      eyebrow: 'teste dinâmico de segurança de aplicações',
      title: 'Verificações web em runtime para aplicações implantadas.',
      summary: 'O DAST está planejado como uma futura família de scans para aplicações HTTP, com foco em evidências reproduzíveis e triagem prática.',
      status: 'Em breve',
      highlights: ['scans por alvo', 'evidências de runtime', 'relatórios prontos para triagem'],
      details: [
        { title: 'Orientado pelo alvo', body: 'Os futuros scans DAST partirão de uma URL clara e produzirão achados vinculados às rotas.' },
        { title: 'Evidência em primeiro lugar', body: 'As verificações de runtime terão contexto suficiente de requisição e resposta sem sobrecarregar o dashboard.' },
        { title: 'Separado do SAST', body: 'O DAST terá página e fluxo próprios porque achados de runtime se comportam de forma diferente dos achados de código.' },
      ],
    },
    'container-scanning': {
      label: 'Scan de containers',
      eyebrow: 'inventário de pacotes da imagem',
      title: 'Inspecione os pacotes dentro das imagens de container.',
      summary: 'Baixe de um registry ou leia uma imagem Docker local, inspecione metadados de pacotes Debian e Ubuntu e envie as correspondências de CVE.',
      status: 'Disponível agora',
      highlights: ['registry ou Docker local', 'inventário dpkg', 'CVEs de pacotes via OSV'],
      details: [
        { title: 'Consciente da imagem', body: 'O scan de container examina o inventário de pacotes dentro da imagem, não apenas os manifests da aplicação.' },
        { title: 'Suporte a imagens locais', body: 'Use o daemon Docker local para imagens que ainda não foram enviadas a um registry.' },
        { title: 'Debian e Ubuntu primeiro', body: 'A implementação atual aceita imagens baseadas em dpkg e deixa o escopo ainda não suportado explícito.' },
      ],
    },
    'kubernetes-scanning': {
      label: 'Scan de Kubernetes',
      eyebrow: 'postura do cluster',
      title: 'Analise clusters Kubernetes conectados em busca de riscos de postura.',
      summary: 'Use o kubectl no contexto atual do cluster, verifique a postura de workloads e riscos de RBAC e envie os achados à plataforma.',
      status: 'Disponível agora',
      highlights: ['contexto do kubectl', 'postura de workloads', 'verificações de RBAC'],
      details: [
        { title: 'Cluster em primeiro lugar', body: 'O fluxo padrão executa kubectl get no cluster conectado e analisa os recursos que a identidade atual pode ler.' },
        { title: 'Contexto para operação', body: 'Os achados preservam tipo, nome, namespace, arquivo e orientação de correção para revisão rápida.' },
        { title: 'Postura de segurança', body: 'As regras cobrem containers privilegiados, tags mutáveis, namespaces do host, exposição pública e RBAC amplo.' },
      ],
    },
    'host-scanning': {
      label: 'Scan de hosts',
      eyebrow: 'inventário de pacotes Linux',
      title: 'Analise hosts baseados em dpkg e sistemas de arquivos raiz.',
      summary: 'Faça o inventário de pacotes em sistemas Ubuntu ou Debian, consulte dados de CVE e mantenha os achados de hosts junto aos scans de aplicações.',
      status: 'Disponível agora',
      highlights: ['suporte a Ubuntu e Debian', 'entrada via rootfs', 'correspondência de CVEs via OSV'],
      details: [
        { title: 'Inventário do host', body: 'Leia os dados de os-release e do status do dpkg para normalizar achados de pacotes em servidores.' },
        { title: 'Mesmo modelo de ingestão', body: 'Scans de hosts usam o mesmo backend e o mesmo modelo de workspace dos scans de aplicações e containers.' },
        { title: 'Prático para operação', body: 'A CLI pode rodar na máquina inspecionada ou apontar para um caminho de sistema de arquivos raiz.' },
      ],
    },
    'open-source': {
      label: 'Open source',
      eyebrow: 'inspecionável por design',
      title: 'Uma stack DevSecOps que sua equipe consegue entender.',
      summary: 'O runtz é feito de partes diretas: CLI de scans em Go, backend em Go, frontend Next.js e persistência no MongoDB.',
      status: 'Open source',
      highlights: ['Docker Compose local', 'rotas de API documentadas', 'pontos claros de extensão'],
      details: [
        { title: 'Arquitetura transparente', body: 'Frontend, CLI e backend são separados para que as equipes entendam e alterem cada parte de forma independente.' },
        { title: 'Sem dependência de serviço hospedado', body: 'O fluxo self-hosted gratuito roda localmente e mantém os dados dos scans em um banco sob seu controle.' },
        { title: 'Feito para evoluir', body: 'Novas famílias de scans podem usar o mesmo modelo de workspace e ingestão sem substituir o produto inteiro.' },
      ],
    },
  },
  es: {
    sca: {
      label: 'SCA',
      eyebrow: 'análisis de composición de software',
      title: 'Detecta riesgos en las dependencias antes del despliegue.',
      summary: 'Ejecuta SCA desde la CLI de runtz, compara dependencias npm con GitHub Global Security Advisories y revisa los resultados por espacio de trabajo.',
      status: 'Disponible ahora',
      highlights: ['entrada desde package.json de npm', 'coincidencias con GHSA', 'dashboard por espacio'],
      details: [
        { title: 'Inventario de dependencias', body: 'Recopila nombres y versiones de paquetes desde los manifiestos sin enviar el código fuente a un escáner alojado.' },
        { title: 'Contexto de los avisos', body: 'Consulta paquete, severidad, ID del aviso e historial de análisis en un dashboard para revisiones continuas.' },
        { title: 'Listo para la CLI', body: 'Usa flags o variables de entorno para integrar SCA en scripts locales y pipelines de CI.' },
      ],
    },
    sast: {
      label: 'SAST',
      eyebrow: 'pruebas estáticas de seguridad de aplicaciones',
      title: 'Detecta problemas en el código antes del despliegue.',
      summary: 'Ejecuta reglas estáticas locales, normaliza los hallazgos y revísalos junto a los resultados de dependencias, hosts, contenedores y Kubernetes.',
      status: 'Disponible ahora',
      highlights: ['reglas de código', 'detección de secretos', 'mismo modelo de espacio'],
      details: [
        { title: 'Análisis local del código', body: 'Analiza archivos localmente con reglas de alta señal para secretos, ejecución dinámica, TLS deshabilitado y hashes débiles.' },
        { title: 'Contexto para desarrollo', body: 'Los hallazgos conservan archivo, línea, categoría, severidad y orientación de corrección para facilitar el triaje.' },
        { title: 'Mismo modelo de ingesta', body: 'El token de la plataforma identifica el espacio automáticamente y guarda SAST en el mismo historial de análisis.' },
      ],
    },
    dast: {
      label: 'DAST',
      eyebrow: 'pruebas dinámicas de seguridad de aplicaciones',
      title: 'Pruebas web en tiempo de ejecución para superficies desplegadas.',
      summary: 'DAST está previsto como una futura familia de análisis para aplicaciones HTTP, centrada en evidencia reproducible y un triaje manejable.',
      status: 'Próximamente',
      highlights: ['análisis por objetivo', 'evidencia de runtime', 'informes listos para triaje'],
      details: [
        { title: 'Orientado al objetivo', body: 'Los futuros análisis DAST partirán de una URL clara y producirán hallazgos vinculados a las rutas.' },
        { title: 'La evidencia primero', body: 'Las pruebas de runtime tendrán suficiente contexto de solicitud y respuesta sin saturar el dashboard.' },
        { title: 'Separado de SAST', body: 'DAST tendrá su propia página y flujo porque los hallazgos de runtime se comportan de forma distinta a los de código.' },
      ],
    },
    'container-scanning': {
      label: 'Análisis de contenedores',
      eyebrow: 'inventario de paquetes de la imagen',
      title: 'Inspecciona los paquetes dentro de las imágenes de contenedor.',
      summary: 'Descarga desde un registry o lee una imagen Docker local, inspecciona metadatos de paquetes Debian y Ubuntu e ingiere coincidencias de CVE.',
      status: 'Disponible ahora',
      highlights: ['registry o Docker local', 'inventario dpkg', 'CVEs de paquetes con OSV'],
      details: [
        { title: 'Consciente de la imagen', body: 'El análisis de contenedores examina el inventario de paquetes dentro de la imagen, no solo los manifiestos de la aplicación.' },
        { title: 'Soporte para imágenes locales', body: 'Usa el daemon Docker local para imágenes que aún no se han enviado a un registry.' },
        { title: 'Debian y Ubuntu primero', body: 'La implementación actual admite imágenes basadas en dpkg y mantiene explícito el alcance aún no soportado.' },
      ],
    },
    'kubernetes-scanning': {
      label: 'Análisis de Kubernetes',
      eyebrow: 'postura del clúster',
      title: 'Analiza clústeres Kubernetes conectados en busca de riesgos de postura.',
      summary: 'Usa kubectl con el contexto actual, comprueba la postura de workloads y riesgos de RBAC y envía los hallazgos a la plataforma.',
      status: 'Disponible ahora',
      highlights: ['contexto de kubectl', 'postura de workloads', 'pruebas de RBAC'],
      details: [
        { title: 'El clúster primero', body: 'El flujo predeterminado ejecuta kubectl get en el clúster conectado y analiza los recursos que la identidad actual puede leer.' },
        { title: 'Contexto para operaciones', body: 'Los hallazgos conservan tipo, nombre, namespace, archivo y orientación de corrección para una revisión rápida.' },
        { title: 'Postura de seguridad', body: 'Las reglas cubren contenedores privilegiados, tags mutables, namespaces del host, exposición pública y RBAC amplio.' },
      ],
    },
    'host-scanning': {
      label: 'Análisis de hosts',
      eyebrow: 'inventario de paquetes Linux',
      title: 'Analiza hosts basados en dpkg y sistemas de archivos raíz.',
      summary: 'Inventaría paquetes de sistemas Ubuntu o Debian, consulta datos de CVE y conserva los hallazgos de hosts junto a los análisis de aplicaciones.',
      status: 'Disponible ahora',
      highlights: ['soporte para Ubuntu y Debian', 'entrada rootfs', 'coincidencias de CVE con OSV'],
      details: [
        { title: 'Inventario del host', body: 'Lee os-release y el estado de dpkg para normalizar hallazgos de paquetes en servidores.' },
        { title: 'Mismo modelo de ingesta', body: 'Los análisis de hosts usan el mismo backend y modelo de espacio que los análisis de aplicaciones y contenedores.' },
        { title: 'Práctico para operaciones', body: 'La CLI puede ejecutarse en la máquina inspeccionada o apuntar a una ruta de sistema de archivos raíz.' },
      ],
    },
    'open-source': {
      label: 'Código abierto',
      eyebrow: 'inspeccionable por diseño',
      title: 'Una stack DevSecOps que tu equipo puede entender.',
      summary: 'runtz se compone de piezas directas: CLI de análisis en Go, backend en Go, frontend Next.js y persistencia en MongoDB.',
      status: 'Código abierto',
      highlights: ['Docker Compose local', 'rutas de API documentadas', 'puntos claros de extensión'],
      details: [
        { title: 'Arquitectura transparente', body: 'Frontend, CLI y backend están separados para que los equipos entiendan y modifiquen cada pieza de forma independiente.' },
        { title: 'Sin dependencia de un servicio alojado', body: 'El flujo self-hosted gratuito se ejecuta localmente y mantiene los datos en una base bajo tu control.' },
        { title: 'Diseñado para crecer', body: 'Nuevas familias de análisis pueden usar el mismo modelo de espacio e ingesta sin sustituir todo el producto.' },
      ],
    },
  },
};

export function getPlatformPages(locale: Locale) {
  if (locale === 'en') return platformPages;

  return platformPages.map((page) => ({
    ...page,
    ...platformTranslations[locale][page.slug],
  }));
}

export function getPlatformPage(locale: Locale, slug: string) {
  return getPlatformPages(locale).find((page) => page.slug === slug);
}

export const githubUrl = 'https://github.com/runtz-dev/runtz';

export type InstallOption = {
  id: 'docker' | 'helm';
  label: string;
  command: string;
};

export const installOptions: InstallOption[] = [
  {
    id: 'docker',
    label: 'Docker',
    command: `curl -fsSL https://runtz.dev/docker-compose.yml -o docker-compose.yml
docker compose up -d`,
  },
  {
    id: 'helm',
    label: 'Helm',
    command: `helm repo add runtz https://helm.runtz.dev
helm repo update
helm upgrade --install runtz runtz/runtz \\
  --namespace runtz \\
  --create-namespace`,
  },
];

export const installCommand = installOptions[0].command;

export const productFlow = [
  {
    label: 'CLI',
    body: 'Collect scan data from dependencies, source code, hosts, images, and connected Kubernetes clusters.',
  },
  {
    label: 'Backend',
    body: 'Normalize findings through workspace-aware ingest APIs.',
  },
  {
    label: 'Dashboard',
    body: 'Review CVEs, advisories, findings, package context, and scan history.',
  },
  {
    label: 'Roadmap',
    body: 'DAST remains the next planned scan family.',
  },
];

export const stackParts = [
  {
    label: 'Go CLI',
    body: 'Scanner commands for SCA, SAST, host, container, and Kubernetes workflows.',
    icon: GitBranch,
  },
  {
    label: 'Go backend',
    body: 'Auth, setup, workspaces, users, ingest, and scan APIs.',
    icon: Server,
  },
  {
    label: 'Next.js UI',
    body: 'Dashboard and settings shell for operators and engineering teams.',
    icon: Code2,
  },
];

export const platformUiCopy = {
  en: {
    metadataSuffix: 'runtz platform',
    start: 'Start for free',
    viewPricing: 'View pricing',
    workflowEyebrow: 'workflow command',
    workflowTitle: 'Built for local operators first.',
    workflowBody:
      'Every platform page keeps the same product promise: clear command-line entry points, workspace-aware ingest, and a UI that explains the finding.',
    command: 'command',
    stackTitle: 'Same stack, dedicated scan experience.',
    stackBody:
      'The pages stay distinct for product clarity, but each workflow returns to the same runtz architecture.',
    readDocs: 'Read docs',
    pricing: 'Pricing',
    copyCommand: 'Copy command',
    copied: 'Copied',
    stack: [
      { label: 'Go CLI', body: 'Scanner commands for SCA, SAST, host, container, and Kubernetes workflows.' },
      { label: 'Go backend', body: 'Auth, setup, workspaces, users, ingest, and scan APIs.' },
      { label: 'Next.js UI', body: 'Dashboard and settings shell for operators and engineering teams.' },
    ],
  },
  'pt-br': {
    metadataSuffix: 'plataforma runtz',
    start: 'Começar grátis',
    viewPricing: 'Ver preços',
    workflowEyebrow: 'comando do fluxo',
    workflowTitle: 'Feito primeiro para operação local.',
    workflowBody:
      'Cada página da plataforma mantém a mesma promessa: entradas claras pela linha de comando, ingestão consciente do workspace e uma interface que explica cada achado.',
    command: 'comando',
    stackTitle: 'A mesma stack, uma experiência dedicada para cada scan.',
    stackBody:
      'As páginas continuam separadas para dar clareza ao produto, mas todos os fluxos retornam à mesma arquitetura do runtz.',
    readDocs: 'Ler documentação',
    pricing: 'Preços',
    copyCommand: 'Copiar comando',
    copied: 'Copiado',
    stack: [
      { label: 'CLI em Go', body: 'Comandos para fluxos de SCA, SAST, hosts, containers e Kubernetes.' },
      { label: 'Backend em Go', body: 'APIs de autenticação, configuração, workspaces, usuários, ingestão e scans.' },
      { label: 'Interface Next.js', body: 'Dashboard e configurações para equipes de operação e engenharia.' },
    ],
  },
  es: {
    metadataSuffix: 'plataforma runtz',
    start: 'Empezar gratis',
    viewPricing: 'Ver precios',
    workflowEyebrow: 'comando del flujo',
    workflowTitle: 'Diseñado primero para operaciones locales.',
    workflowBody:
      'Cada página de la plataforma mantiene la misma promesa: entradas claras por línea de comandos, ingesta consciente del espacio y una interfaz que explica cada hallazgo.',
    command: 'comando',
    stackTitle: 'La misma stack, una experiencia dedicada para cada análisis.',
    stackBody:
      'Las páginas permanecen separadas para dar claridad al producto, pero todos los flujos vuelven a la misma arquitectura de runtz.',
    readDocs: 'Leer documentación',
    pricing: 'Precios',
    copyCommand: 'Copiar comando',
    copied: 'Copiado',
    stack: [
      { label: 'CLI en Go', body: 'Comandos para flujos de SCA, SAST, hosts, contenedores y Kubernetes.' },
      { label: 'Backend en Go', body: 'APIs de autenticación, configuración, espacios, usuarios, ingesta y análisis.' },
      { label: 'Interfaz Next.js', body: 'Dashboard y configuración para equipos de operaciones e ingeniería.' },
    ],
  },
} satisfies Record<
  Locale,
  {
    metadataSuffix: string;
    start: string;
    viewPricing: string;
    workflowEyebrow: string;
    workflowTitle: string;
    workflowBody: string;
    command: string;
    stackTitle: string;
    stackBody: string;
    readDocs: string;
    pricing: string;
    copyCommand: string;
    copied: string;
    stack: { label: string; body: string }[];
  }
>;

export function getStackParts(locale: Locale) {
  return stackParts.map((part, index) => ({
    ...part,
    ...(platformUiCopy[locale].stack[index] ?? {}),
  }));
}
