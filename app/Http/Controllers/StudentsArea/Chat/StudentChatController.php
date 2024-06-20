<?php

namespace App\Http\Controllers\StudentsArea\Chat;

use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Models\Message;
use App\Models\Messages;
use App\Repositories\All\Chats\ChatsInterface;
use App\Repositories\All\Messages\MessageInterface;
use Illuminate\Http\Request;
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

        $message = $this->messageInterface->all();
        $chats = $this->chatsInterface->getStudentChats();
        return Inertia::render('StudentArea/Chat/All/Index', [
            'chats' => $chats,
            'message' => $message,
        ]);
    }

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
 
    public function getMessages($chatId)
    {
        $messages = Chat::find($chatId)->messages()->get();
        return response()->json($messages);
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
