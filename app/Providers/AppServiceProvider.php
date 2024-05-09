<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\All\Students\StudentInterface;
use App\Repositories\All\Students\StudentRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            StudentInterface::class,
            StudentRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
