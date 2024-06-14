<?php

namespace App\Http\Controllers\TeachersArea\Student;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Repositories\All\Bookings\BookingInterface;
use App\Repositories\All\Services\ServiceInterface;
use App\Repositories\All\Students\StudentInterface;
use App\Repositories\All\Teachers\TeacherInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;
class TeacherStudentController extends Controller
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
        $services = $this->serviceInterface->all(['*'], ['teacher']);
        $bookings = $this->bookingInterface->findByUserId($user_id, ['service.teacher']);
    
        return Inertia::render('StudentArea/Student/All/Index', [
            'students' => $students,
            'services' => $services,
            'bookings' => $bookings,
        ]);
        
    }


    public function show(Student $student)
    {
        $student = $this->studentInterface->findById($student->id, ['*']);
        return Inertia::render('Students/Show/Index', ['student' => $student]);
    }


    public function update(Request $request,Student $student)
    {
        $this->studentInterface->update($student->id, $request->all());
        return redirect()->route('students.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $this->studentInterface->deleteById($student->id);
        return redirect()->route('students.index');
    }
}
