import { z } from "zod";

export const menuSchema = z.object({
  name: z.string().nonempty({ message: "Menu name is required" }),
  description: z.string().nonempty({ message: "Menu description is required" }),
  price: z.number().min(0, { message: "Menu price must be positive" }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file): file is File => file !== null && file?.size !== 0, {
      message: "Menu image is required",
    }),
});

export type menuState = z.infer<typeof menuSchema>;
