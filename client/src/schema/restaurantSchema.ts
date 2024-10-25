import { z } from "zod";

export const restaurantFormSchema = z.object({
  restaurantName: z
    .string()
    .nonempty({ message: "Restaurant name is required" }),
  city: z.string().nonempty({ message: "City is required" }),
  country: z.string().nonempty({ message: "Country is required" }),
  deliveryTime: z
    .number()
    .min(0, { message: "Delivery time must be positive" }),
  cuisines: z.array(z.string()),
  image: z
    .instanceof(File)
    .optional()
    .refine((file): file is File => file !== null && file?.size !== 0, {
      message: "Restaurant banner image is required",
    }),
});

export type RestaurantFormState = z.infer<typeof restaurantFormSchema>;
