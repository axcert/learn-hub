import { useEffect, useState, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PageProps } from "@inertiajs/inertia";
import logo from "@/../../public/asstts/img/dashboart-logo.png";
import Footer from "@/Components/Footer/Footer";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "student",
        phone: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);
    const flash: any = usePage<PageProps>().props;

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("register"));
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
                <Head title="Register" />
                {flash.success && (
                    <div className="bg-green-500 text-white p-4 rounded mb-4">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div>
                        <div className="flex items-center">
                            <InputLabel htmlFor="name" value="Name" />
                            <p className="text-red-500">*</p>
                        </div>

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center">
                            <InputLabel htmlFor="email" value="Email" />
                            <p className="text-red-500">*</p>
                        </div>

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center">
                            <InputLabel htmlFor="phone" value="Phone" />
                            <p className="text-red-500">*</p>
                        </div>

                        <TextInput
                            id="phone"
                            type="tel"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-full"
                            autoComplete="tel"
                            onChange={(e) => setData("phone", e.target.value)}
                            required
                        />

                        <InputError message={errors.phone} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center">
                            <InputLabel htmlFor="password" value="Password" />
                            <p className="text-red-500">*</p>
                        </div>

                        <div className="relative">
                            <TextInput
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />
                            <p className="text-red-500">*</p>
                        </div>

                        <div className="relative">
                            <TextInput
                                id="password_confirmation"
                                type={
                                    showPasswordConfirmation
                                        ? "text"
                                        : "password"
                                }
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />
                            <span
                                onClick={() =>
                                    setShowPasswordConfirmation(
                                        !showPasswordConfirmation
                                    )
                                }
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            >
                                {showPasswordConfirmation ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </span>
                        </div>

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center">
                            <InputLabel htmlFor="role" value="Role" />
                            <p className="text-red-500">*</p>
                        </div>

                        <div className="block">
                            <label className="inline-flex items-center mr-6 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={data.role === "student"}
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                    className="form-radio text-blue-600 cursor-pointer"
                                    required
                                />
                                <span className="ml-2 text-gray-700">
                                    Student
                                </span>
                            </label>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="teacher"
                                    checked={data.role === "teacher"}
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                    className="form-radio text-blue-600 cursor-pointer"
                                    required
                                />
                                <span className="ml-2 text-gray-700">
                                    Teacher
                                </span>
                            </label>
                        </div>

                        <InputError message={errors.role} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route("login")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Already registered?
                        </Link>

                        <PrimaryButton className="ms-4" disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </GuestLayout>
            <Footer />
        </>
    );
}
