import Input from "@/components/Input"
import AlertMessage from "@/components/AlertMessage";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema, RegisterFormSchema } from "./register.validator";

import axios from "axios";

export default function Register() {

    const [isError, setIsError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormSchema)
    })

    const onSubmit = async (values: RegisterFormSchema) => {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/register", {
                email: values.email,
                password: values.password,
                confirm_password: values.confirm_password
            })

            const { message } : any = await response.data

            setIsError(false)
            setMessage(message)
        } catch (error: any) {
            setIsError(true)
            setMessage(error.response.data.message)
        }
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-gray-50">
            <div className="w-full max-w-md p-4 border shadow-sm drop-shadow-sm bg-white">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                    {message && <AlertMessage type={isError ? "error" : "success"} message={message} />}
                    <Input id="email" label="E-Mail" type="email" placeholder="user@gmail.com" {...register("email")} error={errors.email?.message} />
                    <Input id="password" label="Password" type="password" placeholder="*****" {...register("password")} error={errors.password?.message} />
                    <Input id="confirm_password" label="Confirm Password" type="password" placeholder="*****" {...register("confirm_password")} error={errors.confirm_password?.message} />
                    <button id="btn-register" className="w-fit py-2.5 px-6 bg-black hover:bg-gray-800 text-white rounded-md">Register</button>
                </form>
            </div>
        </div>
    )
}