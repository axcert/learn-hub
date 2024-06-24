<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Messages extends Model
{
    use HasFactory;

    protected $table = 'new_messages';

    protected $fillable = [
        'chat_id',
        'message',
        'sender',
        'timestamp',
    ];

    // public function chat()
    // {
    //     return $this->belongsTo(Chat::class, 'chat_id');
    // }

    public function chat()
    {
        return $this->belongsTo(Chat::class);
    }
}
