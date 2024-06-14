import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import StudentLayout from "@/Layouts/StudentLayout";
import img from "@/../../public/asstts/img/girl.jpg";

interface Chat {
    teacher: {
        user: {
            name: string;
            email: string;
        };
        bio: string;
    };
    id: number;
    name: string;
}

interface Props {
    chats: Chat[];
}

const ChatSidebar: React.FC<Props> = ({ chats }) => {
    return (
        <div className="w-full lg:w-1/4 border-r">
            <div className="p-4">
                <h2 className="font-bold text-xl mb-4">Chats</h2>
                <input
                    type="text"
                    placeholder="Search"
                    className="mt-2 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
                />
                <ul className="mt-4 border-spacing-3 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {chats && chats.length > 0 ? (
                        chats.map((chat) => (
                            <li
                                className="flex justify-between py-5"
                                key={chat.id}
                            >
                                <Link
                                    href={route("chats.show", {
                                        chat: chat.id,
                                    })}
                                    className="flex justify-start hover:bg-gray-100 rounded-lg w-full"
                                >
                                    <div className="flex min-w-0 gap-x-4 p-2 w-full">
                                        <img
                                            className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                            src={img}
                                            alt=""
                                        />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">
                                                {chat.teacher.user.name}
                                            </p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                {chat.teacher.user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end p-2">
                                        <p className="text-sm leading-6 text-gray-900">
                                            {chat.teacher.bio}
                                        </p>
                                        <div className="mt-1 flex items-center gap-x-1.5">
                                            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-500">Online</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li className="py-2 px-4">No chats available</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default function Index({ auth, chats }: PageProps) {
    return (
        <StudentLayout user={auth.user} header="chat">
            <Head title="Chats" />
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-col lg:flex-row">
                            <ChatSidebar chats={chats} />
                            <div className="flex-1">
                                {/* Your main content goes here */}
                                <p className="text-center">Main content here</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
