// LIBS
import { useState } from "react"
import { ToastContainer } from 'react-toastify';

// PARTIALS
import NavbarAdmin from "@/components/partials/admin/NavbarAdmin"
import SidebarAdmin from "@/components/partials/admin/SidebarAdmin"

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false)

    return (
        <>
            <ToastContainer />
            <NavbarAdmin onClick={() => setIsOpenSidebar(!isOpenSidebar)} />
            <div className="w-full flex bg-gray-50">
                {isOpenSidebar && <SidebarAdmin onClick={() => setIsOpenSidebar(!isOpenSidebar)} />}
                <div className="w-full container min-h-screen py-16 flex flex-col gap-4">
                    {children}
                </div>
            </div>
        </>
    )
}