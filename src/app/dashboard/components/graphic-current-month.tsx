import { Task } from "@/types/task";
import { categorizeTasks } from "@/utils/categorize-tasks";

import { Cell, Pie, PieChart } from "recharts";

interface GraphicCurrentMonthProps {
  documents: Task[];
}

export function GraphicCurrentMonth({ documents }: GraphicCurrentMonthProps) {
  const { concludedDocuments, noConcludedDocuments, expiredDocuments } =
    categorizeTasks(documents);

  const concluded = concludedDocuments.length;
  const noConcluded = noConcludedDocuments.length;
  const expired = expiredDocuments.length;

  const data = [
    { name: "Todas", value: documents.length },
    { name: "Concluidas", value: concluded },
    { name: "Expiradas", value: expired },
    { name: "Pendentes", value: noConcluded },
  ];
  const COLORS = ["#7C3AED", "#00C49F", "#7F1D1D", "#FFBB28"];

  return (
    <PieChart width={250} height={250}>
      <Pie data={data} innerRadius={60} outerRadius={100} dataKey="value">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
