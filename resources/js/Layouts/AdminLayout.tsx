import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { User } from "@/types";
import { Link } from "@inertiajs/react";
import dahbordLogo from "../../../public/asstts/img/dashboart-logo.png";
import { AiFillDashboard } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { BsEnvelopeExclamationFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";

export default function AdminLayout({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <section>
            <div className="grid grid-cols-6">
                {/* lms */}
                <div className=" bg-blue-950 row-span-3 h-screen text-white">
                    <div className="flex gap-3 justify-center items-center p-8">
                        <div>
                            <img
                                className="w-14"
                                src={dahbordLogo}
                                alt="dashBoardlogo"
                            />
                        </div>
                        <p className="uppercase font-bold text-2xl">lms</p>
                    </div>
                    <hr />
                    <div className="py-5">
                        <ul className="font-medium flex items-center justify-center flex-col">
                            <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100  hover:text-black transition duration-300">
                                <Link
                                    href={route("home.index")}
                                    className="flex  items-center justify-center gap-2 py-4"
                                >
                                    <AiFillDashboard />
                                    <h1 className="">Overview</h1>
                                </Link>
                            </li>

                            <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100  hover:text-black transition duration-300">
                                <Link
                                    href={route("teacher.index")}
                                    className="flex  items-center justify-center gap-2 py-4"
                                >
                                    <FaUsers />
                                    <h1 className="">Users</h1>
                                </Link>
                            </li>

                            <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100 hover:text-black transition duration-300">
                                <Link
                                    href={route("student.index")}
                                    className="flex  items-center justify-center gap-2 py-4"
                                >
                                    <MdDashboardCustomize />
                                    <h1 className="">Service</h1>
                                </Link>
                            </li>

                            <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100 hover:text-black transition duration-300">
                                <Link
                                    href={""}
                                    className="flex  items-center justify-center gap-2 py-4"
                                >
                                    <GiTeacher />
                                    <h1 className="">Teacher</h1>
                                </Link>
                            </li>

                            <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100 hover:text-black transition duration-300">
                                <Link
                                    href={""}
                                    className="flex  items-center justify-center gap-2 py-4"
                                >
                                    <PiStudentFill />
                                    <h1 className="">Student</h1>
                                </Link>
                            </li>

                            <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100 hover:text-black transition duration-300">
                                <Link
                                    href={""}
                                    className="flex  items-center justify-center gap-2 py-4"
                                >
                                    <BsEnvelopeExclamationFill />
                                    <h1 className="">Inquery</h1>
                                </Link>
                            </li>

                            <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100 hover:text-black transition duration-300">
                                <Link
                                    href={""}
                                    className="flex  items-center justify-center gap-2 py-4"
                                >
                                    <IoSettings />
                                    <h1 className="">Settings</h1>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <hr className="" />
                    <footer className="py-10 text-center text-xs">
                        <div className="m-0 ">
                            <p className="m-0 font-light">
                              All Rights reserved
                                by Axcertro<br />imesh.hirushan@axcertro.com
                            </p>
                        </div>
                    </footer>
                </div>

                {/* heade */}
                <div className="col-start-2 col-end-7 bg-white  p-5">
                    Dashboard
                </div>

                {/* contend */}
                <div className="col-start-2 col-end-7 bg-zinc-100  p-5">03</div>
            </div>
        </section>
    );
}
