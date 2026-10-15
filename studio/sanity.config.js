import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'gt-portugal',
  title: 'GT Portugal',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'wrh1tvdi',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
