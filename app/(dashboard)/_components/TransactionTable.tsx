"use client"

import * as React from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  CheckCircle2Icon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ColumnsIcon,
  GripVerticalIcon,
  ListFilterIcon,
  LoaderIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  PlusIcon,
  TrendingDown,
  TrendingUp,
  TrendingUpIcon,
} from "lucide-react"

import { z } from "zod"


import { Button } from "@/components/ui/button"

import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn, formatToNaira } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
// import { useIsMobile } from "@/hooks/useIsMobile"

export const schema = z.object({
  id: z.number(),
  guest: z.string(),
  date: z.string(),
  check_out: z.string(),
  booked: z.string(),
  type: z.string(),
  status: z.string(),
  total: z.string(),
//   reviewer: z.string(),
})


// export const schema = z.object({
//     id: z.number(),
//     header: z.string(),
//     type: z.string(),
//     status: z.string(),
//     target: z.string(),
//     limit: z.string(),
//     reviewer: z.string(),
//   })

// Create a separate component for the drag handle

const columns: ColumnDef<z.infer<typeof schema>>[] = [
//   {
//     id: "drag",
//     header: () => null,
//     cell: ({ row }) => <DragHandle id={row.original.id} />,
//   },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
//   {
//     accessorKey: "apartment",
//     header: "Apartment",
//     cell: ({ row }) => {
//       return <TableCellViewer item={row.original} />
//     },
//     enableHiding: false,
//   },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return  <div className="w-32 font-lato">
        <div className='flex items-center gap-2'>
           {row.original.type.toLowerCase() === "withdraw" ?
           <div className="flex gap-1 items-center">
            <div className="border-red-600 border border-solid p-1  rounded-full">
                <TrendingDown color="red" className="size-4"/>
            </div>
            <h4>{row.original.type}</h4>
           </div>
           :
           <div className="flex gap-1 items-center">
            <div className="border-green-600 border border-solid p-1  rounded-full">
                <TrendingUp color="green" className="size-4"/>
            </div>
            <h4>{row.original.type}</h4>
           </div>
           }
        </div>
      </div>
    },
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="w-32 font-lato">
        <span>
          {row.original.date}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: "Amount",
    cell: ({ row }) => (
      <div className="w-32 font-lato">
        <span>
          {formatToNaira(row.original.total)}
        </span>
      </div>
    ),
  },

   {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
        <div>
            {row.original.status.toLowerCase() === "completed" &&
            <div className="flex gap-1 items-center">
                    <span className="bg-green-500 rounded-full size-2"></span>
                    <h3>{row.original.status}</h3>
                </div>
            }
            {row.original.status.toLowerCase() === "pending" &&
            <div className="flex gap-1 items-center">
                    <span className="bg-amber-500 rounded-full size-2"></span>
                    <h3>{row.original.status}</h3>
                </div>
            }
            {row.original.status.toLowerCase() === "failed" &&
            <div className="flex gap-1 items-center">
                    <span className="bg-red-500 rounded-full size-2"></span>
                    <h3>{row.original.status}</h3>
                </div>
            }

        </div>
    ),
  },
//   {
//     id: "actions",
//     cell: () => (
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="ghost"
//             className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
//             size="icon"
//           >
//             <MoreHorizontalIcon />
//             <span className="sr-only">Open menu</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end" className="w-32 font-lato">
//           <DropdownMenuItem>View</DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem>Archive</DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem>Preview</DropdownMenuItem>
//           {/* <DropdownMenuSeparator />
//           <DropdownMenuItem>Delete</DropdownMenuItem> */}
//         </DropdownMenuContent>
//       </DropdownMenu>
//     ),
//   },
]



export default function TransactionTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[]
}) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })




  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

 
  return (
    <div
      className="flex w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center lg:flex-nowrap flex-wrap gap-3 justify-between ">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>

      </div>
      <div
        className="relative flex flex-col gap-4 overflow-auto"
      >
        {/* <div className="overflow-hidden rounded-lg">
        </div> */}
            <Table className="border-separate border-spacing-y-4 table-auto no-scrollbar">
              <TableHeader className="sticky top-0 z-10 bg-[#EDEFF5] rounded-2xl ">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
        
                <TableBody>
                                  {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row, index) => (
                                      <TableRow
                                        key={row.id}
                                        className={cn(
                                          "bg-white shadow rounded-2xl overflow-hidden border border-[#F1F1F1] hover:bg-gray-100 cursor-pointer",
                                          index === 0 && "mt-4",
                                          "my-4"
                                        )}
                                      >
                                        {row.getVisibleCells().map((cell) => (
                                          <TableCell
                                            key={cell.id}
                                            className="px-4 py-3 align-middle font-lato first:rounded-l-2xl last:rounded-r-2xl"
                                          >
                                            <Link href={`/users/${row.id}`} className="block w-full h-full">
                                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </Link>
                                          </TableCell>
                                        ))}
                                      </TableRow>

                                    ))
                                  ) : (
                                    <TableRow>
                                      <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </TableBody>

            </Table>
        <div className="flex items-center justify-between px-4 no-scrollbar">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 shadow w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


