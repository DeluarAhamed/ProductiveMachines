import {defineField, defineType} from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({name: 'company', title: 'Company', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'company'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'sector', title: 'Sector', type: 'string'}),
    defineField({name: 'headline', title: 'Headline', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'intro', title: 'Intro', type: 'text', rows: 3}),
    defineField({name: 'logo', title: 'Logo', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', title: 'Alt text', type: 'string'}]}),
    defineField({name: 'legacyLogoUrl', title: 'Legacy logo URL', type: 'url', readOnly: true}),
    defineField({name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', title: 'Alt text', type: 'string'}]}),
    defineField({name: 'legacyHeroUrl', title: 'Legacy hero URL', type: 'url', readOnly: true}),
    defineField({name: 'metrics', title: 'Metrics', type: 'array', of: [{type: 'metric'}]}),
    defineField({name: 'quote', title: 'Customer quote', type: 'text', rows: 4}),
    defineField({name: 'quoteAuthor', title: 'Quote author', type: 'string'}),
    defineField({name: 'quoteTitle', title: 'Quote author title', type: 'string'}),
    defineField({name: 'sections', title: 'Sections', type: 'array', of: [{type: 'section'}]}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    select: {title: 'company', subtitle: 'headline', media: 'logo'},
  },
})
