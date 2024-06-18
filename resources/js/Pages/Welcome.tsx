// import { Link, Head } from "@inertiajs/react";
// import { PageProps } from "@/types";
// import Footer from "@/Components/Footer/Footer";
// import A from "../../../public/asset/A.png";
// import B from "../../../public/asset/B.png";
// import Logo from "../../../public/asset/Logo.png";
// import { useState } from "react";
// import PublicSearchBar from "@/Components/SearchBar/PublicSearchBar";

// export default function Welcome({
//     auth,
    

// }: PageProps<{ laravelVersion: string; phpVersion: string }>) {
//     const [searchTerm, setSearchTerm] = useState<string>("");

//     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(e.target.value);
//     };

//     const handleSearchClick = () => {
//         console.log("Search clicked:", searchTerm);
//     };

//     return (
//         <>
//             <Head title="Welcome" />
//             <div className="min-h-screen bg-gray-100 flex flex-col">
//                 <div className="relative w-full max-w-7xl mx-auto px-4 lg:px-8">
//                     <nav className="w-full flex flex-col lg:flex-row justify-between items-center mt-4 bg-white rounded-2xl shadow p-4 lg:p-2">
//                         <Link href="/" className="flex items-center mb-4 lg:mb-0">
//                             <img className="h-9 w-auto" src={Logo} alt="Logo" />
//                             <div className="ml-2 text-blue-700 text-2xl font-bold font-['Poppins']">
//                                 LMS
//                             </div>
//                         </Link>
//                         <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
//                             <div className="text-gray-700 text-lg font-medium font-['Poppins']">
//                                 About us
//                             </div>
//                             <div className="text-gray-700 text-lg font-medium font-['Poppins']">
//                                 Support
//                             </div>
//                             {auth.user ? (
//                                 <Link
//                                     href={
//                                         auth.user.role === "admin"
//                                             ? route("admins.overview.index")
//                                             : auth.user.role === "teacher"
//                                             ? route("teacher.overviews.index")
//                                             : route("students.index")
//                                     }
//                                     className="rounded-md px-3 py-2 font-semibold text-white bg-blue-500 transition hover:bg-blue-700 focus:outline-none focus-visible:ring-[#FF2D20]"
//                                 >
//                                     Dashboard
//                                 </Link>
//                             ) : (
//                                 <>
//                                     <Link
//                                         href={route("register")}
//                                         className="h-[46px] px-3 py-2 bg-blue-500 rounded-lg flex items-center text-center transition hover:bg-blue-700 text-white text-xl font-medium font-['Poppins']"
//                                     >
//                                         Register
//                                     </Link>
//                                     <Link
//                                         href={route("login")}
//                                         className="h-[46px] px-3 py-2 bg-blue-500 rounded-lg flex items-center transition hover:bg-blue-700 text-center text-white text-xl font-medium font-['Poppins']"
//                                     >
//                                         Log in
//                                     </Link>
//                                 </>
//                             )}
//                         </div>
//                     </nav>

//                     <main className="mt-6">
//                         <div className="relative w-full bg-blue-500 py-10 px-4 lg:px-0">
//                             <div className="container mx-auto text-center">
//                                 <h2 className="text-white text-2xl font-bold font-['Poppins'] mb-2">
//                                     Hi , Have a Nice day!
//                                 </h2>
//                                 <p className="text-white text-base font-normal font-['Poppins'] mb-4">
//                                     Let's learn something new today
//                                 </p>
//                                 <div className="flex flex-col lg:flex-row justify-center items-center">
//                                     <PublicSearchBar
//                                         placeholder="Search here course or teacher"
//                                         onClick={handleSearchClick}
//                                         onChange={handleSearchChange}
//                                         searchTerm={searchTerm}
//                                     />
//                                     <button
//                                         className="mt-4 lg:mt-0 lg:ml-4 h-14 px-5 py-1 bg-blue-700 hover:bg-blue-500 rounded-lg border border-emerald-50 flex justify-center items-center text-emerald-50 text-xl font-bold font-['Poppins']"
//                                         onClick={handleSearchClick}
//                                     >
//                                         Courses
//                                     </button>
//                                 </div>
//                                 <p className="text-white text-base font-normal font-['Poppins'] mt-4">
//                                     Popular: UI design, C++, Java
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="flex flex-wrap items-center justify-around p-4 mt-4">
//                             <div className="bg-white flex justify-center p-4 m-2">
//                                 <img className="h-25 w-auto" src={A} alt="A" />
//                             </div>
//                             <div className="bg-white flex justify-center p-4 m-2">
//                                 <img className="h-25 w-auto" src={B} alt="B" />
//                             </div>
//                         </div>
//                     </main>

