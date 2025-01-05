import React from "react";
import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string
    label?: string
    type: string
    error?: string
}


const Input = React.forwardRef<HTMLInputElement, InputProps>(({ id, label, type, error, ...props }, ref) => {

    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = (e: any) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }

    return (
        <div className="w-full flex flex-col gap-1">
            {label && <label htmlFor={id} className={`text-sm font-semibold capitalize ${error ? "text-red-500" : ""}`}>{label}</label>}

            {type === "password" && (
                <div className="w-full relative">
                    <input id={id} type={showPassword ? "text" : "password"} className={`w-full p-2.5 border border-gray-300 rounded-md outline-none focus:shadow-sm focus:border-gray-400 ${error ? "border-red-500 focus:border-red-600 text-red-500" : ""}`} {...props} ref={ref} />
                    <button onClick={handleShowPassword}  className="absolute top-1/2 right-3 -translate-y-1/2 text-sm font-semibold">show</button>
                </div>
            )}

            {type !== "password" && (
                <input id={id} type={type} className={`w-full p-2.5 border border-gray-300 rounded-md outline-none focus:shadow-sm focus:border-gray-400 ${error ? "border-red-500 focus:border-red-600 text-red-500" : ""}`}{...props} ref={ref} />
            )}

            {error && <span className="text-sm font-semibold text-red-500 ">{error}</span>}
        </div>
    )
})

export default Input