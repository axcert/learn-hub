<?php

namespace App\Repositories\All\Messages;


use App\Models\Message;
use App\Models\Messages;
use App\Repositories\Base\BaseRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class MessageRepository extends BaseRepository implements MessageInterface
{
    /**
     * @var Messages
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  Messages  $model
     */

     public function __construct(Messages $model)
     {
         $this->model = $model;
     }

}
