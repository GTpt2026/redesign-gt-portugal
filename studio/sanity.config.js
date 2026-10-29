import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'
import { singletonTypes, structure } from './structure'

export default defineConfig({
  name: 'gt-portugal',
  title: 'GT Portugal',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'wrh1tvdi',
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
})
