// ICONS
import { ImMenu } from "react-icons/im";
import { FaMoon } from "react-icons/fa";

export default function NavbarAdmin({onClick}: {onClick: () => void}) {
    return (
        <nav className="w-full fixed top-0 z-10 select-none">
            <div className="w-full border-b bg-white">
                <div className="w-full container h-14 flex justify-between items-center">

                    {/* SIDE BAR BUTTON */}
                    <button  onClick={onClick}>
                        <ImMenu className="w-7 h-7" />
                    </button>

                    {/* DARK MODE & AUTH BUTTON */}
                    <div className="flex items-center gap-2.5">
                        <button>
                            <FaMoon className="w-5 h-5" />
                        </button>
                        <button className="px-3 py-1.5 border rounded-md font-medium bg-rose-500 hover:bg-rose-600 text-white duration-100">
                            Logout
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    )
}