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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Activity>[] = [
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
    id: "actions",
    cell: ({ row }) => {
      const activity = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(activity.id)} // TODO change this to edit activity
            >
              Edit Activity
            </DropdownMenuItem>
            <DropdownMenuItem>Delete Activity</DropdownMenuItem> {/* TODO change this to delete activity */}
            <DropdownMenuItem>Mark Activity Done</DropdownMenuItem> {/* TODO not sure about this but keep like this for now */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];
