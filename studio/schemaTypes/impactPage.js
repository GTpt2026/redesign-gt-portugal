import { defineArrayMember, defineField, defineType } from 'sanity'

// Sustainability, Compliance, Industry Certifications and Our Process share this layout:
// hero, intro, numbers, a list of numbered sections, and (Sustainability only) a banner.
const isSustainability = ({ document }) => document?._id !== 'page-sustainability'
const lineList = (name, title, description, group) =>
  defineField({ name, title, type: 'array', group, description, of: [defineArrayMember({ type: 'string' })] })

export const impactPage = defineType({
  name: 'impactPage',
  title: 'Página com secções numeradas',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Topo' },
    { name: 'intro', title: 'Introdução e números' },
    { name: 'sections', title: 'Secções' },
    { name: 'banner', title: 'Faixa final' },
    { name: 'seo', title: 'Google e partilha' },
  ],
  fields: [
    defineField({ name: 'heroEyebrow', title: 'Etiqueta do topo', type: 'string', group: 'hero' }),
    lineList('heroHeadline', 'Título do topo', 'Uma linha por item. A última linha aparece a vermelho.', 'hero'),
    defineField({ name: 'heroImage', title: 'Imagem do topo', type: 'image', group: 'hero', description: 'Horizontal, mínimo 1600 px de largura.' }),

    defineField({
      name: 'intro',
      title: 'Introdução',
      type: 'object',
      group: 'intro',
      fields: [
        defineField({ name: 'eyebrow', title: 'Etiqueta', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'description', title: 'Texto', type: 'text', rows: 6 }),
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Números',
      type: 'array',
      group: 'intro',
      description: 'Recomendado: 3. Os números "sobem" quando se faz scroll.',
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          title: 'Número',
          fields: [
            defineField({ name: 'value', title: 'Valor', type: 'string', description: 'Tal como deve aparecer, por exemplo 50%, 665+ ou 14.', validation: (rule) => rule.required() }),
            defineField({ name: 'label', title: 'Legenda', type: 'string', validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
    }),

    defineField({
      name: 'sections',
      title: 'Secções numeradas',
      type: 'array',
      group: 'sections',
      description: 'Cada secção aparece numerada (01, 02...) com texto, lista de práticas e, se houver, dois factos-chave. Arrasta para mudar a ordem.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'section',
          title: 'Secção',
          fields: [
            defineField({ name: 'title', title: 'Título', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'body', title: 'Texto', type: 'text', rows: 6, validation: (rule) => rule.required() }),
            defineField({
              name: 'practices',
              title: 'Lista de práticas',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
              description: 'Frases curtas, uma por linha da lista.',
            }),
            defineField({
              name: 'impact',
              title: 'Factos-chave (opcional)',
              type: 'array',
              description: 'Até 2, por exemplo "Water Saved: 50%".',
              validation: (rule) => rule.max(2),
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'fact',
                  title: 'Facto',
                  fields: [
                    defineField({ name: 'label', title: 'Legenda', type: 'string', validation: (rule) => rule.required() }),
                    defineField({ name: 'value', title: 'Valor', type: 'string', validation: (rule) => rule.required() }),
                  ],
                  preview: { select: { title: 'value', subtitle: 'label' } },
                }),
              ],
            }),
            defineField({
              name: 'anchor',
              title: 'Identificador (não mudar)',
              type: 'string',
              hidden: isSustainability,
              description: 'Usado nas ligações do rodapé e nos ícones animados. Só mudar com ajuda técnica.',
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'body' } },
        }),
      ],
    }),

    defineField({
      name: 'banner',
      title: 'Faixa final com foto',
      type: 'object',
      group: 'banner',
      hidden: isSustainability,
      description: 'A faixa escura com foto no fim da página.',
      fields: [
        defineField({ name: 'eyebrow', title: 'Etiqueta', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Texto', type: 'text', rows: 4 }),
        defineField({ name: 'ctaLabel', title: 'Texto do botão', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'Endereço do botão', type: 'string', description: 'Caminho dentro do site, por exemplo /about.' }),
        defineField({ name: 'image', title: 'Foto de fundo', type: 'image' }),
      ],
    }),

    defineField({ name: 'seo', title: 'Google e partilha', type: 'seo', group: 'seo' }),
  ],
  preview: { select: { title: 'heroEyebrow' }, prepare: ({ title }) => ({ title: title || 'Página' }) },
})