//                     <Footer />
//                 </div>
//             </div>
//         </>
//     );
// }
import { Link, Head } from "@inertiajs/react";
import Footer from "@/Components/Footer/Footer";
import A from "../../../public/asset/A.png";
import B from "../../../public/asset/B.png";
import Logo from "../../../public/asset/Logo.png";
import { useState } from "react";
import PublicSearchBar from "@/Components/SearchBar/PublicSearchBar";
import StarRating from "@/Components/StarRating/StarRating";

// Define the types for Teacher and Service
interface Teacher {
    id: number;
    user: {
        name: string;
    };
    services: {
        id: number;
        name: string;
    }[];
    average_rating: number;
    position: string;
    bio: string;
    hourly_rate: number;
}

interface Service {
    id: number;
    name: string;
    image: string;
    average_rating: number;
    description: string;
    hourly_rate: number;
    teacher: {
        user: {
            name: string;
        }
    };
}

// Extend the PageProps to include teachers and services
interface WelcomeProps {
    auth: any; // Adjust the type according to your authentication structure
    teachers: Teacher[];
    services: Service[];
}

export default function Welcome({ auth, teachers = [], services = [] }: WelcomeProps) {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
        console.log("Search clicked:", searchTerm);
    };

    const displayedTeachers = teachers.slice(0, 4);
    const displayedServices = services.slice(0, 4);

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <div className="relative w-full max-w-7xl mx-auto px-4 lg:px-8">
                    <nav className="w-full flex flex-col lg:flex-row justify-between items-center mt-4 bg-white rounded-2xl shadow p-4 lg:p-2">
                        <Link href="/" className="flex items-center mb-4 lg:mb-0">
                            <img className="h-9 w-auto" src={Logo} alt="Logo" />
                            <div className="ml-2 text-blue-700 text-2xl font-bold font-['Poppins']">
                                LMS
                            </div>
                        </Link>
                        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
                            <div className="text-gray-700 text-lg font-medium font-['Poppins']">
                                About us
                            </div>
                            <div className="text-gray-700 text-lg font-medium font-['Poppins']">
                                Support
                            </div>
                            {auth.user ? (
                                <Link
                                    href={
                                        auth.user.role === "admin"
                                            ? route("admins.overview.index")
                                            : auth.user.role === "teacher"
                                            ? route("teacher.overviews.index")
                                            : route("students.index")
                                    }
                                    className="rounded-md px-3 py-2 font-semibold text-white bg-blue-500 transition hover:bg-blue-700 focus:outline-none focus-visible:ring-[#FF2D20]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("register")}
                                        className="h-[46px] px-3 py-2 bg-blue-500 rounded-lg flex items-center text-center transition hover:bg-blue-700 text-white text-xl font-medium font-['Poppins']"
                                    >
                                        Register
                                    </Link>
                                    <Link
                                        href={route("login")}
                                        className="h-[46px] px-3 py-2 bg-blue-500 rounded-lg flex items-center transition hover:bg-blue-700 text-center text-white text-xl font-medium font-['Poppins']"
                                    >
                                        Log in
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>

                    <main className="mt-6">

                        <div className="relative w-full bg-blue-500 py-10 px-4 lg:px-0">
                            <div className="container mx-auto text-center">
                                <h2 className="text-white text-2xl font-bold font-['Poppins'] mb-2">
                                    Hi, Have a Nice day!
                                </h2>
                                <p className="text-white text-base font-normal font-['Poppins'] mb-4">
                                    Let's learn something new today
                                </p>
                                <div className="flex flex-col lg:flex-row justify-center items-center">
                                    <PublicSearchBar
                                        placeholder="Search here course or teacher"
                                        onClick={handleSearchClick}
                                        onChange={handleSearchChange}
                                        searchTerm={searchTerm}
                                    />
                                    <button
                                        className="mt-4 lg:mt-0 lg:ml-4 h-14 px-5 py-1 bg-blue-700 hover:bg-blue-500 rounded-lg border border-emerald-50 flex justify-center items-center text-emerald-50 text-xl font-bold font-['Poppins']"
                                        onClick={handleSearchClick}
                                    >
                                        Courses
                                    </button>
                                </div>
                                <p className="text-white text-base font-normal font-['Poppins'] mt-4">
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

                        <div className="container mx-auto p-4 mt-4">
                            <h3 className="text-2xl font-bold mb-4">Services</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {displayedServices.map((service: Service) => (
                                    <Link
                                        href={route("services.show", service.id)}
                                        key={service.id}
                                        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-100 transition"
                                    >
                                        <div className="flex-shrink-0">
                                            <img
                                                src={service.image ? `/storage/${service.image}` : "https://cdn-icons-png.flaticon.com/512/4762/4762311.png"}
                                                alt={service.name}
                                                className="h-16 w-16 rounded-full"
                                            />
                                        </div>
                                        <div className="mt-1">
                                            <StarRating rating={service.average_rating || 0} />
                                        </div>
                                        <div className="mt-4 text-center">
                                            <h3 className="text-lg font-semibold leading-7 tracking-tight text-gray-900">
                                                {service.name}
                                            </h3>
                                            {service.teacher && (
                                                <p className="mt-1 text-sm text-gray-600">
                                                    Teacher: {service.teacher.user.name}
                                                </p>
                                            )}
                                            <p className="mt-1 text-sm text-gray-600">
                                                {service.description}
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-indigo-600">
                                                Rs: {service.hourly_rate}/hr
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="flex justify-center mt-4">
                                {/* <Link
                                    href={route("services.index")}
                                    className="text-blue-600 hover:text-blue-900"
                                >
                                    See More Services
                                </Link> */}
                            </div>
                        </div>

                        <div className="container mx-auto p-4 mt-4">
                            <h3 className="text-2xl font-bold mb-4">Teachers</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {displayedTeachers.map((teacher: Teacher) => (
                                    <Link
                                        href={route("teachers.show", teacher.id)}
                                        key={teacher.id}
                                        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-100 transition"
                                    >
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-16 w-16 rounded-full object-cover"
                                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                                                alt={teacher.user.name}
                                            />
                                        </div>
                                        <div className="mt-1 flex justify-center">
                                            <StarRating rating={teacher.average_rating || 0} />
                                        </div>
                                        <hr className="my-1 w-full border-gray-300" />
                                        <div className="flex flex-wrap justify-center space-x-2">
                                            {teacher.services.slice(0, 2).map((service) => (
                                                <span
                                                    key={service.id}
                                                    className="mt-2 text-xs font-semibold bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full"
                                                >
                                                    {service.name}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mt-4 text-center">
                                            <h3 className="text-lg font-semibold leading-7 tracking-tight text-gray-900">
                                                {teacher.user.name}
                                            </h3>
                                            <h4 className="text-sm text-gray-700">
                                                {teacher.position}
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-600">
                                                {teacher.bio}
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-indigo-600">
                                                Rs: {teacher.hourly_rate}/hr
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="flex justify-center mt-4">
                                {/* <Link
                                    href={route("teachers.index")}
                                    className="text-blue-600 hover:text-blue-900"
                                >
                                    See More Teachers
                                </Link> */}
                            </div>
                        </div>

                        
                    </main>

                    <Footer />
                </div>
            </div>
        </>
    );
}
