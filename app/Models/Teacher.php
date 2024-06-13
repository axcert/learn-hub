<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $table = 'teachers';

    protected $fillable = [
        'user_id',
        'bio',
        'position',


    ];

    public function services(){
        return $this->hasMany(Service::class ,  'teacher_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getAverageRatingAttribute()
    {
        $ratings = $this->services->flatMap(function ($service) {
            return $service->bookings->where('status', 'completed')->pluck('rating');
        })->filter();

        if ($ratings->isEmpty()) {
            return null;
        }

        return $ratings->average();
    }
}
