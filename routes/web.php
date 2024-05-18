<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Student\StudentController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Message\MessageController;
use App\Http\Controllers\Teacher\TeacherController;
use App\Http\Controllers\Service\ServiceController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function(){
    Route::resource('Students', StudentController::class);
});

// Route::get('/students', [StudentController::class, 'index'])->name('students.index');
// Route::get('/students/{student}', [StudentController::class,'show'])->name('students.show');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('admins', AdminController::class);
    Route::resource('students', StudentController::class);
    Route::resource('teachers', TeacherController::class);
    Route::resource('services', ServiceController::class);
    Route::resource('messages', MessageController::class);
});

require __DIR__.'/auth.php';
