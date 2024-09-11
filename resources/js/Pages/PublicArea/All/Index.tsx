import { Link, Head } from "@inertiajs/react";
import { Filters, PageProps, Service } from "@/types";
import logo from "@/../../public/asstts/img/dashboart-logo.png";

import { useEffect, useState } from "react";
import Footer from "@/Components/Footer/Footer";
import A from "@/../../public/asset/A.png";
import B from "@/../../public/asset/B.png";
import ServiceCarousel from "@/Pages/PublicArea/All/Partials/ServiceCarousel";
import TeacherCarousel from "./Partials/TeacherCarousel";
import PublicSearchBar from "./Partials/PublicSearchBar";

interface WelcomeProps {
    auth: {
        user: {
            role: string;
        };
    };
    services: Array<any>;
    filters: Filters;
}

export default function Index({
    auth,
    services = [],
    search = "",
}: WelcomeProps & { search?: string }) {
    const [searchTerm, setSearchTerm] = useState<string>(search || "");

    const [imgFilter, setImgFilter] = useState(true);

    const [menuOpen, setMenuOpen] = useState(false);

    const filteredServices = services.filter(
        (service) =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (service.teacher &&
                service.teacher.user.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImgFilter(false);
        setSearchTerm(e.target.value);

        // if (imgFilter === false) {
        //     setImgFilter(true);
        // }
    };

    const handleSearchClick = () => {};

    const getSeeMoreRouteServices = () => {
        if (!auth.user) {
            return route("register");
        } else if (auth.user.role === "teacher") {
            return route("teacher.overviews.index");
        } else if (auth.user.role === "admin") {
            return route("admin.services.index");
        }
        return route("student.services.index");
    };

    const getSeeMoreRouteTeachers = () => {
        if (!auth.user) {
            return route("register");
        } else if (auth.user.role === "teacher") {
            return route("teachers.index");
        } else if (auth.user.role === "admin") {
            return route("admin.teachers.index");
        }
        return route("student.teachers.index");
    };

    useEffect(() => {
        const aboutUsLink = document.querySelector('a[href="#about-us"]');
        const homeLink = document.querySelector('a[href="#home"]');

        const handleSmoothScroll = (e: Event, targetId: string) => {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        };

        if (aboutUsLink) {
            aboutUsLink.addEventListener("click", (e) =>
                handleSmoothScroll(e, "#about-us")
            );
        }

        if (homeLink) {
            homeLink.addEventListener("click", (e) =>
                handleSmoothScroll(e, "#home")
            );
        }

        return () => {
            if (aboutUsLink) {
                aboutUsLink.removeEventListener("click", (e) =>
                    handleSmoothScroll(e, "#about-us")
                );
            }
            if (homeLink) {
                homeLink.removeEventListener("click", (e) =>
                    handleSmoothScroll(e, "#home")
                );
            }
        };
    }, []);

    return (
        <>
            <Head title="Welcome" />
            <header id="home" className="z-20 sticky top-0 bg-gray-900">
                <nav className="container mx-auto flex items-center justify-between px-6 lg:px-0 py-0 h-[5rem]">
                    {/* Logo Section */}
                    <Link
                        className="flex w-1/4 items-center justify-center"
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
                        onClick={() => setMenuOpen(!menuOpen)} // Assuming you manage state to toggle menu
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

                    {/* Main Navigation */}
                    <div
                        className={`${
                            menuOpen ? "block" : "hidden"
                        } w-full lg:flex lg:w-auto lg:space-x-12 justify-center items-center lg:ml-12`}
                    >
                        {auth.user ? (
                            <Link
                                href={
                                    auth.user.role === "admin"
                                        ? route("admins.overview.index")
                                        : auth.user.role === "teacher"
                                        ? route("teacher.overviews.index")
                                        : route("students.index")
                                }
                                className="block lg:inline-block text-center text-gray-700 hover:text-blue-500 focus:outline-none py-2"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <div className="text-white text-base flex flex-col lg:flex-row lg:gap-10 items-center lg:items-start py-2">
                                <a
                                    href="#about-us"
                                    className="block lg:inline-block mr-4 font-semibold hover:text-blue-500 focus:outline-none"
                                >
                                    About us
                                </a>

                                <Link
                                    href={route("login")}
                                    className="block lg:inline-block font-semibold hover:text-blue-500"
                                >
                                    Log in
                                </Link>

                                <Link
                                    href={route("register")}
                                    className="block lg:inline-block ml-4 font-semibold hover:text-blue-500"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="w-1/4 sm:visible"></div>
                </nav>
            </header>

            <main>
                <section className="bg-[url('/asset/bg-image.jpg')] bg-current bg-fixed bg-no-repeat">
                    <div className=" p-5 h-[270px]">
                        <h2 className="text-white text-2xl font-bold mb-2">
                            Hi, Have a Nice day!
                        </h2>
                        <p className="text-white text-base font-normal mb-4">
                            Let's learn something new today
                        </p>

                        {/* search bar */}

                        <div className="container mx-auto justify-center flex self-center">
                            <PublicSearchBar
                                onClick={handleSearchClick}
                                onChange={handleSearchChange}
                                searchTerm={searchTerm}
                            />
                        </div>
                    </div>
                </section>

                <section className="pt-10">
                    {" "}
                    {imgFilter && (
                        <div className="flex flex-wrap items-center justify-around p-4 mt-4">
                            <div className="bg-white flex justify-center p-4 m-2">
                                <img className="h-25 w-auto" src={A} alt="A" />
                            </div>
                            <div className="bg-white flex justify-center p-4 m-2">
                                <img className="h-25 w-auto" src={B} alt="B" />
                            </div>
                        </div>
                    )}
                </section>

                {/* services */}
                <section>
                    <div className="mx-auto sm:px-6 lg:px-8">
                        <div className="overflow-hidden sm:rounded-lg shadow-lg mt-5">
                            <div className="p-6 text-left text-gray-900 font-bold text-3xl bg-gradient-to-r from-blue-300 to-blue-500  rounded-t-lg">
                                Services
                            </div>
                            <div className="flex flex-wrap justify-around gap-5 p-4">
                                <ServiceCarousel
                                    data={filteredServices}
                                    auth={auth}
                                />
                            </div>
                            <div className="">
                                <Link href={getSeeMoreRouteServices()}>
                                    <p className="text-center  text-blue-600 -mt-9 hover:underline p-5">
                                        See More...
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* teachers */}
                <section>
                    <div className="mx-auto sm:px-6 lg:px-8">
                        <div className="overflow-hidden sm:rounded-lg shadow-lg mt-5">
                            <div className="p-6 text-left text-gray-900 font-bold text-3xl bg-gradient-to-r from-blue-300 to-blue-500  rounded-t-lg">
                                Teachers
                            </div>
                            <div className="flex flex-wrap justify-around gap-5 p-4">
                                <TeacherCarousel
                                    data={filteredServices}
                                    auth={auth}
                                />
                            </div>

                            <div>
                                <Link href={getSeeMoreRouteTeachers()}>
                                    <p className="text-center  text-blue-600 -mt-9 hover:underline p-5">
                                        See More...
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
