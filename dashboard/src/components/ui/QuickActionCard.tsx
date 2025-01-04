type QuickActionCardProps = {
    icon : React.ReactNode
    name : string
}

export default function QuickActionCard({icon, name}: QuickActionCardProps) {
    return (
        <div className="w-full h-[110px] rounded-md flex flex-col items-center justify-center gap-2.5 bg-gray-100 hover:bg-gray-200 duration-100 cursor-pointer">
            { icon }
            <span className="font-semibold capitalize">{ name }</span>
        </div>
    )
}