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
    ];

    public function sender(){
        return $this->belongsTo(Student::class,'sender_id');
    }

    public function receiver(){
        return $this->belongsTo(Student::class,'receiver_id');
    }
}
