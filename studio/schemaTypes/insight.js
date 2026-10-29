import { defineArrayMember, defineField, defineType } from 'sanity'

export const CATEGORIES = ['Fabrics & Products', 'Sustainability', 'Technology & Trends']

export default defineType({
  name: 'insight',
  title: 'Artigo (Insights)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      description: 'O título do artigo.',
      validation: (rule) => rule.required().max(110),
    }),
    defineField({
      name: 'slug',
      title: 'Endereço da página',
      type: 'slug',
      description:
        'A última parte do link, por exemplo “denim-finishing”. Carrega em Generate para a criar a partir do título. Quando duplicas um artigo, gera uma nova.',
      options: { source: 'title', maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      description: 'Segunda linha por baixo do título (opcional).',
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumo',
      type: 'text',
      rows: 3,
      description:
        'Uma ou duas frases. Aparece nos cartões e na pré-visualização do LinkedIn. Se ficar vazio, usa o início do artigo.',
      validation: (rule) => rule.max(220).warning('Acima de 220 caracteres pode ficar cortado nos cartões.'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de publicação',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: { list: CATEGORIES, layout: 'radio' },
      initialValue: CATEGORIES[0],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'topic',
      title: 'Tema (opcional)',
      type: 'string',
      description: 'Uma etiqueta curta ao lado da categoria, por exemplo Denim, Jersey, Knitwear.',
    }),
    defineField({
      name: 'cover',
      title: 'Imagem de capa',
      type: 'image',
      description:
        'A imagem grande no topo do artigo e na pré-visualização do LinkedIn. Horizontal, com pelo menos 1600 px de largura. Qualquer formato serve: é convertida para WebP automaticamente.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Texto do artigo',
      type: 'array',
      description:
        'Escreve o artigo aqui. Usa o + para acrescentar títulos, imagens, faixas largas, vídeo ou passos de processo entre parágrafos.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Parágrafo', value: 'normal' },
            { title: 'Título', value: 'h2' },
            { title: 'Subtítulo', value: 'h3' },
            { title: 'Citação', value: 'blockquote' },
          ],
          lists: [
            { title: 'Pontos', value: 'bullet' },
            { title: 'Numerada', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Negrito', value: 'strong' },
              { title: 'Itálico', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Ligação',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Endereço',
                    validation: (rule) =>
                      rule.uri({ scheme: ['http', 'https', 'mailto'], allowRelative: true }),
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({ type: 'lead' }),
        defineArrayMember({ type: 'bodyImage' }),
        defineArrayMember({ type: 'banner' }),
        defineArrayMember({ type: 'video' }),
        defineArrayMember({ type: 'steps' }),
      ],
    }),
  ],
  orderings: [
    { title: 'Mais recentes primeiro', name: 'dateDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { title: 'Título A-Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', category: 'category', date: 'publishedAt', media: 'cover' },
    prepare: ({ title, category, date, media }) => ({
      title,
      subtitle: [category, date && new Date(date).toLocaleDateString('en-GB')].filter(Boolean).join(' · '),
      media,
    }),
  },
})
