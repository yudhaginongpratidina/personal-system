import AuthLayout from "@/components/layouts/AuthLayout";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema, RegisterFormSchema } from "./register.validator";
import axios from "axios";

import { toast } from 'react-toastify';
import toastConfig from "@/config/toast.config";

export default function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormSchema)
    })

    const onSubmit = async (values: RegisterFormSchema) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_EXPRESS_URL}/auth/register`, {
                email: values.email,
                password: values.password,
                confirm_password: values.confirm_password
            })

            const { message }: any = await response.data
            toast.success(message, toastConfig as any)
        } catch (error: any) {
            toast.error(error.response.data.message, toastConfig as any)
        }
    }

    return (
        <>
            <AuthLayout>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Form>
                        <Input id="email" label="E-Mail" type="email" placeholder="user@gmail.com" {...register("email")} error={errors.email?.message} />
                        <Input id="password" label="Password" type="password" placeholder="*****" {...register("password")} error={errors.password?.message} />
                        <Input id="confirm_password" label="Confirm Password" type="password" placeholder="*****" {...register("confirm_password")} error={errors.confirm_password?.message} />
                        <button className="w-fit py-2.5 px-6 bg-black hover:bg-gray-800 text-white rounded-md">Register</button>
                    </Form>
                </form>
            </AuthLayout>
        </>
    )
}