import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/react";
import StudentLayout from "@/Layouts/StudentLayout";
import { Service, User, Filters } from "@/types";
import SearchBar from "@/Components/SearchBar/SearchBar";
import Card from "@/Components/Card/Card";
import MyDialog from '@/Components/MyDialog/MyDialog'; // Import your dialog component

interface Props {
    services: Service[];
    teachersCount: number;
    filters: Filters;
}

export default function ServiceIndex({
    services = [],
    teachersCount = 0,
    search = "",
}: Props & { search?: string }) {
    const { auth } = usePage().props as unknown as { auth: { user: User } };
    const [searchTerm, setSearchTerm] = useState<string>(search || "");

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this service?")) {
            Inertia.delete(route("student.services.destroy", id));
        }
    };

    const filteredServices = services.filter(
        (service) =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (service.teacher &&
                service.teacher.user.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
        // setCurrentPage(0);
    };

    return (
        <StudentLayout user={auth.user}>
            <div className="bg-gray-100 py-15 sm:py-10">
                <div className="mx-auto px-6 lg:px-8">
                    {/* Card */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="max-w-2xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl pt-5">
                                Our Services
                            </h2>
                            <p className="mt-1 text-lg leading-8 text-gray-400 capitalize">
                                Discover our wide range of services provided by
                                our talented professionals.
                            </p>
                        </div>

                        <div className="p-6 text-gray-900 flex justify-around flex-wrap items-center gap-5">
                            <Card
                                className="w-full  max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow"
                                title="Total Teachers"
                            >
                                {teachersCount}
                            </Card>

                            <Card
                                className="w-full  capitalize max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow"
                                title="Total Services"
                            >
                                {filteredServices.length}
                            </Card>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-5">
                        <div className=" text-gray-900">
                            <SearchBar
                                title={"Services"}
                                onClick={handleSearchClick}
                                onChange={handleSearchChange}
                                searchTerm={searchTerm}
                            />
                        </div>
                    </div>
                    <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.isArray(filteredServices) &&
                        filteredServices.length > 0 ? (
                            filteredServices.map((service) => (
                                <Link
                                    href={route(
                                        "student.services.show",
                                        service.id
                                    )}
                                    key={service.id}
                                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-100 transition"
                                >
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-16 w-16 rounded-full"
                                            src="https://cdn-icons-png.flaticon.com/512/4762/4762311.png"
                                            alt={service.name}
                                        />
                                    </div>
                                    <div className="mt-4 text-center">
                                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                                            {service.name}
                                        </h3>
                                        {service.teacher && (
                                            <p className="mt-1 text-sm text-gray-600">
                                                Teacher:{" "}
                                                {service.teacher.user.name}
                                            </p>
                                        )}
                                        <p className="mt-1 text-sm text-gray-600">
                                            {service.description}
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-indigo-600">
                                            Rs: {service.hourly_rate}/hr
                                        </p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center col-span-full text-gray-500">
                                No services found.
                            </p>
                        )}
                    </div>
                    {Array.isArray(filteredServices) &&
                        filteredServices.length > 3 && (
                            <div className="flex justify-center mt-4">
                                <Link
                                    href={route("student.services.index")}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    View More
                                </Link>
                            </div>
                        )}
                </div>
            </div>
        </StudentLayout>
    );
}