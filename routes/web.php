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
use App\Http\Controllers\AdminsArea\AdminUser\AdminUserController;
use App\Http\Controllers\AdminsArea\Temp\TempController;
use App\Http\Middleware\AdminValidationMiddleware;
use App\Http\Controllers\StudentsArea\Booking\StudentBookingController;
use App\Http\Controllers\StudentsArea\Message\StudentMessageController;
use App\Http\Controllers\StudentsArea\Service\StudentServiceController;
use App\Http\Controllers\StudentsArea\Student\StudentStudentController;
use App\Http\Controllers\StudentsArea\Teacher\StudentTeacherController;
use App\Http\Controllers\TeachersArea\Booking\TeacherBookingController;
use App\Http\Controllers\TeachersArea\Message\TeacherMessageController;
use App\Http\Controllers\TeachersArea\Overview\TeacherOverviewController;
use App\Http\Controllers\TeachersArea\Service\TeacherServiceController;
use App\Http\Controllers\TeachersArea\Student\TeacherStudentController;
use App\Http\Controllers\TeachersArea\Teacher\TeacherTeacherController;
use App\Http\Middleware\TeacherValidationMiddleware;
use App\Http\Middleware\StudentValidationMiddleware;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('admin')->middleware(AdminValidationMiddleware::class)->group(function () {
        Route::resource('overview', AdminOverViewController::class)->names('admins.overview');
        Route::resource('teachers', AdminTeacherController::class)->names('admin.teachers');
        Route::resource('students', AdminStudentController::class)->names('admin.students');
        Route::resource('admins', AdminAdminController::class)->names('admin.adminPanels');
        Route::resource('services', AdminServiceController::class)->names('admin.services');
        Route::resource('profileManage', AdminProfileManageController::class)->names('admin.profileManage');
        Route::resource('users', AdminUserController::class)->names('admin.users');
        Route::resource('temp', TempController::class)->names('admin.temp');

        
        Route::post('/admins/overview/{id}/accept', [AdminOverViewController::class, 'accept'])->name('admins.overview.accept');
        Route::post('/admins/overview/{id}/reject', [AdminOverViewController::class, 'reject'])->name('admins.overview.reject');


    });


    Route::prefix('students')->middleware(StudentValidationMiddleware::class)->group(function () {
        Route::get('/', [StudentStudentController::class, 'index'])->name('students.index');

        Route::resource('services', StudentServiceController::class)->names('student.services');
        Route::resource('teachers', StudentTeacherController::class)->names('student.teachers');
        Route::resource('messages', StudentMessageController::class)->names('student.messages');
        Route::get('bookings/create/{service_id}', [StudentBookingController::class, 'create'])->name('student.bookings.create');
        Route::resource('bookings', StudentBookingController::class)->except(['create'])->names('student.bookings');
        Route::patch('/student/bookings/{booking}/complete', [StudentBookingController::class, 'markAsCompleted'])->name('student.bookings.complete');

        
    });

    Route::prefix('teachers')->middleware(TeacherValidationMiddleware::class)->group(function () {
        Route::resource('overviews', TeacherOverviewController::class)->names('teacher.overviews');
        Route::resource('students', TeacherStudentController::class)->names('teacher.students');
        Route::resource('services', TeacherServiceController::class)->names('teacher.services')->except(['put']);
        Route::post('/services/{id}', [TeacherServiceController::class, 'update'])->name('teacher.services.update');
        
        Route::get('/', [TeacherTeacherController::class, 'index'])->name('teachers.index');
        Route::get('/{id}', [TeacherTeacherController::class, 'show'])->name('teachers.show');
        Route::get('teachers/create/', [TeacherTeacherController::class, 'create'])->name('teachers.create');
        Route::post('/teachers', [TeacherTeacherController::class, 'store'])->name('teachers.store');
        Route::get('/teachers/{id}/edit', [TeacherTeacherController::class, 'edit'])->name('teachers.edit');
        Route::put('/teachers/{id}', [TeacherTeacherController::class, 'update'])->name('teachers.update');

        Route::resource('messages', TeacherMessageController::class)->names('teacher.messages');

        Route::get('bookings/create/{service_id}', [TeacherBookingController::class, 'create'])->name('teacher.bookings.create');
        Route::resource('bookings', TeacherBookingController::class)->names('teacher.bookings')->except(['create', 'patch']);
        Route::patch('/teacher/bookings/{booking}/accept', [TeacherBookingController::class, 'accept'])->name('teacher.bookings.accept');
        Route::patch('/teacher/bookings/{booking}/reject', [TeacherBookingController::class, 'reject'])->name('teacher.bookings.reject');
        Route::patch('/teacher/bookings/{booking}/complete', [TeacherBookingController::class, 'markAsCompleted'])->name('teacher.bookings.complete');

    });
});


require __DIR__ . '/auth.php';
