import * as z from "zod"

export const eventFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  artist: z.string().min(3, 'Artist must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters').max(400, 'Description must be less than 400 characters'),
  genre: z.string(),
  imageUrl: z.string(),
  audioUrl: z.string(),
  categoryId: z.string(),
})

export const videoFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  artist: z.string().min(3, 'Artist must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters').max(400, 'Description must be less than 400 characters'),
  genre: z.string(),
  imageUrl: z.string(),
  videoUrl: z.string(),
  categoryId: z.string(),
})