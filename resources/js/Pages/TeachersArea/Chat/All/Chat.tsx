import React, { useState } from "react";
import StudentLayout from "@/Layouts/StudentLayout";
import { Head } from "@inertiajs/react";
import { ChatSidebar } from "./partials/ChatSidebar";
import ChatMessages from "./partials/ChatMessages";
import TeacherLayout from "@/Layouts/TeacherLayout";

export default function Chat({ chats, auth }: { chats: any[]; auth: any }) {
    console.log(chats);
    
    const [messages, setMessages] = useState<any[]>([]);
    const onSelectedMessage = (messages: any) => {
        setMessages(messages);
    };

    console.log('tch-massage : ',messages);
    
    return (
       
        <TeacherLayout user={auth.user}>
        <Head title="Teacher Message" />
           <Head title="Chats" />
            <div className="py-12">
                 <div className="mx-auto sm:px-6 lg:px-8">
                   <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                       <div className="p-6 text-gray-900 flex flex-col lg:flex-row">
                             <ChatSidebar
                                chats={chats}
                                onSelectChat={onSelectedMessage}
                            />
                            <div className="flex-1">
                                <ChatMessages chats={messages} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </TeacherLayout>

    );
}
