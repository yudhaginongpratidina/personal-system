import { Link, useLocation } from "react-router-dom";

import { FaFire } from "react-icons/fa6";
import { ImMenu } from "react-icons/im";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { GoProject } from "react-icons/go";

export default function SidebarAdmin({ onClick }: { onClick: () => void }) {
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

            {/* LINKS */}
            <div className="w-full p-4 flex flex-col gap-2.5">
                <ButtonLink 
                    name="dashboard" 
                    to="/dashboard"
                    icon={<MdSpaceDashboard className="w-5 h-5" />}
                />
                <ButtonLink 
                    name="users management" 
                    to="/users"
                    icon={<FaUsers className="w-5 h-5" />}
                />
                <ButtonLink 
                    name="project management" 
                    to="/projects"
                    icon={<GoProject className="w-5 h-5" />}
                />
            </div>


        </div>
    )
}

const ButtonLink = ({ name, to, icon }: { name: string, to: string, icon: React.ReactNode }) => {

    const location = useLocation();
    const active = location.pathname;

    return (
        <Link to={to}>
            <button className={`w-full py-1.5 px-4 border border-transparent hover:rounded-md flex items-center gap-2.5 hover:bg-purple-200 ${active === to ? "bg-purple-500 hover:bg-purple-600 text-white rounded-md" : ""}`}>
                {icon}
                <span className="capitalize font-semibold">{name}</span>
            </button>
        </Link>
    )
}