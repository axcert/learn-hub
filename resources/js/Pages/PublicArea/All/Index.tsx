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
import lmsLogo from "@/..//../public/asstts/img/lms.webp";
import AXCERTRO from "@/..//../public/asstts/img/AXCERTRO.webp";

import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsArrowUpSquareFill } from "react-icons/bs";

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
            <div
                id="home"
                className="flex justify-between items-center bg-white p-4 shadow-md"
            >
                <Link className="flex items-center" href="/">
                    <img src={logo} className="h-8 mr-3" alt="Dashboard Logo" />
                    <div className="max-sm:hidden whitespace-nowrap w-[53.02px] h-[31px] text-center text-blue-700 text-2xl font-bold font-['Poppins']">
                        LMS
                    </div>
                </Link>
                <div>
                    {auth.user ? (
                        <Link
                            href={
                                auth.user.role === "admin"
                                    ? route("admins.overview.index")
                                    : auth.user.role === "teacher"
                                    ? route("teacher.overviews.index")
                                    : route("students.index")
                            }
                            className="font-semibold text-gray-700 hover:text-gray-950 focus:outline-none"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <a
                                href="#about-us"
                                className=" mr-4 font-semibold text-gray-700 hover:text-gray-950 focus:outline-none "
                            >
                                About us
                            </a>

                            <Link
                                href={route("login")}
                                className="font-semibold text-gray-700 hover:text-gray-950 "
                            >
                                Log in
                            </Link>

                            <Link
                                href={route("register")}
                                className="ml-4 font-semibold text-gray-700 hover:text-gray-950  "
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <div className="mx-auto sm:px-6 lg:px-8 ">
                <div className="overflow-hidden sm:rounded-lg shadow-lg mt-5 bg-gradient-to-r from-blue-600 to-blue-300  p-5">
                    <h2 className="text-white text-2xl font-bold mb-2">
                        Hi, Have a Nice day!
                    </h2>
                    <p className="text-white text-base font-normal mb-4">
                        Let's learn something new today
                    </p>

                    {/* search bar */}
                    <div className="flex justify-center pb-10">
                        <PublicSearchBar
                            onClick={handleSearchClick}
                            onChange={handleSearchChange}
                            searchTerm={searchTerm}
                        />
                    </div>
                </div>
            </div>

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

            {/* services */}
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="overflow-hidden sm:rounded-lg shadow-lg mt-5">
                    <div className="p-6 text-left text-gray-900 font-bold text-3xl bg-gradient-to-r from-blue-300 to-blue-500  rounded-t-lg">
                        Services
                    </div>
                    <div className="flex flex-wrap justify-around gap-5 p-4">
                        <ServiceCarousel data={filteredServices} auth={auth} />
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

            {/* teachers */}
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="overflow-hidden sm:rounded-lg shadow-lg mt-5">
                    <div className="p-6 text-left text-gray-900 font-bold text-3xl bg-gradient-to-r from-blue-300 to-blue-500  rounded-t-lg">
                        Teachers
                    </div>
                    <div className="flex flex-wrap justify-around gap-5 p-4">
                        <TeacherCarousel data={filteredServices} auth={auth} />
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

            {/* about Us */}
            <div
                id="about-us"
                className="mx-auto sm:px-6 lg:px-8 scroll-smooth"
            >
                <div className="overflow-hidden sm:rounded-lg shadow-lg mt-5 bg-white">
                    <div className="p-6 text-left text-gray-900 font-bold text-3xl bg-gradient-to-r from-blue-300 to-blue-500  rounded-t-lg">
                        About Us
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                        <div className="col-span-2 p-4">
                            <p className=" p-6 text-gray-900 capitalize text-lg leading-relaxed tracking-wide max-h-48 max-lg:overflow-y-auto">
                                <span className="font-bold"> A Learning Management System (LMS)</span> is a software
                                application designed to facilitate the
                                administration, documentation, tracking,
                                reporting, automation, and delivery of
                                educational courses, training programs, or
                                learning and development programs. An LMS
                                provides a central platform for educators and
                                trainers to create and manage course content,
                                monitor learner progress, and assess
                                performance. It allows learners to access course
                                materials, complete assignments, participate in
                                discussions, and take quizzes or exams from any
                                location with internet access. By leveraging an
                                LMS, educational institutions and organizations
                                can streamline their training processes, ensure
                                consistency in content delivery, and enhance the
                                overall learning experience for users.
                            </p>
                        </div>
                        <div className="flex justify-center items-center">
                            <img
                                src={lmsLogo}
                                alt="LMS Logo"
                                className="rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ending Page */}
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="overflow-hidden sm:rounded-lg shadow-lg mt-5 bg-gradient-to-r from-blue-600 to-blue-300 flex justify-between">
                    <div className="p-6 text-white font-semibold capitalize  ">
                        <h2 className="text-2xl font-bold mb-4 text-gray-700 ">
                            Thank You for Visiting Larning Management System!

                            <br />

                            <img className="w-44" src={AXCERTRO} alt="" />
                        </h2>
                        <p>
                            We hope you found what you were looking for. If you
                            have any questions or need further assistance,
                            please don't hesitate to contact us.
                        </p>
                        <p className="mt-4">Contact Information:</p>
                        <ul className="list-disc list-inside">
                            <li>
                                Email:{" "}
                                <span className="lowercase">
                                    hello@gmail.com
                                </span>
                            </li>
                            <li>Phone: +194 (775) 499-507</li>
                            <li>
                                Address: B-15,Samagimw, Randiyagama,
                                Sooriyawewa, Sri Lanka
                            </li>
                        </ul>
                        <p className="mt-4">Follow us on social media:</p>
                        <div className="list-disc list-inside flex gap-3 mt-5">
                            <div>
                                <a
                                    href="https://www.facebook.com/axcertro"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaFacebookSquare className="size-10 cursor-pointer hover:text-blue-950" />
                                </a>
                            </div>
                            <div>
                                <a
                                    href="https://www.instagram.com/axcertro/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                     <GrInstagram className="size-10 cursor-pointer hover:text-blue-950" />
                                  
                                </a>
                            </div>

                            <div>
                                <a
                                    href="https://x.com/axcertro?mx=2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                     <FaSquareXTwitter className="size-10 cursor-pointer hover:text-blue-950" />
                                </a>
                            </div>

                            <div className="text ml-10">
                                <a href="#home">
                                    <BsArrowUpSquareFill className="size-9 cursor-pointer hover:text-blue-950 text-end" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="mx-auto sm:px-6 lg:px-8 mb-5">
                <div className="overflow-hidden sm:rounded-lg shadow-lg mt-5 bg-white">
                    <div className="flex flex-wrap justify-around gap-5">
                        <Footer />
                    </div>
                </div>
            </footer>
        </>
    );
}
