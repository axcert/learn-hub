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
        $teacher_id = auth()->user()->teacher->id; // Assuming the logged-in user has a related teacher
        $bookings = $this->bookingInterface->findByColumn(['teacher_id' => $teacher_id], ['*'], ['student', 'service']);
        $services = $this->serviceInterface->all()->where('teacher_id', $teacher_id);
        
        return Inertia::render('TeachersArea/Overview/All/Index', [
            'bookings' => $bookings,
            'services' => $services,
        ]);
    
        

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $userId = auth()->user()->id;

        // Assuming 'teacher_id' is the correct column and relationships exist in the Booking model
        $services = $this->serviceInterface->getByColumn(['teacher_id' => $userId]);
        $bookings = $this->bookingInterface->getByColumn(['teacher_id' => $userId], ['service', 'student']);

        return Inertia::render('TeachersArea/Overview/Index', [
            'services' => $services,
            'bookings' => $bookings,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
