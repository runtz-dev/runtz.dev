import { legal } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { i18n, type Locale } from './i18n';

// Legal documents (Terms of Service, Privacy Policy, ...) served under
// /legal. Add a new .mdx file to content/legal and it automatically appears
// on the /legal hub page.
export const legalSource = loader({
  baseUrl: '/legal',
  source: toFumadocsSource(legal, []),
  i18n,
});

export const legalUiCopy = {
  en: {
    metadata: { title: 'Legal', description: 'Legal documents for the Runtz platform and services.' },
    eyebrow: 'legal',
    title: 'Legal documents',
    body: 'The documents that govern the use of the Runtz platform and how we handle data.',
    questions: 'Questions? Contact',
    back: 'Legal documents',
  },
  'pt-br': {
    metadata: { title: 'Jurídico', description: 'Documentos legais da plataforma e dos serviços Runtz.' },
    eyebrow: 'jurídico',
    title: 'Documentos legais',
    body: 'Os documentos que regem o uso da plataforma Runtz e explicam como tratamos os dados.',
    questions: 'Tem alguma dúvida? Entre em contato:',
    back: 'Documentos legais',
  },
  es: {
    metadata: { title: 'Legal', description: 'Documentos legales de la plataforma y los servicios de Runtz.' },
    eyebrow: 'legal',
    title: 'Documentos legales',
    body: 'Los documentos que rigen el uso de la plataforma Runtz y explican cómo tratamos los datos.',
    questions: '¿Tienes alguna pregunta? Escríbenos a',
    back: 'Documentos legales',
  },
} satisfies Record<
  Locale,
  {
    metadata: { title: string; description: string };
    eyebrow: string;
    title: string;
    body: string;
    questions: string;
    back: string;
  }
>;
