import { PageProps } from "@/types";
import logo from "../../../../../../public/asset/Logo.png";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { log } from "console";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Button from "@/Components/Button/Button";
import { useState } from "react";

export default function Edit({ auth, admins }: any) {
    console.log(admins);
    const [aleart, setAleart] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        name: admins.name,
        contact: admins.phone,
        email: admins.email,
    });

    const update = (e: React.FormEvent) => {
        e.preventDefault();

        console.log( "eeee" , e);
        
        setAleart(true);
        setTimeout(() => {
            // router.put(route("admin.adminPanels.update", admins.id)),
            put(route('admin.adminPanels.update', admins.id));
        }, 2000);
    };

    const cansel = () => {
        router.get(route("admin.adminPanels.index"));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className=" bg-gray-100 p-20 h-screen">
                {/* title */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                    <div className="p-6  text-gray-900 flex justify-around flex-wrap items-center gap-5">
                        <div className="flex gap-3 justify-center items-center p-2">
                            <div>
                                <img
                                    className="w-10"
                                    src={logo}
                                    alt="dashBoardlogo"
                                />
                            </div>
                            <p className="uppercase font-bold text-2xl">
                                Admin Update
                            </p>
                        </div>
                    </div>
                </div>

                <br />

                {/* aleart */}
                <div className="p-5">
                    {aleart && (
                        <div
                            className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                            role="alert"
                        >
                            <svg
                                className="flex-shrink-0 inline w-4 h-4 me-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-medium">
                                    Admin Update Success!
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* body */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                    <form onSubmit={update}>
                        <div className="p-5 text-gray-900 flex gap-5 flex-col w-full">
                            <div className="">
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="gap-5">
                                <InputLabel htmlFor="contact" value="Contact" />

                                <TextInput
                                    id="contact"
                                    name="namcontacte"
                                    value={data.contact}
                                    className="mt-1 block w-full"
                                    autoComplete="contact"
                                    onChange={(e) =>
                                        setData("contact", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.contact}
                                    className="mt-2"
                                />
                            </div>

                            <div className="gap-5">
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="email"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex gap-5">
                                <div className="">
                                    {/* <Button
                                    name="Update"
                                    className="bg-green-600 w-48 duration-300 ease-in-out transition-all text-white px-6 py-2 rounded-lg hover:bg-green-700"
                                    onClick={update}
                                /> */}

                                    <button type="submit" className="bg-green-600 w-48 duration-300 ease-in-out transition-all text-white px-6 py-2 rounded-lg hover:bg-green-700">
                                        Update
                                    </button>
                                </div>

                                <div>
                                    <Button
                                        name="Cansel"
                                        className="bg-red-600 w-48 d duration-300 ease-in-out transition-all text-white px-6 py-2 rounded-lg hover:bg-red-700"
                                        onClick={cansel}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
