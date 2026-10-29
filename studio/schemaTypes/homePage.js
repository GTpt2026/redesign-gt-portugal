import { defineArrayMember, defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Página inicial',
  type: 'document',
  groups: [
    { name: 'stats', title: 'Números' },
    { name: 'clients', title: 'Clientes' },
    { name: 'testimonials', title: 'Testemunhos' },
    { name: 'seo', title: 'Google e partilha' },
  ],
  fields: [
    defineField({
      name: 'stats',
      title: 'Números em destaque',
      type: 'array',
      group: 'stats',
      description: 'A faixa de números que "sobem" quando se faz scroll. Recomendado: 3.',
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          title: 'Número',
          fields: [
            defineField({ name: 'prefix', title: 'Antes do número', type: 'string', description: 'Por exemplo "+". Pode ficar vazio.' }),
            defineField({ name: 'end', title: 'Número', type: 'number', validation: (rule) => rule.required().min(0) }),
            defineField({ name: 'suffix', title: 'Depois do número', type: 'string', description: 'Por exemplo "k" para milhares. Pode ficar vazio.' }),
            defineField({ name: 'label', title: 'Legenda', type: 'string', validation: (rule) => rule.required() }),
          ],
          preview: {
            select: { prefix: 'prefix', end: 'end', suffix: 'suffix', label: 'label' },
            prepare: ({ prefix, end, suffix, label }) => ({ title: `${prefix || ''}${end ?? ''}${suffix || ''}`, subtitle: label }),
          },
        }),
      ],
    }),
    defineField({ name: 'clientsTitle', title: 'Título da secção de clientes', type: 'string', group: 'clients' }),
    defineField({
      name: 'clients',
      title: 'Logótipos de clientes',
      type: 'array',
      group: 'clients',
      description: 'Arrasta para mudar a ordem. Os logótipos em SVG (fundo transparente) são os que ficam melhor.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'client',
          title: 'Cliente',
          fields: [
            defineField({ name: 'name', title: 'Nome da marca', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'logo', title: 'Logótipo', type: 'image', validation: (rule) => rule.required() }),
            defineField({
              name: 'wide',
              title: 'Logótipo muito largo e fino',
              type: 'boolean',
              initialValue: false,
              description: 'Liga se o logótipo for uma assinatura longa e fina (como Frankies Bikinis), para ficar do mesmo tamanho visual dos outros.',
            }),
          ],
          preview: { select: { title: 'name', media: 'logo' } },
        }),
      ],
    }),
    defineField({ name: 'testimonialsTitle', title: 'Título da secção de testemunhos', type: 'string', group: 'testimonials' }),
    defineField({
      name: 'testimonials',
      title: 'Testemunhos',
      type: 'array',
      group: 'testimonials',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'testimonial',
          title: 'Testemunho',
          fields: [
            defineField({ name: 'quote', title: 'Citação', type: 'text', rows: 4, validation: (rule) => rule.required() }),
            defineField({ name: 'name', title: 'Nome', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'role', title: 'Cargo', type: 'string' }),
            defineField({ name: 'logo', title: 'Logótipo da marca', type: 'image' }),
          ],
          preview: { select: { title: 'name', subtitle: 'role', media: 'logo' } },
        }),
      ],
    }),
    defineField({ name: 'seo', title: 'Google e partilha', type: 'seo', group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Página inicial', subtitle: 'Números, clientes, testemunhos' }) },
})
