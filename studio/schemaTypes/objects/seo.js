import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'SEO title', type: 'string', validation: (Rule) => Rule.max(70)}),
    defineField({name: 'description', title: 'Meta description', type: 'text', rows: 3, validation: (Rule) => Rule.max(170)}),
    defineField({name: 'keywords', title: 'Focus keywords', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'image', title: 'Social image', type: 'image', options: {hotspot: true}}),
  ],
})
