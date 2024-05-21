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

const search = () =>{
    console.log("overview Search");
}


    return (
        <AdminLayout user={auth.user}>
            <Head title="Overview" />
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-4">
                    {/* Card */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="p-6 text-gray-900 flex justify-around flex-wrap items-center gap-5">
                            <Card title={"Total Users"}>
                                {studentCount + teacherCount}
                            </Card>

                            <Card title={"Students"}>{studentCount}</Card>

                            <Card title={"Teachers"}>{teacherCount}</Card>
                        </div>
                    </div>

                    {/* search */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="p-6 text-gray-900">
                            <SearchBar title={"Overview"} onClick={search}/>
                        </div>
                    </div>

                    {/* table */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="p-6 text-gray-900"></div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
