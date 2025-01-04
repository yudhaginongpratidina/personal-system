import { HiOutlineMenuAlt1 } from "react-icons/hi";

export default function Navbar({onClick}: {onClick: () => void}) {
    return (
        <nav className="w-full fixed top-0 z-10 bg-white">            
            <div className="w-full container h-16 flex items-center justify-between gaps-2 px-4">
                <button onClick={onClick} className="border border-black bg-black text-white p-1.5 rounded-md">
                    <HiOutlineMenuAlt1 className="w-7 h-7" />
                </button>
                <div className="w-fit flex items-center gap-4">
                    <input
                        type="search"
                        placeholder="Search..."
                        className="w-full max-w-sm py-2 px-6 border border-gray-300 rounded-md outline-none focus:shadow-sm focus:border-gray-400 duration-100"
                    />
                    <button className="border border-red-500 bg-red-500 hover:bg-red-600 duration-100 text-white py-2 px-6 rounded-md">LogOut</button>
                </div>
            </div>
        </nav>
    )
}