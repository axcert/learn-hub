import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Home({ auth }: PageProps) {
    return (
        <AdminLayout user={auth.user}>
            <Head title="Home" />

            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Home</div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
