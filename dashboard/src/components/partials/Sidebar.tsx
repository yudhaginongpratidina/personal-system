import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";

export default function Sidebar({onClick}: {onClick: () => void}) {
    return (
        <aside className="w-72 min-w-72 max-w-72 fixed top-0 z-20 min-h-screen border-r bg-white">
            <div className="w-full h-16 flex items-center justify-end px-4 border-b">
                <button onClick={onClick} className="border border-black bg-black text-white p-1.5 rounded-md">
                    <HiOutlineMenuAlt1 className="w-7 h-7" />
                </button>
            </div>
            <div className="w-full py-1.5 px-4 flex flex-col gap-1.5">
                <div className="w-full rounded-md h-12 flex items-center gap-4 px-4 bg-indigo-100">
                    <FaHome className="w-5 h-5" />
                    <span className="font-medium">Dashboard</span>
                </div>
                <div className="w-full rounded-md h-12 flex items-center gap-4 px-4 hover:bg-gray-100">
                    <FaUsers className="w-5 h-5" />
                    <span className="font-medium">Users</span>
                </div>
                <div className="w-full rounded-md h-12 flex items-center gap-4 px-4 hover:bg-gray-100">
                    <FaFolder className="w-5 h-5" />
                    <span className="font-medium">Projects</span>
                </div>
            </div>
        </aside>
    )
}