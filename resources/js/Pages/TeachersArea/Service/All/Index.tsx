import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { FaPlus } from 'react-icons/fa';
import TeacherLayout from '@/Layouts/TeacherLayout';
import { Inertia } from '@inertiajs/inertia';
import { Service, PageProps } from '@/types';

interface Props extends PageProps {
    services: Service[];
    filters: any;
}

export default function ServiceIndex() {
    const { auth, services, filters } = usePage().props as unknown as Props;
    const servicesArray = Array.isArray(services) ? services : [];

    return (
        <TeacherLayout user={auth.user}>
            <Head title="Teacher Services" />
            <div className="mt-5 mx-4 lg:mx-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">My Services</h2>
                    <Link href={route('teacher.services.create')} className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-3 py-2 flex items-center">
                        <FaPlus className="mr-2" /> Create New Service
                    </Link>
                </div>
                <div className="overflow-x-auto bg-white shadow sm:rounded-lg p-4">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Service Name</th>
                                <th className="px-4 py-2 border">Description</th>
                                <th className="px-4 py-2 border">Hourly Rate</th>
                                <th className="px-4 py-2 border">Status</th>
                                <th className="px-4 py-2 border">Experience</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicesArray.length > 0 ? (
                                servicesArray.map((service) => (
                                    <tr key={service.id}>
                                        <td className="border px-4 py-2">{service.name}</td>
                                        <td className="border px-4 py-2">{service.description}</td>
                                        <td className="border px-4 py-2">{service.hourly_rate}</td>
                                        <td className="border px-4 py-2">{service.status}</td>
                                        <td className="border px-4 py-2">{service.experience}</td>
                                        <td className="border px-4 py-2">
                                            <Link href={route('teacher.services.edit', service.id)} className="text-blue-500 hover:text-blue-700 mr-2">
                                                Edit
                                            </Link>
                                            <button
                                                className="text-red-600 hover:text-red-900"
                                                onClick={() => {
                                                    if (window.confirm('Are you sure you want to delete this service?')) {
                                                        Inertia.delete(route('teacher.services.destroy', service.id));
                                                    }
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="text-center col-span-full text-gray-500" colSpan={6}>
                                        No services found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </TeacherLayout>
    );
}