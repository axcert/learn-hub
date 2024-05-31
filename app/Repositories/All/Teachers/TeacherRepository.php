<?php

namespace App\Repositories\All\Teachers;


use App\Models\Teacher;
use App\Repositories\Base\BaseRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class TeacherRepository extends BaseRepository implements TeacherInterface
{
      /**
     * @var Teacher
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  Teacher  $model
     */

     public function __construct(Teacher $model)
     {
         $this->model = $model;
     }

     public function findByUserId(int $userId, array $relations = [])
    {
        $teacher = Teacher::where('user_id', $userId)->with($relations)->first();
        return $teacher;
    }

   
}
