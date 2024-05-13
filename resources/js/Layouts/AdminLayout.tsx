import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { User } from "@/types";
import { FaHome } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import Temp from "@/Pages/Temp";
import { Link } from "@inertiajs/react";

export default function AdminLayout({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="p-3">
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white border-b bg-teal-700 rounded-t-lg">
                    <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex ">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                    </Link>
                                    <div className="ml-5">
                                        <h3 className="text-white font-bold ">
                                            Learn-Hub
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ms-6 ">
                                <div className="ms-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150 "
                                                >
                                                    {user.name}

                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            (showingNavigationDropdown ? "block" : "hidden") +
                            " sm:hidden"
                        }
                    >
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("admin.index")}
                                active={route().current("admin.index")}
                            >
                                Home
                            </ResponsiveNavLink>
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="p-3">
                                    <div className="min-h-screen bg-gray-100">
                                        <nav className="bg-white border-b bg-teal-700 rounded-t-lg">
                                            <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                                                <div className="flex justify-between h-16">
                                                    <div className="flex ">
                                                        <div className="shrink-0 flex items-center">
                                                            <Link href="/">
                                                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                                            </Link>
                                                            <div className="ml-5">
                                                                <h3 className="text-white font-bold ">
                                                                    Learn-Hub
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="hidden sm:flex sm:items-center sm:ms-6 ">
                                                        <div className="ms-3 relative">
                                                            <Dropdown>
                                                                <Dropdown.Trigger>
                                                                    <span className="inline-flex rounded-md">
                                                                        <button
                                                                            type="button"
                                                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150 "
                                                                        >
                                                                            {
                                                                                user.name
                                                                            }

                                                                            <svg
                                                                                className="ms-2 -me-0.5 h-4 w-4"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                viewBox="0 0 20 20"
                                                                                fill="currentColor"
                                                                            >
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                                    clipRule="evenodd"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                    </span>
                                                                </Dropdown.Trigger>

                                                                <Dropdown.Content>
                                                                    <Dropdown.Link
                                                                        href={route(
                                                                            "profile.edit"
                                                                        )}
                                                                    >
                                                                        Profile
                                                                    </Dropdown.Link>
                                                                    <Dropdown.Link
                                                                        href={route(
                                                                            "logout"
                                                                        )}
                                                                        method="post"
                                                                        as="button"
                                                                    >
                                                                        Log Out
                                                                    </Dropdown.Link>
                                                                </Dropdown.Content>
                                                            </Dropdown>
                                                        </div>
                                                    </div>

                                                    <div className="-me-2 flex items-center sm:hidden">
                                                        <button
                                                            onClick={() =>
                                                                setShowingNavigationDropdown(
                                                                    (
                                                                        previousState
                                                                    ) =>
                                                                        !previousState
                                                                )
                                                            }
                                                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                                        >
                                                            <svg
                                                                className="h-6 w-6"
                                                                stroke="currentColor"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    className={
                                                                        !showingNavigationDropdown
                                                                            ? "inline-flex"
                                                                            : "hidden"
                                                                    }
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M4 6h16M4 12h16M4 18h16"
                                                                />
                                                                <path
                                                                    className={
                                                                        showingNavigationDropdown
                                                                            ? "inline-flex"
                                                                            : "hidden"
                                                                    }
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M6 18L18 6M6 6l12 12"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className={
                                                    (showingNavigationDropdown
                                                        ? "block"
                                                        : "hidden") +
                                                    " sm:hidden"
                                                }
                                            >
                                                <div className="pt-2 pb-3 space-y-1">
                                                    <ResponsiveNavLink
                                                        href={route(
                                                            "admin.index"
                                                        )}
                                                        active={route().current(
                                                            "admin.index"
                                                        )}
                                                    >
                                                        Home
                                                    </ResponsiveNavLink>
                                                </div>

                                                <div className="pt-4 pb-1 border-t border-gray-200">
                                                    <div className="px-4">
                                                        <div className="font-medium text-base text-gray-800">
                                                            {user.name}
                                                        </div>
                                                        <div className="font-medium text-sm text-gray-500">
                                                            {user.email}
                                                        </div>
                                                    </div>

                                                    <div className="mt-3 space-y-1">
                                                        <ResponsiveNavLink
                                                            href={route(
                                                                "profile.edit"
                                                            )}
                                                        >
                                                            Profile
                                                        </ResponsiveNavLink>
                                                        <ResponsiveNavLink
                                                            method="post"
                                                            href={route(
                                                                "logout"
                                                            )}
                                                            as="button"
                                                        >
                                                            Log Out
                                                        </ResponsiveNavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </nav>

                                        {header && (
                                            <header className="bg-white shadow">
                                                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                                                    {header}
                                                </div>
                                            </header>
                                        )}

                                        <main>
                                            <button
                                                data-drawer-target="sidebar-multi-level-sidebar"
                                                data-drawer-toggle="sidebar-multi-level-sidebar"
                                                aria-controls="sidebar-multi-level-sidebar"
                                                type="button"
                                                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                            ></button>

                                            <div className="flex text-white mt-2">
                                                <div className="h-screen w-60 bg-teal-700 rounded-lg items-center justify-start">
                                                    <ul className="font-medium">
                                                        <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100  hover:text-black transition duration-300">
                                                            <Link
                                                                href=""
                                                                className="flex  items-center justify-center gap-2 py-4"
                                                            >
                                                                <FaHome className=""></FaHome>
                                                                <h1 className="">
                                                                    Home
                                                                </h1>
                                                            </Link>
                                                        </li>

                                                        <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100  hover:text-black transition duration-300">
                                                            <Link
                                                                href=""
                                                                className="flex  items-center justify-center gap-2 py-4"
                                                            >
                                                                <GiTeacher />
                                                                <h1 className="">
                                                                    Totur
                                                                </h1>
                                                            </Link>
                                                        </li>

                                                        <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100 hover:text-black transition duration-300">
                                                            <Link
                                                                href=""
                                                                className="flex  items-center justify-center gap-2 py-4"
                                                            >
                                                                <PiStudentFill />
                                                                <h1 className="">
                                                                    Student
                                                                </h1>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className=" bg-gray-200 rounded-lg p-4 ">
                                                    {children}
                                                </div>
                                            </div>
                                        </main>
                                    </div>
                                </div>
                                <div className="font-medium text-base text-gray-800">
                                    {user.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main>
                    <div className="flex text-white mt-2 ">
                        <div className="h-screen w-60 bg-teal-700 rounded-lg items-center justify-start">
                            <ul className="font-medium">
                                <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100  hover:text-black transition duration-300">
                                    <a
                                        href=""
                                        className="flex  items-center justify-center gap-2 py-4"
                                    >
                                        <FaHome className=""></FaHome>
                                        <h1 className="">Home</h1>
                                    </a>
                                </li>

                                <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100  hover:text-black transition duration-300">
                                    <a
                                        href=""
                                        className="flex  items-center justify-center gap-2 py-4"
                                    >
                                        <GiTeacher />
                                        <h1 className="">Totur</h1>
                                    </a>
                                </li>

                                <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100 hover:text-black transition duration-300">
                                    <a
                                        href=""
                                        className="flex  items-center justify-center gap-2 py-4"
                                    >
                                        <PiStudentFill />
                                        <h1 className="">Student</h1>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className=" bg-gray-200 rounded-lg p-4 w-full">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
