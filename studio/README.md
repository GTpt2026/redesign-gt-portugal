# GT Portugal Studio: guia do back office

O Studio é onde a equipa de marketing edita o site **sem tocar em código**.
Endereço: https://gt-portugal.sanity.studio (entrada com o email convidado).

Tem dois espaços de trabalho, que se trocam no canto superior esquerdo:

| Espaço | O que tem |
|---|---|
| **Conteúdo do site** | Páginas (inicial, Têxteis, Sobre Nós, Sustentabilidade, Certificações, Compliance, Our Process, cartões), Categorias de têxteis, Artigos (Insights), Definições do site |
| **Mensagens de contacto** | As mensagens enviadas pelo formulário do site (privadas) |

As alterações aparecem no site cerca de **1 minuto** depois de carregares em **Publish**.
Enquanto não publicares, nada muda no site.

---

## 1. Editar o que já existe

**Definições do site** (email, telefone, morada, LinkedIn, mapa): aparecem no rodapé de todas as páginas.

**Página inicial:** o parágrafo de introdução que se revela ao fazer scroll, o título e o texto ao lado do vídeo
de roupa, os números que "sobem" (anos de experiência, peças por mês...), os logótipos de clientes (arrasta
para mudar a ordem; SVG com fundo transparente fica melhor) e os testemunhos.

**Páginas institucionais** (menu *Páginas*): **Sobre Nós**, **Sustentabilidade**, **Certificações**,
**Compliance** e **Our Process**. Editas o topo, a introdução, os números e cada secção numerada (título,
texto, lista de práticas e factos-chave). Em Sobre Nós também a missão, os valores e as pessoas.
Os ícones animados da Sustentabilidade ficam associados ao "identificador" de cada secção: não o mudes.

**Cartões "What We Do":** os 4 cartões (Certifications, Compliance, Our Process, About) que aparecem na
página inicial e no fim das páginas institucionais. Cada página esconde o cartão que aponta para si própria.

**Página Têxteis:** título, introdução e números do topo da página.

**Categorias de têxteis** (uma por categoria): texto, miniatura do cartão, **foto de detalhe** que aparece
quando se passa o rato no cartão, galeria, fotos de produto, especificações e faixa de destaque.
- A foto de detalhe deve ser um pormenor da **mesma peça** da miniatura (botão, costura, tecido), vertical (4:5).
- Fotos com 1800 px ou mais no lado maior ficam nítidas; qualquer formato serve (convertem-se para WebP).
- Se deixares um campo vazio, o site usa o texto/imagem que já tinha.
- **Nova categoria:** *Create* → preenche o nome, carrega em Generate no endereço e publica. Aparece sozinha
  na lista de Têxteis, na sua própria página e no rodapé.

**Artigos (Insights):** abrir um artigo parecido → menu **⋯ → Duplicate** → mudar título, texto e imagens →
**Generate** no endereço → **Publish**.

**Google e partilha** (em cada página): título e descrição que aparecem no Google e a imagem que aparece
quando o link é partilhado no LinkedIn ou no WhatsApp. Se ficar vazio, o site usa o que já tinha.

## 2. Mensagens de contacto

Quando alguém preenche o formulário do site, a mensagem fica em **Mensagens de contacto** (e, se estiver
configurado, chega também por email). As mensagens contêm dados pessoais: ficam num espaço **privado**,
visível só para quem tem acesso ao Studio. Marca **"Já tratada"** e carrega em Publish quando responderes.
Para apagar uma mensagem (pedido de eliminação de dados), abre-a e usa **⋯ → Delete**.

---

## 3. Configuração (uma vez, por um administrador)

> Estes passos exigem uma conta Sanity e o painel do Vercel.

1. **Vercel** (Project → Settings → Environment Variables), para Production, Preview e Development:

   | Variável | Valor | Para quê |
   |---|---|---|
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | `wrh1tvdi` | O site ler o conteúdo |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` | idem |
   | `SANITY_API_WRITE_TOKEN` | token do Sanity com função **Editor** | Guardar as mensagens do formulário |
   | `RESEND_API_KEY` | chave do resend.com *(opcional)* | Receber um email por cada mensagem |
   | `CONTACT_NOTIFY_EMAIL` | email que recebe o aviso *(opcional)* | idem |
   | `CONTACT_FROM_EMAIL` | remetente verificado no Resend *(opcional)* | idem |

   Depois, fazer *Redeploy*. **O token nunca vai para o código nem para uma variável `NEXT_PUBLIC_`.**
   Sem `SANITY_API_WRITE_TOKEN` (nem Resend), o formulário avisa o visitante para escrever por email, em vez
   de fingir que enviou.

2. **Convidar a equipa:** sanity.io/manage → projeto → Members → Invite, função **Editor**.
   Os Editores veem os dois espaços; para limitar as mensagens de contacto a menos pessoas, usa uma função
   mais restrita.

3. **Publicar o Studio** depois de mudar o esquema (`studio/schemaTypes`):
   ```bash
   cd studio
   npx sanity deploy
   ```

4. **Preencher o Sanity com o conteúdo atual do site** (só na primeira vez; nunca sobrepõe edições):
   ```bash
   bash scripts/seed-content.sh
   ```
   Pede o token (Editor) sem o mostrar. Apagar o token no Sanity no fim.

**Voltar atrás:** retirar `NEXT_PUBLIC_SANITY_PROJECT_ID` do Vercel e fazer redeploy: o site passa a usar o
conteúdo que está guardado no código.

---

## 4. Como funciona (para quem mantém o código)

- `studio/`: formulários do Studio (independente do site, com as suas dependências). `schemaTypes/` tem os
  tipos, `structure.js` o menu, `sanity.config.js` os dois espaços (`content` público, `inbox` privado).
- `lib/content.js`: lê o conteúdo e preenche campo a campo com o que está em `content/defaults/` e
  `app/textiles/categories-data.js`. Se o Sanity falhar ou um documento vier mal formado, o site usa os valores
  por omissão em vez de partir.
- `lib/insights.js` + `lib/sanityInsights.js`: os artigos, com a mesma lógica.
- `app/api/contact/route.js`: recebe o formulário, valida, tem proteção anti-spam (campo escondido, tempo
  mínimo, limite por IP) e grava no dataset privado `inbox`.
- As páginas revalidam a cada 60 s, por isso as edições aparecem sem novo deploy.
