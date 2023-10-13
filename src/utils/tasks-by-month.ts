import { Task } from "@/types/task";

interface TaskGroupedByMonth {
  monthTasks: { [month: string]: Task[] };
  months: string[];
}

export function getMonthsTasksForLastYear(
  tasks: Task[],
  year: string
): TaskGroupedByMonth {
  const monthFormatter = new Intl.DateTimeFormat("default", {
    month: "short",
  });
  const allMonths = Array.from({ length: 12 }, (_, i) =>
    monthFormatter.format(new Date(parseInt(year), i, 1))
  );

  const monthTasks: { [month: string]: Task[] } = Object.fromEntries(
    allMonths.map((month) => [month, []])
  );
  const months: string[] = allMonths;

  const yearInt = parseInt(year, 10);

  tasks.forEach((task) => {
    const createdAt = new Date(task.createdAt.seconds * 1000);

    if (createdAt.getFullYear() === yearInt) {
      const month = monthFormatter.format(createdAt);
      monthTasks[month].push(task);
    }

    allMonths.forEach((month) => {
      if (!monthTasks[month]) {
        monthTasks[month] = [];
        months.push(month);
      }
    });
  });

  return { monthTasks, months };
}
