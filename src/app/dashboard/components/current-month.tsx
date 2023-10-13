import { Task } from "@/types/task";
import { GraphicCurrentMonth } from "./graphic-current-month";

interface CurrentMonthProps {
  documents: Task[];
}

export function CurrentMonth({ documents }: CurrentMonthProps) {
  const currentMonth = new Date().getMonth();

  const tasksForTheCurrentMonth = documents.filter(
    (task) => new Date(task.createdAt.toDate()).getMonth() === currentMonth
  );
  const tasksForTheCurrentMonthConcluded = tasksForTheCurrentMonth.filter(
    (task) => task.concluded
  );
  const tasksForTheCurrentMonthExpired = tasksForTheCurrentMonth.filter(
    (task) =>
      task.finishIn.toDate().getTime() < new Date().getTime() && !task.concluded
  );
  const tasksForTheCurrentMonthPending = tasksForTheCurrentMonth.filter(
    (task) => !task.concluded
  );

  return (
    <div className="flex flex-col items-center p-2 w-full">
      <div className="flex items-center flex-col gap-10 sm:gap-14 sm:flex-row">
        <div className="flex flex-col gap-8 w-max text-left">
          <p className="flex gap-8 items-center justify-between w-full">
            Tarefas <span>{tasksForTheCurrentMonth.length}</span>
          </p>
          <p className="flex gap-8 items-center justify-between w-full">
            Concluidas
            <span>{tasksForTheCurrentMonthConcluded.length}</span>
          </p>
          <p className="flex gap-8 items-center justify-between w-full">
            Expiradas
            <span>{tasksForTheCurrentMonthExpired.length}</span>
          </p>
          <p className="flex gap-8 items-center justify-between w-full">
            Não concluidas
            <span>{tasksForTheCurrentMonthPending.length}</span>
          </p>
        </div>
        <GraphicCurrentMonth documents={tasksForTheCurrentMonth} />
      </div>
    </div>
  );
}
