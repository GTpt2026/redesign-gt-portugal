import LegalPage from '@/components/sections/LegalPage'
import { legalPages } from '@/content/defaults/legal.mjs'

const page = legalPages['terms-of-service']

export const metadata = {
  title: page.title,
  description: page.description,
}

export default function Page() {
  return <LegalPage page={page} />
}
