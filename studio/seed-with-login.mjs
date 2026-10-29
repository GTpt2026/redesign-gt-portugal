// Fills Sanity with the current site content using the Sanity login already on this
// computer (the one from `npx sanity login`), so no token needs to be created or pasted.
//
//   cd studio && npx sanity exec seed-with-login.mjs --with-user-token
//   (add  -- --force  only to deliberately reset documents to the original content)
import { getCliClient } from 'sanity/cli'

globalThis.__SEED_CLIENT = getCliClient({ apiVersion: '2025-01-01', useCdn: false })
await import('../scripts/seed-content-to-sanity.mjs')
