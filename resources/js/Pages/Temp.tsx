import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { LuView } from "react-icons/lu";
import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
interface Data {
    name: string;
    email: string;
    phoneNumber: string;
    bio: string;
    position: string;
}
const data: Data[] = [
    {
        name: "Imesh",
        email: "imesh.hirushan@axcertro.com",
        phoneNumber: "0779201232",
        bio: "Experienced Full-Stack Engineer",
        position: "Software Engineer",
    },
    {
      name: "Hirushan",
      email: "hirushan@axcertro.com",
      phoneNumber: "0779201232",
      bio: "ict",
      position: "Software Engineer",
    },
    {
      name: "isuru",
      email: "isuru.com",
      phoneNumber: "0779201232",
      bio: "ict",
      position: "Software Engineer",
    },

    {
      name: "kavidu",
      email: "kavidu.com",
      phoneNumber: "0779201232",
      bio: "ict",
      position: "Software Engineer",
    },
    {
      name: "taridu",
      email: "taridu.com",
      phoneNumber: "0779201232",
      bio: "ict",
      position: "Software Engineer",
    },
    {
      name: "isuri",
      email: "isuri.com",
      phoneNumber: "0779201232",
      bio: "ict",
      position: "Software Engineer",
    },

];

const PaginatedTable: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 5;

    const totalPages: number = Math.ceil(data.length / itemsPerPage);
    const currentData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleClick = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="py-2">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <div className="relative overflow-auto shadow-md rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Phone Number
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Bio
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Position
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map((entry, index) => (
                                        <tr
                                            key={index}
                                            className="bg-white border-b hover:bg-gray-50"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                                {entry.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {entry.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {entry.phoneNumber}
                                            </td>
                                            <td className="px-6 py-4">
                                                {entry.bio}
                                            </td>
                                            <td className="px-6 py-4">
                                                {entry.position}
                                            </td>
                                            <td className="flex items-center px-6 py-4">
                                                <button
                                                    onClick={() =>
                                                        alert(
                                                            "View button clicked"
                                                        )
                                                    }
                                                    className="font-medium text-green-600 hover:font-bold ms-3 text-lg"
                                                >
                                                    <LuView />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={() => handleClick(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                handleClick(index + 1)
                                            }
                                            className={`px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 ${
                                                currentPage === index + 1
                                                    ? "bg-gray-200"
                                                    : ""
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    )
                                )}
                                <button
                                    onClick={() => handleClick(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Teacher({ auth }: PageProps) {
    return (
        <>
            <AdminLayout user={auth.user}>
                <Head title="Teacher" />
                <PaginatedTable />
            </AdminLayout>
        </>
    );
}
