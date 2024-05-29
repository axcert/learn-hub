<?php

namespace App\Repositories\All\Admins;

use App\Models\Admin;
use App\Repositories\Base\BaseRepository;

class AdminRepository extends BaseRepository implements AdminInterface
{

/**
 * @var Admin
 */
protected $model;



/**
 * @param Admin $model
 */

public function __construct(Admin $model){
    $this->model = $model;
}


}
