import { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import StudentLayout from "@/Layouts/StudentLayout";
import img from "@/../../public/asstts/img/girl.jpg";

interface Chat {
    teacher: {
        user: {
            image: string | undefined;
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
    onSelectChat: (chatId: number) => void;
}

const ChatSidebar: React.FC<Props> = ({ chats, onSelectChat }) => {
    return (
        // Chats View
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
                                onClick={() => onSelectChat(chat.id)}
                            >
                                <div className="flex justify-start hover:bg-gray-100 rounded-lg w-full">
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
                                            <p className="text-xs leading-5 text-gray-500">
                                                Online
                                            </p>
                                        </div>
                                    </div>
                                </div>
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

//massage screen
export default function Index({ auth, chats }: PageProps) {
    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

    console.log("selectedChatId :", selectedChatId);

    const handleSelectChat = (chatId: number) => {
        setSelectedChatId(chatId);
    };

    return (
        <StudentLayout user={auth.user} header="chat">
            <Head title="Chats" />
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-col lg:flex-row">
                            <ChatSidebar
                                chats={chats}
                                onSelectChat={handleSelectChat}
                            />
                            <div className="flex-1">
                                {selectedChatId ? (
                                    <ChatMessages
                                        chatId={selectedChatId}
                                        chats={chats}
                                    />
                                ) : (
                                    <p className="text-center">
                                        Main content here
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
interface Message {
    id: number;
    chat_id: number;
    message: string;
    sender: "teacher" | "student";
    timestamp: string;
}

interface ChatMessagesProps {
    chatId: number;
    chats: Chat[]; // Ensure this is imported correctly from your types
}

//chat massage
// const ChatMessages: React.FC<{ chatId: number, chat:any[] }> = ({ chatId, id ,chat}: any) => {
const ChatMessages: React.FC<ChatMessagesProps> = ({ chatId, chats }) => {
    const [messages, setMessages] = useState<Message[]>([]);

    console.log(chats);

    useEffect(() => {
        fetchMessages(chatId);
    }, [chatId]);

    const fetchMessages = async (chatId: number) => {
        try {
            const response = await fetch(`/api/chats/${chatId}/messages`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: Message[] = await response.json();
            setMessages(data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    if (!chatId || !chats || chats.length === 0) {
        return <p className="text-center">No chat selected</p>;
    }

    // Find the chat based on chatId
    const chat = chats.find((chat) => chat.id === chatId);

    // Ensure chat is found and has necessary properties
    if (!chat || !chat.teacher || !chat.teacher.user) {
        return <p className="text-center">Invalid chat data</p>;
    }

    return (
        <div>
            <div className="p-2 font-bold">
                <h2>Massage</h2>
            </div>

            <div className="p-5">
                {/* chat */}
                <div className="flex items-start gap-2.5">
                    <img
                        className="w-8 h-8 rounded-full"
                        src={chat.teacher.user.image}
                        alt="Jese image"
                    />
                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {chats.map((chat) => (
                                    <div key={chat.id}>
                                        {/* Accessing chat properties */}
                                        <p>{chat.teacher.user.name}</p>
                                        {/* Other details */}
                                    </div>
                                ))}
                            </span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                11:46
                            </span>
                        </div>
                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                            That's awesome. I think our users will really
                            appreciate the improvements.
                        </p>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Delivered
                        </span>
                    </div>
                    <button
                        id="dropdownMenuIconButton"
                        data-dropdown-toggle="dropdownDots"
                        data-dropdown-placement="bottom-start"
                        className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                        type="button"
                    >
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 4 15"
                        >
                            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        </svg>
                    </button>
                    <div
                        id="dropdownDots"
                        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600"
                    >
                        <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownMenuIconButton"
                        >
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Reply
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Forward
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Copy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Report
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Delete
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* send message */}
                <div className="mt-5">
                    <form>
                        <label htmlFor="chat" className="sr-only">
                            Your message
                        </label>
                        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                            <button
                                type="button"
                                className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                            >
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 18"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                                    />
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                    />
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                                    />
                                </svg>
                                <span className="sr-only">Upload image</span>
                            </button>
                            <button
                                type="button"
                                className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                            >
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                                    />
                                </svg>
                                <span className="sr-only">Add emoji</span>
                            </button>
                            <textarea
                                id="chat"
                                role="1"
                                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Your message..."
                            ></textarea>
                            <button
                                type="submit"
                                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                            >
                                <svg
                                    className="w-5 h-5 rotate-90 rtl:-rotate-90"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 18 20"
                                >
                                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                                </svg>
                                <span className="sr-only">Send message</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ul>
                {messages.map((message) => (
                    <li key={message.id} className="py-2 px-4">
                        <div className="flex justify-between">
                            <p>{message.message}</p>
                            <span>
                                {new Date(message.timestamp).toLocaleString()}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
