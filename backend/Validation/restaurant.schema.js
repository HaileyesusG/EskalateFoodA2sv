import { z } from 'zod';

export const createRestaurantSchema = z.object({
  restaurant_name: z.string().min(1, 'Restaurant name is required'),
  restaurant_logo: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  restaurant_status: z.enum(['Open Now', 'Closed']),
});

export const updateRestaurantSchema = createRestaurantSchema.partial();
