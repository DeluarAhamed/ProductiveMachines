import {blogPost} from './documents/blogPost.js'
import {caseStudy} from './documents/caseStudy.js'
import {event} from './documents/event.js'
import {faq} from './documents/faq.js'
import {partnerPage} from './documents/partnerPage.js'
import {productPage} from './documents/productPage.js'
import {resourcePage} from './documents/resourcePage.js'
import {siteSettings} from './documents/siteSettings.js'
import {teamMember} from './documents/teamMember.js'
import {blockContent} from './objects/blockContent.js'
import {cta} from './objects/cta.js'
import {metric} from './objects/metric.js'
import {seo} from './objects/seo.js'
import {section} from './objects/section.js'

export const schemaTypes = [
  blockContent,
  cta,
  metric,
  seo,
  section,
  blogPost,
  caseStudy,
  event,
  faq,
  partnerPage,
  productPage,
  resourcePage,
  siteSettings,
  teamMember,
]
