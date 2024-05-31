import React from 'react';
import { Head, Link } from '@inertiajs/react';
import StudentLayout from '@/Layouts/StudentLayout';
import { PageProps, Teacher } from '@/types';

interface Props extends PageProps {
    teacher?: Teacher; 
}

export default function TeacherShow({ auth, teacher }: Props) {
    if (!teacher) {
        return <div>Teacher data is not available</div>;
    }

    const { user, position, bio, services } = teacher;

    if (!user) {
        return <div>User data is not available</div>;
    }

    return (
        <StudentLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{user.name}</h2>}
        >
            <Head title={user.name} />

            <div className="mt-5 mx-4 md:mx-10">
                <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start">
                    <img
                        className="h-32 w-32 rounded-full"
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                        alt={user.name}
                    />
                    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col justify-center text-center md:text-left">
                        <h3 className="text-2xl font-semibold leading-7 tracking-tight text-gray-900">
                            {user.name}
                        </h3>
                        <p className="mt-1 text-lg text-gray-600">{position}</p>
                    </div>
                </div>
                <div className="mt-5 bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-xl font-medium text-gray-800">About Me</h4>
                    <p className="mt-2 text-sm text-gray-600">{bio}</p>
                </div>
                <div className="mt-5 bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-xl font-medium text-gray-800">Services</h4>
                    {services.length > 0 ? (
                        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {services.map((service:any) => (
                                <Link
                                    href={route('student.services.show', service.id)}
                                    key={service.id}
                                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-100 transition"
                                >
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-16 w-16 rounded-full"
                                            src="https://cdn-icons-png.flaticon.com/512/4762/4762311.png"
                                            alt={service.name}
                                        />
                                    </div>
                                    <div className="mt-4 text-center">
                                        <h5 className="text-lg font-semibold leading-7 tracking-tight text-gray-900">{service.name}</h5>
                                        <h3 className="text-lg font-semibold leading-7 tracking-tight text-gray-900">{user.name}</h3>
                                        <p className="mt-1 text-sm text-gray-600">{service.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-2 text-gray-600">No services available.</p>
                    )}
                </div>
                <div className="mt-5 text-center md:text-left">
                    <Link
                        href={route('student.teachers.index')}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Back to Teachers
                    </Link>
                </div>
            </div>
        </StudentLayout>
    );
}
