import {defineField, defineType} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog / News Article',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {list: ['News', 'Blog', 'Engineering', 'Case study']},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'publishedAt', title: 'Published date', type: 'datetime'}),
    defineField({name: 'readTime', title: 'Read time', type: 'string'}),
    defineField({name: 'author', title: 'Author', type: 'string'}),
    defineField({name: 'intro', title: 'Intro / excerpt', type: 'text', rows: 3, validation: (Rule) => Rule.required()}),
    defineField({name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', title: 'Alt text', type: 'string'}]}),
    defineField({name: 'legacyHeroUrl', title: 'Legacy hero URL', type: 'url', readOnly: true}),
    defineField({name: 'body', title: 'Article body', type: 'blockContent'}),
    defineField({name: 'legacyHtml', title: 'Legacy HTML', type: 'text', rows: 8, readOnly: true}),
    defineField({name: 'featured', title: 'Feature on resources/news pages', type: 'boolean', initialValue: false}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'heroImage'},
  },
})
