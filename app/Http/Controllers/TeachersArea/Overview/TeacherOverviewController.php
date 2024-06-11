<?php

namespace App\Http\Controllers\TeachersArea\Overview;

use App\Http\Controllers\Controller;
use App\Repositories\All\Bookings\BookingInterface;
use App\Repositories\All\Services\ServiceInterface;
use App\Repositories\All\Students\StudentInterface;
use App\Repositories\All\Teachers\TeacherInterface;
use Illuminate\Http\Request;
use App\Models\Teacher;
use Inertia\Inertia;

class TeacherOverviewController extends Controller
{
    public function __construct(protected ServiceInterface $serviceInterface,
                                protected TeacherInterface $teacherInterface,
                                protected StudentInterface $studentInterface,
                                protected BookingInterface $bookingInterface){}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        $user_id = auth()->id();
        $teacher = $this->teacherInterface->findByUserId($user_id);

        $services = [];
        $bookings = [];
        $bookingsForMyServices = [];

        if ($teacher) {
            $services = $this->serviceInterface->getByColumn(['teacher_id' => $teacher->id], ['*'], ['teacher.user']);
            $bookings = $this->bookingInterface->findByUserId($user_id, ['service.teacher.user']);
            $bookingsForMyServices = $this->bookingInterface->getByColumn(['service_id' => $services->pluck('id')->toArray()], ['*'], ['service.teacher.user', 'user'] );
            
            
        }

        return Inertia::render('TeachersArea/Overview/All/Index', [
            'teacher' => $teacher,
            'services' => $services,
            'bookings' => $bookings,
            'bookingsForMyServices' => $bookingsForMyServices,
        ]);
        
        
    }

}
