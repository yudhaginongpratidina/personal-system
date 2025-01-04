import MainLayout from "@/components/layouts/MainLayout"
import MetricCard from "@/components/ui/MetricCard"
import QuickActionCard from "@/components/ui/QuickActionCard"

import { TbMoneybag } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { FaMessage } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { IoHelpCircle } from "react-icons/io5";

import FinanceOverview from "@/components/charts/FinanceOverview";

export default function Dashboard() {
    return (
        <MainLayout>

            {/* METRICS */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard name="balance (IDR)" icon={<TbMoneybag className="w-4 h-4" />} count={10000} link="/" />
                <MetricCard name="active users" icon={<FaUsers className="w-4 h-4" />} count={100} link="/" />
                <MetricCard name="total project" icon={<GoProjectRoadmap className="w-4 h-4" />} count={20} link="/" />
                <MetricCard name="new messages" icon={<FaMessage className="w-4 h-4" />} count={30} link="/" />
            </div>

            {/* QUICK ACTIONS */}
            <div className="w-full p-4 flex flex-col gap-4 rounded-md bg-white">
                <h1 className="text-xl font-semibold">Quick Actions</h1>
                <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <QuickActionCard icon={<FaPlus className="w-6 h-6" />} name="new project" />
                    <QuickActionCard icon={<FaUserPlus className="w-6 h-6" />} name="add user" />
                    <QuickActionCard icon={<MdSettings className="w-6 h-6" />} name="settings" />
                    <QuickActionCard icon={<IoHelpCircle className="w-6 h-6" />} name="help" />
                </div>
            </div>

            {/* FINANCE AND PROFILE */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full p-4 flex flex-col gap-4 rounded-md bg-white">
                    <h1 className="text-xl font-semibold">Finance Overview</h1>
                    <FinanceOverview />
                </div>
                <div className="w-full p-4 flex flex-col gap-4 rounded-md bg-white">
                    <h1 className="text-xl font-semibold">Your Profile</h1>
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex flex-col items-center justify-center gap-2">
                            <div className="w-[150px] h-[150px] rounded-md bg-gray-100"/>
                            <h1 className="text-lg font-semibold">John Doe</h1>
                            <h2 className="text-sm font-semibold text-gray-600">Admin</h2>
                        </div>
                        <hr />
                        <div className="w-full h-full flex flex-col gap-2">
                            <div className="w-full container flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-600">E-Mail</span>
                                <span className="text-sm font-semibold">user@gmail.com</span>
                            </div>
                            <div className="w-full container flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-600">Phone</span>
                                <span className="text-sm font-semibold">-</span>
                            </div>
                            <div className="w-full container flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-600">Location</span>
                                <span className="text-sm font-semibold">Indonesia</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </MainLayout>
    )
}