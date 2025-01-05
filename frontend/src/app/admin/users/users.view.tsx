import axios from "axios";
import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";

import AdminLayout from "@/components/layouts/AdminLayout"
import DataTable from "@/components/ui/DataTable";

import { FaTrashAlt } from "react-icons/fa";

import { toast } from 'react-toastify';
import toastConfig from "@/config/toast.config";

const delete_user_by_id = async (id: number) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_BACKEND_EXPRESS_URL}/users/${id}`)
        const { message }: any = await response.data
        toast.success(message, toastConfig as any)
    } catch (error: any) {
        toast.error(error.response.data.message, toastConfig as any)
    }
}

export default function Users() {

    const [users, setUsers] = useState<TypeData[]>([])

    const get_all_users = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_EXPRESS_URL}/users`)
            const { data }: any = await response.data
            setUsers(data)
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        get_all_users()
    }, [])

    return (
        <AdminLayout>
            <DataTable
                title="user management"
                description="List all users"
                columns={columns}
                data={users}
                search_by="full_name"
                create_link="/users/create"
                delete_selected_endpoint="/users/delete-many"
            />
        </AdminLayout>
    )
}

type TypeData = {
    id: number,
    full_name: string,
    email: string,
    role: string
}

const columns: ColumnDef<TypeData>[] = [
    {
        id: "id",
        header: ({ table }) => (
            <input
                type="checkbox"
                checked={table.getIsAllPageRowsSelected()}
                onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
                aria-label="Select all"
                ref={(el) => {
                    if (el) {
                        el.indeterminate = table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected();
                    }
                }}
            />
        ),
        cell: ({ row }) => (
            <input
                type="checkbox"
                checked={row.getIsSelected()}
                onChange={(e) => row.toggleSelected(!!e.target.checked)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "no",
        header: () => (<div className="flex items-center justify-center text-sm font-semibold">No</div>),
        cell: (info) => { return (<div className="flex items-center justify-center text-sm font-semibold">{info.row.index + 1}</div>) },
        size: 10
    },
    { accessorKey: "full_name", header: "Full Name", size: 160 },
    { accessorKey: "email", header: "Email", size: 160 },
    {
        accessorKey: "role",
        header: "Role",
        size: 160,
        cell: ({ row }) => (
            <>
                {row.original.role === "guest" && <span className="rounded-md px-2 py-1 font-semibold bg-green-500 text-white">guest</span>}
                {row.original.role === "admin" && <span className="rounded-md px-2 py-1 font-semibold bg-red-500 text-white">admin</span>}
            </>
        )
    },
    {
        accessorKey: "action",
        header: () => (<div className="flex items-center justify-center text-sm font-semibold"></div>),
        cell: ({ row }) => (
            <div className="flex items-center justify-center gap-2">
                <button onClick={() => delete_user_by_id(row.original.id)}>
                    <FaTrashAlt className="w-4 h-4 text-red-500" />
                </button>
            </div>
        ),
        size: 160
    }
]