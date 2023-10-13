import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Task } from "@/types/task";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEditDocument } from "@/hooks/useEditDocument";
import { useFetchDocuments } from "@/hooks/useFetchDocuments";
import { zodResolver } from "@hookform/resolvers/zod";
import { Timestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TaskSchema, formSchema } from "../data/schema";

interface EditTaskProps {
  id: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function DialogEditTask({ id, open, setOpen }: EditTaskProps) {
  const { documents } = useFetchDocuments({
    docCollection: "tasks",
  });
  const { editDocument } = useEditDocument("tasks");

  const document = documents?.find((doc: Task) => doc.id === id);
  const finishInTimestamp = document?.finishIn?.toDate();
  let finishInString;
  if (finishInTimestamp) {
    finishInTimestamp.setHours(finishInTimestamp.getHours() - 3);
    finishInString = finishInTimestamp.toISOString().slice(0, 16);
  }

  const form = useForm<TaskSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: document?.title || "",
      description: document?.description || "",
      finishIn: finishInString || "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const dataUpdate = {
      title: data.title,
      description: data.description,
      finishIn: Timestamp.fromDate(new Date(data.finishIn)),
    };
    editDocument(id, dataUpdate);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
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
              <Button type="submit">Edit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
