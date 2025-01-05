import { useState } from "react";
import { Link } from "react-router-dom";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, ColumnFiltersState, getFilteredRowModel, } from "@tanstack/react-table";

import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import axios from "axios";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "./Table";
import { toast } from 'react-toastify';
import toastConfig from "@/config/toast.config";

interface TableProps<TData, TValue> {
    title: string
    description: string
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    search_by: string
    create_link: string,
    delete_selected_endpoint: string
}

export default function DataTable<TData, TValue>({ title, description, columns, data, search_by, create_link, delete_selected_endpoint }: TableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),                 // CORE
        getPaginationRowModel: getPaginationRowModel(),     // PAGINATION
        onColumnFiltersChange: setColumnFilters,            // COLUMN FILTER
        getFilteredRowModel: getFilteredRowModel(),         // FILTER
        onRowSelectionChange: setRowSelection,              // ROW SELECTION

        state: {
            columnFilters,  // COLUMN FILTER STATE
            rowSelection,   // ROW SELECTION
        },

        defaultColumn: {
            size: 0,
        },
    });

    const deleteSelected = async (e: any) => {
        e.preventDefault()
        try {
            const selectedRows = table.getSelectedRowModel().rows.map(row => (row.original as any).id)
            const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_EXPRESS_URL}${delete_selected_endpoint}`, {
                ids: selectedRows
            })

            const { message }: any = await response.data
            toast.success(message, toastConfig as any)
        } catch (error: any) {
            toast.error(error.response.data.message, toastConfig as any)
        }
    }

    return (
        <>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full">
                    <h1 className="text-2xl font-semibold capitalize">{title}</h1>
                    <h2 className="text-md font-medium text-gray-600">{description}</h2>
                </div>
                <div className="w-full flex items-center justify-start md:justify-end gap-2.5">
                    <button onClick={deleteSelected} className="w-full md:w-fit px-6 py-1.5 border rounded-md flex items-center justify-center gap-2.5 bg-red-500 hover:bg-red-600 text-white duration-100">
                        <FaRegTrashAlt className="w-4 h-4" />
                        <span className="font-medium capitalize">delete selected</span>
                    </button>
                    <Link to={create_link} className="w-full md:w-fit px-4 py-1.5 border rounded-md flex items-center justify-center gap-2.5 bg-gray-950 hover:bg-gray-800 text-white duration-100">
                        <FaPlus className="w-4 h-4" />
                        <span className="font-medium capitalize">add new</span>
                    </Link>
                </div>
            </div>
            <div className="w-full p-4 border rounded-md flex flex-col gap-4 bg-white">
                <div className="w-full flex justify-end items-center gap-1.5">
                    <input
                        type="text"
                        placeholder={`Search ....`}
                        value={(table.getColumn(`${search_by}`)?.getFilterValue() as string) ?? ""}
                        onChange={(event) => table.getColumn(`${search_by}`)?.setFilterValue(event.target.value)}
                        className="w-full max-w-xs p-1.5 border border-gray-300 rounded-sm outline-none focus:shadow-sm focus:border-gray-400"
                    />
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
                    <div className="w-full flex items-center justify-between">
                        <div className="flex gap-2 text sm font-medium">
                            {table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div>
                        <div className="flex items-center gap-2 py-2.5">
                            <button
                                className={`${table.getState().pagination.pageIndex === 0 ? "border rounded-md bg-gray-800 text-white py-1 px-3 cursor-not-allowed" : "border rounded-md hover:bg-gray-800 bg-black text-white py-1.5 px-4"}`}
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >{"<"}</button>
                            {table.getState().pagination.pageIndex > 0 && (
                                <button
                                    className="border rounded-md bg-black hover:bg-gray-800 text-white py-1 px-3"
                                    onClick={() => table.setPageIndex(0)}
                                >1</button>
                            )}
                            <button
                                className="border rounded-md bg-black hover:bg-gray-800 text-white py-1 px-3"
                                onClick={() => table.setPageIndex(table.getState().pagination.pageIndex)}
                            >{table.getState().pagination.pageIndex + 1}</button>
                            {table.getState().pagination.pageIndex < table.getPageCount() - 1 && (
                                <button
                                    className="border rounded-md bg-black text-white py-1 px-3"
                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                >{table.getPageCount()}</button>
                            )}
                            <button
                                className={`${table.getState().pagination.pageIndex === table.getPageCount() - 1 ? "border rounded-md bg-gray-800 text-white py-1 px-3 cursor-not-allowed" : "border rounded-md bg-black hover:bg-gray-800 text-white py-1.5 px-4 "}`}
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >{">"}</button>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}