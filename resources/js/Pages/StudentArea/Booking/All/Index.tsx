import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import StudentLayout from '@/Layouts/StudentLayout';
import { PageProps, Booking } from '@/types';
import { Inertia } from '@inertiajs/inertia';

interface Props extends PageProps {
    bookings: Booking[];
}

export default function BookingIndex({ auth, bookings = [] }: Props) {
    return (
        <StudentLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Bookings</h2>}
        >
            <Head title="My Bookings" />
            
            <div className="mt-10 mx-10">
                <div className="bg-white shadow-sm sm:rounded-lg p-4">
                    <div className="flex justify-between">
                        <h2 className="text-xl font-bold mb-4">My Bookings</h2>
                        <Link className="text-blue-700 hover:text-blue-800 dark:text-blue-500" href={route('services.index')}>View Services</Link>
                    </div>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Service</th>
                                <th className="px-4 py-2">Teacher</th>
                                <th className="px-4 py-2">Hourly Rate</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(bookings) && bookings.length > 0 ? (
                                bookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td className="border px-4 py-2">{booking.service?.name ?? 'N/A'}</td>
                                        <td className="border px-4 py-2">{booking.service?.teacher?.name ?? 'N/A'}</td>
                                        <td className="border px-4 py-2">{booking.service?.hourly_rate ?? 'N/A'}</td>
                                        <td className="border px-4 py-2">{booking.status}</td>
                                        <td className="border px-4 py-2">{booking.description}</td>
                                        <td className="border px-4 py-2">{booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}</td>
                                        <td className="border px-4 py-2">
                                            <Link className="text-blue-600 hover:text-blue-900 mr-2" href={route('bookings.show', booking.id)}>View</Link>
                                            <Link className="text-yellow-600 hover:text-yellow-900 mr-2" href={route('bookings.edit', booking.id)}>Edit</Link>
                                            <button className="text-red-600 hover:text-red-900" onClick={() => {
                                                if (window.confirm('Are you sure you want to delete this product?')) {
                                                    Inertia.delete(route('bookings.destroy', booking.id));
                                                }
                                                }}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="text-center col-span-full text-gray-500" colSpan={7}>No bookings found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </StudentLayout>
    );

    
}
