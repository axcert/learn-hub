<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'role',
        
        
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function admin(){
        return $this->hasOne(Admin::class);
    }

    public function teacher(){
        return $this->hasMany(Teacher::class);
    }

    public function student(){
        return $this->hasMany(Student::class);
    }

    public function sentMessage(){
        return $this->hasMany(Message::class, 'senderId');
    }

    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiverId');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
    

    
}
