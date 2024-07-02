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
    public function index()
    {
        $chats = $this->chatsInterface->getByColumn(['user_id'=> Auth::id()],['*'],['user','teacher']);
        $messages = $this->messageInterface->all();

            foreach ($chats as $chat) {
                $studentChat = [];
              foreach($messages as $message){
                if($message->chat_id == $chat->id){
                    $studentChat[]=$message;
                }
              }
              $chat['messages'] = $studentChat;
              
            }


        return Inertia::render('StudentArea/Chat/All/Chat', [
            'chats' => $chats,
        ]);
    }


   
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
 
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


    public function chats(Request $request)
    {
        $validatedData = $request->validate([
            'chat_id' => 'required|exists:chats,id',
            'message' => 'required|string',
        ]);
    
        $this->messageInterface->create([
            'chat_id' => $validatedData['chat_id'],
            'message' => $validatedData['message'],
            'sender' => 'student',
            'timestamp' => now(),
        ]);
    
        return back();
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
    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
