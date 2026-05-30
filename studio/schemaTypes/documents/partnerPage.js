import {defineField, defineType} from 'sanity'

export const partnerPage = defineType({
  name: 'partnerPage',
  title: 'Partner Page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'tag', title: 'Tag', type: 'string'}),
    defineField({name: 'intro', title: 'Intro', type: 'text', rows: 3}),
    defineField({name: 'accent', title: 'Accent color', type: 'string', initialValue: '#2250FC'}),
    defineField({name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'legacyHeroUrl', title: 'Legacy hero URL', type: 'url', readOnly: true}),
    defineField({name: 'sections', title: 'Sections', type: 'array', of: [{type: 'section'}]}),
    defineField({name: 'primaryCta', title: 'Primary CTA', type: 'cta'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
})
