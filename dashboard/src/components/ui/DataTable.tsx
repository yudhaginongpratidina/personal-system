import { useState } from "react";
import { Link } from "react-router-dom";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, ColumnFiltersState, getFilteredRowModel, } from "@tanstack/react-table";


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "./Table";

interface TableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    search: string
    create_link: string
}

export default function DataTable<TData, TValue>({ columns, data, search, create_link }: TableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),                 // CORE
        getPaginationRowModel: getPaginationRowModel(),     // PAGINATION
        onColumnFiltersChange: setColumnFilters,            // COLUMN FILTER
        getFilteredRowModel: getFilteredRowModel(),         // FILTER

        state: {
            columnFilters,  // COLUMN FILTER STATE
        },

        defaultColumn: {
            size: 0,
        },
    });
    return (
        <>
            <div className="w-full p-4 border rounded-md flex flex-col gap-4 bg-white">
                <div className="w-full flex justify-end items-center gap-1.5">
                    <input 
                        type="text" 
                        placeholder={`Search ....`}
                        value={(table.getColumn(`${search}`)?.getFilterValue() as string) ?? ""}
                        onChange={(event) => table.getColumn(`${search}`)?.setFilterValue(event.target.value)}
                        className="w-full max-w-xs p-1.5 border border-gray-300 rounded-md outline-none focus:shadow-sm focus:border-gray-400" 
                    />
                    <Link to={create_link} className="px-4 py-1.5 border rounded-md border-black bg-black text-white hover:bg-slate-800 duration-100">Create</Link>
                    <button className="px-4 py-1.5 border rounded-md border-red-500 bg-red-500 hover:bg-red-600 text-white duration-100">Back</button>
                </div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())
                                        }
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            <div style={{ width: `${cell.column.getSize()}px` }} />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center"> No results.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {table.getPageCount() >= 1 && (
                    <div className="flex items-center gap-2 py-2.5">
                        <button
                            className={`${table.getState().pagination.pageIndex === 0 ? "border rounded-md bg-gray-800 text-white py-1.5 px-4 cursor-not-allowed" : "border rounded-md hover:bg-gray-800 bg-black text-white py-1.5 px-4"}`}
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >Previous</button>
                        {table.getState().pagination.pageIndex > 0 && (
                            <button
                                className="border rounded-md bg-black hover:bg-gray-800 text-white py-1.5 px-4"
                                onClick={() => table.setPageIndex(0)}
                            >1</button>
                        )}
                        <button
                            className="border rounded-md bg-black hover:bg-gray-800 text-white py-1.5 px-4"
                            onClick={() => table.setPageIndex(table.getState().pagination.pageIndex)}
                        >{table.getState().pagination.pageIndex + 1}</button>
                        {table.getState().pagination.pageIndex < table.getPageCount() - 1 && (
                            <button
                                className="border rounded-md bg-black text-white py-1.5 px-4"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            >{table.getPageCount()}</button>
                        )}
                        <button
                            className={`${table.getState().pagination.pageIndex === table.getPageCount() - 1 ? "border rounded-md bg-gray-800 text-white py-1.5 px-4 cursor-not-allowed" : "border rounded-md bg-black hover:bg-gray-800 text-white py-1.5 px-4 "}`}
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >Next</button>
                    </div>
                )}
            </div>

        </>
    )
}