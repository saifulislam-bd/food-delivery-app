import { z } from "zod";

export const userSignupSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password length must be at least six characters"),
  contact: z.string().length(11, "Phone number must be eleven digit"),
});

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password length must be at least six characters"),
});

export type SignupInputState = z.infer<typeof userSignupSchema>;

export type LoginInputState = z.infer<typeof userLoginSchema>;
