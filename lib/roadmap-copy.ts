import type { Locale } from './i18n';

export type RoadmapCopy = {
  metadata: { title: string; description: string };
  eyebrow: string;
  title: string;
  body: string;
  timelineLabel: string;
  status: { completed: string; running: string; pending: string };
  milestones: {
    date?: string;
    title: string;
    emphasizedTitle?: string;
    status: 'completed' | 'running' | 'pending';
  }[];
  backlog: string;
  backlogItems: string[];
};

export const roadmapCopy: Record<Locale, RoadmapCopy> = {
  en: {
    metadata: {
      title: 'Our Roadmap',
      description:
        'Start using runtz today to strengthen your security workflow and stay ahead as every new capability ships.',
    },
    eyebrow: '1.0.0 - JAN 2027',
    title: 'Our Roadmap',
    body: 'Start using runtz today to strengthen your security workflow—and stay ahead as every new capability ships.',
    timelineLabel: 'Runtz product roadmap',
    status: { completed: 'Completed', running: 'Running', pending: 'Pending' },
    milestones: [
      { title: 'Project Initialized', status: 'completed' },
      { title: 'First Release Candidate Version', status: 'completed' },
      { title: 'First GitHub Star', status: 'completed' },
      { title: 'First Client', status: 'completed' },
      { title: 'Keep building Release Candidate Version', status: 'running' },
      { date: 'Jan 2027', title: 'Launch', emphasizedTitle: '1.0.0 Version', status: 'pending' },
      { date: 'Feb 2027', title: 'Launch DAST', status: 'pending' },
    ],
    backlog: 'Backlog',
    backlogItems: ['IAC Scanning', 'Cloud Scanning'],
  },
  'pt-br': {
    metadata: {
      title: 'Nosso roadmap',
      description:
        'Comece a usar o runtz hoje, fortaleça seu fluxo de segurança e acompanhe cada nova funcionalidade.',
    },
    eyebrow: '1.0.0 - JAN. 2027',
    title: 'Nosso roadmap',
    body: 'Comece a usar o runtz hoje para fortalecer seu fluxo de segurança e acompanhe de perto cada nova funcionalidade.',
    timelineLabel: 'Roadmap do produto Runtz',
    status: { completed: 'Concluído', running: 'Em andamento', pending: 'Pendente' },
    milestones: [
      { title: 'Projeto iniciado', status: 'completed' },
      { title: 'Primeira versão Release Candidate', status: 'completed' },
      { title: 'Primeira estrela no GitHub', status: 'completed' },
      { title: 'Primeiro cliente', status: 'completed' },
      { title: 'Evolução contínua da Release Candidate', status: 'running' },
      { date: 'Jan. 2027', title: 'Lançamento', emphasizedTitle: 'da versão 1.0.0', status: 'pending' },
      { date: 'Fev. 2027', title: 'Lançamento do DAST', status: 'pending' },
    ],
    backlog: 'Backlog',
    backlogItems: ['Scan de IaC', 'Scan de cloud'],
  },
  es: {
    metadata: {
      title: 'Nuestro roadmap',
      description:
        'Empieza a usar runtz hoy, fortalece tu flujo de seguridad y adelántate a cada nueva función.',
    },
    eyebrow: '1.0.0 - ENE. 2027',
    title: 'Nuestro roadmap',
    body: 'Empieza a usar runtz hoy para fortalecer tu flujo de seguridad y mantente al día con cada nueva función.',
    timelineLabel: 'Roadmap del producto Runtz',
    status: { completed: 'Completado', running: 'En curso', pending: 'Pendiente' },
    milestones: [
      { title: 'Proyecto iniciado', status: 'completed' },
      { title: 'Primera versión Release Candidate', status: 'completed' },
      { title: 'Primera estrella en GitHub', status: 'completed' },
      { title: 'Primer cliente', status: 'completed' },
      { title: 'Evolución continua de la Release Candidate', status: 'running' },
      { date: 'Ene. 2027', title: 'Lanzamiento', emphasizedTitle: 'de la versión 1.0.0', status: 'pending' },
      { date: 'Feb. 2027', title: 'Lanzamiento de DAST', status: 'pending' },
    ],
    backlog: 'Backlog',
    backlogItems: ['Análisis de IaC', 'Análisis de cloud'],
  },
};
