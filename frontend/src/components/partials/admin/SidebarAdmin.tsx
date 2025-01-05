// ICONS
import { FaFire } from "react-icons/fa6";
import { ImMenu } from "react-icons/im";

export default function SidebarAdmin({onClick}: {onClick: () => void}) {
    return (
        <div className="w-full fixed top-0 z-10 max-w-xs min-h-screen border-r bg-white">

            {/* BRAND */}
            <div className="w-full h-14 px-4 border-b flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                    <FaFire className="w-7 h-7 text-rose-500" />
                    <h1 className="text-lg font-bold">ADMIN</h1>
                </div>
                <button onClick={onClick}>
                    <ImMenu className="w-7 h-7" />
                </button>
            </div>

        </div>
    )
}