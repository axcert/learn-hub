<?php

namespace App\Repositories\All\Services;


use App\Models\Service;
use App\Repositories\Base\BaseRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class ServiceRepository extends BaseRepository implements ServiceInterface
{
      /**
     * @var Service
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  Service  $model
     */

     public function __construct(Service $model)
     {
         $this->model = $model;
     }
}
