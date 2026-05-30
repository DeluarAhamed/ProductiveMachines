import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Site title', type: 'string', initialValue: 'Productive Machines'}),
    defineField({name: 'siteUrl', title: 'Site URL', type: 'url'}),
    defineField({name: 'logo', title: 'Logo', type: 'image'}),
    defineField({name: 'socialImage', title: 'Default social image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'defaultSeo', title: 'Default SEO', type: 'seo'}),
    defineField({name: 'navigationLabel', title: 'Navigation label', type: 'string'}),
  ],
})
