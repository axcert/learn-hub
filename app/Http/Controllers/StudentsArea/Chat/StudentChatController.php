<?php

namespace App\Http\Controllers\StudentsArea\Chat;

use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Models\Message;
use App\Models\Messages;
use App\Repositories\All\Chats\ChatsInterface;
use App\Repositories\All\Messages\MessageInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentChatController extends Controller
{
    public function __construct(
        protected ChatsInterface $chatsInterface,
        protected MessageInterface $messageInterface,
    ) {
    }
    public function index(Request $request)
    {

        $chats = $this->chatsInterface->getByColumn(['user_id'=> Auth::id()],['*'],['user','teacher']);
        $messages = $this->messageInterface->all();

    
            foreach ($chats as $chat) {
                $studentChat = [];
              foreach($messages as $message){
                if($message->chat_id == $chat->id){
                    $studentChat=$message;
                }
              }
              $chat['messages'] = $studentChat;
            }

        return Inertia::render('StudentArea/Chat/All/Chat', [
            'chats' => $chats,
        ]);
    }


    // public function index(Request $request)
    // {
    //     $chat_id = $request->input('chat_id');
    //     $messages = $this->messageInterface->all();
    //     $chats = $this->chatsInterface->getStudentChats();
    

    //     $filteredChats = [];
    //     foreach ($chats as $chat) {
    //         if ($chat->chat_id == $chat_id) {
    //             $filteredChats[] = $chat;
    //         }
    //     }
    
    //     // Render the view with the filtered chats and all messages
    //     return Inertia::render('StudentArea/Chat/All/Index', [
    //         'chats' => $filteredChats,
    //         'messages' => $messages,
    //     ]);
    // }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'teacher_id' => 'required|exists:teachers,id',
            'user_id' => 'required|exists:users,id',
        ]);
        $this->chatsInterface->storeChat($request->all());
        return redirect()->route('chats.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        return Inertia::render('StudentArea/Chat/All/Chat', [
            'message' => $message,
        ]);
    }

    // public function getMessages($chatId)
    // {
    //     $messages = Chat::find($chatId)->messages()->get();
    //     return response()->json($messages);

    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
