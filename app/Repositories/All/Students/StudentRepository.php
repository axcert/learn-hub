<?php

namespace App\Repositories\All\Students;


use App\Models\Student;
use App\Repositories\Base\BaseRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class StudentRepository extends BaseRepository implements StudentInterface
{
    /**
     * @var Student
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  Student  $model
     */

     public function __construct(Student $model)
     {
         $this->model = $model;
     }
}
