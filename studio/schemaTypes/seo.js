import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'Google e partilha',
  type: 'object',
  description: 'Como a página aparece no Google e quando o link é partilhado (LinkedIn, WhatsApp...). Se deixares vazio, o site usa o texto que já tem.',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      description: 'Idealmente até 60 caracteres.',
      validation: (rule) => rule.max(70).warning('Acima de 60-70 caracteres o Google pode cortar o título.'),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
      description: 'Uma ou duas frases, até 160 caracteres.',
      validation: (rule) => rule.max(170).warning('Acima de 160 caracteres o Google pode cortar a descrição.'),
    }),
    defineField({
      name: 'shareImage',
      title: 'Imagem de partilha',
      type: 'image',
      description: 'Aparece no LinkedIn e no WhatsApp quando o link é partilhado. Horizontal, de preferência 1200×630.',
    }),
  ],
})
