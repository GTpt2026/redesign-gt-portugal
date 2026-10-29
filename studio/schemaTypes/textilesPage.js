import { defineArrayMember, defineField, defineType } from 'sanity'

export const textilesPage = defineType({
  name: 'textilesPage',
  title: 'Página Têxteis',
  type: 'document',
  description: 'Os textos da página principal de Têxteis. Os cartões de cada categoria editam-se em "Categorias de têxteis".',
  groups: [
    { name: 'hero', title: 'Topo' },
    { name: 'intro', title: 'Introdução e números' },
    { name: 'seo', title: 'Google e partilha' },
  ],
  fields: [
    defineField({ name: 'heroEyebrow', title: 'Etiqueta do topo', type: 'string', group: 'hero', description: 'A frase pequena por cima do título.' }),
    defineField({
      name: 'heroHeadline',
      title: 'Título do topo',
      type: 'array',
      group: 'hero',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Uma linha por item (3 linhas funcionam melhor). A última linha aparece a vermelho.',
      validation: (rule) => rule.max(4),
    }),
    defineField({ name: 'heroImage', title: 'Imagem do topo', type: 'image', group: 'hero', description: 'Horizontal, mínimo 1600 px de largura.' }),
    defineField({ name: 'introEyebrow', title: 'Etiqueta da introdução', type: 'string', group: 'intro' }),
    defineField({ name: 'introTitle', title: 'Título da introdução', type: 'string', group: 'intro' }),
    defineField({ name: 'introDescription', title: 'Texto da introdução', type: 'text', rows: 5, group: 'intro' }),
    defineField({
      name: 'stats',
      title: 'Números',
      type: 'array',
      group: 'intro',
      description: 'Recomendado: 3.',
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          title: 'Número',
          fields: [
            defineField({ name: 'value', title: 'Valor', type: 'string', description: 'Tal como deve aparecer, por exemplo 17M€ ou 1M.', validation: (rule) => rule.required() }),
            defineField({ name: 'label', title: 'Legenda', type: 'string', validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
    }),
    defineField({ name: 'seo', title: 'Google e partilha', type: 'seo', group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Página Têxteis', subtitle: 'Topo, introdução e números' }) },
})
