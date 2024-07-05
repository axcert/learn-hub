<?php

namespace App\Http\Controllers\TeachersArea\Chat;

use App\Http\Controllers\Controller;
use App\Repositories\All\Chats\ChatsInterface;
use App\Repositories\All\Messages\MessageInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TeacherChatController extends Controller
{
    public function __construct(
        protected ChatsInterface $chatsInterface,
        protected MessageInterface $messageInterface,
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();
        $chats = $this->chatsInterface->getByColumn(['teacher_id' => $userId], ['*'], ['user', 'teacher']);
        $messages = $this->messageInterface->all();

        foreach ($chats as $chat) {
            $teacherChat = [];
            foreach ($messages as $message) {
                if ($message->chat_id == $chat->id) {
                    $teacherChat[] = $message;
                }
            }

            $chat['messages'] = $teacherChat;
        }

        return Inertia::render('TeachersArea/Chat/All/Chat', [
            'chats' => $chats,
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
