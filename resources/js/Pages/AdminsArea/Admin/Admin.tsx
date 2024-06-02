import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import Card from "@/Components/Card/Card";
import SearchBar from "@/Components/SearchBar/SearchBar";
import Button from "@/Components/Button/Button";
import MyDialog from "@/Components/MyDialog/MyDialog";
import AllUsersTable from "./AllUsersTable";
import Edit from "@/Pages/AdminsArea/Admin/Edit/Edit";

export interface Data {
    name: string;
    email: string;
    id: any;
    role: string;
    phone: string;
}
export interface PaginatedTableProps {
    data: Data[];
}

const PaginatedTable: React.FC<PaginatedTableProps> = ({ data = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 5;

    const totalPages: number = Math.ceil(data.length / itemsPerPage);
    const currentData = Array.isArray(data)
        ? data.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
          )
        : [];

    const handleClick = (page: number) => {
        setCurrentPage(page);
    };

    const remove = (id: any) => {
        router.delete(route("admin.adminPanels.destroy", id));
    };

    const update = (id: any) => {
        router.get(route('admin.adminPanels.edit',id));
    };

    console.log("data:", data);

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
                                            Admin ID
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
                                            Role
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 capitalize"
                                        >
                                            Action
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
                                                <td className="px-6 py-4">
                                                    {entry.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {entry.phone}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {entry.email}
                                                </td>
                                                <td className="px-6 py-4 text-green-600 font-bold">
                                                    {entry.role}
                                                </td>

                                                <td className="px-6 py-4 flex">
                                                    <button
                                                        onClick={() =>
                                                            remove(entry.id)
                                                        }
                                                        className="font-medium text-red-600 hover:text-red-700 ms-3 text-lg"
                                                    >
                                                        <MdDelete />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            update(entry.id)
                                                        }
                                                        className="font-medium text-blue-600 hover:text-blue-700 ms-3 text-lg"
                                                    >
                                                        <FaUserEdit />
                                                    </button>
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

export default function Admin({ auth, adminCount, admins, users }: PageProps) {
    const [isOpen, setIsOpen] = useState(false);

    console.log("-------------------", admins);
    const search = () => {
        console.log("search Admin");
    };

    const all = () => {
        setIsOpen(true);
        // router.get(route('users.index'));
    };

    const adminsArray = Object.values(admins);

    return (
        <>
            <AdminLayout user={auth.user}>
                <Head title="Admin" />
                <div className="py-2">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-4">
                        {/* Card */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                            <div className="p-6  text-gray-900 flex justify-around flex-wrap items-center gap-5">
                                <Card
                                    className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow"
                                    title={"Admins"}
                                >
                                    {adminCount}
                                </Card>
                            </div>
                        </div>

                        {/* search */}

                        {/* button */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="py-3 text-gray-900 text-right flex items-center justify-between">
                                <div>
                                    <p className="text-start font-bold px-3">
                                        All Users
                                    </p>
                                </div>
                                <Button
                                    name={"View"}
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center me-2 mb-2 px-10 py-2"
                                    onClick={all}
                                />

                                <MyDialog isOpen={isOpen} setIsOpen={setIsOpen}>
                                    {/* search */}
                                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                                        <div className="p-3 text-gray-900">
                                            <SearchBar
                                                title={"Users"}
                                                onClick={search}
                                            />
                                        </div>
                                    </div>
                                    <AllUsersTable data={users} />
                                </MyDialog>
                            </div>
                        </div>

                        {/* table */}
                        <PaginatedTable data={adminsArray} />
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
