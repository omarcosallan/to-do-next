import { Task } from "@/types/task";
import { ColumnDef } from "@tanstack/react-table";
import { statuses } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div className="">{row.getValue("description")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          column={column}
          title="Created in"
        />
      );
    },
    cell: ({ row }) => {
      const createIn = row.getValue("createdAt").toDate().toLocaleString();
      const date = new Date(createIn.seconds * 1000);
      return <div className="flex items-center">{createIn}</div>;
    },
  },
  {
    accessorKey: "finishIn",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          column={column}
          title="Finish in"
        />
      );
    },
    cell: ({ row }) => {
      const createIn = row.getValue("finishIn").toDate().toLocaleString();
      const date = new Date(createIn.seconds * 1000);
      return <div className="flex items-center">{createIn}</div>;
    },
  },
  {
    accessorKey: "concluded",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          column={column}
          title="Status"
        />
      );
    },
    cell: ({ row }) => {
      const status = statuses.find((status) => {
        return status.value === row.getValue("concluded");
      });

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    header: ({ table }) => <span>{"Actions"}</span>,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
