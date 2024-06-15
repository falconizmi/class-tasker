"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Activity } from "@/models/activity";
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/shadcn/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu"
import { Badge } from "../shadcn/badge";
import { DataTableRowActions } from "./columns-row-actions";
import { Checkbox } from "@/components/shadcn/checkbox"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Activity>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: () => <div className="text-right">Date</div>,
    cell: ({ row }) => {
      const date: Date = row.getValue("date");

      return (
        <div>{date.toLocaleString()}</div>
      );
    },
  },
  {
    accessorKey: "activityType",
    header: "Activity type",
    cell: ({row}) => {
      return (<Badge>{row.getValue("activityType")}</Badge>)
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
