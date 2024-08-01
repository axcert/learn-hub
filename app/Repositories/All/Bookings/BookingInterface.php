<?php 

namespace App\Repositories\All\Bookings;

use App\Repositories\Base\BaseRepositoryInterface;

interface BookingInterface extends BaseRepositoryInterface
{
    public function findByUserId(int $userId, array $relations = []);
    public function findByServiceIds(array $serviceIds, array $relations = []);
}