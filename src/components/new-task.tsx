import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/context/AuthContext";
import { useInsertDocument } from "@/hooks/useInsertDocument";
import { zodResolver } from "@hookform/resolvers/zod";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const formSchema = z.object({
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

export function DialogNewTask() {
  const [isOpenEditTask, setIsOpenEditTask] = useState(false);
  const { user } = useAuth();
  const { insertDocument } = useInsertDocument({
    docCollection: "tasks",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      finishIn: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    insertDocument({
      title: data.title,
      description: data.description,
      concludedAt: Timestamp.fromDate(new Date(data.finishIn)),
      finishIn: Timestamp.fromDate(new Date(data.finishIn)),
      createdBy: user?.uid,
      concluded: false,
    });
    setIsOpenEditTask(false);
  }

  return (
    <Dialog open={isOpenEditTask} onOpenChange={setIsOpenEditTask}>
      <DialogTrigger asChild>
        <Button className="lg:w-full" variant="default">
          Nova tarefa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova tarefa</DialogTitle>
          <DialogDescription>
            Organize suas tarefas com o To Do List.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título:</FormLabel>
                  <FormControl>
                    <Input placeholder="Título da tarefa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição:</FormLabel>
                  <FormControl>
                    <Input placeholder="Descreva sua atividade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="finishIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de vencimento:</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Criar tarefa</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
