<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $table = 'bookings';

    protected $fillable = [
        
        'service_id',
        'user_id',
        'status',
        'timestamp',
        'description',
        'rating',
        'comment',
    ];

    public function service(){
        return $this->belongsTo(Service::class, 'service_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
