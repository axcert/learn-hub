<?php

namespace App\Repositories\All\Bookings;


use App\Models\Booking;
use App\Repositories\Base\BaseRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class BookingRepository extends BaseRepository implements BookingInterface
{
    /**
     * @var Booking
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  Booking  $model
     */

     public function __construct(Booking $model)
     {
         $this->model = $model;
     }

     public function findByUserId(int $userId, array $relations = []): Collection
     {
         $bookings = Booking::with($relations)->where('user_id', $userId)->get();

         return $bookings;
     }

     public function findByServiceIds(array $serviceIds, array $relations = []): Collection
     {
         return $this->model->with($relations)->whereIn('service_id', $serviceIds)->get();
     }
    
}
