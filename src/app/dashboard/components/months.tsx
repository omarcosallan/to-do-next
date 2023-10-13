import { Task } from "@/types/task";
import { getMonthsTasksForLastYear } from "@/utils/tasks-by-month";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface GraphicProps {
  documents: Task[];
}

export function Months({ documents }: GraphicProps) {
  const { months, monthTasks } = getMonthsTasksForLastYear(documents, "2023");

  const data = months.map((month) => {
    return { name: month, total: monthTasks[month].length };
  });

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="#7C3AED"
          barSize={40}
          radius={[4, 4, 4, 4]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
