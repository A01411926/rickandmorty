import { z } from 'zod'

const feedbackSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name should be string',
      required_error: 'Name is required',
    })
    .min(5, {
      message: 'Name is required at least 5 characters',
    }),
  subject: z.string(),
  comments: z.string().optional(),
})