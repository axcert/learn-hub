<?php

namespace App\Http\Controllers\TeachersArea\Teacher;

use App\Http\Controllers\Controller;
use App\Repositories\All\Services\ServiceInterface;
use App\Repositories\All\Teachers\TeacherInterface;
use Illuminate\Http\Request;
use App\Models\Teacher;
use Inertia\Inertia;

class TeacherTeacherController extends Controller
{
    public function __construct(protected TeacherInterface $teacherInterface, 
                                protected ServiceInterface $serviceInterface){}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $teachers = $this->teacherInterface->all(['*'], ['user']);
        $services = $this->serviceInterface->all()->count();
        // 'servicesCount' -> $this->serviceInterface->count();

        return Inertia::render('TeachersArea/Teacher/All/Index', [
            'teachers' => $teachers,
            'services' => $services,
            'servicesCount' => $services,
            
        ]);
         //return Inertia::render('TeachersArea/Teacher/All/Index');

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

        return Inertia::render('TeachersArea/Teacher/Show/Index', [
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
