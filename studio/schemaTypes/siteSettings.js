import { defineArrayMember, defineField, defineType } from 'sanity'

const linkList = (name, title, description) =>
  defineField({
    name,
    title,
    type: 'array',
    description,
    of: [
      defineArrayMember({
        type: 'object',
        name: 'link',
        title: 'Ligação',
        fields: [
          defineField({ name: 'label', title: 'Texto', type: 'string', validation: (rule) => rule.required() }),
          defineField({
            name: 'href',
            title: 'Endereço',
            type: 'string',
            description: 'Caminho dentro do site (por exemplo /textiles) ou um link completo (https://...).',
            validation: (rule) => rule.required().regex(/^(\/|https?:\/\/)/, { name: 'url' }).error('Começa com "/" ou "https://".'),
          }),
        ],
        preview: { select: { title: 'label', subtitle: 'href' } },
      }),
    ],
  })

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
    linkList('menuLinks', 'Menu do topo', 'As ligações do menu do cabeçalho, pela ordem em que aparecem (no telemóvel é o mesmo menu). Arrasta para mudar a ordem.'),
    defineField({ name: 'contactButtonLabel', title: 'Texto do botão de contacto', type: 'string', description: 'O botão vermelho do cabeçalho.' }),
    linkList('companyLinks', 'Rodapé, coluna "Company"', 'As ligações da coluna Company do rodapé. As colunas "Textiles" (categorias) e "Sustainability" (secções da página) geram-se sozinhas.'),
  ],
  preview: { prepare: () => ({ title: 'Definições do site', subtitle: 'Contactos e redes sociais' }) },
})
