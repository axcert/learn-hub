<?php

namespace App\Http\Controllers\StudentsArea\Teacher;

use App\Http\Controllers\Controller;
use App\Repositories\All\Services\ServiceInterface;
use App\Repositories\All\Teachers\TeacherInterface;
use Illuminate\Http\Request;
use App\Models\Teacher;
use Inertia\Inertia;

class StudentTeacherController extends Controller
{
    public function __construct(protected TeacherInterface $teacherInterface, 
    protected ServiceInterface $serviceInterface){}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $teachers = $this->teacherInterface->all(['*'], ['user']);
        $services = $this->serviceInterface->all();

        return Inertia::render('StudentArea/Teacher/All/Index', [
            'teachers' => $teachers,
            'services' => $services
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

        return Inertia::render('StudentArea/Teacher/Show/Index', [
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
