<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $table = 'Services';

    protected $fillable = [
        'service_id',
        'name',
        'description',
        'admin_id',
        'experience',
        'hourly_rate',
        'teacher_id',

    ];

    public function admin(){
        return $this->belongsTo(Admin::class, 'admin_id');
    }   

    public function teacher(){
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }
}
