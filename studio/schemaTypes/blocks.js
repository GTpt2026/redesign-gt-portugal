import { defineField, defineType } from 'sanity'

export const lead = defineType({
  name: 'lead',
  title: 'Intro paragraph',
  type: 'object',
  description: 'A larger opening paragraph, optionally with a heading above it.',
  fields: [
    defineField({ name: 'heading', title: 'Heading (optional)', type: 'string' }),
    defineField({ name: 'text', title: 'Text', type: 'text', rows: 4 }),
  ],
  preview: {
    select: { heading: 'heading', text: 'text' },
    prepare: ({ heading, text }) => ({ title: heading || text || 'Intro paragraph', subtitle: heading ? text : 'Intro paragraph' }),
  },
})

export const bodyImage = defineType({
  name: 'bodyImage',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', validation: (rule) => rule.required() }),
    defineField({
      name: 'alt',
      title: 'Description (for screen readers)',
      type: 'string',
      description: 'Briefly describe what the image shows.',
    }),
  ],
  preview: { select: { media: 'image', title: 'alt' }, prepare: ({ media, title }) => ({ media, title: title || 'Image' }) },
})

export const banner = defineType({
  name: 'banner',
  title: 'Wide banner',
  type: 'object',
  description: 'A full-width image. Add a sentence to show it as a highlighted statement over the image.',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', validation: (rule) => rule.required() }),
    defineField({ name: 'caption', title: 'Statement over the image (optional)', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { media: 'image', title: 'caption' },
    prepare: ({ media, title }) => ({ media, title: title || 'Wide banner', subtitle: 'Wide banner' }),
  },
})

export const video = defineType({
  name: 'video',
  title: 'Video link',
  type: 'object',
  description: 'Shows a cover image that opens the video on YouTube.',
  fields: [
    defineField({ name: 'url', title: 'YouTube link', type: 'url', validation: (rule) => rule.required() }),
    defineField({ name: 'title', title: 'Label', type: 'string', initialValue: 'Webinar' }),
    defineField({ name: 'poster', title: 'Cover image', type: 'image' }),
  ],
  preview: { select: { media: 'poster', title: 'title', subtitle: 'url' }, prepare: ({ media, title, subtitle }) => ({ media, title: title || 'Video', subtitle }) },
})

export const step = defineType({
  name: 'step',
  title: 'Step',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Step name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'text', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'image', title: 'Image (optional)', type: 'image' }),
  ],
  preview: { select: { title: 'heading', subtitle: 'text', media: 'image' } },
})

export const steps = defineType({
  name: 'steps',
  title: 'Process steps',
  type: 'object',
  description: 'A numbered process, each step with an optional image. Steps are numbered automatically.',
  fields: [defineField({ name: 'items', title: 'Steps', type: 'array', of: [{ type: 'step' }] })],
  preview: {
    select: { items: 'items' },
    prepare: ({ items = [] }) => ({ title: 'Process steps', subtitle: `${items.length} steps` }),
  },
})
