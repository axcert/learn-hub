<?php

namespace App\Http\Controllers\StudentsArea\Student;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Repositories\All\Bookings\BookingInterface;
use App\Repositories\All\Services\ServiceInterface;
use App\Repositories\All\Students\StudentInterface;
use App\Repositories\All\Teachers\TeacherInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;
class StudentStudentController extends Controller
{
    public function __construct(protected StudentInterface $studentInterface, 
    protected ServiceInterface $serviceInterface,
    protected TeacherInterface $teacherInterface,
    protected BookingInterface $bookingInterface,
    ){}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
           
        $user_id = auth()->id();
        $students = $this->studentInterface->all();
        $services = $this->serviceInterface->getByColumn(['status' => 'approved'], ['*'], ['teacher.user']);
        $bookings = $this->bookingInterface->findByUserId($user_id, ['service.teacher.user']);

        return Inertia::render('StudentArea/Student/All/Index', [
            'students' => $students,
            'services' => $services,
            'bookings' => $bookings,
        ]);

    }

}