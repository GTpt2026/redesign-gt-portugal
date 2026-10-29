import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'
import { contactMessage } from './schemaTypes/contactMessage'
import { singletonTypes, structure } from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'wrh1tvdi'

export default defineConfig([
  // 1) Site content: the public dataset the website reads
  {
    name: 'content',
    title: 'Conteúdo do site',
    basePath: '/conteudo',
    projectId,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
    plugins: [structureTool({ structure })],
    schema: {
      types: schemaTypes,
      // The single pages cannot be created twice
      templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
    },
    document: {
      // ...nor deleted or duplicated by mistake
      actions: (input, { schemaType }) =>
        singletonTypes.has(schemaType) ? input.filter(({ action }) => action && !['delete', 'duplicate', 'unpublish'].includes(action)) : input,
    },
  },

  // 2) Contact form messages: a PRIVATE dataset (they contain people's names and emails)
  {
    name: 'inbox',
    title: 'Mensagens de contacto',
    basePath: '/mensagens',
    projectId,
    dataset: 'inbox',
    plugins: [
      structureTool({
        structure: (S) =>
          S.list()
            .title('Mensagens')
            .items([
              S.listItem()
                .title('Mensagens recebidas')
                .schemaType('contactMessage')
                .child(
                  S.documentTypeList('contactMessage')
                    .title('Mensagens recebidas')
                    .defaultOrdering([{ field: 'receivedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('Por tratar')
                .schemaType('contactMessage')
                .child(
                  S.documentList()
                    .title('Por tratar')
                    .filter('_type == "contactMessage" && handled != true')
                    .defaultOrdering([{ field: 'receivedAt', direction: 'desc' }])
                ),
            ]),
      }),
    ],
    schema: {
      types: [contactMessage],
      templates: () => [], // messages arrive from the site, nobody creates them by hand
    },
  },
])
