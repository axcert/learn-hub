import { useEffect, FormEventHandler, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import logo from "@/../../public/asstts/img/dashboart-logo.png";
import Footer from "@/Components/Footer/Footer";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header id="home" className="z-20 sticky top-0 bg-gray-900">
                <nav className="container mx-auto flex items-center justify-between px-6 lg:px-0 py-0 h-[5rem]">
                    {/* Logo Section */}
                    <Link
                        className="flex w-1/5 items-center justify-center"
                        href="/"
                    >
                        <img
                            src={logo}
                            className="h-8 mr-3"
                            alt="Dashboard Logo"
                        />
                        <div className="hidden sm:flex whitespace-nowrap text-center text-white text-4xl font-bold">
                            LMS
                        </div>
                    </Link>

                    {/* Hamburger Menu for Small Screens */}
                    <button
                        id="menu-button"
                        className="block lg:hidden text-white focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)} // State toggling for the menu
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>

                    {/* Main Navigation for Larger Screens */}
                    <div className="hidden w-full lg:flex lg:w-auto lg:space-x-12 justify-center items-center text-white">
                        <div className="text-base flex flex-col lg:flex-row lg:gap-10 items-center lg:items-start py-2 mr-16">
                            <a
                                href="#about-us"
                                className="block lg:inline-block mr-4 font-semibold hover:text-blue-500 focus:outline-none self-center"
                            >
                                About us
                            </a>

                            <Link
                                href={route("login")}
                                className="block lg:inline-block font-semibold hover:text-blue-500 self-center"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route("register")}
                                className="block lg:inline-block font-semibold hover:transition duration-200 ease-in-out bg-white text-black rounded-lg py-2 px-4 hover:bg-slate-200"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Sliding Menu for Mobile */}
                <div
                    className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-95 z-50 transform ${
                        menuOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out lg:hidden`}
                >
                    <div className="flex justify-between items-center px-4 py-5">
                        {/* Close button */}
                        <button
                            className="text-white focus:outline-none"
                            onClick={() => setMenuOpen(false)} // Close menu
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center h-full text-white space-y-8">
                        <Link
                            href="/"
                            className="text-xl font-bold"
                            onClick={() => setMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <a
                            href="#about-us"
                            className="text-xl font-bold"
                            onClick={() => setMenuOpen(false)}
                        >
                            About Us
                        </a>
                        <Link
                            href={route("login")}
                            className="text-xl font-bold"
                            onClick={() => setMenuOpen(false)}
                        >
                            Log in
                        </Link>
                        <Link
                            href={route("register")}
                            className="text-xl font-bold"
                            onClick={() => setMenuOpen(false)}
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </header>

            <GuestLayout>
                <Head title="Log in" />

                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Forgot your password?
                            </Link>
                        )}

                        <PrimaryButton className="ms-4" disabled={processing}>
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </GuestLayout>
            <Footer />
        </>
    );
}
