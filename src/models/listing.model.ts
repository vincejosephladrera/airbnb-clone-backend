import { z } from 'zod';

export const createListingSchema = z.object({
  name: z.string().min(8)
})
