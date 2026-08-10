import { defineI18n } from 'fumadocs-core/i18n';
import { uiTranslations } from 'fumadocs-ui/i18n';
import { sitePath } from './shared';

export const locales = ['en', 'pt-br', 'es'] as const;
export type Locale = (typeof locales)[number];

export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: [...locales],
  hideLocale: 'default-locale',
  fallbackLanguage: 'en',
});

export const localeDetails = {
  en: {
    code: 'EN',
    displayName: 'English',
    htmlLang: 'en',
    ogLocale: 'en_US',
    languageLabel: 'Change language',
  },
  'pt-br': {
    code: 'PT-BR',
    displayName: 'Português (Brasil)',
    htmlLang: 'pt-BR',
    ogLocale: 'pt_BR',
    languageLabel: 'Mudar idioma',
  },
  es: {
    code: 'ES',
    displayName: 'Español',
    htmlLang: 'es',
    ogLocale: 'es_419',
    languageLabel: 'Cambiar idioma',
  },
} satisfies Record<
  Locale,
  {
    code: string;
    displayName: string;
    htmlLang: string;
    ogLocale: string;
    languageLabel: string;
  }
>;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function parseLocale(value: string | string[] | null | undefined): Locale {
  const candidate = (Array.isArray(value) ? value[0] : value)?.toLowerCase();

  return candidate && isLocale(candidate) ? candidate : i18n.defaultLanguage;
}

export function localizedPath(locale: Locale, path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (locale === i18n.defaultLanguage) return normalizedPath;
  if (normalizedPath === '/') return `/${locale}`;

  return `/${locale}${normalizedPath}`;
}

export function pathLocale(pathname: string): {
  locale: Locale;
  pathname: string;
} {
  const segments = pathname.split('/').filter(Boolean);
  const candidate = segments[0]?.toLowerCase();

  if (candidate && isLocale(candidate)) {
    const rest = segments.slice(1).join('/');
    return { locale: candidate, pathname: rest ? `/${rest}` : '/' };
  }

  return { locale: i18n.defaultLanguage, pathname };
}

export function localeAlternates(locale: Locale, path: string) {
  return {
    canonical: sitePath(localizedPath(locale, path)),
    languages: {
      en: sitePath(localizedPath('en', path)),
      'pt-BR': sitePath(localizedPath('pt-br', path)),
      es: sitePath(localizedPath('es', path)),
      'x-default': sitePath(localizedPath('en', path)),
    },
  };
}

