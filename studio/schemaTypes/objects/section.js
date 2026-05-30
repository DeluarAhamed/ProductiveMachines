import {defineField, defineType} from 'sanity'

export const section = defineType({
  name: 'section',
  title: 'Content Section',
  type: 'object',
  fields: [
    defineField({name: 'sectionId', title: 'Section anchor ID', type: 'slug', options: {source: 'title'}}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'image', title: 'Section image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'legacyImageUrl', title: 'Legacy image URL', type: 'url', readOnly: true}),
    defineField({name: 'body', title: 'Body', type: 'blockContent'}),
    defineField({name: 'legacyHtml', title: 'Legacy HTML', type: 'text', rows: 6, readOnly: true}),
  ],
})
