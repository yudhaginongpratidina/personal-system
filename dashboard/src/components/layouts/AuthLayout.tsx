import { ToastContainer } from 'react-toastify';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ToastContainer />
            <div className="w-full min-h-screen flex justify-center items-center bg-gray-50">
                <div className="w-full max-w-md p-4 border shadow-sm drop-shadow-sm bg-white">
                    {children}
                </div>
            </div>
        </>
    )
}