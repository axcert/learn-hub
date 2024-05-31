<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $table = 'services';

    protected $fillable = [
        'service_id',
        'name',
        'description',
        'admin_id',
        'experience',
        'hourly_rate',
        'teacher_id',
        'status',
    ];

    public function admin(){
        return $this->belongsTo(Admin::class, 'admin_id');
    }   

    public function teacher(){
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }
    


    public function user()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
