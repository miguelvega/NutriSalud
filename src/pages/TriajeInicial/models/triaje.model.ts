import { z } from "zod";

export const TriajeFormSchema = z.object({
  historialMedico: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", {
      message: "El historial médico debe ser un archivo PDF.",
    }),
  sintomas: z
    .string()
    .min(10, "Los síntomas deben tener al menos 10 caracteres.")
    .max(500, "Los síntomas no deben exceder 500 caracteres."),
  habitosAlimenticios: z
    .string()
    .min(10, "Los hábitos alimenticios deben tener al menos 10 caracteres.")
    .max(500, "Los hábitos alimenticios no deben exceder 500 caracteres."),
  alimentosFavoritos: z.string().optional(),
  alimentosNoTolerados: z.string().optional(),
  objetivos: z
    .array(
      z.enum(["perder_peso", "ganar_masa"]) // Valores permitidos
    )
    .optional(),
  objetivoOtro: z
    .string()
    .max(200, "El objetivo adicional no debe exceder 200 caracteres.")
    .optional(),
});

export type TriajeFormData = z.infer<typeof TriajeFormSchema>;
