import { z } from "zod";

export const upsertProductSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, { message: "Nome do produto deve ter pelo menos 1 caractere" }),
  priceInCents: z
    .number()
    .min(0, { message: "Preço do produto deve ser maior que 0" }),
  description: z.string().min(1, {
    message: "Descrição do produto deve ter pelo menos 1 caractere",
  }),
  imageUrl: z.string().min(1, { message: "URL da imagem é obrigatória" }),
  menuCategoryId: z.string().min(1, {
    message: "Categoria do produto deve ter pelo menos 1 caractere",
  }),
  restaurantId: z.string().min(1, {
    message: "Restaurante do produto deve ter pelo menos 1 caractere",
  }),
});

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;
