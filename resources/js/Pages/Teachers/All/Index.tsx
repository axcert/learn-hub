import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import React, { useState } from 'react';

export default function Teacher({ auth, teachers }: any) {

    const handleDelete = (teacherId: number) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            router.delete(route('teachers.destroy', teacherId));
        }
    };

    console.log('hello');
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <h2 className="font-bold text-xl text-blue-900 leading-tight">TEACHERS</h2>
                    <div className="bg-blue-900 h-1 mt-2"></div> {/* Blue bar */}
                </div>
            }
        >
            <Head title="Teachers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-center">
                                <img src="/images/hero.jpeg" alt="Description of image" width="250" height="200" />
                            </div>
                            <div className="flex justify-center">
                                <Link href={route('teachers.create')}>
                                    <PrimaryButton className="mt-4 px-4 py-2 mb-4 bg-yellow-600 text-white rounded hover:bg-red-900 focus:outline-none">
                                        CREATE PROFILE
                                    </PrimaryButton>
                                </Link>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200">
                                {/* <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Subjects
                                        </th>
                                    </tr>
                                </thead> */}

                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                                    <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />

                                    <div className="p-5">

                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Name :</h5>

                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Subjects :</p>

                                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            READ MORE
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                <tbody className="bg-white divide-y divide-gray-200">
                                    {teachers && teachers.map((teacher: any) => (
                                        <tr key={teacher.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{teacher.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{teacher.subjects}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link href={route('teachers.show', teacher.id)}>
                                                    <PrimaryButton className="bg-green-500 hover:bg-red-600 mr-2">
                                                        View
                                                    </PrimaryButton>
                                                </Link>
                                                <Link href={route('teachers.edit', teacher.id)}>
                                                    <PrimaryButton className="bg-orange-500 hover:bg-red-600 mr-2">
                                                        Edit
                                                    </PrimaryButton>
                                                </Link>
                                                <PrimaryButton
                                                    className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-red-600 focus:outline-none mr-2"
                                                    onClick={() => handleDelete(teacher.id)}
                                                >
                                                    Delete
                                                </PrimaryButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
