# CLAUDE_OPTIMIZATION_PROGRESS

Registo permanente da otimização técnica do site GT Portugal. Serve para retomar o trabalho em qualquer sessão
(comando de retoma: **CONTINUAR OTIMIZAÇÃO**). Ao retomar: ler este ficheiro, confirmar o estado real dos ficheiros
(não confiar só neste registo), recuperar as decisões abaixo e pedir confirmação antes de implementar o que precise de autorização.

## Objetivo
Tornar o site tecnicamente mais rápido, eficiente e preparado para SEO/mobile, **sem alterar** design, conteúdos,
textos, imagens, URLs, metadados, funcionalidades, integrações nem animações. Auditar → propor → autorizar → implementar → testar.

## Tecnologia e arquitetura (Fase 1)
- Next.js 16 (App Router, Turbopack), React 19, GSAP, CSS Modules. Sem base de dados própria.
- Conteúdo editável no Sanity (projeto `wrh1tvdi`, dataset público `production`, dataset privado `inbox` para o formulário).
- Alojamento: Vercel (projeto `redesign-gt-portugal`, plano Hobby). Repositório `GTpt2026/redesign-gt-portugal`.
- ISR de 60 s em todas as páginas; leituras ao Sanity com `revalidate: 60` e tags.
- Site em `noindex, nofollow` de propósito até ao lançamento (`app/layout.js`).

## Estado inicial medido (produção, desktop, página inicial)
TTFB 140 ms · FCP/LCP 1,1 s · CLS 0 · tarefas longas 0 · 25 pedidos · 417 KB sem vídeo · JS ≈ 205 KB (br) em 9 ficheiros.
Brotli e HTTP/2 ativos; HTML em cache na CDN; `/_next/static` imutável; `/images` e `/videos` com 7 dias.
**Não medido:** Lighthouse/PageSpeed, mobile com limitação de rede, INP, acessibilidade (contraste/teclado).

## Segurança e reversão
- Marcador do estado original: tag Git `pre-optimizacao` (commit `7325ecc`, branch `main`).
- Todo o trabalho numa branch `optimizacao`; cada melhoria num commit próprio (reverter com `git revert <commit>`).
- Nada vai para produção (`main`) sem validação e autorização.

## Fases
| Fase | Estado |
|---|---|
| 1 Auditoria | Concluída |
| 2 Relatório e prioridades | Concluída |
| 3 Preparação e segurança | Concluída (tag, branch, este ficheiro) |
| 4–9 Implementação (por lotes) | Lote A integrado em `main` e verificado em produção; Lotes B e C por decidir |
| 10 Testes e relatório final | Pendente |

## Lotes de melhorias
### Lote A — seguro e invisível — **AUTORIZADO**
- A1 `components/layout/Footer.jsx`: `loading="lazy"` nas barras de financiamento e no logótipo do rodapé (deixam de ser pré-carregadas no arranque).
- A2 `next.config.mjs`: cabeçalhos básicos (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`), só em produção. **Sem CSP.**
- A3 novos `app/robots.js` e `app/sitemap.js`, consistentes com o `noindex` atual.

### Lote B — precisa de decisão do utilizador — **NÃO AUTORIZADO**
- B1 Cortar `public/videos/hero-v2.mp4` aos 12 s (−5 MB; remove cenas de calçado). Altera conteúdo.
- B2 Favicon (hoje 404). Precisa do ícone ou da autorização para o gerar do logótipo.
- B3 Typekit bloqueia a renderização e usa `font-display:auto`: pedir `swap` à Adobe (fora do código) ou mudar o carregamento (risco médio).

### Lote C — só no/depois do lançamento (mexe em metadados/markup) — **NÃO AUTORIZADO**
Canonical, og:image, JSON-LD; `srcset`/dimensões em 17 componentes com `<img>`; carregar GSAP só quando visível;
limpeza de ficheiros por usar (`shoe-3d.png`, `images/articles/*.jpg`) e das páginas `/typography` e `/homeware`;
limite de pedidos do formulário em serviço externo; CSP completa.

## Decisões e autorizações
- 2026-11-12: Lote A aprovado; criação de `CLAUDE_OPTIMIZATION_PROGRESS.md` e da branch `optimizacao` aprovada.
- 2026-11-12: Lotes B e C **não** aprovados (resposta "sim" não os especificava).
- Regras do utilizador: não alterar design/conteúdo/metadados/URLs; não instalar dependências; não tocar em credenciais; não fazer alterações parciais em produção.

## Alterações implementadas (Lote A, integrado em `main` no commit 355fddf, 2026-11-12)
- A1 `components/layout/Footer.jsx` — `loading="lazy"` nas 2 barras de financiamento. Testado: pedido de `funding-*.webp` deixa de ocorrer no arranque (1 pedido registado antes do scroll vs. 2 antes), a barra aparece ao chegar ao rodapé, sem erros na consola.
- A2 `next.config.mjs` — cabeçalhos `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` em `/:path*`, só em produção. Validado por leitura da configuração; **verificado em produção** com `curl -I`: os 3 cabeçalhos aparecem em `/` e nas imagens, e os `Cache-Control` das imagens mantêm-se.
- A3 `app/robots.js` (Disallow: /, com sitemap) e `app/sitemap.js` (61 URLs: 11 páginas + 9 categorias + 41 artigos; exclui /typography e /homeware). Testado localmente: ambos respondem 200.
- Nota A1: o logótipo do rodapé não foi alterado (é o mesmo ficheiro do cabeçalho, já em cache).

## Registo
- 2026-11-12 — Fase 3: tag `pre-optimizacao`, branch `optimizacao`, este ficheiro.
- 2026-11-12 — Lote A implementado em 3 commits (A1, A2, A3) na branch `optimizacao`.
- 2026-11-12 — Utilizador autorizou o merge. Merge em `main` (355fddf). Verificação em produção: `/robots.txt` OK; `/sitemap.xml` com 61 URLs; cabeçalhos de segurança presentes; páginas `/`, `/textiles`, `/textiles/dress`, `/about`, `/contact`, `/insights` respondem 200; pré-carregamentos de imagem na página inicial passaram de 7 para 5; as 2 barras de financiamento têm `loading="lazy"`.

## Problemas identificados / pendentes
- Ver Lotes B e C. Lighthouse/PageSpeed por correr (precisa de autorização para instalar ferramenta ou usar serviço externo).
- Ao lançar: `robots.js` passa de "bloquear tudo" a permitir, e remover `noindex` em `app/layout.js` (decisão do utilizador).

## Próxima tarefa
Decisões do utilizador sobre B1 (cortar vídeo aos 12 s), B2 (favicon) e B3 (Typekit). Opcional: correr Lighthouse/PageSpeed (precisa de autorização) para medir antes/depois em mobile.
