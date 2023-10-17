"use client";

import { useFetchDocuments } from "@/hooks/useFetchDocuments";
import { Suspense } from "react";
import { columns } from "./componentes/columns";
import { DataTable } from "./componentes/data-table";

export default function Tasks() {
  const { documents, isFetching } = useFetchDocuments({
    docCollection: "tasks",
  });

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <p className="text-2xl">Carregando...</p>
        </div>
      }
    >
      {!isFetching && (
        <div className="w-full h-full flex flex-1 flex-col space-y-8 py-8 ">
          <DataTable columns={columns} data={documents} />
        </div>
      )}
    </Suspense>
  );
}
