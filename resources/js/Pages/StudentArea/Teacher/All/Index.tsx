import { Head, Link } from '@inertiajs/react';
import StudentLayout from '@/Layouts/StudentLayout';
import { PageProps, Service, User } from '@/types';
import React from 'react';

interface Props extends PageProps {
    teachers: User[];
    services: Service[];
}

export default function TeacherIndex({ auth, teachers, services = [] }: Props) {
    return (
        <StudentLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Teachers</h2>}
        >
            <Head title="Teachers" />
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5 mx-10">
                <div className="lg:col-span-3">
                    <div className="mt-4 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.isArray(teachers) && teachers.length > 0 ? (
                            teachers.slice(0, 3).map((teacher) => (
                                <Link
                                    href={route('teachers.show', teacher.id)}
                                    key={teacher.id}
                                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-100 transition"
                                >
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-16 w-16 rounded-full"
                                            src="https://cdn-icons-png.flaticon.com/512/4762/4762311.png"
                                            alt={teacher.user.name}
                                        />
                                    </div>
                                    <div className="mt-4 text-center">
                                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                                            {teacher.user.name}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-600">{teacher.position}</p>
                                        <p className="mt-1 text-sm text-gray-600">{teacher.bio}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center col-span-full text-gray-500">No teachers found.</p>
                        )}
                    </div>
                    {/* {Array.isArray(services) && services.length > 3 && (
                        <div className="flex justify-center mt-4">
                            <Link
                                href={route('services.index')}
                                className="text-blue-500 hover:text-blue-700 dark:text-blue-500 flex-end"
                            >
                                View More
                            </Link>
                        </div>
                    )} */}
                </div>
            </div>
        </StudentLayout>
    );
}