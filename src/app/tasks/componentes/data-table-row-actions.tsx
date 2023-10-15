import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditDocument } from "@/hooks/useEditDocument";
import { Task } from "@/types/task";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { AlertDialogDeleteTask } from "./delete-tasks";
import { DialogEditTask } from "./edit-task";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const { editDocument } = useEditDocument("tasks");

  const task = row.original as Task;

  function handleConcluded() {
    const updatedData = {
      concluded: !row.getValue("concluded"),
      concludedAt: Timestamp.now(),
    };
    editDocument(task.id, updatedData);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex m-auto h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onSelect={() => handleConcluded()}>
            {task.concluded ? "Desmarcar" : "Concluir"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setOpenEdit(true)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setOpenDelete(true)}
            className="text-red-600"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogEditTask id={task.id} open={openEdit} setOpen={setOpenEdit} />
      <AlertDialogDeleteTask
        id={task.id}
        open={openDelete}
        setOpen={setOpenDelete}
      />
    </>
  );
}
