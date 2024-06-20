import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import StudentLayout from "@/Layouts/StudentLayout";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaServer } from "react-icons/fa";
import { Booking, PageProps, Service, User } from "@/types";
import MyDialog from "@/Components/MyDialog/MyDialog";
import StarRating from "@/Components/StarRating/StarRating";
import { all } from "axios";
import { Inertia } from "@inertiajs/inertia";

interface Props extends PageProps {
    auth: { user: User };
    services: Service[];
    bookings: Booking[];
    average_rating?: number | null;
}

export default function StudentIndex({
    auth,
    services = [],
    bookings = [],
}: Props) {
    const [date, setDate] = useState<Date | null>(new Date());
    const [selectedService, setSelectedService] = useState<Service | null>(
        null
    );
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const sortBookingsByDate = (bookings: Booking[]) => {
        return bookings
            .slice()
            .sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
            );
    };

    const sortedBookings = sortBookingsByDate(bookings);

    const openDialog = (service: Service) => {
        setSelectedService(service);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setSelectedService(null);
        setIsDialogOpen(false);
    };

    const chatNow = (teacherId: number, userId: number) => {
        Inertia.post(route("student.chat.store"), {
            teacher_id: teacherId,
            user_id: userId,
        });
    };

    return (
        <StudentLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Student Dashboard
                </h2>
            }
        >
            <Head title="Student Dashboard" />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5 mx-4 lg:mx-10">
                <div className="lg:col-span-3">
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.isArray(services) && services.length > 0 ? (
                            services.slice(0, 4).map((service) => (
                                <div
                                    onClick={() => openDialog(service)}
                                    key={service.id}
                                    className="cursor-pointer flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-100 transition"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="flex justify-center mt-4">
                                            <img
                                                src={
                                                    service.image
                                                        ? `/storage/${service.image}`
                                                        : "https://cdn-icons-png.flaticon.com/512/4762/4762311.png"
                                                }
                                                alt={service.name}
                                                className="h-16 w-16 rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                                            {service.name}
                                        </h3>
                                        <hr className="my-1 w-full border-gray-300" />
                                        <div className="mt-1 flex justify-center">
                                            <StarRating
                                                rating={
                                                    service.average_rating || 0
                                                }
                                            />
                                        </div>
                                        {service.teacher &&
                                            service.teacher.user && (
                                                <p className="mt-1 text-sm text-gray-600">
                                                    Teacher:{" "}
                                                    {service.teacher.user.name}
                                                </p>
                                            )}
                                        <p className="mt-1 text-sm text-gray-600">
                                            {service.description}
                                        </p>
                                        <p className="px-2 mt-1 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">
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
                    {Array.isArray(services) && services.length > 3 && (
                        <div className="flex justify-center mt-4">
                            <Link
                                href={route("student.services.index")}
                                className="text-blue-500 hover:text-blue-700 dark:text-blue-500 flex-end"
                            >
                                View More
                            </Link>
                        </div>
                    )}
                </div>
                <div className="lg:col-span-1 mt-4 lg:mt-0">
                    <div className="bg-white shadow-sm sm:rounded-lg p-4 text-center">
                        <Calendar
                            onChange={(value) => setDate(value as Date | null)}
                            value={date}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-10 mx-4 lg:mx-10">
                <div className="bg-white shadow-sm sm:rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold flex items-center">
                            <FaServer className="mr-2" /> My History
                        </h2>
                        <Link
                            className="text-blue-700 hover:text-blue-800 dark:text-blue-500 flex-end"
                            href={route("student.bookings.index")}
                        >
                            View all
                        </Link>
                    </div>
                    <div
                        className="overflow-y-auto"
                        style={{ maxHeight: "200px" }}
                    >
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border">
                                        Service
                                    </th>
                                    <th className="px-4 py-2 border">
                                        Teacher
                                    </th>
                                    <th className="px-4 py-2 border">
                                        Hourly Rate
                                    </th>
                                    <th className="px-4 py-2 border">Status</th>
                                    <th className="px-4 py-2 border">Date</th>
                                    <th className="px-4 py-2 border">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(sortedBookings) &&
                                sortedBookings.length > 0 ? (
                                    sortedBookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td className="border px-4 py-2">
                                                {booking.service?.name ?? "N/A"}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {booking.service?.teacher?.user
                                                    ?.name ?? "N/A"}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {booking.service?.hourly_rate ??
                                                    "N/A"}
                                            </td>
                                            <td
                                                className={`border px-4 py-2 ${
                                                    booking.status === "pending"
                                                        ? "text-orange-500 font-semibold"
                                                        : booking.status ===
                                                          "accepted"
                                                        ? "text-green-500 font-semibold"
                                                        : booking.status ===
                                                          "completed"
                                                        ? "text-blue-500 font-semibold"
                                                        : "text-red-500 font-semibold"
                                                }`}
                                            >
                                                {booking.status}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {booking.date
                                                    ? new Date(
                                                          booking.date
                                                      ).toLocaleDateString()
                                                    : "N/A"}
                                            </td>
                                            <td className="border px-4 py-2">
                                                <Link
                                                    className="text-blue-600 hover:text-blue-900 mr-2"
                                                    href={route(
                                                        "student.bookings.show",
                                                        booking.id
                                                    )}
                                                >
                                                    View
                                                </Link>
                                                {booking.status ===
                                                    "completed" && (
                                                    <Link
                                                        className="text-yellow-600 hover:text-yellow-900 mr-2"
                                                        href={route(
                                                            "student.bookings.edit",
                                                            booking.id
                                                        )}
                                                    >
                                                        Rate & Comment
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            className="text-center col-span-full text-gray-500"
                                            colSpan={6}
                                        >
                                            No bookings found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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

                        <h2 className="text-xl font-bold">
                            {selectedService.name}
                        </h2>
                        <hr className="my-1 w-full border-gray-300" />
                        <div className="mt-1 flex justify-center">
                            <StarRating
                                rating={selectedService.average_rating || 0}
                            />
                        </div>
                        {selectedService.teacher && (
                            <p className="mt-2">
                                Teacher: {selectedService.teacher.user.name}
                            </p>
                        )}
                        <p className="mt-2">{selectedService.description}</p>
                        <p className="text-gray-700 mb-2">
                            Experience: {selectedService.experience}
                        </p>
                        <p className="mt-2">
                            Hourly Rate: Rs {selectedService.hourly_rate}
                        </p>
                        <div className="flex justify-center items-center mt-6 flex-col gap-1">
                            <Link
                                href={route("student.bookings.create", {
                                    service_id: selectedService.id,
                                })}
                                className="text-blue-600 hover:text-blue-900"
                            >
                                Book Service
                            </Link>
                            <button
                                onClick={() =>
                                    selectedService?.teacher &&
                                    chatNow(
                                        selectedService.teacher.id,
                                        auth.user.id
                                    )
                                }
                                className="text-green-600 hover:text-green-900 font-bold cursor-pointer"
                            >
                                Chat Now
                            </button>
                        </div>
                    </div>
                )}
            </MyDialog>
        </StudentLayout>
    );
}
