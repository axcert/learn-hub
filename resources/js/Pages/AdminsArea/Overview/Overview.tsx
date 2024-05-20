import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { LuView } from "react-icons/lu";
import Card from "@/Components/Card/Card";

export default function Overview({ auth }: PageProps) {
    return (
        <AdminLayout user={auth.user}>
            <Head title="Overview" />
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
                    {/* Card */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="p-6 text-gray-900 flex justify-around flex-wrap items-center gap-5">
                            <Card title={"Total Users"}>1253</Card>

                            <Card title={"Students"}>1043</Card>

                            <Card title={"Sevices"}>210</Card>
                        </div>
                    </div>

                    <br />
                    {/* Table */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="p-6 text-gray-900">

                            table
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
