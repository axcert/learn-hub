<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $table = 'services';

    protected $fillable = [
        
        'name',
        'description',
        'admin_id',
        'experience',
        'hourly_rate',
        'teacher_id',
        'status',
        'image',
    ];

    public function admin(){
        return $this->belongsTo(User::class, 'admin_id');
    }   

    public function teacher(){
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }
    

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
    public function getAverageRatingAttribute()
    {
        return $this->bookings()->whereNotNull('rating')->average('rating');
    }
}
