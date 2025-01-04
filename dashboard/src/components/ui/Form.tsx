export default function Form({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`w-full flex flex-col gap-4 ${className}`}>
            {children}
        </div>
    )
}