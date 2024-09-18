import { Link, Head } from "@inertiajs/react";
import { Filters, PageProps, Service } from "@/types";
import { useEffect, useState } from "react";
import logo from "@/../../public/asstts/img/dashboart-logo.png";
import Footer from "@/Components/Footer/Footer";
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
                        {auth.user ? (
                            <Link
                                href={
                                    auth.user.role === "admin"
                                        ? route("admins.overview.index")
                                        : auth.user.role === "teacher"
                                        ? route("teacher.overviews.index")
                                        : route("students.index")
                                }
                                className="block lg:inline-block text-center hover:text-blue-500 focus:outline-none py-2"
                            >
                                Dashboard
                            </Link>
                        ) : (
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
                                    className="block lg:inline-block font-semibold bg-white text-black rounded-lg py-2 px-4 hover:bg-slate-200 hover:transition duration-200 ease-in-out"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
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
                        {auth.user ? (
                            <Link
                                href={
                                    auth.user.role === "admin"
                                        ? route("admins.overview.index")
                                        : auth.user.role === "teacher"
                                        ? route("teacher.overviews.index")
                                        : route("students.index")
                                }
                                className="text-xl font-bold"
                                onClick={() => setMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                        ) : (
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
                        )}
                    </div>
                </div>
            </header>

            <main>
                <section className="relative bg-[url('/asset/bg-image.jpg')] bg-current bg-fixed bg-no-repeat bg-cover">
                    <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                    <div className="relative flex flex-col p-5 h-[300px] gap-5 justify-center md:h-[200px] lg:h-[300px]">
                        <div className="text-white self-center text-center capitalize">
                            <h2 className="text-2xl font-bold mb-2 sm:text-3xl lg:text-4xl">
                                Hi, Have a Nice Day!
                            </h2>
                            <p className="text-sm font-semibold sm:text-base lg:text-lg mb-4">
                                Let's learn something new today
                            </p>
                        </div>

                        {/* Search bar */}
                        <div className="container mx-auto flex justify-center">
                            <PublicSearchBar
                                onClick={handleSearchClick}
                                onChange={handleSearchChange}
                                searchTerm={searchTerm}
                            />
                        </div>
                    </div>
                </section>

                {/* services */}
                <section className="px-4 sm:px-6 lg:px-32">
                    <div className="flex flex-col mx-auto sm:px-6 lg:px-8">
                        <div className="flex flex-col overflow-hidden sm:rounded-lg mt-5 relative">
                            <div className="flex items-center justify-between w-full py-4">
                                {/* Invisible Spacer for alignment */}
                                <div className="w-20"></div>
                                <h2 className="text-3xl font-bold text-blue-900 leading-tight tracking-wide mx-auto">
                                    Services
                                </h2>
                                {/* See More Link - Positioned to the Right */}
                                <Link
                                    href={getSeeMoreRouteServices()}
                                    className="text-blue-900 hover:underline text-sm font-medium flex items-center space-x-1"
                                >
                                    <span>See More</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                        />
                                    </svg>
                                </Link>
                            </div>

                            {/* Carousel Section */}
                            <div className="p-4">
                                {filteredServices.length > 0 ? (
                                    <ServiceCarousel
                                        data={filteredServices}
                                        auth={auth}
                                    />
                                ) : (
                                    <div className="flex justify-center items-center">
                                        <img
                                            src="/asset/no-result-data.png"
                                            alt="No items found"
                                            className="max-w-20"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* teachers */}
                <section className="px-4 sm:px-6 lg:px-32">
                    <div className="flex flex-col mx-auto sm:px-6 lg:px-8">
                        <div className="flex flex-col overflow-hidden sm:rounded-lg mt-5 relative">
                            <div className="flex items-center justify-between w-full py-4">
                                {/* Invisible Spacer for alignment */}
                                <div className="w-20"></div>
                                <h2 className="text-3xl font-bold text-blue-900 leading-tight tracking-wide mx-auto">
                                    Teachers
                                </h2>
                                <Link
                                    href={getSeeMoreRouteTeachers()}
                                    className="text-blue-900 hover:underline text-sm font-medium flex items-center space-x-1"
                                >
                                    <span>See More</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                        />
                                    </svg>
                                </Link>
                            </div>

                            {/* Carousel Section */}
                            <div className="p-4">
                                {filteredServices.length > 0 ? (
                                    <TeacherCarousel
                                        data={filteredServices}
                                        auth={auth}
                                    />
                                ) : (
                                    <div className="flex justify-center items-center">
                                        <img
                                            src="/asset/no-result-data.png"
                                            alt="No items found"
                                            className="max-w-20 mb-9"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
