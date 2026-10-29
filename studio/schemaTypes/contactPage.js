import { defineArrayMember, defineField, defineType } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contacto',
  type: 'document',
  groups: [
    { name: 'page', title: 'Página' },
    { name: 'seo', title: 'Google e partilha' },
  ],
  fields: [
    defineField({ name: 'heroEyebrow', title: 'Etiqueta do topo', type: 'string', group: 'page' }),
    defineField({ name: 'heroHeadline', title: 'Título do topo', type: 'array', group: 'page', of: [defineArrayMember({ type: 'string' })], description: 'Uma linha por item. A última aparece a vermelho.' }),
    defineField({ name: 'formTitle', title: 'Título do formulário', type: 'string', group: 'page' }),
    defineField({ name: 'seo', title: 'Google e partilha', type: 'seo', group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Contacto', subtitle: 'Título e formulário' }) },
})
