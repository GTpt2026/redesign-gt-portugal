import { defineArrayMember, defineField, defineType } from 'sanity'

export const featureCards = defineType({
  name: 'featureCards',
  title: 'Cartões "What We Do"',
  type: 'document',
  fields: [
    defineField({
      name: 'cards',
      title: 'Cartões',
      type: 'array',
      description:
        'Os 4 cartões que aparecem na página inicial e no fim de Sobre Nós, Sustentabilidade, Certificações, Compliance e Our Process (cada página esconde o cartão que aponta para si própria). Arrasta para mudar a ordem.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'card',
          title: 'Cartão',
          fields: [
            defineField({ name: 'title', title: 'Título', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'description', title: 'Texto', type: 'text', rows: 4 }),
            defineField({ name: 'href', title: 'Para onde leva', type: 'string', description: 'Caminho dentro do site, por exemplo /about/our-process.', validation: (rule) => rule.required().regex(/^\//, { name: 'path' }).error('Começa com "/".') }),
            defineField({ name: 'image', title: 'Imagem', type: 'image', description: 'Foto do cartão, a cores. Horizontal ou 4:3.' }),
            defineField({ name: 'hoverImage', title: 'Imagem ao passar o rato', type: 'image', description: 'Opcional. Revela-se por cima quando se passa o rato.' }),
            defineField({
              name: 'key',
              title: 'Identificador (não mudar)',
              type: 'string',
              description: 'Usado para esconder o cartão na própria página (certifications, compliance, process, about). Só mudar com ajuda técnica.',
              validation: (rule) => rule.required().regex(/^[a-z0-9-]+$/, { name: 'slug' }),
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'href', media: 'image' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Cartões "What We Do"', subtitle: 'Página inicial e fim das páginas institucionais' }) },
})
