import { Label } from "recharts"
import { z } from "zod"
export const docSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.string(),
  vehicle: z.string(),
})

export type Document = z.infer<typeof docSchema>