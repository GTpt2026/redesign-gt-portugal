import { defineArrayMember, defineField, defineType } from 'sanity'

const textBlock = (name, title, group, { bodyRows = 5, array = false } = {}) =>
  defineField({
    name,
    title,
    type: 'object',
    group,
    fields: [
      defineField({ name: 'eyebrow', title: 'Etiqueta', type: 'string' }),
      defineField({ name: 'title', title: 'Título', type: 'string' }),
      array
        ? defineField({ name: 'body', title: 'Parágrafos', type: 'array', of: [defineArrayMember({ type: 'text', rows: 4 })], description: 'Um item por parágrafo.' })
        : defineField({ name: 'body', title: 'Texto', type: 'text', rows: bodyRows }),
    ],
  })

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Sobre Nós',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Topo' },
    { name: 'mission', title: 'Missão e valores' },
    { name: 'story', title: 'História e números' },
    { name: 'banner', title: 'Compromisso' },
    { name: 'people', title: 'Pessoas' },
    { name: 'seo', title: 'Google e partilha' },
  ],
  fields: [
    defineField({ name: 'heroEyebrow', title: 'Etiqueta do topo', type: 'string', group: 'hero' }),
    defineField({ name: 'heroHeadline', title: 'Título do topo', type: 'array', group: 'hero', of: [defineArrayMember({ type: 'string' })], description: 'Uma linha por item. A última aparece a vermelho.' }),
    defineField({ name: 'heroImage', title: 'Imagem do topo', type: 'image', group: 'hero' }),

    textBlock('mission', 'Missão', 'mission', { bodyRows: 6 }),
    defineField({
      name: 'values',
      title: 'Valores',
      type: 'array',
      group: 'mission',
      description: 'Recomendado: 3 (Fairness, Transparency, Trustworthiness).',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'value',
          title: 'Valor',
          fields: [
            defineField({ name: 'label', title: 'Nome', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'description', title: 'Descrição', type: 'text', rows: 4, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'description' } },
        }),
      ],
    }),
    defineField({ name: 'valuesImage', title: 'Foto de fundo dos valores', type: 'image', group: 'mission' }),

    defineField({
      name: 'years',
      title: 'Anos de história',
      type: 'object',
      group: 'story',
      fields: [
        defineField({ name: 'eyebrow', title: 'Etiqueta', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'description', title: 'Texto', type: 'text', rows: 5 }),
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Números',
      type: 'array',
      group: 'story',
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          title: 'Número',
          fields: [
            defineField({ name: 'value', title: 'Valor', type: 'string', description: 'Por exemplo 0, 5 ou 20+.', validation: (rule) => rule.required() }),
            defineField({ name: 'label', title: 'Legenda', type: 'string', validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
    }),

    defineField({
      name: 'banner',
      title: 'Faixa "We Strive To Be Better"',
      type: 'object',
      group: 'banner',
      fields: [
        defineField({ name: 'eyebrow', title: 'Etiqueta', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'array', of: [defineArrayMember({ type: 'string' })], description: 'Uma linha por item (2 linhas).' }),
        defineField({ name: 'subtitle', title: 'Texto', type: 'text', rows: 5 }),
        defineField({ name: 'ctaLabel', title: 'Texto do botão', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'Endereço do botão', type: 'string', description: 'Por exemplo /sustainability.' }),
        defineField({ name: 'image', title: 'Foto de fundo', type: 'image' }),
      ],
    }),

    textBlock('people', 'Pessoas', 'people', { array: true }),

    defineField({ name: 'seo', title: 'Google e partilha', type: 'seo', group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Sobre Nós', subtitle: 'Missão, valores, história, pessoas' }) },
})
