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

Os artigos têm uma única fonte em inglês (`locale: en`), incluindo título, resumo, texto alternativo e corpo. O servidor sempre consulta essa fonte, independentemente do idioma da interface. O canonical é `/newsletter/<slug>`; abrir um artigo em `/pt-br/newsletter/<slug>` ou `/es/newsletter/<slug>` preserva o idioma da navegação e mostra o mesmo conteúdo em inglês, sem redirecionamento.

O seletor do site muda apenas a interface. A tradução dos artigos fica a cargo do navegador e das preferências do leitor; não há API, widget ou credencial do Google Translation. O artigo e os textos dos cards têm `lang="en"`, e o HTML sanitizado do backend marca blocos e trechos de código com `translate="no"`. RSS e sitemap apontam para a fonte canônica em inglês. O cadastro continua registrando o idioma da interface.

O autor mantém apenas o Markdown em inglês, conforme `docs/AUTHORING.md` no repositório da API. Os slugs existentes foram preservados para manter os links; novos artigos devem usar slugs em inglês.

## Rotas públicas

- `POST /newsletter/actions/subscribe`: verifica origem, tipo e tamanho do corpo e encaminha ao Go.
- `GET /newsletter/media/<arquivo>`: imagens permitidas do pacote editorial, com ETag; não é proxy de URLs arbitrárias.
- `GET /newsletter/feed.xml`: RSS das 50 edições mais recentes.
- `GET /newsletter/sitemap.xml`: URLs canônicas de artigos publicados.

`proxy.ts` exclui handlers da transformação de idioma. `/api` permanece pertencendo à plataforma. `/newletter` tem redirecionamento permanente.

## Deploy e verificação

O Secret `runtz-newsletter-auth` deve existir no namespace antes do deploy do site. A pipeline do backend o cria sem imprimir seu conteúdo. O chart do site monta a chave `token` e usa `NEWSLETTER_INTERNAL_URL=http://runtz-newsletter:8080`.

Backend → site → paths do Ingress privado, em dev primeiro. Os manifests `secrets-helm/ingress-*.yaml` não devem ser copiados para o repositório. Este chart continua sem Ingress próprio.

```sh
npm run types:check
NEWSLETTER_INTERNAL_URL=http://127.0.0.1:9 npm run build
```

Verificar páginas 1/2, filtro, voltar/avançar, permalink, imagem e inscrição direta por teclado. A listagem termina na paginação; o campo de e-mail e o consentimento ficam na barra de filtros, sem popup. O cadastro não envia e-mails. Erros de Mongo precisam aparecer no formulário sem impedir leitura. Use somente Mongo local e endereços de teste na verificação.
