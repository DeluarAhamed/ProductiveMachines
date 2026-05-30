import {defineField, defineType} from 'sanity'

export const productPage = defineType({
  name: 'productPage',
  title: 'Product Page',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Product name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'tier', title: 'Tier', type: 'string'}),
    defineField({name: 'priceLabel', title: 'Price label', type: 'string'}),
    defineField({name: 'tag', title: 'Tag', type: 'string'}),
    defineField({name: 'intro', title: 'Intro', type: 'text', rows: 3}),
    defineField({name: 'accent', title: 'Accent color', type: 'string', initialValue: '#2250FC'}),
    defineField({name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'legacyHeroUrl', title: 'Legacy hero URL', type: 'url', readOnly: true}),
    defineField({name: 'metrics', title: 'Metrics', type: 'array', of: [{type: 'metric'}]}),
    defineField({name: 'sections', title: 'Sections', type: 'array', of: [{type: 'section'}]}),
    defineField({name: 'primaryCta', title: 'Primary CTA', type: 'cta'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
})
