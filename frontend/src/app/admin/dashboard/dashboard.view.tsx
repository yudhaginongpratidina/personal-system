import AdminLayout from "@/components/layouts/AdminLayout"
import MetricCard from "@/components/admins/MetricCard"

import FinanceOverview from "@/components/admins/FinanceOverview";

import { TbMoneybag } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";

export default function Dashboard() {
    return (
        <AdminLayout>

            {/* METRICS */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard name="total balance (IDR)" icon={<TbMoneybag className="w-4 h-4" />} count={10000} link="/" />
                <MetricCard name="total user" icon={<FaUsers className="w-4 h-4" />} count={100} link="/users" />
                <MetricCard name="total project" icon={<GoProjectRoadmap className="w-4 h-4" />} count={20} link="/" />
                <MetricCard name="total project" icon={<GoProjectRoadmap className="w-4 h-4" />} count={20} link="/" />
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="w-full p-4 bg-white">
                    <h1 className="text-xl font-semibold">Balance Overview</h1>
                    <FinanceOverview />
                </div>
                <div className="w-full p-4 bg-white">
                    <h1 className="text-xl font-semibold">Balance Overview</h1>
                    <FinanceOverview />
                </div>
            </div>

        </AdminLayout>
    )
}