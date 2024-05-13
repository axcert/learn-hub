<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $table = 'Teachers';

    protected $fillable = [
        'name',
        'email',
        'phone',
    ];

    public function services(){
        return $this->hasMany(Service::class ,'service_id',  'teacher_id');
    }
        

}
