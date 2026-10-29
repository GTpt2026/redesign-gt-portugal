import { defineField, defineType } from 'sanity'

export const lead = defineType({
  name: 'lead',
  title: 'Parágrafo de abertura',
  type: 'object',
  description: 'Um parágrafo maior de abertura, com título opcional por cima.',
  fields: [
    defineField({ name: 'heading', title: 'Título (opcional)', type: 'string' }),
    defineField({ name: 'text', title: 'Texto', type: 'text', rows: 4 }),
  ],
  preview: {
    select: { heading: 'heading', text: 'text' },
    prepare: ({ heading, text }) => ({ title: heading || text || 'Parágrafo de abertura', subtitle: heading ? text : 'Parágrafo de abertura' }),
  },
})

export const bodyImage = defineType({
  name: 'bodyImage',
  title: 'Imagem',
  type: 'object',
  fields: [
    defineField({ name: 'image', title: 'Imagem', type: 'image', validation: (rule) => rule.required() }),
    defineField({
      name: 'alt',
      title: 'Descrição (para leitores de ecrã)',
      type: 'string',
      description: 'Descreve em poucas palavras o que a imagem mostra.',
    }),
  ],
  preview: { select: { media: 'image', title: 'alt' }, prepare: ({ media, title }) => ({ media, title: title || 'Imagem' }) },
})

export const banner = defineType({
  name: 'banner',
  title: 'Faixa larga',
  type: 'object',
  description: 'Uma imagem em largura total. Acrescenta uma frase para a mostrar em destaque sobre a imagem.',
  fields: [
    defineField({ name: 'image', title: 'Imagem', type: 'image', validation: (rule) => rule.required() }),
    defineField({ name: 'caption', title: 'Frase sobre a imagem (opcional)', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { media: 'image', title: 'caption' },
    prepare: ({ media, title }) => ({ media, title: title || 'Faixa larga', subtitle: 'Faixa larga' }),
  },
})

export const video = defineType({
  name: 'video',
  title: 'Ligação de vídeo',
  type: 'object',
  description: 'Mostra uma imagem de capa que abre o vídeo no YouTube.',
  fields: [
    defineField({ name: 'url', title: 'Link do YouTube', type: 'url', validation: (rule) => rule.required() }),
    defineField({ name: 'title', title: 'Etiqueta', type: 'string', initialValue: 'Webinar' }),
    defineField({ name: 'poster', title: 'Imagem de capa', type: 'image' }),
  ],
  preview: { select: { media: 'poster', title: 'title', subtitle: 'url' }, prepare: ({ media, title, subtitle }) => ({ media, title: title || 'Vídeo', subtitle }) },
})

export const step = defineType({
  name: 'step',
  title: 'Passo',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Nome do passo', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'text', title: 'Descrição', type: 'text', rows: 4 }),
    defineField({ name: 'image', title: 'Imagem (opcional)', type: 'image' }),
  ],
  preview: { select: { title: 'heading', subtitle: 'text', media: 'image' } },
})

export const steps = defineType({
  name: 'steps',
  title: 'Passos de processo',
  type: 'object',
  description: 'Um processo numerado, cada passo com imagem opcional. A numeração é automática.',
  fields: [defineField({ name: 'items', title: 'Passos', type: 'array', of: [{ type: 'step' }] })],
  preview: {
    select: { items: 'items' },
    prepare: ({ items = [] }) => ({ title: 'Passos de processo', subtitle: `${items.length} passos` }),
  },
})
