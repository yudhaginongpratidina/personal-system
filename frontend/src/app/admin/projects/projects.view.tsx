import axios from "axios";
import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";


import AdminLayout from "@/components/layouts/AdminLayout"
import DataTable from "@/components/ui/DataTable";

import { FaTrashAlt } from "react-icons/fa";

import { toast } from 'react-toastify';
import toastConfig from "@/config/toast.config";

const delete_project_by_id = async (id: number) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_BACKEND_EXPRESS_URL}/projects/${id}`)
        const { message }: any = await response.data
        toast.success(message, toastConfig as any)
    } catch (error: any) {
        toast.error(error.response.data.message, toastConfig as any)
    }
}

export default function Projects(){

    const [projects, setProjects] = useState<TypeData[]>([])

    const get_all_projects = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_EXPRESS_URL}/projects`)
            const { data }: any = await response.data
            setProjects(data)
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        get_all_projects()
    }, [])

    return (
        <AdminLayout>
            <DataTable
                title="project management"
                description="List all projects"
                columns={columns}
                data={projects}
                search_by="name"
                create_link="/projects/create"
                delete_selected_endpoint="/projects/delete-many"
            />
        </AdminLayout>
    )
}

type TypeData = {
    id: number,
    name: string,
    link_repository: string
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
        accessorKey: "name",
        header: "Name",
        size: 160
    },
    {
        accessorKey: "link_repository",
        header: "Link Repository",
        size: 160
    },
    {
        accessorKey: "action",
        header: () => (<div className="flex items-center justify-center text-sm font-semibold"></div>),
        cell: ({ row }) => (
            <div className="flex items-center justify-center gap-2">
                <button onClick={() => delete_project_by_id(row.original.id)}>
                    <FaTrashAlt className="w-4 h-4 text-red-500" />
                </button>
            </div>
        ),
        size: 160
    }
]