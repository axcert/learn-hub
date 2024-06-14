<?php

namespace App\Repositories\All\Chats;
use App\Models\Chat;
use App\Repositories\All\Chats\ChatsInterface;
use App\Repositories\Base\BaseRepository;


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
}
