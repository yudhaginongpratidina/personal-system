import { BsFillInfoSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

type MetricCardProps = {
    name: string;
    icon: React.ReactNode;
    count: number;
    link: string;
};

export default function MetricCard({name, icon, count, link}: MetricCardProps) {

    const formattedCount = new Intl.NumberFormat().format(count);

    return (
        <div className="w-full border rounded-md p-4 bg-white">
            <div className="w-full h-[30px] flex items-center justify-between">
                <span className="font-semibold capitalize text-gray-600">{name}</span>
                <div className="w-fit p-2.5 rounded-md bg-indigo-300">
                    { icon }
                </div>
            </div>
            <div className="w-full h-[60px] flex items-center">
                <h1 className="text-3xl font-bold">{formattedCount}</h1>
            </div>
            <Link to={link} className="w-full p-1.5 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-600">View all</span>
                <BsFillInfoSquareFill className="w-5 h-5" />
            </Link>
        </div>
    )
}