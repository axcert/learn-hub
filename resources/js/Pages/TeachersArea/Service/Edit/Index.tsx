import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { useForm, Link, usePage } from "@inertiajs/react";
import { User,  } from "@/types";
import TeacherLayout from "@/Layouts/TeacherLayout";
import { useDropzone } from "react-dropzone";

interface Props {
    auth: {
        user: User;
    };
    service: Service;
}

interface Service {
    id: number;
    image_url : any;
    name: string;
    description: string;
    hourly_rate: string;
    experience: string;
    image: string | null;
}

export default function ServiceEdit() {
    const { auth, service } = usePage().props as unknown as Props;
    const [images, setImages] = useState<any[]>([]);
    const [canCleanImage, setCanCleanImage] = useState(false);
    const { data, setData, post, errors, progress } = useForm({
        name: service.name || "",
        description: service.description || "",
        hourly_rate: service.hourly_rate || "",
        experience: service.experience || "",
        image: null as File | null,
    });

    useEffect(() => {
        if (service.image_url) { 
            setImages([{ preview: service.image_url }]);
        }
    }, [service.image_url]);

    const {
        getRootProps: getRootDesktopProps,
        getInputProps: getInputDesktopProps,
    } = useDropzone({
        accept: {
            'image/*': [],
        },
        onDrop: (acceptedFiles: any) => {
            setImages(
                acceptedFiles.map((file: any) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );

            setCanCleanImage(true);
            setData('image', acceptedFiles[0]);
        },
    });

    const thumb = images.map((file: any, index: number) => (
        <div key={index}>
            <div>
                <img
                    alt={file.name || 'Preview'}
                    src={file.preview}
                    width={300}
                    height={300}
                    className="h-[200px] w-full overflow-hidden object-contain rounded-xl bg-gray-700"
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                    }}
                />
            </div>
        </div>
    ));

    const remove = () => {
        setImages([]);
        setCanCleanImage(false);
        setData('image', null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("teacher.services.update", service.id));
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
                    <div>
                        <label htmlFor="image" className="block font-medium text-gray-700">
                            Image
                        </label>
                        <div className="mt-2 grid justify-center rounded-xl border-2 border-dashed px-6 py-2 w-full">
                            <div className="relative flex items-center h-full w-full min-h-[200px]">
                                <div
                                    {...getRootDesktopProps({
                                        className: 'dropzone',
                                    })}
                                    className="object-cover h-full w-full min-h-[200px] cursor-pointer flex rounded-xl bg-slate-200"
                                >
                                    <input
                                        type="file"
                                        {...getInputDesktopProps()}
                                    />
                                    {images.length > 0 ? (
                                        thumb
                                    ) : service.image ? (
                                        <img
                                            src={service.image_url}
                                            alt="Profile Image"
                                            className="h-[200px] w-auto flex overflow-hidden rounded-xl bg-gray-50"
                                        />
                                    ) : (
                                        <span className="mx-auto left-4 right-4 absolute self-center grid text-center text-gray-900">
                                            Upload Image
                                        </span>
                                    )}
                                </div>
                                {progress && (
                                    <progress
                                        value={progress.percentage}
                                        className="h-2 bg-emerald-500 absolute top-0 left-0"
                                        max="100"
                                    >
                                        {progress.percentage}%
                                    </progress>
                                )}
                            </div>
                            {canCleanImage && (
                                <button
                                    className="z-10 mx-auto mt-2 w-[70px] rounded bg-gray-300 py-1 px-2 text-sm text-gray-700 hover:bg-gray-500 hover:text-gray-900"
                                    type="button"
                                    onClick={remove}
                                >
                                    Clean
                                </button>
                            )}
                            {canCleanImage ? null : (
                                <div className="ml-3 mt-1 text-xs font-light text-gray-500 text-center">
                                    Drag and drop or click to replace
                                </div>
                            )}
                            {errors.image && <div className="text-red-500">{errors.image}</div>}
                        </div>
                    </div>
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

