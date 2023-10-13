import { z } from "zod";

export const formSchema = z.object({
  title: z.string().nonempty("O título é obrigatório."),
  description: z.string().nonempty("A descrição é obrigatória."),
  finishIn: z
    .string()
    .nonempty("A data é obrigatória.")
    .refine((value) => {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      return selectedDate > currentDate;
    }, "A data precisa ser maior que a data atual."),
});

export type Task = z.infer<typeof formSchema>;
