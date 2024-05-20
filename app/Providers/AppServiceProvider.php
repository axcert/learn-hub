<?php

namespace App\Providers;

use App\Repositories\All\Teachers\TeacherInterface;
use App\Repositories\All\Teachers\TeacherRepository;
use Illuminate\Support\ServiceProvider;
use App\Repositories\All\Services\ServiceInterface;
use App\Repositories\All\Services\ServiceRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        
            $this->app->bind(ServiceInterface::class, ServiceRepository::class );
            $this->app->bind(TeacherInterface::class, TeacherRepository::class);
        
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
