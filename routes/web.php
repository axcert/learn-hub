<?php

use App\Http\Controllers\Home\HomeController;
use App\Http\Controllers\Inquery\InqueryController;
use App\Http\Controllers\Overview\OverviewController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Service\ServiceController;
use App\Http\Controllers\Settings\SettingsController;
use App\Http\Controllers\Student\StudentController;
use App\Http\Controllers\Teacher\TeacherController;
use App\Http\Controllers\User\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Message\MessageController;
use App\Http\Controllers\ProfileManage\ProfileManageController;
use App\Http\Controllers\Temp\TempController;
use Inertia\Inertia;
use phpDocumentor\Reflection\Types\Resource_;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');



Route::get('/dashboard', function () {
    return Inertia::render('AdminsArea/Home/Home');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {

    Route::resource('home', HomeController::class);
    Route::resource('teacher',TeacherController::class);
    Route::resource('student',StudentController::class);
    Route::resource('overview',OverviewController::class);
    Route::resource('user',UserController::class);
    Route::resource('service',ServiceController::class);
    Route::resource('profileManage',ProfileManageController::class);



    Route::resource('temp',TempController::class);
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('admins', AdminController::class);
    Route::resource('students', StudentController::class);
    Route::resource('teachers', TeacherController::class);
    Route::resource('services', ServiceController::class);
    Route::resource('messages', MessageController::class);
});

require __DIR__.'/auth.php';
