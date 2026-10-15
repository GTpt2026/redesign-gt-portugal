# GT Portugal Studio — guia para publicar Insights

O Studio é a página onde a equipa escreve e edita os artigos de **Insights**,
sem tocar em código. O site vai buscar o conteúdo aqui e mostra-o automaticamente.

---

## 1. Para a equipa: publicar um artigo novo

1. Abrir o Studio: `https://gt-portugal.sanity.studio` (login com o email convidado).
2. Em **Article**, abrir um artigo parecido com o que queremos escrever.
3. Clicar no menu **⋯** (canto superior direito) → **Duplicate**.
4. No artigo duplicado, alterar:
   - **Title**, **Subtitle** e **Summary** (o resumo aparece nos cartões e na pré-visualização do LinkedIn);
   - **Web address** → carregar em **Generate** para criar o link a partir do novo título;
   - **Publication date**, **Category** e, se quiser, **Topic**;
   - **Cover image** → arrastar a nova fotografia (landscape, 1600 px ou mais);
   - **Article** → reescrever o texto. Para trocar uma imagem, clicar nela e escolher outra.
     Com **+** acrescentam-se títulos, imagens, faixas largas, vídeo ou passos de processo.
5. Carregar em **Publish**. Em cerca de **1 minuto** o artigo está em `/insights`.
6. Copiar o link do artigo e partilhar no LinkedIn (a página tem também o botão **Share → LinkedIn**).
   A pré-visualização usa a imagem de capa e o resumo.

**Imagens:** podem ser JPG, PNG ou outro formato. O Sanity entrega-as ao site em
WebP (ou AVIF) já redimensionadas, por isso não é preciso converter nada à mão.

**Rascunho:** enquanto não se carregar em *Publish*, nada aparece no site.

---

## 2. Configuração inicial (uma vez, feita por um administrador)

> Estes passos exigem uma conta Sanity e fazer login no próprio terminal.

1. Criar uma conta e um projeto em <https://www.sanity.io/manage>
   (plano gratuito chega). Dataset: `production`. Anotar o **Project ID**.
2. Instalar e publicar o Studio:
   ```bash
   cd studio
   npm install
   export SANITY_STUDIO_PROJECT_ID=<o-project-id>
   npx sanity login
   npx sanity deploy        # hostname sugerido: gt-portugal
   ```
3. Convidar a equipa: *sanity.io/manage → projeto → Members → Invite* (função **Editor**).
4. No **Vercel** (Project → Settings → Environment Variables) acrescentar:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `<o-project-id>`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`

   e fazer *Redeploy*. (Para testar em local, pôr as mesmas duas linhas em `.env.local`.)
5. Importar os 41 artigos já migrados. Criar um token em
   *sanity.io/manage → projeto → API → Tokens* (função **Editor**), e, na raiz do projeto:
   ```bash
   node scripts/import-insights-to-sanity.mjs --dry      # ensaio, sem rede
   SANITY_PROJECT_ID=<o-project-id> SANITY_WRITE_TOKEN=<token> \
     node scripts/import-insights-to-sanity.mjs
   ```
   O token **não** se guarda no repositório nem se partilha. Pode ser repetido sem duplicar
   (os artigos têm id fixo) e apagado do Sanity no fim.

**Voltar atrás:** retirar `NEXT_PUBLIC_SANITY_PROJECT_ID` do Vercel e fazer redeploy —
o site passa a usar outra vez os artigos guardados em `content/insights/`.

---

## 3. Como funciona (para quem mantém o código)

- `studio/` — esquema do artigo e blocos (independente do site, com as suas dependências).
- `lib/insights.js` — fonte única de dados do site; usa o Sanity quando o Project ID existe,
  senão os ficheiros JSON locais.
- `lib/sanityInsights.js` + `lib/portableText.mjs` — convertem o formato do Sanity no modelo
  que os componentes já usam (testado com ida e volta nos 41 artigos).
- As páginas `/insights` e `/insights/[slug]` revalidam a cada 60 s: artigos novos ou editados
  aparecem sem novo deploy.
