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
      //old dash board
        // <div>
        //     <div className="min-h-screen bg-teal-700">
        //         <nav className="bg-white-100 border-b bg-teal-700 rounded-t-lg">
        //             <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 bg-teal-700">
        //                 <div className="flex justify-between h-16 ">
        //                     <div className="flex ">
        //                         <div className="shrink-0 flex items-center ">
        //                             <Link href="/">
        //                                 <ApplicationLogo className="block h-9 w-auto fill-current text-white"/>
        //                             </Link>
        //                             <div className="ml-5">
        //                                 <h3 className="text-white font-bold ">
        //                                     Learn-Hub
        //                                 </h3>
        //                             </div>
        //                         </div>
        //                     </div>

        //                     <div className="hidden sm:flex sm:items-center sm:ms-6 ">
        //                         <div className="ms-3 relative">
        //                             <Dropdown>
        //                                 <Dropdown.Trigger>
        //                                     <span className="inline-flex rounded-md">
        //                                         <button
        //                                             type="button"
        //                                             className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150 "
        //                                         >
        //                                             {user.name}

        //                                             <svg
        //                                                 className="ms-2 -me-0.5 h-4 w-4"
        //                                                 xmlns="http://www.w3.org/2000/svg"
        //                                                 viewBox="0 0 20 20"
        //                                                 fill="currentColor"
        //                                             >
        //                                                 <path
        //                                                     fillRule="evenodd"
        //                                                     d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        //                                                     clipRule="evenodd"
        //                                                 />
        //                                             </svg>
        //                                         </button>
        //                                     </span>
        //                                 </Dropdown.Trigger>

        //                                 <Dropdown.Content>
        //                                     <Dropdown.Link
        //                                         href={route("profile.edit")}
        //                                     >
        //                                         Profile
        //                                     </Dropdown.Link>
        //                                     <Dropdown.Link
        //                                         href={route("logout")}
        //                                         method="post"
        //                                         as="button"
        //                                     >
        //                                         Log Out
        //                                     </Dropdown.Link>
        //                                 </Dropdown.Content>
        //                             </Dropdown>
        //                         </div>
        //                     </div>

        //                     <div className="-me-2 flex items-center sm:hidden">
        //                         <button
        //                             onClick={() =>
        //                                 setShowingNavigationDropdown(
        //                                     (previousState) => !previousState
        //                                 )
        //                             }
        //                             className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
        //                         >
        //                             <svg
        //                                 className="h-6 w-6"
        //                                 stroke="currentColor"
        //                                 fill="none"
        //                                 viewBox="0 0 24 24"
        //                             >
        //                                 <path
        //                                     className={
        //                                         !showingNavigationDropdown
        //                                             ? "inline-flex"
        //                                             : "hidden"
        //                                     }
        //                                     strokeLinecap="round"
        //                                     strokeLinejoin="round"
        //                                     strokeWidth="2"
        //                                     d="M4 6h16M4 12h16M4 18h16"
        //                                 />
        //                                 <path
        //                                     className={
        //                                         showingNavigationDropdown
        //                                             ? "inline-flex"
        //                                             : "hidden"
        //                                     }
        //                                     strokeLinecap="round"
        //                                     strokeLinejoin="round"
        //                                     strokeWidth="2"
        //                                     d="M6 18L18 6M6 6l12 12"
        //                                 />
        //                             </svg>
        //                         </button>
        //                     </div>
        //                 </div>
        //             </div>

        //             <div
        //                 className={
        //                     (showingNavigationDropdown ? "block" : "hidden") +
        //                     " sm:hidden"
        //                 }
        //             >
        //                 <div className="pt-2 pb-3 space-y-1">
        //                     <ResponsiveNavLink
        //                         href={route("home.index")}
        //                         active={route().current("home.index")}
        //                     >
        //                         Home
        //                     </ResponsiveNavLink>
        //                 </div>

        //                 <div className="pt-4 pb-1 border-t border-gray-200">
        //                     <div className="px-4">
        //                         <div className="p-3">
        //                             <div className="min-h-screen bg-gray-100">
        //                                 <nav className="bg-white-100 border-b bg-teal-700 rounded-t-lg">
        //                                     <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        //                                         <div className="flex justify-between h-16">
        //                                             <div className="flex ">
        //                                                 <div className="shrink-0 flex items-center">
        //                                                     <Link href="/">
        //                                                         <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
        //                                                     </Link>
        //                                                     <div className="ml-5">
        //                                                         <h3 className="text-white font-bold ">
        //                                                             Learn-Hub
        //                                                         </h3>
        //                                                     </div>
        //                                                 </div>
        //                                             </div>

        //                                             <div className="hidden sm:flex sm:items-center sm:ms-6 ">
        //                                                 <div className="ms-3 relative">
        //                                                     <Dropdown>
        //                                                         <Dropdown.Trigger>
        //                                                             <span className="inline-flex rounded-md">
        //                                                                 <button
        //                                                                     type="button"
        //                                                                     className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150 "
        //                                                                 >
        //                                                                     {
        //                                                                         user.name
        //                                                                     }

        //                                                                     <svg
        //                                                                         className="ms-2 -me-0.5 h-4 w-4"
        //                                                                         xmlns="http://www.w3.org/2000/svg"
        //                                                                         viewBox="0 0 20 20"
        //                                                                         fill="currentColor"
        //                                                                     >
        //                                                                         <path
        //                                                                             fillRule="evenodd"
        //                                                                             d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        //                                                                             clipRule="evenodd"
        //                                                                         />
        //                                                                     </svg>
        //                                                                 </button>
        //                                                             </span>
        //                                                         </Dropdown.Trigger>

        //                                                         <Dropdown.Content>
        //                                                             <Dropdown.Link
        //                                                                 href={route(
        //                                                                     "profile.edit"
        //                                                                 )}
        //                                                             >
        //                                                                 Profile
        //                                                             </Dropdown.Link>
        //                                                             <Dropdown.Link
        //                                                                 href={route(
        //                                                                     "logout"
        //                                                                 )}
        //                                                                 method="post"
        //                                                                 as="button"
        //                                                             >
        //                                                                 Log Out
        //                                                             </Dropdown.Link>
        //                                                         </Dropdown.Content>
        //                                                     </Dropdown>
        //                                                 </div>
        //                                             </div>

        //                                             <div className="-me-2 flex items-center sm:hidden">
        //                                                 <button
        //                                                     onClick={() =>
        //                                                         setShowingNavigationDropdown(
        //                                                             (
        //                                                                 previousState
        //                                                             ) =>
        //                                                                 !previousState
        //                                                         )
        //                                                     }
        //                                                     className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
        //                                                 >
        //                                                     <svg
        //                                                         className="h-6 w-6"
        //                                                         stroke="currentColor"
        //                                                         fill="none"
        //                                                         viewBox="0 0 24 24"
        //                                                     >
        //                                                         <path
        //                                                             className={
        //                                                                 !showingNavigationDropdown
        //                                                                     ? "inline-flex"
        //                                                                     : "hidden"
        //                                                             }
        //                                                             strokeLinecap="round"
        //                                                             strokeLinejoin="round"
        //                                                             strokeWidth="2"
        //                                                             d="M4 6h16M4 12h16M4 18h16"
        //                                                         />
        //                                                         <path
        //                                                             className={
        //                                                                 showingNavigationDropdown
        //                                                                     ? "inline-flex"
        //                                                                     : "hidden"
        //                                                             }
        //                                                             strokeLinecap="round"
        //                                                             strokeLinejoin="round"
        //                                                             strokeWidth="2"
        //                                                             d="M6 18L18 6M6 6l12 12"
        //                                                         />
        //                                                     </svg>
        //                                                 </button>
        //                                             </div>
        //                                         </div>
        //                                     </div>

        //                                     <div
        //                                         className={
        //                                             (showingNavigationDropdown
        //                                                 ? "block"
        //                                                 : "hidden") +
        //                                             " sm:hidden"
        //                                         }
        //                                     >
        //                                         <div className="pt-2 pb-3 space-y-1">
        //                                             <ResponsiveNavLink
        //                                                 href={route(
        //                                                     "dashboard"
        //                                                 )}
        //                                                 active={route().current(
        //                                                     "dashboard"
        //                                                 )}
        //                                             >
        //                                                 Home
        //                                             </ResponsiveNavLink>
        //                                         </div>

        //                                         <div className="pt-4 pb-1 border-t border-gray-200">
        //                                             <div className="px-4">
        //                                                 <div className="font-medium text-base text-gray-800">
        //                                                     {user.name}
        //                                                 </div>
        //                                                 <div className="font-medium text-sm text-gray-500">
        //                                                     {user.email}
        //                                                 </div>
        //                                             </div>

        //                                             <div className="mt-3 space-y-1">
        //                                                 <ResponsiveNavLink
        //                                                     href={route(
        //                                                         "profile.edit"
        //                                                     )}
        //                                                 >
        //                                                     Profile
        //                                                 </ResponsiveNavLink>
        //                                                 <ResponsiveNavLink
        //                                                     method="post"
        //                                                     href={route(
        //                                                         "logout"
        //                                                     )}
        //                                                     as="button"
        //                                                 >
        //                                                     Log Out
        //                                                 </ResponsiveNavLink>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                 </nav>

        //                                 {header && (
        //                                     <header className="bg-white shadow">
        //                                         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        //                                             {header}
        //                                         </div>
        //                                     </header>
        //                                 )}
        //                             </div>
        //                         </div>
        //                         <div className="font-medium text-base text-gray-800">
        //                             {user.name}
        //                         </div>
        //                         <div className="font-medium text-sm text-gray-500">
        //                             {user.email}
        //                         </div>
        //                     </div>

        //                     <div className="mt-3 space-y-1">
        //                         <ResponsiveNavLink href={route("profile.edit")}>
        //                             Profile
        //                         </ResponsiveNavLink>
        //                         <ResponsiveNavLink
        //                             method="post"
        //                             href={route("logout")}
        //                             as="button"
        //                         >
        //                             Log Out
        //                         </ResponsiveNavLink>
        //                     </div>
        //                 </div>
        //             </div>
        //         </nav>

        //         {header && (
        //             <header className="bg-white shadow">
        //                 <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        //                     {header}
        //                 </div>
        //             </header>
        //         )}
        //         <main>
        //             <div className="flex text-white mt-2 ">
        //                 <div className="h-screen w-60 bg-teal-700 rounded-lg items-center justify-start">
        //                     <ul className="font-medium">
        //                         <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100  hover:text-black transition duration-300">
        //                             <Link
        //                                 href={route('home.index')}
        //                                 className="flex  items-center justify-center gap-2 py-4"
        //                             >
        //                                 <FaHome className=""></FaHome>
        //                                 <h1 className="">Home</h1>
        //                             </Link>
        //                         </li>

        //                         <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100  hover:text-black transition duration-300">
        //                             <Link
        //                                 href={route('teacher.index')}
        //                                 className="flex  items-center justify-center gap-2 py-4"
        //                             >
        //                                 <GiTeacher />
        //                                 <h1 className="">Teacher</h1>
        //                             </Link>
        //                         </li>

        //                         <li className="mb-2 w-60 rounded cursor-pointer hover:bg-stone-100 hover:text-black transition duration-300">
        //                             <Link
        //                                  href={route('student.index')}
        //                                 className="flex  items-center justify-center gap-2 py-4"
        //                             >
        //                                 <PiStudentFill />
        //                                 <h1 className="">Student</h1>
        //                             </Link>
        //                         </li>
        //                     </ul>
        //                 </div>

        //                 <div className=" bg-gray-200 rounded-lg p-4 w-full">
        //                     {children}
        //                 </div>
        //             </div>
        //         </main>
        //     </div>
        // </div>
<div>

<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start rtl:justify-end">
        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
        <a href="https://flowbite.com" className="flex ms-2 md:me-24">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
          <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Flowbite</span>
        </a>
      </div>
      <div className="flex items-center">
          <div className="flex items-center ms-3">
            <div>
              <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span className="sr-only">Open user menu</span>
                {/* <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"> */}
              </button>
            </div>
            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
              <div className="px-4 py-3" role="none">
                <p className="text-sm text-gray-900 dark:text-white" role="none">
                  Neil Sims
                </p>
                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                  neil.sims@flowbite.com
                </p>
              </div>
              <ul className="py-1" role="none">
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</nav>

<aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
   <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul className="space-y-2 font-medium">     
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
            </a>
         </li>
      </ul>
   </div>
</aside>

<div className="p-4 sm:ml-64">
   <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
     
   </div>
</div>


</div>

    );
}
