import { z } from "zod";

export const appointmentSchema = z.object({
  nutritionist: z.string().min(1, "Debes seleccionar un nutricionista"),
  appointmentType: z.enum(["Seguimiento", "Primera visita"]),
  date: z.string().min(1, "La fecha es obligatoria"),
  time: z.string().min(1, "La hora es obligatoria"),
  report: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", {
      message: "El reporte debe ser un archivo PDF",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "El archivo no debe superar los 5 MB",
    }),
});

export type FormValues = z.infer<typeof appointmentSchema>;
