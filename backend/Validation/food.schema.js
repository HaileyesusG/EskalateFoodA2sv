import { z } from 'zod';

export const createFoodSchema = z.object({
  food_name: z.string().min(1, 'Food name is required'),
  food_rating: z.number().min(0).max(5),
  food_image: z.string().url().optional().or(z.literal('')),
});

export const updateFoodSchema = createFoodSchema.partial();
