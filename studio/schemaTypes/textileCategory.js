import { defineArrayMember, defineField, defineType } from 'sanity'

const photo = (name, title, description, group) => defineField({ name, title, type: 'image', group, description })

export const textileCategory = defineType({
  name: 'textileCategory',
  title: 'Categoria de têxteis',
  type: 'document',
  groups: [
    { name: 'card', title: 'Cartão (lista)' },
    { name: 'page', title: 'Página da categoria' },
    { name: 'products', title: 'Fotos de produto' },
    { name: 'seo', title: 'Google e partilha' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Nome', type: 'string', group: 'card', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Endereço da página',
      type: 'slug',
      group: 'card',
      description: 'A última parte do link, por exemplo "knitwear". Carrega em Generate. Não mudes numa categoria já publicada, senão os links antigos deixam de funcionar.',
      options: { source: 'title', maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Ordem na lista',
      type: 'number',
      group: 'card',
      description: 'Número mais pequeno aparece primeiro (1, 2, 3...).',
      initialValue: 99,
    }),
    defineField({ name: 'cardDescription', title: 'Descrição curta (cartão)', type: 'text', rows: 3, group: 'card', description: 'Aparece no cartão da lista de Têxteis e nas "Outras categorias".' }),
    photo('cardImage', 'Miniatura do cartão', 'A foto da peça no cartão. Vertical (4:5) fica melhor, de preferência com 1800 px ou mais no lado maior.', 'card'),
    photo('detailImage', 'Detalhe ao passar o rato', 'Um pormenor da MESMA peça da miniatura (botão, costura, tecido). Aparece quando se passa o rato no cartão. Vertical (4:5).', 'card'),

    defineField({ name: 'tagline', title: 'Subtítulo da página', type: 'string', group: 'page', description: 'A segunda linha do título do topo, por exemplo "Flexible & Comfortable".' }),
    photo('heroImage', 'Imagem do topo', 'Foto grande no topo da página da categoria e primeira da galeria. Horizontal, mínimo 1600 px de largura.', 'page'),
    defineField({ name: 'description', title: 'Texto da página', type: 'text', rows: 5, group: 'page' }),
    defineField({
      name: 'gallery',
      title: 'Galeria',
      type: 'array',
      group: 'page',
      description: 'As imagens do carrossel ao lado do texto. Arrasta para mudar a ordem.',
      of: [defineArrayMember({ type: 'image' })],
    }),
    defineField({
      name: 'features',
      title: 'Especificações',
      type: 'array',
      group: 'page',
      description: 'A lista ao lado do texto (Material, Quantidade mínima, Prazo...).',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'feature',
          title: 'Especificação',
          fields: [
            defineField({ name: 'label', title: 'Título', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'text', title: 'Texto', type: 'text', rows: 3, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'text' } },
        }),
      ],
    }),
    defineField({
      name: 'statBanner',
      title: 'Faixa com destaque',
      type: 'object',
      group: 'page',
      description: 'A faixa com foto e um número em destaque a meio da página (por exemplo "6-8 Weeks").',
      fields: [
        defineField({ name: 'image', title: 'Foto de fundo', type: 'image' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'stat', title: 'Destaque', type: 'string', description: 'O número ou frase a vermelho.' }),
        defineField({ name: 'description', title: 'Texto', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'crossLinks',
      title: 'Ligações para outras páginas',
      type: 'array',
      group: 'page',
      description: 'Os cartões no fim da página que levam a Sustentabilidade, Sobre Nós, etc.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'crossLink',
          title: 'Ligação',
          fields: [
            defineField({ name: 'tag', title: 'Etiqueta', type: 'string', description: 'Por exemplo "Sustainability".' }),
            defineField({ name: 'title', title: 'Título', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'description', title: 'Texto', type: 'text', rows: 2 }),
            defineField({
              name: 'href',
              title: 'Endereço',
              type: 'string',
              description: 'Caminho dentro do site, por exemplo /sustainability ou /about.',
              validation: (rule) => rule.required().regex(/^\//, { name: 'path' }).error('Começa com "/", por exemplo /about.'),
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'tag' } },
        }),
      ],
    }),

    defineField({
      name: 'productGrid',
      title: 'Fotos de produto',
      type: 'array',
      group: 'products',
      description: 'A grelha de peças. Fotos com a peça recortada em fundo branco, sem margens. Arrasta para mudar a ordem.',
      of: [defineArrayMember({ type: 'image' })],
    }),
    defineField({
      name: 'productGridColumns',
      title: 'Colunas da grelha',
      type: 'number',
      group: 'products',
      description: 'Quantas peças por linha no computador (3 a 6). Se vazio, usa 4.',
      validation: (rule) => rule.min(3).max(6).integer(),
    }),

    defineField({ name: 'seo', title: 'Google e partilha', type: 'seo', group: 'seo' }),
  ],
  orderings: [
    { title: 'Ordem na lista', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Nome A-Z', name: 'title', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'tagline', media: 'cardImage' },
  },
})
