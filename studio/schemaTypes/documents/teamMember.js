import {defineField, defineType} from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team member',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'role', title: 'Role', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'group', title: 'Group', type: 'string', options: {list: ['Leadership', 'Commercial', 'Board', 'Engineering', 'People']}}),
    defineField({name: 'order', title: 'Display order', type: 'number'}),
    defineField({name: 'legacyPhotoUrl', title: 'Website photo path', type: 'string'}),
    defineField({name: 'photo', title: 'CMS photo', type: 'image', options: {hotspot: true}}),
    defineField({name: 'linkedin', title: 'LinkedIn URL', type: 'url'}),
    defineField({name: 'bio', title: 'Short bio', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
    defineField({name: 'isFeatured', title: 'Featured', type: 'boolean', initialValue: true}),
  ],
  orderings: [
    {title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'photo'},
  },
})
