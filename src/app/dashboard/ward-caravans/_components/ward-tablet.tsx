"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CaravansWardProps } from "@/lib/validators";
import CaravansDelete from "./DeleteCaravans";
import EditCaravans from "./EditCaravans";
import Link from "next/link";

type WardTabletProps = {
  data: CaravansWardProps[];
};

export function WardTablet({ data }: WardTabletProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<CaravansWardProps>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Caravana
            <ArrowUpDown />
          </Button>
        );
      },

      cell: ({ row }) => {
        const data = row.original;
        return (
          <Link href={`/dashboard/ward-caravans/${data.id}`}>
            <div className="font-medium py-4">{row.getValue("name")}</div>
          </Link>
        );
      },
    },

    {
      accessorKey: "ward",
      header: "Ala",
      cell: ({ row }) => {
        const ward = row.getValue("ward");

        return (
          <div className="capitalize">{(ward as { name: string }).name}</div>
        );
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const data = row.getValue("date");
        if (data instanceof Date) {
          return <div>{data.toLocaleDateString("pt-BR")}</div>;
        }
      },
    },
    {
      accessorKey: "vacancy",
      header: "Vagas",
      cell: ({ row }) => (
        <div className="capitalize">1/{row.getValue("vacancy")}</div>
      ),
    },
    {
      accessorKey: "active",
      header: "Ativar/Desativar",
      cell: ({ row }) => {
        const active = row.getValue("active");
        if (active === true) {
          return <div className="font-medium">Ativa</div>;
        }

        return <div className="font-medium">Desativada</div>;
      },
    },
    {
      accessorKey: "value",
      header: () => <div className="">Valor</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("value"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(amount);

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      id: "delete",
      header: "Deletar",
      enableHiding: false,
      cell: ({ row }) => {
        const data = row.original;
        return (
          <CaravansDelete name={data.name} idCaravans={data.id as string} />
        );
      },
    },
    {
      id: "edit",
      header: "Editar",
      enableHiding: false,
      cell: ({ row }) => {
        const data = row.original;
        return (
          <EditCaravans
            name={data.name}
            date={data.date}
            vacancy={data.vacancy}
            active={data.active}
            wardId={data.wardId}
            id={data.id}
            value={typeof data.value === "number" ? data.value : 0}
          />
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Nome da caravana"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem Caravanas cadastradas
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
