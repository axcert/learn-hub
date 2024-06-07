import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { useForm, Link, usePage } from "@inertiajs/react";
import { User, Service } from "@/types";
import TeacherLayout from "@/Layouts/TeacherLayout";

interface Props {
    auth: {
        user: User;
    };
    service: Service;
}

export default function ServiceEdit() {
    const { auth, service } = usePage().props as unknown as Props;
    const { data, setData, put, errors } = useForm({
        name: service.name || "",
        description: service.description || "",
        hourly_rate: service.hourly_rate || "",
        experience: service.experience || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("teacher.services.update", service.id));
    };

    return (
        <TeacherLayout user={auth.user}>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <form onSubmit={handleSubmit} method="POST">
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900 text-center">
                                    Service Details
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600 text-center">
                                    Update the details of your service.
                                </p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        <div className="flex items-center">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Service Name
                                            </label>
                                            <p className="text-red-500">*</p>
                                        </div>

                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                required
                                            />
                                            {errors.name && (
                                                <div className="text-red-600 text-sm mt-1">
                                                    {errors.name}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <div className="flex items-center">
                                            <label
                                                htmlFor="description"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Description
                                            </label>
                                            <p className="text-red-500">*</p>
                                        </div>

                                        <div className="mt-2">
                                            <textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                rows={3}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                required
                                            />
                                            {errors.description && (
                                                <div className="text-red-600 text-sm mt-1">
                                                    {errors.description}
                                                </div>
                                            )}
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-gray-600">
                                            Write a few sentences about the
                                            service.
                                        </p>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <div className="flex items-center">
                                            <label
                                                htmlFor="hourly_rate"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Hourly Rate
                                            </label>
                                            <p className="text-red-500">*</p>
                                        </div>

                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                id="hourly_rate"
                                                value={data.hourly_rate}
                                                onChange={(e) =>
                                                    setData(
                                                        "hourly_rate",
                                                        e.target.value
                                                    )
                                                }
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                required
                                            />
                                            {errors.hourly_rate && (
                                                <div className="text-red-600 text-sm mt-1">
                                                    {errors.hourly_rate}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-full">


                                    <div className="flex items-center">
                                    <label
                                            htmlFor="experience"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Experience
                                        </label>
                                            <p className="text-red-500">*</p>
                                        </div>

                                       
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                id="experience"
                                                value={data.experience}
                                                onChange={(e) =>
                                                    setData(
                                                        "experience",
                                                        e.target.value
                                                    )
                                                }
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                required
                                            />
                                            {errors.experience && (
                                                <div className="text-red-600 text-sm mt-1">
                                                    {errors.experience}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <Link
                                href={route("teacher.services.index")}
                                className="text-sm font-semibold leading-6 text-gray-900"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </TeacherLayout>
    );
}
