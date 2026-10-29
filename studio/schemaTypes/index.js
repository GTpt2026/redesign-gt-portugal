import insight from './insight'
import { lead, bodyImage, banner, video, steps, step } from './blocks'
import { seo } from './seo'
import { siteSettings } from './siteSettings'
import { homePage } from './homePage'
import { textilesPage } from './textilesPage'
import { textileCategory } from './textileCategory'
import { impactPage } from './impactPage'
import { aboutPage } from './aboutPage'
import { featureCards } from './featureCards'

export const schemaTypes = [
  siteSettings, homePage, textilesPage, textileCategory, impactPage, aboutPage, featureCards, insight,
  seo, lead, bodyImage, banner, video, steps, step,
]
