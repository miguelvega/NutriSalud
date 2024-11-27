import { z } from "zod";

const RoleEnum = z.enum(["paciente", "nutricionista"]);

// Esquema base
const baseSchema = z.object({
  name: z.string().min(6, "El nombre debe de tener al menos seis caracteres"),
  lastName: z
    .string()
    .min(5, "El apellido debe de tener al menos 5 caracteres"),
  email: z.string().email("Correo Inválido").min(1, "El correo es obligatorio"),
  phone: z
    .string()
    .regex(/^\d{9}$/, "El número de celular debe tener exactamente 9 dígitos"),
  role: RoleEnum,
  fecha_nacimiento: z.string().min(1, "La fecha de nacimiento es obligatoria"),
  password: z
    .string()
    .min(6, "La contraseña debe de tener al menos seis caracteres."),
  confirmPassword: z
    .string()
    .min(6, "La contraseña debe de tener al menos seis caracteres."),
});

// Campos exclusivos para cada rol
const pacienteSchema = baseSchema.extend({
  role: z.literal("paciente"), // Aseguramos que el valor de role sea siempre "paciente"
  talla: z
    .number()
    .positive("La talla debe ser un número positivo")
    .min(0, "La talla debe ser mayor a 0 cm"),
  peso: z
    .number()
    .positive("El peso debe ser un número positivo")
    .min(1, "El peso debe ser mayor a 1 gramo"),
});

const nutricionistaSchema = baseSchema.extend({
  role: z.literal("nutricionista"), // Aseguramos que el valor de role sea siempre "nutricionista"
  experiencia: z
    .number()
    .int("Los años de experiencia deben ser un número entero")
    .positive("Los años de experiencia deben ser positivos"),
});

// Validación condicional para las contraseñas
export const schema = z
  .discriminatedUnion("role", [pacienteSchema, nutricionistaSchema])
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas son diferentes",
    path: ["confirmPassword"],
  });

export type FormValues = z.infer<typeof schema>;

// Funciones de tipo de guardia
export const isPaciente = (
  data: FormValues
): data is z.infer<typeof pacienteSchema> => {
  return data.role === "paciente";
};

export const isNutricionista = (
  data: FormValues
): data is z.infer<typeof nutricionistaSchema> => {
  return data.role === "nutricionista";
};
