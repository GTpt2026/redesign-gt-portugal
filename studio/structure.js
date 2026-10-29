// Studio menu: the fixed pages first, then the lists.
const single = (S, id, title, type) =>
  S.listItem().id(id).title(title).child(S.document().schemaType(type).documentId(id).title(title))

// Types that exist as one fixed document (or a fixed set of them): never created, deleted or duplicated by hand
export const singletonTypes = new Set(['siteSettings', 'homePage', 'textilesPage', 'aboutPage', 'featureCards', 'impactPage'])

export const structure = (S) =>
  S.list()
    .title('Conteúdo do site')
    .items([
      S.listItem()
        .title('Páginas')
        .child(
          S.list()
            .title('Páginas')
            .items([
              single(S, 'homePage', 'Página inicial', 'homePage'),
              single(S, 'textilesPage', 'Têxteis (página principal)', 'textilesPage'),
              single(S, 'aboutPage', 'Sobre Nós', 'aboutPage'),
              single(S, 'page-sustainability', 'Sustentabilidade', 'impactPage'),
              single(S, 'page-certifications', 'Certificações', 'impactPage'),
              single(S, 'page-compliance', 'Compliance', 'impactPage'),
              single(S, 'page-process', 'Our Process', 'impactPage'),
              S.divider(),
              single(S, 'featureCards', 'Cartões "What We Do"', 'featureCards'),
            ])
        ),
      S.listItem()
        .title('Categorias de têxteis')
        .schemaType('textileCategory')
        .child(S.documentTypeList('textileCategory').title('Categorias de têxteis').defaultOrdering([{ field: 'order', direction: 'asc' }])),
      S.listItem()
        .title('Artigos (Insights)')
        .schemaType('insight')
        .child(S.documentTypeList('insight').title('Artigos (Insights)').defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])),
      S.divider(),
      single(S, 'siteSettings', 'Definições do site', 'siteSettings'),
    ])
