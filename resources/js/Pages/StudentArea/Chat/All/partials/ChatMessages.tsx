import React, { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";

export default function ChatMessages({ chats }: { chats: any[] }) {
    console.log("chatMessage : ", chats);

    const handleSelectChat = () => {
        alert("post chat");
    };

    return (
        <div className="flex flex-col h-full">
            <div className="p-2 font-bold">
                <h2>Messages</h2>
            </div>
            <div className="flex-grow overflow-y-auto">
                <ul className="p-5 overflow-y-scroll max-h-80">
                    {chats.map((chat: any) => (
                        <li key={chat?.id} className="py-2 px-4">
                            {chat?.sender === "student" ? (
                                <div className="flex justify-end">
                                    <div className="max-w-60">
                                        <p className="font-bold text-sm text-left">
                                            Sender: Student
                                        </p>
                                        <div className="p-4 bg-gray-200 max-w-64 rounded-xl">
                                            <p>{chat?.message}</p>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(
                                                chat?.timestamp
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ) : chat?.sender === "teacher" ? (
                                <div className="flex items-start">
                                    <div className="max-w-60">
                                        <p className="font-bold text-sm">
                                            Receiver:{" "}
                                            {chat?.teacher?.user?.name}
                                        </p>
                                        <div className="p-4 bg-blue-200 max-w-64 rounded-xl">
                                            <p>{chat?.message}</p>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(
                                                chat?.timestamp
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ) : null}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-5">
                <form onSubmit={handleSelectChat}>
                    <label htmlFor="chat" className="sr-only">
                        Your message
                    </label>
                    <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 ">
                        <textarea
                            id="chat"
                            role="1"
                            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                            placeholder="Your message..."
                        ></textarea>
                        <button
                            type="submit"
                            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 "
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
    );
}
