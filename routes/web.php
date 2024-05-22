<?php

use App\Http\Controllers\Home\HomeController;
use App\Http\Controllers\Overview\OverviewController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Service\ServiceController;
use App\Http\Controllers\Student\StudentController;
use App\Http\Controllers\Teacher\TeacherController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Message\MessageController;
use App\Http\Controllers\ProfileManage\ProfileManageController;
use App\Http\Controllers\Temp\TempController;
use App\Http\Middleware\AdminValidationMiddleware;
use App\Http\Middleware\StudentValidationMiddleware;
use App\Http\Controllers\Booking\BookingController;
use GuzzleHttp\Middleware;
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


// Route::prefix('admins')->middleware(AdminValidationMiddleware::class)->name('admins.')->controller(AdminController::class)->group(function () {
//     Route::get('/', 'index')->name('index');
//     Route::get('/create', 'create')->name('create');
//     Route::get('/{id}', 'show')->name('show');
//     Route::get('/{id}/edit', 'edit')->name('edit');
//     Route::post('/store', 'store')->name('store');
//     Route::patch('/{id}/update', 'update')->name('update');
//     Route::delete('/{id}/destroy', 'destroy')->name('destroy');
// });

Route::prefix('students')->middleware(StudentValidationMiddleware::class)->name('students.')->controller(StudentController::class)->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/create', 'create')->name('create');
    Route::get('/{id}', 'show')->name('show');
    Route::get('/{id}/edit', 'edit')->name('edit');
    Route::post('/store', 'store')->name('store');
    Route::patch('/{id}/update', 'update')->name('update');
    Route::delete('/{id}/destroy', 'destroy')->name('destroy');
});


Route::prefix('admin')->middleware('auth')->group(function () {
    Route::resource('overview', OverviewController::class);
    Route::resource('teachers', TeacherController::class);
    Route::resource('students', StudentController::class);
    Route::resource('admins', AdminController::class);
    Route::resource('services', ServiceController::class);
    Route::resource('profileManage', ProfileManageController::class);
    Route::resource('temp', TempController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('students', StudentController::class);
    // Route::resource('teachers', TeacherController::class);
    // Route::resource('services', ServiceController::class);
    Route::post('services/{service}/update', [ServiceController::class,'update'])->name('services.update');
    Route::resource('messages', MessageController::class);
    Route::resource('bookings', BookingController::class);
});

require __DIR__ . '/auth.php';
