import { z } from "zod";

const RoleEnum = z.enum(["paciente", "nutricionista"]);

export const schema = z
  .object({
    name: z.string().min(6, "El nombre debe de tener al menos seis caracteres"),
    lastName: z
      .string()
      .min(5, "El apellido debe de tener al menos 5 caracteres"),
    email: z
      .string()
      .email("Correo Inválido")
      .min(1, "El correo es obligatorio"),
    phone: z
      .string()
      .regex(
        /^\d{9}$/,
        "El número de celular debe tener exactamente 9 dígitos"
      ),
    role: RoleEnum,
    password: z
      .string()
      .min(6, "La contraseña debe de tener al menos seis caracteres."),
    confirmPassword: z
      .string()
      .min(6, "La contraseña debe de tener al menos seis caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas son diferentes",
    path: ["confirmPassword"],
  });

export type FormValues = z.infer<typeof schema>;
