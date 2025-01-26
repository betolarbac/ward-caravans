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
import { CaravansMemberProps } from "@/lib/validators";

import CaravansMemberDelete from "./deleteMemberCaravans";
import EditMemberCaravans from "./EditMemberCaravans";
import formatCPF from "./formatCpf";
import AuthEdit from "./authEdit";

type WardTabletProps = {
  data: CaravansMemberProps[];
};

export function WardTableUser({ data }: WardTabletProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [authEditUser, setAuthEditUser] = React.useState(false);

  React.useEffect(() => {
    async function fetchAuthEdit() {
      if (data.length > 0 && data[0].caravansId) {
        try {
          const { authEdit } = await AuthEdit(data[0].caravansId);
          setAuthEditUser(authEdit);
        } catch (error) {
          console.error("Erro", error);
        }
      }
    }
    fetchAuthEdit();
  }, [authEditUser, data]);

  const columns: ColumnDef<CaravansMemberProps>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
            <ArrowUpDown />
          </Button>
        );
      },

      cell: ({ row }) => (
        <div className="capitalize px-2 py-4">{row.getValue("name")}</div>
      ),
    },

    {
      accessorKey: "ward",
      header: "Ala",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("ward")}</div>
      ),
    },
    {
      accessorKey: "cpf",
      header: "CPF",
      cell: ({ row }) => (
        <div className="capitalize">{formatCPF(row.getValue("cpf"))}</div>
      ),
    },
    {
      accessorKey: "pay",
      header: () => <div className="">Valor</div>,
      cell: ({ row }) => {
        const pay = row.getValue("pay");

        if (pay === true) {
          return <div className="text-green-500">Pago</div>;
        }

        return <div className="text-red-500">Não</div>;
      },
    },
    {
      id: "delete",
      header: "Deletar",
      enableHiding: false,
      cell: ({ row }) => {
        const data = row.original;

        return authEditUser ? (
          <CaravansMemberDelete
            idMemberCaravans={data.id as string}
            name={data.name || ""}
          />
        ) : null;
      },
    },
    {
      id: "edit",
      header: "Editar",
      enableHiding: false,
      cell: ({ row }) => {
        const data = row.original;
        return authEditUser ? (
          <EditMemberCaravans
            id={data.id}
            caravansId={data.caravansId}
            name={data.name ?? ""}
            ward={data.ward}
            cpf={data.cpf}
            pay={data.pay}
          />
        ) : null;
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
          placeholder="Buscar CPF"
          value={(table.getColumn("cpf")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("cpf")?.setFilterValue(event.target.value)
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
