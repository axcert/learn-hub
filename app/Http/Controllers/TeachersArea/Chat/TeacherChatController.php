<?php

namespace App\Http\Controllers\TeachersArea\Chat;

use App\Http\Controllers\Controller;
use App\Repositories\All\Chats\ChatsInterface;
use App\Repositories\All\Messages\MessageInterface;
use App\Repositories\All\Teachers\TeacherInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TeacherChatController extends Controller
{
    public function __construct(
        protected ChatsInterface $chatsInterface,
        protected MessageInterface $messageInterface,
        protected TeacherInterface $teacherInterface
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id(); //2
        $teacher=$this->teacherInterface->findByColumn(['user_id' => $userId]); //4
  
        $chats = $this->chatsInterface->getByColumn(['teacher_id' => $teacher->id], ['*'], ['user', 'teacher']);
        $messages = $this->messageInterface->all();

        // dd($chats);
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



    public function chats(Request $request,int $id)
    {

        $validatedData = $request->validate([
            'message' => 'required|string',
        ]);
   
        $this->messageInterface->create([
            'chat_id' => $id,
            'message' => $validatedData['message'],
            'sender' => 'teacher',
            'timestamp' => now(),
        ]);
    
        return back();
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        dd($id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->messageInterface->deleteById($id);
    }
}
