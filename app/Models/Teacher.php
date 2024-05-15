<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $table = 'Teachers';

    protected $fillable = [
        'user_id',
        'bio',
        'position',


    ];

    public function services(){
        return $this->hasMany(Service::class ,'service_id',  'teacher_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
        

}
