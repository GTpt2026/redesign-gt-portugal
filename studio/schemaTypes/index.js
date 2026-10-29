import insight from './insight'
import { lead, bodyImage, banner, video, steps, step } from './blocks'
import { seo } from './seo'
import { siteSettings } from './siteSettings'
import { homePage } from './homePage'
import { textilesPage } from './textilesPage'
import { textileCategory } from './textileCategory'

export const schemaTypes = [
  siteSettings, homePage, textilesPage, textileCategory, insight,
  seo, lead, bodyImage, banner, video, steps, step,
]
