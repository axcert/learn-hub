<?php


use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentsArea\Booking\StudentBookingController;
use App\Http\Controllers\StudentsArea\Message\StudentMessageController;
use App\Http\Controllers\StudentsArea\Service\StudentServiceController;
use App\Http\Controllers\StudentsArea\Student\StudentStudentController;
use App\Http\Controllers\StudentsArea\Teacher\StudentTeacherController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\StudentValidationMiddleware;
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



Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('students')->middleware(StudentValidationMiddleware::class)->group(function () {
        Route::resource('students', StudentStudentController::class);
        Route::resource('services', StudentServiceController::class);
        Route::resource('teachers', StudentTeacherController::class);
        Route::resource('messages', StudentMessageController::class);
        Route::get('bookings/create/{service_id}', [StudentBookingController::class, 'create'])->name('bookings.create');
        Route::resource('bookings', StudentBookingController::class)->except(['create']);
       
    });
});


// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::resource('teachers', TeacherController::class);
//     //Route::resource('services', StudentServiceController::class);
//     //Route::post('services/{service}/update', [ServiceController::class,'update'])->name('services.update');
//     Route::resource('messages', MessageController::class);
//     Route::resource('bookings', BookingController::class);

// });

require __DIR__ . '/auth.php';
