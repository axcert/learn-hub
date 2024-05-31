<?php 

namespace App\Repositories\All\Teachers;

use App\Repositories\Base\BaseRepositoryInterface;

interface TeacherInterface extends BaseRepositoryInterface
{
    
    public function findByUserId(int $userId, array $relations = []);

    
}