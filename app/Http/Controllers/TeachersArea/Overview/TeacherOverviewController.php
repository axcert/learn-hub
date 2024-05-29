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
                                protected StudentInterface $studentInterface,
                                protected BookingInterface $bookingInterface){}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teacherId = auth()->user()->id;

        $services = $this->serviceInterface->getByColumn(['teacher_id' => $teacherId]);
        $bookings = $this->bookingInterface->getByColumn(['teacher_id' => $teacherId], ['service', 'student']);

        return Inertia::render('TeachersArea/Overview/Index', [
            'services' => $services,
            'bookings' => $bookings,
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
        $teacher = $this->teacherInterface->findById($id, ['*'], ['user', 'services']);
        if (!$teacher) {
            abort(404, 'Teacher not found');
        }

        return Inertia::render('TeachersArea/Overview/Show/Index', [
            'teacher' => $teacher,
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
