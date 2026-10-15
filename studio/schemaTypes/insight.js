import { defineArrayMember, defineField, defineType } from 'sanity'

export const CATEGORIES = ['Fabrics & Products', 'Sustainability', 'Technology & Trends']

export default defineType({
  name: 'insight',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The article headline.',
      validation: (rule) => rule.required().max(110),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      description:
        'The last part of the link, e.g. “denim-finishing”. Press Generate to create it from the title. When you duplicate an article, generate a new one.',
      options: { source: 'title', maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional second line under the title.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description:
        'One or two sentences. Shown on article cards and in the preview when the link is shared on LinkedIn. If left empty, the start of the article is used.',
      validation: (rule) => rule.max(220).warning('Over 220 characters may be cut off on cards.'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publication date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: CATEGORIES, layout: 'radio' },
      initialValue: CATEGORIES[0],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'topic',
      title: 'Topic (optional)',
      type: 'string',
      description: 'A short label next to the category, e.g. Denim, Jersey, Knitwear.',
    }),
    defineField({
      name: 'cover',
      title: 'Cover image',
      type: 'image',
      description:
        'The large image at the top of the article and in the LinkedIn preview. Landscape works best, at least 1600 px wide. Any format is fine: it is converted to WebP automatically.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Article',
      type: 'array',
      description:
        'Write the article here. Use + to add a heading, image, wide banner, video or process steps between paragraphs.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'Heading', value: 'h2' },
            { title: 'Subheading', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullets', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Address',
                    validation: (rule) =>
                      rule.uri({ scheme: ['http', 'https', 'mailto'], allowRelative: true }),
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({ type: 'lead' }),
        defineArrayMember({ type: 'bodyImage' }),
        defineArrayMember({ type: 'banner' }),
        defineArrayMember({ type: 'video' }),
        defineArrayMember({ type: 'steps' }),
      ],
    }),
  ],
  orderings: [
    { title: 'Newest first', name: 'dateDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { title: 'Title A–Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', category: 'category', date: 'publishedAt', media: 'cover' },
    prepare: ({ title, category, date, media }) => ({
      title,
      subtitle: [category, date && new Date(date).toLocaleDateString('en-GB')].filter(Boolean).join(' · '),
      media,
    }),
  },
})
