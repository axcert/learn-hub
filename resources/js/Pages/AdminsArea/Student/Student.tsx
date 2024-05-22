import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { LuView } from "react-icons/lu";

export default function Student({ auth}: PageProps) {

    const view = () =>{
     console.log("view Student");
     
    }
    
    return (
        <AdminLayout
            user={auth.user}
           
        >
            <Head title="Student" />
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="relative overflow-auto shadow-md rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                        <tr>
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
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Phone Number
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Status
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr className="bg-white border-b hover:bg-gray-50">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                            >
                                                Hirushan Student
                                            </th>

                                            <td className="px-6 py-4">
                                                imesh@gmail.com
                                            </td>
                                            <td className="px-6 py-4">
                                                0779201232
                                            </td>
                                           
                                            <td className="flex items-center px-6 py-4">
                                                <button
                                                    onClick={view}
                                                    className="font-medium text-green-600 hover:font-bold ms-3 text-lg"
                                                >
                                                    <LuView />
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
