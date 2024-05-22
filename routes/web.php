<?php


use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminsArea\AdminAdmin\AdminAdminController;
use App\Http\Controllers\AdminsArea\AdminOverview\AdminOverViewController;
use App\Http\Controllers\AdminsArea\AdminProfileManage\AdminProfileManageController;
use App\Http\Controllers\AdminsArea\AdminService\AdminServiceController;
use App\Http\Controllers\AdminsArea\AdminStudent\AdminStudentController;
use App\Http\Controllers\AdminsArea\AdminTeacher\AdminTeacherController;
use App\Http\Controllers\Message\MessageController;
use App\Http\Controllers\Temp\TempController;
use App\Http\Controllers\Booking\BookingController;
use App\Http\Middleware\AdminValidationMiddleware;
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
    return Inertia::render('AdminsArea/Home/Home');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth','verified'])->group(function(){
    Route::prefix('admins')->middleware(AdminValidationMiddleware::class)->group(function () {
        Route::resource('overview', AdminOverViewController::class);
        Route::resource('teachers', AdminTeacherController::class);
        Route::resource('students', AdminStudentController::class);
        Route::resource('admins', AdminAdminController::class);
        Route::resource('services', AdminServiceController::class);
        Route::resource('profileManage', AdminProfileManageController::class);
        Route::resource('temp', TempController::class);
    });
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::post('services/{service}/update', [ServiceController::class,'update'])->name('services.update');
    Route::resource('messages', MessageController::class);
    Route::resource('bookings', BookingController::class);
});

require __DIR__ . '/auth.php';
