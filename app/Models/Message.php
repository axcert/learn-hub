<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $table = 'Messages';

    protected $fillable = [
        
        'message',
        'sender_id',
        'receiver_id',
        'booking_id',
        'timestamp',
    ];

    public function sender(){
        return $this->belongsTo(User::class,'sender_id');
    }

    public function receiver(){
        return $this->belongsTo(User::class,'receiver_id');
    }

    public function booking(){
        return $this->belongsTo(Booking::class,'booking_id');
    }
}