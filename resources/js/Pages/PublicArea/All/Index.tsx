import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import logo from "@/../../public/asstts/img/dashboart-logo.png";
import PublicSearchBar from "@/Components/SearchBar/PublicSearchBar";
import { useState } from "react";
import Footer from "@/Components/Footer/Footer";
import A from "@/../../public/asset/A.png";
import B from "@/../../public/asset/B.png";
import Card from "@/Components/Card/Card";
import ProfileCard from "@/Components/ProfileCard/ProfileCard";
interface WelcomeProps {
    auth: {
        user: {
            role: string;
        };
    };
    services: Array<any>;
}


export default function Index({ auth, services }:WelcomeProps) {

    const handleSearchClick = ()=>{}
    const handleSearchChange = ()=>{}

     return (
        <>
            <Head title="Welcome" />
            <div className="flex justify-between items-center bg-white p-4 shadow-md">
                <div className="flex items-center">
                    <img src={logo} className="h-8 mr-3" alt="Dashboard Logo" />
                    <div className="text-black text-xl font-semibold sm:text-2xl whitespace-nowrap">
                        LMS
                    </div>
                </div>
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

            <div className="bg-blue-500 overflow-hidden shadow-sm">
                <div className="p-6 text-gray-900">
                    <h2 className="text-white text-2xl font-bold mb-2">
                        Hi, Have a Nice day!
                    </h2>
                    <p className="text-white text-base font-normal mb-4">
                        Let's learn something new today
                    </p>
                    <div className="flex justify-center">
                        <PublicSearchBar
                            placeholder="Search for courses or teachers"
                            onClick={handleSearchClick}
                            onChange={handleSearchChange}
                            searchTerm={'null'}
                        />
                    </div>
                    <p className="text-white font-normal mt-2">
                        Popular: UI design, C++, Java
                    </p>
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

            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="overflow-hidden sm:rounded-lg shadow-lg mt-5">
                    <div className="p-4 text-gray-900 font-bold">Services</div>
                    <div className="flex flex-wrap justify-around gap-5 p-4 overflow-x-scroll">
                        {services.map((service) => (
                            <ProfileCard
                                key={service.id}
                                img={service.image_url}
                                title={service.name}
                                name={service.teacher.user.name}
                                service={service.description}
                                rating={service.average_rating}
                                price={service.hourly_rate}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mx-auto sm:px-6 lg:px-8 mt-5">
                <div className="bg-red-500 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">You're logged in!</div>
                </div>
            </div>

            <div className="mt-5">
                <Footer />
            </div>
        </>
    );
};

