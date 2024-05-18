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
     public function search(array $filters): LengthAwarePaginator
     {
         $query = $this->model->query();
 
         if (isset($filters['search']) && !empty($filters['search'])) {
             $search = $filters['search'];
             $query->where('name', 'like', "%{$search}%")
                   ->orWhere('description', 'like', "%{$search}%");
         }
 
         return $query->paginate($filters['rowPerPage'] ?? 10)->appends($filters);
     }
}
