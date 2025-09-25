import { z } from "zod";

import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const RegisterBody = z.object({
  firstName: z.string().min(1, { message: "Please enter your first name!" }),
  lastName: z.string().min(1, { message: "Please enter your last name!" }),
  email: z.email("Please enter valid email address!").min(1, { message: "Please enter email address!" }),
  password: z.string().min(8, { message: "Please enter password of length 8 or more!" })
});

export const LoginBody = z.object({
  email: z.email("Please enter valid email address!").min(1, { message: "Please enter email address!" }),
  password: z.string().min(8, { message: "Please enter password of length 8 or more!" })
});

export const registerSchema = z.object({
  body: RegisterBody
});

export const loginSchema = z.object({
  body: LoginBody
});
