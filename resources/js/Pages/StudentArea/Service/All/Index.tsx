import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import StudentLayout from '@/Layouts/StudentLayout';
import MyDialog from '@/Components/MyDialog/MyDialog';
import { Service, User, Filters } from '@/types';
import Card from '@/Components/Card/Card';
import SearchBar from '@/Components/SearchBar/SearchBar';
import ReactPaginate from 'react-paginate';
import StarRating from '@/Components/StarRating/StarRating';

interface Props {
    services: Service[];
    teachersCount: number;
    filters: Filters;
    average_rating?: number | null;
}



const ITEMS_PER_PAGE = 20;

export default function ServiceIndex({
    services = [],
    teachersCount = 0,
    search = "",
}: Props & { search?: string }) {

    const { auth } = usePage().props as unknown as { auth: { user: User } };
    const [searchTerm, setSearchTerm] = useState<string>(search || "");    
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

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

    const pageCount = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
    const offset = currentPage * ITEMS_PER_PAGE;
    const currentItems = filteredServices.slice(offset, offset + ITEMS_PER_PAGE);

    const handlePageClick = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(0);
    };

    const handleSearchClick = () => {
        setCurrentPage(0);
    };

    const openDialog = (service: Service) => {
        setSelectedService(service);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setSelectedService(null);
        setIsDialogOpen(false);
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
                        {Array.isArray(currentItems) &&
                        currentItems.length > 0 ? (
                            currentItems.map((service) => (
                                <div
                                    onClick={() => openDialog(service)}
                                    key={service.id}
                                    className="cursor-pointer flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-100 transition"
                                >
                                    <div className="flex-shrink-0">
                                        <img
                                          src={service.image ? `/storage/${service.image}` : "https://cdn-icons-png.flaticon.com/512/4762/4762311.png"}
                                          alt={service.name}
                                          className="h-16 w-16 rounded-full"
                                        />
                                    </div>
                                    <div className="mt-1">
                                        <StarRating rating={service.average_rating || 0} />
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
                                </div>
                            ))
                        ) : (
                            <p className="text-center col-span-full text-gray-500">
                                No services found.
                            </p>
                        )}
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

            <MyDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                className={
                    "inline-block w-full max-w-lg p-2 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
                }
            >
                {selectedService && (
                    <div>
                        {selectedService.image && (
                            <div className="flex justify-center mt-4">
                                <img
                                    src={
                                        selectedService.image
                                            ? `/storage/${selectedService.image}`
                                            : "https://cdn-icons-png.flaticon.com/512/4762/4762311.png"
                                    }
                                    alt={selectedService.name}
                                    className="h-28 w-28 rounded-full"
                                />
                            </div>
                        )}
                         <div className="mt-1 flex justify-center">
                            <StarRating rating={selectedService.average_rating || 0} />
                        </div>
                        <h2 className="text-xl font-bold">{selectedService.name}</h2>
                        {selectedService.teacher && (
                            <p className="mt-2">Teacher: {selectedService.teacher.user.name}</p>
                        )}
                        <p className="mt-2">{selectedService.description}</p>
                        <p className="text-gray-700 mb-2">Experience: {selectedService.experience}</p>
                        <p className="mt-2">Hourly Rate: Rs {selectedService.hourly_rate}</p>
                        <div className="flex justify-center items-center mt-6">
                            <Link
                                href={route("student.bookings.create", {
                                    service_id: selectedService.id,
                                })}
                                className="text-blue-600 hover:text-blue-900"
                            >
                                Book Service
                            </Link>
                        </div>
                    </div>
                )}
            </MyDialog>
        </StudentLayout>
    );
}
