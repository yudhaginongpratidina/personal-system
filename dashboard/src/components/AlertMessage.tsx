type AlertMessageProps = {
    type : "success" | "error"
    message : string
}

export default function AlertMessage(props : AlertMessageProps) {
    
    const { type, message } = props

    return (
        <div className={`w-full p-2.5 border rounded-md ${type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-yellow-500"} text-white`}>
            <span className="font-medium">
                {message}
            </span>
        </div>
    )
}