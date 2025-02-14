"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../ui/button";
import { ArrowUpDown, MoreHorizontal, PencilIcon } from "lucide-react";
import { BsFiletypeDoc } from "react-icons/bs";
import { formatDate } from "../../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import Link from "next/link";
import DeleteDoc from "./DeleteDoc";
import RenameDoc from "./RenameDoc";

type AllDocumentsColumnsDefType = {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  content: string | null;
};

export const AllDocumentsColumnsDef: ColumnDef<AllDocumentsColumnsDefType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Document Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name ?? "N/A";
      return <p className={"font-medium"}>{name}</p>;
    },
  },
  {
    accessorKey: "userId",
    header: "",
    cell: () => {
      return <BsFiletypeDoc className={"size-4 fill-blue-500"} />;
    },
  },
  {
    accessorKey: "id",
    header: "Type",
    cell: () => {
      return (
        <p className={"font-medium text-muted-foreground"}>{"Personal"}</p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt ?? new Date();
      return <p className={"font-medium"}>{formatDate(createdAt)}</p>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => {
      const updatedAt = row.original.updatedAt ?? new Date();
      return <p className={"font-medium"}>{formatDate(updatedAt)}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;

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
            <DropdownMenuItem className={"cursor-pointer"}>
              <Link
                href={`/dashboard/edit/${id}`}
                className={"flex items-center gap-3"}
              >
                <PencilIcon className={"size-3"} />
                Continue Editing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className={"cursor-pointer"}>
              <DeleteDoc docId={id} />
            </DropdownMenuItem>
            <DropdownMenuItem className={"cursor-pointer"}>
              <RenameDoc docId={id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
