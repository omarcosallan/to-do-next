import { Task } from "@/types/task";
import { categorizeTasks } from "@/utils/categorize-tasks";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface GraphicProps {
  documents: Task[];
}

export function Overview({ documents }: GraphicProps) {
  const { concludedDocuments, noConcludedDocuments, expiredDocuments } =
    categorizeTasks(documents);

  const totalDocuments = documents.length;
  const totalDocumentsPercentage =
    totalDocuments > 0
      ? Math.floor((documents?.length / totalDocuments) * 100)
      : "0";
  const concludedPercentage =
    totalDocuments > 0
      ? Math.floor((concludedDocuments?.length / totalDocuments) * 100)
      : "0";
  const expiredPercentage =
    totalDocuments > 0
      ? Math.floor((expiredDocuments?.length / totalDocuments) * 100)
      : "0";
  const pendingPercentage =
    totalDocuments > 0
      ? Math.floor((noConcludedDocuments?.length / totalDocuments) * 100)
      : "0";

  const data = [
    {
      name: "Todas",
      total: totalDocumentsPercentage,
    },
    {
      name: "Concluidas",
      total: concludedPercentage,
    },
    {
      name: "Expiradas",
      total: expiredPercentage,
    },
    {
      name: "Pendentes",
      total: pendingPercentage,
    },
  ];

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
          tickFormatter={(value) => `${value}%`}
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
