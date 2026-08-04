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
      'runtz sca --file package.json --endpoint https://engine.runtz.dev --token rtz_live_...',
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
      'runtz sast --path ./src --endpoint https://engine.runtz.dev --token rtz_live_...',
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
      'runtz dast --target https://app.example.com --endpoint https://engine.runtz.dev --token rtz_live_...',
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
      'runtz container --image ubuntu:22.04 --endpoint https://engine.runtz.dev --token rtz_live_...',
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
      'runtz k8s --endpoint https://engine.runtz.dev --token rtz_live_...',
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
      'runtz host --endpoint https://engine.runtz.dev --token rtz_live_...',
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
    command: `curl -fsSL https://runtz.dev/home/docker-compose.yml -o docker-compose.yml
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
    command: `curl -fsSL https://runtz.dev/home/docker-compose.yml -o docker-compose.yml
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
