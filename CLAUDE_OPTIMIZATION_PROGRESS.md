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
**Lighthouse (baseline, produção, já com o Lote A, 2026-11-12, via `npx lighthouse`, sem instalar nada no projeto):**

| Página | Modo | Perf | A11y | Boas práticas | SEO | FCP | LCP | TBT | CLS | Peso |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | mobile | 80 | 95 | 96 | 66* | 2,6 s | 4,1 s | 30 ms | 0 | 2,8 MB |
| `/` | desktop | 98 | 95 | 96 | 66* | 0,7 s | 0,9 s | 0 | 0 | 5,2 MB |
| `/textiles/jersey` | mobile | 79 | 96 | 96 | 66* | 2,4 s | 4,9 s | 0 | 0 | 1,0 MB |
| `/textiles/jersey` | desktop | 98 | 96 | 96 | 66* | 0,7 s | 1,1 s | 0 | 0 | 1,0 MB |

*SEO 66 = "página bloqueada para indexação" (noindex intencional até ao lançamento). Outros avisos: contraste de cores insuficiente, ordem de headings, erros na consola (o do favicon 404 é resolvido por B2).
Relatórios JSON em `…/scratchpad/lh/before_*.json` (não versionados). Script: `run.sh <etiqueta>`.

**Lighthouse DEPOIS (produção, após Lotes A+B, 2026-11-12):**

| Página | Modo | Perf (antes → depois) | Boas práticas | FCP | LCP | TBT | CLS | Peso |
|---|---|---|---|---|---|---|---|---|
| `/` | mobile | 80 → **94** | 96 → 100 | 2,6 → 1,1 s | 4,1 → 2,9 s | 30 → 50 ms | 0 | 2,8 → 1,6 MB |
| `/` | desktop | 98 → **99** | 96 → 100 | 0,7 → 0,3 s | 0,9 → 0,7 s | 0 | 0 | 5,2 → 3,9 MB |
| `/textiles/jersey` | mobile | 79 → **91** | 96 → 100 | 2,4 → 1,0 s | 4,9 → 3,5 s | 0 → 10 ms | 0 | 1,0 MB |
| `/textiles/jersey` | desktop | 98 → **100** | 96 → 100 | 0,7 → 0,3 s | 1,1 → 0,8 s | 0 | 0 | 1,0 MB |

Acessibilidade e SEO sem alteração (95/96 e 66, este último por `noindex` intencional). Variação normal entre execuções do Lighthouse: ±2–3 pontos.
B3 (Typekit) não piorou nenhuma métrica: manter. Relatórios em `…/scratchpad/lh/after_*.json`.

**Não medido:** INP, acessibilidade por teclado.

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
| 4–9 Implementação (por lotes) | Lote A em produção. Lote B integrado em `main` (03453eb) e medido em produção. Lote C por decidir |
| 10 Testes e relatório final | Pendente |

## Lotes de melhorias
### Lote A — seguro e invisível — **AUTORIZADO**
- A1 `components/layout/Footer.jsx`: `loading="lazy"` nas barras de financiamento e no logótipo do rodapé (deixam de ser pré-carregadas no arranque).
- A2 `next.config.mjs`: cabeçalhos básicos (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`), só em produção. **Sem CSP.**
- A3 novos `app/robots.js` e `app/sitemap.js`, consistentes com o `noindex` atual.

### Lote B — **AUTORIZADO em 2026-11-12 (B1, B2, B3 e Lighthouse); implementado na branch `optimizacao-b`**
- B1 ✔ `public/videos/hero-v2.mp4` (8,2 MB) → `hero-v3.mp4` (3,3 MB) e `hero-mobile.mp4` (2,3 MB) → `hero-mobile-v2.mp4` (1,0 MB), cortados aos 12 s **sem recodificar** (export passthrough, faststart, loop OK). `app/page.js` atualizado. Os originais ficam no Git (tag `pre-optimizacao`). Nota: os 12 s seguintes também tinham cenas de têxtil neutras; sapatos claros só a partir de ~17 s e sobretudo dos 24 s.
- B2 ✔ favicon: `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png` (letras "GT" do logótipo, preto sobre branco). Ficheiros RGBA (RGB rebenta o build do Next).
- B3 ✔ `app/layout.js`: a folha de estilos do Typekit deixa de bloquear a renderização (preload + script que a acrescenta + `<noscript>`). Sem mudança visual observada; confirmar com Lighthouse em produção.

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
Decidir o Lote C (ver acima). Mais impacto provável em mobile: imagens responsivas (`srcset`) e LCP (hoje 2,9–3,5 s). Acessibilidade por corrigir se autorizado: contraste de cores e ordem dos headings (alteram o aspeto, precisam de aprovação).
- 2026-11-12 — Utilizador autorizou B1, B2, B3 e Lighthouse. Branch `optimizacao-b`: commits c8acf60 (B2), fefd397 (B1), a1fc601 (B3). Testes: `next build` OK (70 páginas); servidor de produção local: páginas, `robots.txt`, `sitemap.xml`, ícones e vídeos respondem 200; cabeçalhos de segurança e cache OK; vídeo toca e faz loop aos 12 s; sem erros na consola.
- 2026-11-12 — Utilizador autorizou o merge de `optimizacao-b`. Merge em `main` (03453eb). Produção verificada: páginas, favicon, robots, sitemap e novos vídeos respondem; `hero-v3.mp4` e `hero-mobile-v2.mp4` no HTML. Lighthouse depois: ver tabela acima.
