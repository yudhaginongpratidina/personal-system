import AuthLayout from "@/components/layouts/AuthLayout";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input"

import { loginFormSchema, LoginFormSchema } from "./login.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { toast } from 'react-toastify';
import toastConfig from "@/helpers/toast-config";

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema)
    })

    const onSubmit = async (values: LoginFormSchema) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_EXPRESS_URL}/auth/login`, {
                email: values.email,
                password: values.password
            })

            const { message }: any = await response.data
            toast.success(message, toastConfig as any)
        } catch (error: any) {
            toast.error(error.response.data.message, toastConfig as any)
        }
    }

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Form>
                    <Input id="email" label="E-Mail" type="email" placeholder="user@gmail.com" {...register("email")} error={errors.email?.message} />
                    <Input id="password" label="Password" type="password" placeholder="*****" {...register("password")} error={errors.password?.message} />
                    <button className="w-fit py-2.5 px-6 bg-black hover:bg-gray-800 text-white rounded-md">Login</button>
                </Form>
            </form>
        </AuthLayout>
    )
}