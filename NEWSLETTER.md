# Newsletter

As páginas `/newsletter` e `/newsletter/[slug]` integram a API Go do repositório `runtz-newsletter`. Listagem com quatro artigos por página, tags na URL e renderização em runtime. O build não depende do backend.

## Desenvolvimento

Inicie a API e seu Mongo de testes conforme o README daquele repositório. Aqui:

```sh
NEWSLETTER_INTERNAL_URL=http://127.0.0.1:8080 \
NEWSLETTER_PUBLIC_ORIGIN=http://localhost:3000 \
NEXT_PUBLIC_PLATFORM_BASE_URL=http://localhost:3000 \
npm run dev
```

Se informar `--hostname` no desenvolvimento local, use `localhost`; a combinação de `127.0.0.1` com rewrites de idioma pode causar um [loop de redirecionamento no Next.js](https://github.com/vercel/next.js/issues/94745). O runtime standalone foi verificado com `HOSTNAME=0.0.0.0`, como no Dockerfile.

Se a API usar `NEWSLETTER_SERVICE_TOKEN`, configure o mesmo valor no servidor Next.js. Não use `NEXT_PUBLIC_*` para conexão interna ou token. `NEWSLETTER_ENVIRONMENT=dev` desativa indexação das páginas da newsletter.

Os artigos têm versões em inglês, português brasileiro e espanhol, mantidas em `content/posts/en/`, `content/posts/pt-br/` e `content/posts/es/` no repositório da API. Cada tradução usa o mesmo `id`, `slug` e nome de arquivo, com título, resumo, texto alternativo e corpo próprios. O seletor existente mantém o artigo aberto e carrega a versão do idioma escolhido.

O servidor passa o idioma da rota à API para listagem, filtros, artigos e relacionados. Os canonicals são `/newsletter/<slug>` em inglês, `/pt-br/newsletter/<slug>` em português e `/es/newsletter/<slug>` em espanhol. `hreflang` anuncia somente traduções publicadas, usando `availableLocales` da API. JSON-LD, Open Graph, descrições das capas e sumário acompanham a tradução. O cadastro registra o idioma selecionado.

Uma tradução ausente, em rascunho ou com publicação futura recebe 404; não é substituída silenciosamente pelo inglês. Cada edição pode ser revisada e publicada de forma independente, conforme `docs/AUTHORING.md` no repositório da API. Os slugs existentes permanecem estáveis. Blocos e trechos de código continuam com `translate="no"`.

## Rotas públicas

- `POST /newsletter/actions/subscribe`: verifica origem, tipo e tamanho do corpo e encaminha ao Go.
- `GET /newsletter/media/<arquivo>`: imagens permitidas do pacote editorial, com ETag; não é proxy de URLs arbitrárias.
- `GET /newsletter/feed.xml`: RSS das 50 edições mais recentes em inglês; `?locale=pt-br` e `?locale=es` selecionam as outras línguas. O link RSS nos metadados acompanha o idioma da página.
- `GET /newsletter/sitemap.xml`: listagens e URLs canônicas de todos os artigos publicados nos três idiomas, com referências às traduções disponíveis.

`proxy.ts` exclui handlers da transformação de idioma. `/api` permanece pertencendo à plataforma. `/newletter` tem redirecionamento permanente.

## Deploy e verificação

O Secret `runtz-newsletter-auth` deve existir no namespace antes do deploy do site. A pipeline do backend o cria sem imprimir seu conteúdo. O chart do site monta a chave `token` e usa `NEWSLETTER_INTERNAL_URL=http://runtz-newsletter:8080`.

Publique primeiro o backend com o catálogo em três idiomas e depois o site, em dev primeiro. Os paths existentes atendem às três versões; esta mudança não acrescenta um path de topo ao Ingress. Os manifests `secrets-helm/ingress-*.yaml` não devem ser copiados para o repositório. Este chart continua sem Ingress próprio.

```sh
npm run types:check
NEWSLETTER_INTERNAL_URL=http://127.0.0.1:9 npm run build
```

Verificar páginas 1/2, filtro, voltar/avançar, permalink, imagem e inscrição direta por teclado. A listagem termina na paginação. A barra de filtros não tem divisórias horizontais. A inscrição tem largura máxima de 400px, com e-mail e botão no mesmo controle e aviso menor abaixo. No desktop, o filtro tem 200px de largura e acompanha a altura do formulário com o aviso. No celular, filtro e inscrição ocupam a largura disponível em linhas separadas. Não há checkbox ou popup.

O envio explícito do formulário registra `consent: true` e `consentVersion: newsletter-signup-v2`. O input e o botão referenciam o aviso por `aria-describedby`. A confirmação mostra apenas “Thanks for subscribing!” (ou o equivalente da interface), após persistência confirmada. O cadastro não envia e-mails. Erros de Mongo precisam aparecer no formulário sem impedir leitura. Use somente Mongo local e endereços de teste na verificação. Publique primeiro a API com suporte à versão do consentimento.
