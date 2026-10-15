import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'wrh1tvdi',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Hosted Studio: https://gt-portugal.sanity.studio
  studioHost: 'gt-portugal',
  deployment: {
    appId: 'pjifejjmzpyjui9jtl8chtau',
  },
})
