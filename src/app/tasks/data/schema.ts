import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório." }),
  description: z.string().min(1, { message: "A descrição é obrigatória." }),
  finishIn: z.string().refine(
    (value) => {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      return selectedDate > currentDate;
    },
    { message: "A data precisa ser maior que a data atual." }
  ),
});

export type TaskSchema = z.infer<typeof formSchema>;
