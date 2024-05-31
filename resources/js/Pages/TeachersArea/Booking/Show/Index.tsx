import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps, Booking } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import TeacherLayout from '@/Layouts/TeacherLayout';

interface Props extends PageProps {
    booking: Booking;
}

export default function Show({ auth, booking }: Props) {
    return (
        <TeacherLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Booking Details</h2>}
        >
            <Head title="Booking Details" />
            
            <div className="mt-10 mx-10">
                <div className="bg-white shadow-sm sm:rounded-lg p-4">
                    <div className="flex justify-between">
                        <h2 className="text-xl font-bold mb-4">Booking Details</h2>
                        <Link className="text-blue-700 hover:text-blue-800 dark:text-blue-500" href={route('teacher.bookings.index')}>Back to Bookings</Link>
                    </div>
                    <div className="mt-4">
                        <p><strong>Service:</strong> {booking.service?.name ?? 'N/A'}</p>
                        <p><strong>Teacher:</strong> {booking.service?.teacher?.name ?? 'N/A'}</p>
                        <p><strong>Hourly Rate:</strong> {booking.service?.hourly_rate ?? 'N/A'}</p>
                        <p><strong>Status:</strong> {booking.status}</p>
                        <p><strong>Description:</strong> {booking.description}</p>
                        <p><strong>Date:</strong> {booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}</p>
                        <Link className="text-yellow-600 hover:text-yellow-900 mr-2" href={route('teacher.bookings.edit', booking.id)}>Edit</Link>
                        <button className="text-red-600 hover:text-red-900" onClick={() => {
                            if (window.confirm('Are you sure you want to delete this product?')) {
                                Inertia.delete(route('teacher.bookings.destroy', booking.id));
                            }
                            }}>Delete</button>
                    </div>
                </div>
            </div>
        </TeacherLayout>
    );
}
