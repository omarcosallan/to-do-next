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
    <div className="flex flex-col items-center p-2">
      {tasksForTheCurrentMonth.length <= 0 ? (
        <>
          <div>
            <p>Você ainda não criou tarefas este mês.</p>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center flex-col gap-4">
            <GraphicCurrentMonth documents={tasksForTheCurrentMonth} />
            <div className="flex justify-center text-xs flex-wrap gap-4">
              <p className="flex items-center gap-2">
                Tarefas <span>{tasksForTheCurrentMonth.length}</span>
              </p>
              <p className="flex items-center gap-2">
                Concluidas
                <span>{tasksForTheCurrentMonthConcluded.length}</span>
              </p>
              <p className="flex items-center gap-2">
                Expiradas
                <span>{tasksForTheCurrentMonthExpired.length}</span>
              </p>
              <p className="flex items-center gap-2">
                Não concluidas
                <span>{tasksForTheCurrentMonthPending.length}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
