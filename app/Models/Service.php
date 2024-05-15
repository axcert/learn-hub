<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $table = 'Services';

    protected $fillable = [
        'name',
        'description',
        'admin_id',
        'experience',
        'hourly_rate',
        'teacher_id',
    ];

    public function teacher(){
        return $this->belongsTo(Teacher::class);
    }
}
