import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useInsertDocument } from "@/hooks/useInsertDocument";
import { zodResolver } from "@hookform/resolvers/zod";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TaskSchema, formSchema } from "../data/schema";

export function DialogNewTask() {
  const [open, setOpen] = useState(false);

  const { user } = useAuth();
  const { insertDocument } = useInsertDocument({
    docCollection: "tasks",
  });

  const form = useForm<TaskSchema>({
    resolver: zodResolver(formSchema),
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
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full max-w-[250px] sm:max-w-none sm:w-fit">
          New task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>New task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title:</FormLabel>
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
                  <FormLabel>Description:</FormLabel>
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
                  <FormLabel>Due date:</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
