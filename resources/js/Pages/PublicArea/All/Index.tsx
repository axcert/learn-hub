import { Link, Head } from "@inertiajs/react";
import { Filters, PageProps, Service } from "@/types";
import logo from "@/../../public/asstts/img/dashboart-logo.png";

import { useState } from "react";
import Footer from "@/Components/Footer/Footer";
import A from "@/../../public/asset/A.png";
import B from "@/../../public/asset/B.png";
import Card from "@/Components/Card/Card";
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
    // services: Service[];
    filters: Filters;
}

export default function Index({
    auth,
    services=[],
    search = "",
}: WelcomeProps & { search?: string }) {
    const [searchTerm, setSearchTerm] = useState<string>(search || "");

   

    const filteredServices = services.filter(
        (service) =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (service.teacher &&
                service.teacher.user.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
    );

    const pageCount = Math.ceil(filteredServices.length);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {

    };

    return (
        <>
            <Head title="Welcome" />
            <div className="flex justify-between items-center bg-white p-4 shadow-md">
                <Link className="flex items-center"
                href="/"
                >
                    <img src={logo} className="h-8 mr-3" alt="Dashboard Logo" />
                    <div className="sm:text-2xl whitespace-nowrap w-[53.02px] h-[31px] text-center text-blue-700 text-2xl font-bold font-['Poppins']">
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
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route("register")}
                                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <div className="bg-blue-500 overflow-hidden shadow-sm max-w-7xl mx-auto rounded-2xl mt-5">
                <div className="p-6 text-gray-900">
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

            <div className="flex flex-wrap items-center justify-around p-4 mt-4">
                <div className="bg-white flex justify-center p-4 m-2">
                    <img className="h-25 w-auto" src={A} alt="A" />
                </div>
                <div className="bg-white flex justify-center p-4 m-2">
                    <img className="h-25 w-auto" src={B} alt="B" />
                </div>
            </div>

            {/* services */}
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="overflow-hidden sm:rounded-lg shadow-lg mt-5">
                    <div className="p-4 text-gray-900 font-bold text-xl ">
                        Services
                    </div>
                    <div className="flex flex-wrap justify-around gap-5 p-4">
                        <ServiceCarousel data={services}  auth={auth}/>
                    </div>
                </div>
            </div>

            {/* teachers */}
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="overflow-hidden sm:rounded-lg shadow-lg mt-5">
                    <div className="p-4 text-gray-900 font-bold text-xl ">
                        Teachers
                    </div>
                    <div className="flex flex-wrap justify-around gap-5 p-4">
                        <TeacherCarousel data={services} auth={auth}/>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <Footer />
            </div>
        </>
    );
}