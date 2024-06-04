import { useState, PropsWithChildren, ReactNode } from "react";
import { User } from "@/types";
import dahbordLogo from "../../../public/asset/Logo.png";
import { Link } from "@inertiajs/react";
import AvatarBoard from "@/Components/AvatarBoard/AvatarBoard";
import { IoPieChartSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { MdAdminPanelSettings } from "react-icons/md";

export default function AdminLayout({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [menu, setMenu] = useState(false);
    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-blue-950 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3  ">
                    <div className="flex items-center justify-between ">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                onClick={() => setMenu(!menu)}
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-white hover:text-black rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    />
                                </svg>
                            </button>
                            <div className="flex ms-2 md:me-24 ">
                                <img
                                    src={dahbordLogo}
                                    className="h-8 me-3"
                                    alt="FlowBite Logo"
                                />
                                <div className="self-center text-white text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white ">
                                    LMS
                                </div>
                            </div>
                        </div>
                        {/* AvatarBoard */}
                        <AvatarBoard user={user} />
                    </div>
                </div>
            </nav>

            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
                    menu ? "translate-x-0" : "-translate-x-full"
                } bg-white  border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
                aria-label="Sidebar"
            >
                <div className="h-screen px-3 pb-4 p-5 overflow-y-auto dark:bg-gray-800 bg-blue-950 -mt-4">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                href={route("admins.overview.index")}
                                className="flex items-center p-2 text-white hover:text-black rounded-lg dark:text-white hover:bg-gray-100  dark:hover:bg-gray-700 group"
                            >
                                <IoPieChartSharp className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <h1 className="ms-3">Overview</h1>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route("admin.services.index")}
                                className="flex items-center p-2  text-white hover:text-black  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <MdDashboard className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <h1 className="ms-3">Service</h1>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route("admin.teachers.index")}
                                className="flex items-center p-2  text-white hover:text-black rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <GiTeacher className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <h1 className="ms-3">Teacher</h1>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={route("admin.students.index")}
                                className="flex items-center p-2  text-white hover:text-black rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <PiStudentFill className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <h1 className="ms-3">Student</h1>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={route("admin.adminPanels.index")}
                                className="flex items-center p-2 text-white hover:text-black  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <MdAdminPanelSettings className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <h1 className="ms-3">Admin</h1>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64 col-start-2 col-end-7 bg-zinc-100 h-full">
                {header && (
                    <header className="bg-white shadow dark:bg-gray-800">
                        {header}
                    </header>
                )}
                <main className="mt-14">{children}</main>
                <footer className="py- text-center text-xs select-none">
                    <div className="m-0 ">
                        <p className="m-0 font-light">
                            All Rights Reserved by Axcertro
                            <br />
                            Powered by | imesh.hirushan@axcertro.com
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
