<?php

namespace App\Repositories\All\Messages;


use App\Models\Message;
use App\Repositories\Base\BaseRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class MessageRepository extends BaseRepository implements MessageInterface
{
    /**
     * @var Message
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  Message  $model
     */

     public function __construct(Message $model)
     {
         $this->model = $model;
     }
}
