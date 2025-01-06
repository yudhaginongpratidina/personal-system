import AdminLayout from "@/components/layouts/AdminLayout"

import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input"
import TextArea from "@/components/ui/TextArea";

import { createProjectFormSchema, CreateProjectFormSchema } from "./projects.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import { IoCaretBackSharp } from "react-icons/io5";

import { toast } from 'react-toastify';
import toastConfig from "@/config/toast.config";

export default function ProjectCreate() {

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<CreateProjectFormSchema>({
        resolver: zodResolver(createProjectFormSchema)
    })

    const onSubmit = async (values: CreateProjectFormSchema) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_EXPRESS_URL}/projects`, {
                name: values.name,
                description: values.description,
                techstack: values.techstack,
                link_repository: values.link_repository
            })

            const { message }: any = await response.data
            toast.success(message, toastConfig as any)

            setTimeout(() => {
                navigate('/projects')
            }, 2000)
        } catch (error: any) {
            toast.error(error.response.data.message, toastConfig as any)
        }
    }

    const backPage = () => {
        window.history.back()
    }

    return (
        <AdminLayout>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full">
                    <h1 className="text-2xl font-semibold capitalize">create user</h1>
                    <h2 className="text-md font-medium text-gray-600">Create a new user</h2>
                </div>
                <div className="w-full flex items-center justify-start md:justify-end gap-2.5">
                    <button onClick={backPage} className="w-full md:w-fit px-6 py-1.5 border rounded-md flex items-center justify-center gap-2.5 bg-gray-950 hover:bg-gray-800 text-white duration-100">
                        <IoCaretBackSharp className="w-4 h-4" />
                        <span className="font-medium capitalize">back</span>
                    </button>
                </div>
            </div>
            <div className="w-full p-4 bg-white">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Form>
                        <Input
                            id="name"
                            label="Name"
                            type="text"
                            placeholder="Enter project name"
                            {...register("name")}
                            error={errors.name?.message}
                        />
                        <TextArea
                            id="description"
                            label="Description"
                            placeholder="Enter project description"
                            {...register("description")}
                            error={errors.description?.message}
                        />
                        <Input
                            id="techstack"
                            label="Techstack"
                            type="text"
                            placeholder="Enter project techstack"
                            {...register("techstack")}
                            error={errors.techstack?.message}
                        />
                        <Input
                            id="link_repository"
                            label="Link Repository"
                            type="text"
                            placeholder="Enter project link repository"
                            {...register("link_repository")}
                            error={errors.name?.message}
                        />
                        <button className="w-fit py-2.5 px-6 bg-black hover:bg-gray-800 text-white rounded-md">
                            Create
                        </button>
                    </Form>
                </form>
            </div>
        </AdminLayout>
    )
}