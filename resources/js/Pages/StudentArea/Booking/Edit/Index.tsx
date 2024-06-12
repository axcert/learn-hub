
import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import StudentLayout from '@/Layouts/StudentLayout';
import { PageProps, Booking } from '@/types';

interface Props extends PageProps {
    booking: Booking;
}

export default function Edit({ auth, booking }: Props) {
    const { data, setData, put, errors } = useForm({
        description: booking.description,
        date: booking.date,
        rating: booking.rating || '',
        comment: booking.comment || '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('student.bookings.update', booking.id));
    }

    return (
        <StudentLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Booking</h2>}
        >
            <Head title="Edit Booking" />
            
            <div className="mt-10 mx-10">
                <div className="bg-white shadow-sm sm:rounded-lg p-4">
                    <div className="flex justify-between">
                        <h2 className="text-xl font-bold mb-4">Edit Booking</h2>
                        <Link className="text-blue-700 hover:text-blue-800 dark:text-blue-500" href={route('student.bookings.index')}>Back to Bookings</Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            {errors.description && <div className="text-red-600">{errors.description}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            {errors.date && <div className="text-red-600">{errors.date}</div>}
                        </div>
                        {booking.status === 'completed' && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                                    <input
                                        type="number"
                                        placeholder='You can rate this from 1 to 5.'
                                        value={data.rating}
                                        onChange={(e) => setData('rating', e.target.value)}
                                        min="1"
                                        max="5"
                                        className="mt-1 block w-full"
                                    />
                                    {errors.rating && <div className="text-red-600">{errors.rating}</div>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Comment</label>
                                    <textarea
                                        value={data.comment}
                                        placeholder='Write your comment here...'
                                        onChange={(e) => setData('comment', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.comment && <div className="text-red-600">{errors.comment}</div>}
                                </div>
                            </>
                        )}
                        <div className="mb-4">
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                                Update Booking
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </StudentLayout>
    );
}
