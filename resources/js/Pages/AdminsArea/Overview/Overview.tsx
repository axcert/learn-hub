import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { LuView } from "react-icons/lu";
import Card from "@/Components/Card/Card";
import { log } from "console";
import SearchBar from "@/Components/SearchBar/SearchBar";

export default function Overview({
    auth,
    studentCount,
    teacherCount,
}: PageProps) {
    const search = () => {
        console.log("overview Search");
    };


    const accept = () =>{
        console.log("accept");
    }

    const decline = () =>{
        console.log("decline");
    }


    return (
        <AdminLayout user={auth.user}>
            <Head title="Overview" />
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-4">
                    {/* Card */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="p-6 text-gray-900 flex justify-around flex-wrap items-center gap-5">
                            <Card className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow" title={"Total Users"}>
                                {studentCount + teacherCount}
                            </Card>

                            <Card className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow"  title={"Students"}>{studentCount}</Card>

                            <Card className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow"  title={"Teachers"}>{teacherCount}</Card>
                        </div>
                    </div>

                    {/* search */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="p-3 text-gray-900">
                            <SearchBar title={"Overview"} onClick={search} />
                        </div>
                    </div>

                    {/* table */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="p-6 text-gray-900">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Service ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Offered by
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Hourly rate
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                State
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 ">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                            >
                                                55478
                                            </th>
                                            <td className="px-6 py-4">
                                                java Basic
                                            </td>
                                            <td className="px-6 py-4">t7784</td>
                                            <td className="px-6 py-4">
                                                Rs.500
                                            </td>
                                            <td className="px-6 py-4 flex gap-4">
                                                <button
                                                    className="font-sm text-white bg-blue-600 py-1 px-3 rounded-md hover:bg-blue-800"
                                                    onClick={accept}
                                                >
                                                    Accept
                                                </button>

                                                <button
                                                    className="font-sm text-white bg-indigo-900 py-1 px-3 rounded-md hover:bg-indigo-950"
                                                    onClick={decline}
                                                >
                                                    Decline
                                                </button>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
