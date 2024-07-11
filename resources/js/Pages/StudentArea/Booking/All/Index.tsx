import React from 'react';
import { Head, Link } from '@inertiajs/react';
import StudentLayout from '@/Layouts/StudentLayout';
import { PageProps, Booking } from '@/types';
import { Inertia } from '@inertiajs/inertia';

interface Props extends PageProps {
    bookings: Booking[];
}

export default function BookingIndex({ auth, bookings = [] }: Props) {

    const sortBookingsByDate = (bookings: Booking[]) => {
        return bookings.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      };

      const sortedBookings = sortBookingsByDate(bookings);
    return (
        <StudentLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Bookings</h2>}
        >
            <Head title="My Bookings" />
            
            <div className="mt-10 mx-10">
                <div className="bg-white shadow-sm sm:rounded-lg p-4">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-bold">Booking History</h2>
                        <Link className="text-blue-700 hover:text-blue-800 dark:text-blue-500" href={route('student.services.index')}>View Services</Link>
                    </div>
                    
                    <div className="space-y-4">
                    {Array.isArray(sortedBookings) && sortedBookings.length > 0 ? (
                        sortedBookings.map((booking) => (
                        <div key={booking.id} className="p-4 border rounded-lg flex items-center justify-between">
                            <div>
                            <h3 className="text-lg font-bold">{booking.service?.name ?? 'N/A'}</h3>
                            <p className="text-gray-500">Teacher: {booking.service?.teacher?.user?.name ?? 'N/A'}</p>
                            <p className="text-gray-500">Date: {booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}</p>
                            <p className={`text-sm font-semibold ${booking.status === 'accepted' ? 'text-green-600' : booking.status === 'rejected' ? 'text-red-600' : 'text-gray-600'}`}>
                                Status: {booking.status}
                            </p>
                            </div>
                            <div className="flex items-center space-x-4">
                            <Link className="text-blue-600 hover:text-blue-900" href={route('student.bookings.show', booking.id)}>View</Link>
                            <Link className="text-yellow-600 hover:text-yellow-900" href={route('student.bookings.edit', booking.id)}>Edit</Link>
                            <button className="text-red-600 hover:text-red-900" onClick={() => {
                                if (window.confirm('Are you sure you want to delete this booking?')) {
                                Inertia.delete(route('student.bookings.destroy', booking.id));
                                }
                            }}>Delete</button>
                            </div>
                        </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">No bookings found.</div>
                    )}
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
