import React from 'react';
import { Head, Link } from '@inertiajs/react';
import StudentLayout from '@/Layouts/StudentLayout';
import { PageProps, Teacher } from '@/types';

interface Props extends PageProps {
    teacher?: Teacher; // teacher is optional to handle the case where it's not passed
}

export default function TeacherShow({ auth, teacher }: Props) {
    console.log('Teacher data:', teacher); // Log the teacher data

    if (!teacher) {
        // Handle the case where teacher is not defined
        return <div>Teacher data is not available</div>;
    }

    const { user, position, bio, services } = teacher;

    if (!user) {
        // Handle the case where teacher.user is not defined
        return <div>User data is not available</div>;
    }

    return (
        <StudentLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{user.name}</h2>}
        >
            <Head title={user.name} />

            <div className="mt-5 mx-10">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center">
                        <img
                            className="h-16 w-16 rounded-full"
                            src="https://cdn-icons-png.flaticon.com/512/4762/4762311.png"
                            alt={user.name}
                        />
                        <div className="ml-4">
                            <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                                {user.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">{position}</p>
                            <p className="mt-1 text-sm text-gray-600">{bio}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <h4 className="text-lg font-medium text-gray-800">Services</h4>
                    {services.length > 0 ? (
                        <ul className="mt-2 list-disc list-inside">
                            {services.map((service: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                                <li key={service.id} className="text-gray-600">{service.name}: {service.description}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-2 text-gray-600">No services available.</p>
                    )}
                </div>
                <div className="mt-5">
                    <Link
                        href={route('teachers.index')}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Back to Teachers
                    </Link>
                </div>
            </div>
        </StudentLayout>
    );
}
