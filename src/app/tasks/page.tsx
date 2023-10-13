"use client";

import { useFetchDocuments } from "@/hooks/useFetchDocuments";
import { columns } from "./componentes/columns";
import { DataTable } from "./componentes/data-table";

export default function Tasks() {
  const { documents } = useFetchDocuments({
    docCollection: "tasks",
  });

  return (
    <div className="w-full h-full flex flex-1 flex-col space-y-8 py-8 ">
      <DataTable data={documents} columns={columns} />
    </div>
  );
}
