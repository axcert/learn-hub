import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { LuView } from "react-icons/lu";


export default function Admin({ auth }: PageProps) {
    const view = () =>{
        console.log("view Teacher");
    }

    return (
        <AdminLayout user={auth.user}>
            <Head title="Admin" />
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="relative overflow-auto shadow-md rounded-lg">
                             Admin
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
