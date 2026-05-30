import {defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'question'}}),
    defineField({name: 'answer', title: 'Answer', type: 'blockContent'}),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {list: ['Products', 'Pricing', 'Technology', 'Deployment', 'Partners', 'General']},
    }),
    defineField({name: 'order', title: 'Display order', type: 'number'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
})
