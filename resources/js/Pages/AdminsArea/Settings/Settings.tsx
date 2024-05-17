import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { LuView } from "react-icons/lu";


export default function Settings({ auth }: PageProps) {
 
    return (
        <AdminLayout user={auth.user}>
            <Head title="Settings" />
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="relative overflow-auto shadow-md rounded-lg">
                            Settings
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
