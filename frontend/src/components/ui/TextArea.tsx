import React from "react";

interface TextAreaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    id: string
    label?: string
    error?: string
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ id, label, error, ...props }, ref) => {
    return (
        <div className="w-full flex flex-col gap-1">
            {label && <label htmlFor={id} className={`text-sm font-semibold capitalize ${error ? "text-red-500" : ""}`}>{label}</label>}
            <textarea
                id={id}
                className={`w-full p-2.5 border border-gray-300 rounded-md outline-none focus:shadow-sm focus:border-gray-400 ${error ? "border-red-500 focus:border-red-600 text-red-500" : ""}`}{...props} ref={ref}
            />
            {error && <span className="text-sm font-semibold text-red-500 ">{error}</span>}
        </div>
    )
})

export default TextArea