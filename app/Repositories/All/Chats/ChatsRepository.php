<?php

namespace App\Repositories\All\Chats;

use App\Models\Chat;
use App\Repositories\All\Chats\ChatsInterface;
use App\Repositories\Base\BaseRepository;
use Illuminate\Support\Facades\Auth;

class ChatsRepository extends BaseRepository implements ChatsInterface
{
    /**
     * @var Chat
     */
    protected $model;

    /**
     * __construct
     *
     * @param  mixed $model
     * @return void
     */
    public function __construct(Chat $model)
    {
        $this->model = $model;
    }



    // public function getStudentChats()
    // {
    //     $user = auth()->user();
    //     if ($user) {
    //         return Chat::where('user_id', $user->id)
    //             ->with('teacher.user')
    //             ->with('teacher.user')
    //             ->get();
    //     }
    //     return [];
    // }

    public function storeChat(array $data)
    {

        $existingChat = $this->model->where([
            'teacher_id' => $data['teacher_id'],
            'user_id' => $data['user_id'],
        ])->first();

        if ($existingChat) {
            return null;
        }


        $chat = $this->model->create($data);

        return $chat;
    }
}
