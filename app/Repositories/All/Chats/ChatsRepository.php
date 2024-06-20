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


    
     public function getStudentChats()
     {
         $user = auth()->user();
         if ($user) {
             return Chat::where('user_id', $user->id)
                        ->with('teacher.user')
                        ->get();
         }
         return []; // Handle cases where user is not authenticated
     }


    
}
