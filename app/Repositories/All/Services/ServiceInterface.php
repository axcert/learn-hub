<?php 

namespace App\Repositories\All\Services;

use App\Repositories\Base\BaseRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;


interface ServiceInterface extends BaseRepositoryInterface
{
    /**
     * Search services based on criteria.
     *
     * @param array $filters
     * @return LengthAwarePaginator
     */
    public function search(array $filters): LengthAwarePaginator;
    
}