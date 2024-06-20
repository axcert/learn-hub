<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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

    protected $appends = ['image_url'];


    public function getImageUrlAttribute() {
        return $this->image ? Storage::url($this->image) : null;
    }

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
