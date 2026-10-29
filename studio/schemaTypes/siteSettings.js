import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Definições do site',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email de contacto',
      type: 'string',
      description: 'Aparece no rodapé de todas as páginas.',
      validation: (rule) => rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: 'email' }).error('Escreve um email válido.'),
    }),
    defineField({
      name: 'phone',
      title: 'Telefone',
      type: 'string',
      description: 'Como queres que apareça, por exemplo (+351) 22 902 4701. A ligação para chamar é criada automaticamente.',
    }),
    defineField({
      name: 'address',
      title: 'Morada',
      type: 'string',
      description: 'Localidade ou morada completa.',
    }),
    defineField({
      name: 'mapsUrl',
      title: 'Link do mapa',
      type: 'url',
      description: 'Link do Google Maps usado no ícone de localização do rodapé.',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'Link do LinkedIn',
      type: 'url',
      description: 'Página da empresa no LinkedIn.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Definições do site', subtitle: 'Contactos e redes sociais' }) },
})
