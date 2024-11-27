import { z } from "zod";

export const HistorialMedicoSchema = z.object({
  nombreCompleto: z.string().min(1, "El nombre completo es obligatorio"),
  sexo: z
    .enum(["Femenino", "Masculino"])
    .refine((value) => !!value, { message: "Debe seleccionar un sexo" }),
  telefono: z
    .string()
    .regex(/^\d+$/, "El teléfono debe contener solo números")
    .min(9, "El teléfono debe tener al menos 9 dígitos"),
  fechaNacimiento: z.string().min(1, "La fecha de nacimiento es obligatoria"),
  ocupacion: z.string().min(1, "La ocupación es obligatoria"),
  proveedorSeguro: z.string().min(1, "El proveedor de seguro es obligatorio"),
  fechaExpiracion: z.string().min(1, "La fecha de expiración es obligatoria"),
  peso: z.preprocess(
    (value) => (value ? parseFloat(value as string) : undefined),
    z.number().positive("El peso debe ser mayor a 0")
  ),
  altura: z.preprocess(
    (value) => (value ? parseFloat(value as string) : undefined),
    z.number().positive("La altura debe ser mayor a 0")
  ),

  alergias: z.string().optional(),
  enfermedadesCronicas: z.string().optional(),
  enfermedadesAnteriores: z.array(z.string()).optional(),
  vacunas: z
    .array(
      z.object({
        tipo: z.string(),
        fecha: z.string(),
      })
    )
    .optional(),
  consumes: z.array(z.enum(["Tabaco", "Alcohol", "Drogas"])).optional(),
  medicamentosActuales: z.string().optional(),
  examenesRealizados: z
    .array(
      z.object({
        tipo: z.string(),
        fecha: z.string(),
      })
    )
    .optional(),
});

export type HistorialMedicoFormData = z.infer<typeof HistorialMedicoSchema>;
