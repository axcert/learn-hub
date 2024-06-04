// import { useState, PropsWithChildren, ReactNode } from "react";
// import { User } from "@/types";
// import { Link } from "@inertiajs/react";
// import dahbordLogo from "../../../../../public/asset/Logo.png";
// import { AiFillDashboard } from "react-icons/ai";
// import { MdDashboardCustomize } from "react-icons/md";
// import { GiTeacher } from "react-icons/gi";
// import { PiStudentFill } from "react-icons/pi";

// import { FaUsersCog } from "react-icons/fa";
// import AvatarBoard from "@/Components/AvatarBoard/AvatarBoard";

// export default function AdminLayout({
//     user,
//     header,
//     children,
// }: PropsWithChildren<{ user: User; header?: ReactNode }>) {
//     const [showingNavigationDropdown, setShowingNavigationDropdown] =
//         useState(false);
//     return (
//         <section>
//             <div className="grid grid-cols-6 h-screen">
//                 {/* lms */}
//                 <div className=" bg-blue-950 row-span-3  text-white">
//                     <div className="flex gap-3 justify-center items-center p-4">
//                         <div>
//                             <img
//                                 className="w-7"
//                                 src={dahbordLogo}
//                                 alt="dashBoardlogo"
//                             />
//                         </div>
//                         <p className="uppercase font-bold text-lg">lms</p>
//                     </div>
//                     <hr />
//                     <div className="py-5">
//                         <ul className="font-medium flex justify-center flex-col">
//                             <li className="justify-left mb-2 w-60 rounded cursor-pointer hover:bg-stone-100 hover:text-black transition duration-300">
//                                 <Link
//                                     href={route("admins.overview.index")}
//                                     className="flex items-center justify-left gap-2 py-4 px-4"
//                                 >
//                                     <AiFillDashboard />
//                                     <h1>Overview</h1>
//                                 </Link>
//                             </li>
//                             <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100 hover:text-black transition duration-300">
//                                 <Link
//                                     href={route("admin.services.index")}
//                                     className="flex items-center justify-left gap-2 py-4 px-4"
//                                 >
//                                     <MdDashboardCustomize />
//                                     <h1 className="">Services</h1>
//                                 </Link>
//                             </li>

//                             <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100 hover:text-black transition duration-300">
//                                 <Link
//                                     href={route("admin.teachers.index")}
//                                     className="flex items-center justify-left gap-2 py-4 px-4"
//                                 >
//                                     <GiTeacher />
//                                     <h1 className="">Teachers</h1>
//                                 </Link>
//                             </li>

//                             <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100 hover:text-black transition duration-300">
//                                 <Link
//                                     href={route("admin.students.index")}
//                                     className="flex items-center justify-left gap-2 py-4 px-4"
//                                 >
//                                     <PiStudentFill />
//                                     <h1 className="">Students</h1>
//                                 </Link>
//                             </li>


//                             <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100  hover:text-black transition duration-300">
//                                 <Link
//                                     href={route("admin.adminPanels.index")}
//                                     className="flex items-center justify-left gap-2 py-4 px-4"
//                                 >
//                                     <FaUsersCog />
//                                     <h1 className="">Admins</h1>
//                                 </Link>
//                             </li>

//                         </ul>
//                     </div>

//                     <hr className="" />
//                     <footer className="py-10 text-center text-xs">
//                         <div className="m-0 ">
//                             <p className="m-0 font-light">
//                                 All Rights Reserved by Axcertro
//                                 <br />
//                                 Powered by | imesh.hirushan@axcertro.com
//                             </p>
//                         </div>
//                     </footer>
//                 </div>

//                 {/* heade */}
//                 <div className="col-start-2 col-end-7">
//                     <AvatarBoard user={user} />
//                 </div>

//                 {/* contend */}
//                 <div className="col-start-2 col-end-7 bg-zinc-100 h-full p-5">
//                     {children}
//                 </div>
//             </div>
//         </section>
//     );
// }

