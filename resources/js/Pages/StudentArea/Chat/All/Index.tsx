import { useState } from "react";
import { Head } from "@inertiajs/react";
import StudentLayout from "@/Layouts/StudentLayout";
import img from "@/../../public/asstts/img/girl.jpg";
import { PageProps } from "@/types";
import { BsFillSendFill } from "react-icons/bs";

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

// chat sidebar
const ChatSidebar: React.FC<Props> = ({ chats, onSelectChat }) => {
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

// main
export default function Index({ auth, chats, message }: PageProps) {
    console.log("message : ", message);
    console.log("chats : ", chats);

    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

    const handleSelectChat = (chatId: number) => {
        setSelectedChatId(chatId);
        console.log(selectedChatId);
    };

    return (
        <StudentLayout user={auth.user} header="Chat">
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
                                        initialMessages={message}
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
    chats: Chat[];
    initialMessages: Message[];
}

// chat message
const ChatMessages: React.FC<ChatMessagesProps> = ({
    chatId,
    chats,
    initialMessages,
}) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = (event: React.FormEvent) => {
        event.preventDefault();
        const timestamp = new Date().toISOString();
        const newMsg: Message = {
            id: messages.length + 1,
            chat_id: chatId,
            message: newMessage,
            sender: "student",
            timestamp: timestamp,
        };

        setMessages([...messages, newMsg]);
        setNewMessage("");
    };

    const chat = chats.find((chat) => chat.id === chatId);

    return (
        <div>
            <div className="p-2 font-bold">
                <h2>Messages</h2>
            </div>
            <div className="p-5">
            <ul>
    {messages.map((message) => (
        <li key={message.id} className="py-2 px-4">
            {message.sender === "student" ? (
                // Receiver's message
                <>
                    <p className="max-w-60 font-bold text-sm text-left">
                        Sender: {message.chat_id}
                    </p>
                    <div className="p-4 bg-gray-200 max-w-64 rounded-xl">
                        <p>{message.message}</p>
                    </div>
                </>
            ) : message.sender === "teacher" ? (
                // Sender's message
                <>
                    <p className="max-w-60 font-bold text-sm">
                        Receiver:
                    </p>
                    <div className="p-4 bg-blue-200 max-w-64 rounded-xl">
                        <p>{message.message}</p>
                    </div>
                </>
            ) : null /* Handle any other type of message sender */}
            <p className="max-w-60 text-xs text-gray-400 px-2">
                {new Date(message.timestamp).toLocaleString()}
            </p>
        </li>
    ))}
</ul>


                <div className="mt-5">
                    <form onSubmit={handleSendMessage}>
                        <label htmlFor="chat" className="sr-only">
                            Your message
                        </label>
                        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                            <textarea
                                id="chat"
                                role="1"
                                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Your message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            ></textarea>
                            <button
                                type="submit"
                                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                            >
                                <div>
                                    <BsFillSendFill className="size-5" />
                                </div>
                                <span className="sr-only">Send message</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
