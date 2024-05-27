<?php

namespace App\Providers;

use App\Repositories\All\Bookings\BookingInterface;
use App\Repositories\All\Bookings\BookingRepository;
use App\Repositories\All\Messages\MessageInterface;
use App\Repositories\All\Messages\MessageRepository;
use App\Repositories\All\Teachers\TeacherInterface;
use App\Repositories\All\Teachers\TeacherRepository;
use Illuminate\Support\ServiceProvider;
use App\Repositories\All\Students\StudentInterface;
use App\Repositories\All\Students\StudentRepository;
use App\Repositories\All\Services\ServiceInterface;
use App\Repositories\All\Services\ServiceRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
            $this->app->bind( StudentInterface::class, StudentRepository::class);
            $this->app->bind(ServiceInterface::class, ServiceRepository::class );
            $this->app->bind(TeacherInterface::class, TeacherRepository::class);
            $this->app->bind(BookingInterface::class, BookingRepository::class);
            $this->app->bind(MessageInterface::class, MessageRepository::class);
        
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
