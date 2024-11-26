import { z } from "zod";

export const schema = z.object({
  email: z.string().email("Correo Inválido").min(1, "El correo es obligatorio"),
  password: z
    .string()
    .min(6, "La contraseña debe de tener al menos seis caracteres."),
});

export type FormValues = z.infer<typeof schema>;
