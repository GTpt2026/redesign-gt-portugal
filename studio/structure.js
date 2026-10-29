// Studio menu: the three single pages first, then the lists.
const single = (S, id, title, type) =>
  S.listItem().id(id).title(title).child(S.document().schemaType(type).documentId(id).title(title))

export const singletonTypes = new Set(['siteSettings', 'homePage', 'textilesPage'])

export const structure = (S) =>
  S.list()
    .title('Conteúdo do site')
    .items([
      single(S, 'homePage', 'Página inicial', 'homePage'),
      single(S, 'textilesPage', 'Página Têxteis', 'textilesPage'),
      S.listItem()
        .title('Categorias de têxteis')
        .schemaType('textileCategory')
        .child(S.documentTypeList('textileCategory').title('Categorias de têxteis').defaultOrdering([{ field: 'order', direction: 'asc' }])),
      S.divider(),
      S.listItem()
        .title('Artigos (Insights)')
        .schemaType('insight')
        .child(S.documentTypeList('insight').title('Artigos (Insights)').defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])),
      S.divider(),
      single(S, 'siteSettings', 'Definições do site', 'siteSettings'),
    ])
