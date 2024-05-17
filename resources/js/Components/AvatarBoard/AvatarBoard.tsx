import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useForm } from "@inertiajs/react"; // Assuming you're using Inertia.js
import { User } from "@/types"; // Importing your User type

const temp = {
    imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const userNavigation = [
    // { name: "Your Profile", href: route("profile.edit") },
    { name: "Your Profile", href: route("profileManage.index") },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

interface AvatarBoardProps {
    user: User;
}

export default function AvatarBoard({ user }: AvatarBoardProps) {
    const { post } = useForm();

    const handleLogout = (event: React.FormEvent) => {
        event.preventDefault();
        post(route("logout"));
    };

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-white">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <p className="uppercase font-bold">
                                            Admin Dashboard
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <Menu
                                            as="div"
                                            className="relative ml-3"
                                        >
                                            <div>
                                                <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="sr-only">
                                                        Open user menu
                                                    </span>
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src={temp.imageUrl}
                                                        alt=""
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {userNavigation.map(
                                                        (item) => (
                                                            <Menu.Item
                                                                key={item.name}
                                                            >
                                                                {({
                                                                    active,
                                                                }) => (
                                                                    <a
                                                                        href={
                                                                            item.href
                                                                        }
                                                                        className={classNames(
                                                                            active
                                                                                ? "bg-gray-100"
                                                                                : "",
                                                                            "block px-4 py-2 text-sm text-gray-700"
                                                                        )}
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        )
                                                    )}
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <form
                                                                onSubmit={
                                                                    handleLogout
                                                                }
                                                            >
                                                                <button
                                                                    type="submit"
                                                                    className={classNames(
                                                                        active
                                                                            ? "bg-gray-100"
                                                                            : "",
                                                                        "block w-full px-4 py-2 text-left text-sm text-gray-700"
                                                                    )}
                                                                >
                                                                    Sign out
                                                                </button>
                                                            </form>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XMarkIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <Bars3Icon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="border-t border-gray-700 pb-3 pt-4">
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src={temp.imageUrl}
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-gray-900">
                                            {user.name}
                                        </div>
                                        <div className="text-sm font-medium leading-none text-gray-400">
                                            {user.email}
                                        </div>
                                    </div>
                                    {/* <button
                                        type="button"
                                        className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button> */}
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    {userNavigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-700 hover:text-white"
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                    <Disclosure.Button
                                        as="div"
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-700 hover:text-white"
                                    >
                                        <form onSubmit={handleLogout}>
                                            <button type="submit" className="w-full text-left">
                                                Sign out
                                            </button>
                                        </form>                                   
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    );
}