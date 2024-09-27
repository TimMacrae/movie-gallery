"use client";

import { z } from "zod";

export const signinFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SigninFormValues = z.infer<typeof signinFormSchema>;
