import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Navbar from '@/components/partials/Navbar';
import Sidebar from '@/components/partials/Sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <ToastContainer />
            <div className='w-full flex'>
                { sidebarOpen && <Sidebar onClick={() => setSidebarOpen(!sidebarOpen)} /> }
                <div className='w-full'>
                    <Navbar onClick={() => setSidebarOpen(!sidebarOpen)} />
                    <div className='w-full bg-gray-100'>
                        <main className='w-full container min-h-screen flex flex-col gap-4 px-4 pt-20 pb-6'>
                            { children }
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}