export const fumadocsTranslations = i18n
  .translations()
  .extend(uiTranslations())
  .add({
    en: {
      displayName: localeDetails.en.displayName,
    },
    'pt-br': {
      displayName: localeDetails['pt-br'].displayName,
      'Ask AI(AI chat button)': 'Perguntar à IA',
      'Back to Home(404 page)': 'Voltar ao início',
      'Choose a language(language switcher)': 'Escolher idioma',
      'Choose a language(language switcher)(aria-label)': 'Escolher idioma',
      'Close Banner(banner)(aria-label)': 'Fechar banner',
      'Close Search(search dialog)(aria-label)': 'Fechar busca',
      'Close Sidebar(aria-label)': 'Fechar barra lateral',
      'Close Sidebar(sidebar)(aria-label)': 'Fechar barra lateral',
      'Collapse Sidebar(sidebar)(aria-label)': 'Recolher barra lateral',
      'Copied Text(code block)(aria-label)': 'Texto copiado',
      'Copy Anchor Link(heading anchor)(aria-label)': 'Copiar link desta seção',
      'Copy Link(accordion)(aria-label)': 'Copiar link',
      'Copy Markdown(page actions)': 'Copiar Markdown',
      'Copy Text(code block)(aria-label)': 'Copiar texto',
      'Dark(theme switcher)(aria-label)': 'Escuro',
      'Default(type table)': 'Padrão',
      'Edit on GitHub(edit page)': 'Editar no GitHub',
      'Hide Sidebar(sidebar)': 'Ocultar barra lateral',
      'Last updated on(page footer)': 'Última atualização em',
      'Layout Tab(layout tab trigger)': 'Aba de layout',
      'Light(theme switcher)(aria-label)': 'Claro',
      'Next Page(pagination)': 'Próxima página',
      'No Headings(table of contents)': 'Nenhum título nesta página',
      'No results found(search dialog)': 'Nenhum resultado encontrado',
      'On this page(table of contents)': 'Nesta página',
      'Open Search(search trigger)(aria-label)': 'Abrir busca',
      'Open Sidebar(sidebar)(aria-label)': 'Abrir barra lateral',
      'Open in ChatGPT(page actions)': 'Abrir no ChatGPT',
      'Open in Claude(page actions)': 'Abrir no Claude',
      'Open in Cursor(page actions)': 'Abrir no Cursor',
      'Open in GitHub(page actions)': 'Abrir no GitHub',
      'Open in Scira AI(page actions)': 'Abrir no Scira AI',
      'Open(page actions)': 'Abrir',
      'Page Not Found(404 page)': 'Página não encontrada',
      'Parameters(type table)': 'Parâmetros',
      'Previous Page(pagination)': 'Página anterior',
      'Prop(type table)': 'Propriedade',
      'Read {url}, I want to ask questions about it.(page actions)':
        'Leia {url}. Quero fazer perguntas sobre esta página.',
      'Returns(type table)': 'Retorna',
      'Search(search dialog)': 'Buscar',
      'Search(search trigger)': 'Buscar',
      'Show Sidebar(sidebar)': 'Mostrar barra lateral',
      'System(theme switcher)(aria-label)': 'Sistema',
      'Table of Contents(inline table of contents)': 'Sumário',
      'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 page)':
        'A página que você procura pode ter sido removida, renomeada ou estar temporariamente indisponível.',
      'Toggle Menu(mobile menu)(aria-label)': 'Abrir ou fechar menu',
      'Toggle Theme(theme switcher)(aria-label)': 'Alternar tema',
      'Type(type table)': 'Tipo',
      'View as Markdown(page actions)': 'Ver como Markdown',
    },
    es: {
      displayName: localeDetails.es.displayName,
      'Ask AI(AI chat button)': 'Preguntar a la IA',
      'Back to Home(404 page)': 'Volver al inicio',
      'Choose a language(language switcher)': 'Elegir idioma',
      'Choose a language(language switcher)(aria-label)': 'Elegir idioma',
      'Close Banner(banner)(aria-label)': 'Cerrar aviso',
      'Close Search(search dialog)(aria-label)': 'Cerrar búsqueda',
      'Close Sidebar(aria-label)': 'Cerrar barra lateral',
      'Close Sidebar(sidebar)(aria-label)': 'Cerrar barra lateral',
      'Collapse Sidebar(sidebar)(aria-label)': 'Contraer barra lateral',
      'Copied Text(code block)(aria-label)': 'Texto copiado',
      'Copy Anchor Link(heading anchor)(aria-label)': 'Copiar enlace de esta sección',
      'Copy Link(accordion)(aria-label)': 'Copiar enlace',
      'Copy Markdown(page actions)': 'Copiar Markdown',
      'Copy Text(code block)(aria-label)': 'Copiar texto',
      'Dark(theme switcher)(aria-label)': 'Oscuro',
      'Default(type table)': 'Predeterminado',
      'Edit on GitHub(edit page)': 'Editar en GitHub',
      'Hide Sidebar(sidebar)': 'Ocultar barra lateral',
      'Last updated on(page footer)': 'Última actualización el',
      'Layout Tab(layout tab trigger)': 'Pestaña de diseño',
      'Light(theme switcher)(aria-label)': 'Claro',
      'Next Page(pagination)': 'Página siguiente',
      'No Headings(table of contents)': 'No hay títulos en esta página',
      'No results found(search dialog)': 'No se encontraron resultados',
      'On this page(table of contents)': 'En esta página',
      'Open Search(search trigger)(aria-label)': 'Abrir búsqueda',
      'Open Sidebar(sidebar)(aria-label)': 'Abrir barra lateral',
      'Open in ChatGPT(page actions)': 'Abrir en ChatGPT',
      'Open in Claude(page actions)': 'Abrir en Claude',
      'Open in Cursor(page actions)': 'Abrir en Cursor',
      'Open in GitHub(page actions)': 'Abrir en GitHub',
      'Open in Scira AI(page actions)': 'Abrir en Scira AI',
      'Open(page actions)': 'Abrir',
      'Page Not Found(404 page)': 'Página no encontrada',
      'Parameters(type table)': 'Parámetros',
      'Previous Page(pagination)': 'Página anterior',
      'Prop(type table)': 'Propiedad',
      'Read {url}, I want to ask questions about it.(page actions)':
        'Lee {url}. Quiero hacer preguntas sobre esta página.',
      'Returns(type table)': 'Devuelve',
      'Search(search dialog)': 'Buscar',
      'Search(search trigger)': 'Buscar',
      'Show Sidebar(sidebar)': 'Mostrar barra lateral',
      'System(theme switcher)(aria-label)': 'Sistema',
      'Table of Contents(inline table of contents)': 'Índice',
      'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 page)':
        'La página que buscas puede haber sido eliminada, renombrada o estar temporalmente fuera de servicio.',
      'Toggle Menu(mobile menu)(aria-label)': 'Abrir o cerrar menú',
      'Toggle Theme(theme switcher)(aria-label)': 'Cambiar tema',
      'Type(type table)': 'Tipo',
      'View as Markdown(page actions)': 'Ver como Markdown',
    },
  });
