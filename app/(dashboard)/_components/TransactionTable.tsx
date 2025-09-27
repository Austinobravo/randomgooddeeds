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
  MessageSquareHeartIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  MoveDownLeft,
  MoveUpRight,
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
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Transaction, TransactionType } from "@/lib/generated/prisma"

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

const columns: ColumnDef<Transaction>[] = [
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
            <div className="p-1  rounded-full">
                <MoveDownLeft color="red" className="size-4"/>
            </div>
            <h4>{row.original.type}</h4>
           </div>
           :
           <div className="flex gap-1 items-center">
            <div className=" p-1  rounded-full">
                <MoveUpRight color="green" className="size-4"/>
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
          {row.original.createdAt.toISOString()}
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
          {formatToNaira(row.original.amount)}
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
  data: Transaction[]
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
        {/* <h3 className="font-bold">Recent Transactions</h3> */}
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
                                             <Dialog >
                                                <DialogTrigger asChild>
                                                        <span className="block w-full h-full">
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </span>
                                                </DialogTrigger>
                                                <DialogContent className='overflow-auto sm:max-w-lg max-h-full no-scrollbar'>
                                                    <DialogHeader>
                                                    <DialogTitle>Transactions Details</DialogTitle>
                                                    <DialogDescription>
                                                        
                                                    </DialogDescription>
                                                    </DialogHeader>
                                                    <div className='space-y-10'>
                                                       <div className="flex border-y border-solid justify-between py-4">
                                                            <div>
                                                                <h3 className="font-semibold">20 June 2020 20:39 UTC + 1</h3>
                                                                <h4 className="text-gray-500 text-sm">Trans ID: 0Xddjdkhd83hhednd</h4>
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold">{formatToNaira(3000)}</h3>
                                                                <h4 className="text-sm text-amber-500">Pending</h4>
                                                            </div>
                                                       </div>
                                                       <div>
                                                        <h4 className="font-bold">Account Details</h4>
                                                       <div className="flex justify-between">
                                                            <div className="space-y-3">
                                                                <h3 className="text-gray-500 text-sm">Bank Name</h3>
                                                                <h4 className="text-gray-500 text-sm">Account Name</h4>
                                                                <h4 className="text-gray-500 text-sm">Account Number</h4>
                                                            </div>
                                                            <div className="space-y-3">
                                                                <h3 className="font-semibold">Access Bank</h3>
                                                                <h4 className="font-semibold">Austine Chukwuebuka Doe</h4>
                                                                <h4 className="font-semibold">0030493</h4>
                                                            </div>
                                                       </div>
                                                       <div className="flex justify-between items-center bg-violet-50 rounded-lg p-4">
                                                        <div>
                                                            <h3 className="font-bold ">Need Help?</h3>
                                                            <p className="text-gray-700 text-xs">If there is a problem with the transaction, make sure to contact support.</p>
                                                        </div>
                                                        <Button className="bg-violet-500 cursor-pointer text-white"><MessageSquareHeartIcon /> Support</Button>
                                                       </div>

                                                       </div>
                                                       <Button className="bg-blue-500 cursor-pointer text-white min-h-14 w-full">Print</Button>
                                                    </div>
                                                </DialogContent>
                                                </Dialog>
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


