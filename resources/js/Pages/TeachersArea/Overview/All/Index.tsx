import React from 'react';
import { Inertia } from '@inertiajs/inertia';

interface Booking {
    id: number;
    student: {
        name: string;
    };
    service: {
        name: string;
    };
    date: string;
    status: string;
}

interface Service {
    id: number;
    name: string;
    description: string;
}

interface Props {
    bookings: Booking[];
    services: Service[];
}

const TeacherOverview: React.FC<Props> = ({ bookings, services }) => {
    const handleAction = (id: number, action: string) => {
        Inertia.post(`/teachers/bookings/${id}/${action}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Teacher Overview</h2>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Bookings</h3>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Student Name</th>
                            <th className="px-4 py-2">Service</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.id}>
                                <td className="border px-4 py-2">{booking.student.name}</td>
                                <td className="border px-4 py-2">{booking.service.name}</td>
                                <td className="border px-4 py-2">{new Date(booking.date).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{booking.status}</td>
                                <td className="border px-4 py-2">
                                    <button onClick={() => handleAction(booking.id, 'accept')} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Accept</button>
                                    <button onClick={() => handleAction(booking.id, 'reject')} className="bg-red-500 text-white px-4 py-2 rounded">Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-2">Services</h3>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Service Name</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service.id}>
                                <td className="border px-4 py-2">{service.name}</td>
                                <td className="border px-4 py-2">{service.description}</td>
                                <td className="border px-4 py-2">
                                    <button onClick={() => Inertia.get(`/teachers/services/${service.id}/edit`)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                                    <button onClick={() => Inertia.get(`/teachers/services/${service.id}`)} className="bg-gray-500 text-white px-4 py-2 rounded">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherOverview;
