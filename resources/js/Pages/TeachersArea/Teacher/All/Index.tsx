import { Head, Link } from '@inertiajs/react';
import TeacherLayout from '@/Layouts/TeacherLayout';
import { PageProps, Service } from '@/types';
import React from 'react';

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

export default function TeacherIndex({ auth, teachers, services = [] }: Props) {
    return (
        <TeacherLayout user={auth.user}>
            <Head title="Teachers" />
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5">
                    <div className="lg:col-span-4">
                        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {Array.isArray(teachers) && teachers.length > 0 ? (
                                teachers.map((teacher) => (
                                    <Link
                                        href={route('teachers.show', teacher.id)}
                                        key={teacher.id}
                                        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-100 transition"
                                    >
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-32 w-32 rounded-full object-cover"
                                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                                                alt={teacher.user.name}
                                            />
                                        </div>
                                        <div className="mt-2 flex justify-center">
                                                <span className="text-yellow-500">★★★★☆</span>
                                            </div>
                                        <div className="mt-4 flex flex-wrap justify-center space-x-2">
                                                {teacher.services.map((service) => (
                                                    <span key={service.id} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                                        {service.name}
                                                    </span>
                                                ))}
                                            </div>
                                            

                                        <div className="mt-4 text-center">
                                            <h3 className="text-lg font-semibold leading-7 tracking-tight text-gray-900">
                                                {teacher.user.name}
                                            </h3>
                                            <h4 className="mt-1 text-sm font-semibold text-gray-600">
                                                {teacher.position}
                                            </h4>
                                            
                                            <p className="mt-2 text-sm text-gray-600">
                                                {teacher.bio}
                                            </p>
                                            
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-center col-span-full text-gray-500">No teachers found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </TeacherLayout>
    );
}
