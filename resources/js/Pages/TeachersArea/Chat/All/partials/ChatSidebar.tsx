import React, { useState } from "react";
import img from "@/../../public/asstts/img/girl.jpg";

export function ChatSidebar({
    chats,
    onSelectChat,
    onSelectedChatId,
}: {
    chats: any;
    onSelectChat: (messages: any) => void;
    onSelectedChatId: (id: any) => void;
}) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredChats = chats?.filter((chat: any) => {
        const studentName = chat?.user?.name.toLowerCase();
        const studentEmail = chat?.user?.email.toLowerCase();
        const term = searchTerm.toLowerCase();
        return studentName.includes(term) || studentEmail.includes(term);
    });

    function setItems(chat: any) {
        onSelectChat(chat.messages);
        onSelectedChatId(chat.id);
    }

    return (
        <div className="w-full lg:w-1/4 border-r">
            <div className="p-4">
                <h2 className="font-bold text-xl mb-4">Tutor Chat Panel</h2>
                <input
                    onClick={() => {}}
                    onChange={handleSearchChange}
                    value={searchTerm}
                    type="text"
                    placeholder="Search"
                    className="mt-2 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
                />
                <div className="mt-4 max-h-[60vh] overflow-y-auto">
                    <ul className="border-spacing-3 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredChats && filteredChats?.length > 0 ? (
                            filteredChats?.map((chat: any) => (
                                <li
                                    className="flex justify-between py-5"
                                    key={chat?.id}
                                    onClick={() => setItems(chat)}
                                >
                                    <div className="flex justify-start hover:bg-gray-100 rounded-lg w-full">
                                        <div className="flex min-w-0 gap-x-4 p-2 w-full">
                                            <img
                                                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                                src={chat.user.image_url}
                                                alt=""
                                            />
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                                    {chat?.user?.name}
                                                </p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                    {chat?.user?.email}
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
        </div>
    );
}
