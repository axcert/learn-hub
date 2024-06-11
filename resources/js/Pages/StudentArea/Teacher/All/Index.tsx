import { Head, Link } from "@inertiajs/react";
import StudentLayout from "@/Layouts/StudentLayout";
import { PageProps, Service } from "@/types";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import SearchBar from "@/Components/SearchBar/SearchBar";
import { Inertia } from "@inertiajs/inertia";

interface Teacher {
    id: number;
    user: {
        id: number;
        name: string;
    };
    position: string;
    bio: string;
    services: Service[];
}

interface Props extends PageProps {
    teachers: Teacher[];
    services: Service[];
}

const ITEMS_PER_PAGE = 8;

export default function TeacherIndex({
    auth,
    teachers,
    services = [],
    search = "",
}: Props & { search?: string }) {
    
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState<string>(search || "");


    const filteredTeachers = teachers.filter((teacher) =>
        teacher.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.services.some((service) =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );


    const pageCount = Math.ceil(filteredTeachers.length / ITEMS_PER_PAGE);
    const offset = currentPage * ITEMS_PER_PAGE;
    const currentItems = filteredTeachers.slice(offset, offset + ITEMS_PER_PAGE);
   
    const handlePageClick = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
        setCurrentPage(0);
    };

    return (
        <StudentLayout user={auth.user}>
            <Head title="Teachers" />
            <div className="container mx-auto px-4">
                {/* search */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-5">
                    <div className=" text-gray-900">
                        <SearchBar
                            title={"Teachers"}
                            onClick={handleSearchClick}
                            onChange={handleSearchChange}
                            searchTerm={searchTerm}
                        />
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-5 px-5 py-6">
                    <div className=" text-gray-900">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5">
                    <div className="lg:col-span-4">
                        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {Array.isArray(currentItems) &&
                            currentItems.length > 0 ? (
                                currentItems.map((teacher) => (
                                    <Link
                                        href={route(
                                            "student.teachers.show",
                                            teacher.id
                                        )}
                                        key={teacher.id}
                                        className="flex flex-col items-center bg-white  border-gray-300 border-2 rounded-lg p-6 hover:bg-gray-100 transition"
                                    >
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-16 w-16 rounded-full"
                                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                                                alt={teacher.user.name}
                                            />
                                        </div>
                                        <div className="mt-1 flex justify-center">
                                            <span className="text-yellow-500">
                                                ★★★★☆
                                            </span>
                                        </div>
                                        <hr className="my-1 w-full border-gray-300" />
                                        <div className=" flex flex-wrap justify-center space-x-2">
                                            {teacher.services.map((service) => (
                                                <span
                                                    key={service.id}
                                                    className="px-2 mt-1 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                                                >
                                                    {service.name}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mt-2 text-center">
                                            <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                                                {teacher.user.name}
                                            </h3>
                                            <h4 className="mt-1 text-sm font-semibold text-gray-600">
                                                {teacher.position}
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-600">
                                                {teacher.bio}
                                            </p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-center col-span-full text-gray-500">
                                    No teachers found.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-center">
                    <ReactPaginate
                        previousLabel={"← Previous"}
                        nextLabel={"Next →"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={
                            "flex justify-center items-center space-x-2 mt-4"
                        }
                        pageClassName={"mx-1"}
                        pageLinkClassName={
                            "px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white"
                        }
                        previousLinkClassName={
                            "px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white"
                        }
                        nextLinkClassName={
                            "px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white"
                        }
                        breakLinkClassName={
                            "px-3 py-1 border border-gray-300 rounded-md text-gray-700"
                        }
                        activeClassName={"bg-blue-500 rounded-md text-white"}
                    />
                </div>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
