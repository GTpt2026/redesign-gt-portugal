import { defineField, defineType } from 'sanity'

// Messages sent through the website contact form. They are written by the site
// (never typed here), so everything is read-only except the "handled" tick.
const readOnly = true

export const contactMessage = defineType({
  name: 'contactMessage',
  title: 'Mensagem de contacto',
  type: 'document',
  fields: [
    defineField({ name: 'handled', title: 'Já tratada', type: 'boolean', initialValue: false, description: 'Marca quando alguém da equipa já respondeu. Carrega em Publish para guardar.' }),
    defineField({ name: 'name', title: 'Nome', type: 'string', readOnly }),
    defineField({ name: 'email', title: 'Email', type: 'string', readOnly }),
    defineField({ name: 'company', title: 'Empresa', type: 'string', readOnly }),
    defineField({ name: 'message', title: 'Mensagem', type: 'text', rows: 8, readOnly }),
    defineField({ name: 'receivedAt', title: 'Recebida em', type: 'datetime', readOnly }),
    defineField({ name: 'pageUrl', title: 'Enviada a partir de', type: 'string', readOnly }),
  ],
  orderings: [{ title: 'Mais recentes primeiro', name: 'received', by: [{ field: 'receivedAt', direction: 'desc' }] }],
  preview: {
    select: { name: 'name', company: 'company', email: 'email', date: 'receivedAt', handled: 'handled' },
    prepare: ({ name, company, email, date, handled }) => ({
      title: `${handled ? '✓ ' : ''}${name || 'Sem nome'}${company ? `, ${company}` : ''}`,
      subtitle: [email, date && new Date(date).toLocaleString('pt-PT')].filter(Boolean).join(' · '),
    }),
  },
})
