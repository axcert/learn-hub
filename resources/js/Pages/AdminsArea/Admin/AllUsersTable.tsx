import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { LuView } from "react-icons/lu";
import { useState } from "react";
import Card from "@/Components/Card/Card";
import SearchBar from "@/Components/SearchBar/SearchBar";
import Dropdown from "@/Components/Dropdown/Dropdown";
import Button from "@/Components/Button/Button";
import Dialog from "@/Components/MyDialog/MyDialog";
import MyDialog from "@/Components/MyDialog/MyDialog";

export interface Data {
    id: any;
    name: string;
    contact: string;
    email: string;
    role: string;
}


export interface PaginatedTableProps {
    data: Data[];
}
 const AllUsersTable: React.FC<PaginatedTableProps> = ({ data }) => {
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

    // const remove = () => {
    //     console.log("remove");
    // };

    return (
        <div className="py-2">
            <div>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <div className="relative overflow-auto shadow-md rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 capitalize"
                                        >
                                            User ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 capitalize"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 capitalize"
                                        >
                                            Phone Number
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 capitalize"
                                        >
                                            Email
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 capitalize"
                                        >
                                            Choose User Type
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.length > 0 ? (
                                        currentData.map((entry, index) => (
                                            <tr
                                                key={index}
                                                className="bg-white border-b hover:bg-gray-50"
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize"
                                                >
                                                    {entry.id}
                                                </th>
                                                <td className="px-6 py-4 capitalize">
                                                    {entry.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                {entry.contact}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {entry.email}
                                                </td>
                                                <td className="flex items-center px-6 py-4 ">
                                                    <Dropdown
                                                    title={entry.role}
                                                        menuItems={[
                                                            {
                                                                label: "Admin",
                                                                href: route('admin.users.edit', entry.id),
                                                          
                                                            },
                                                            {
                                                                label: "Teacher",
                                                                href: "#",
                                                            },
                                                            {
                                                                label: "Student",
                                                                href: "#",
                                                            },

                                                            // {
                                                            //     label: "Remove",
                                                            //     onClick: remove,
                                                            // },
                                                        ]}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-6 py-4 text-center text-gray-500"
                                            >
                                                No data available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="flex justify-end p-5">
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

export default AllUsersTable