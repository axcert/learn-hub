<?php

namespace App\Http\Controllers\TeachersArea\Teacher;

use App\Http\Controllers\Controller;
use App\Repositories\All\Services\ServiceInterface;
use App\Repositories\All\Teachers\TeacherInterface;
use App\Repositories\All\Users\UserInterface;
use Illuminate\Http\Request;
use App\Models\Teacher;
use Inertia\Inertia;

class TeacherTeacherController extends Controller
{
    public function __construct(protected TeacherInterface $teacherInterface, 
                                protected ServiceInterface $serviceInterface,
                                protected UserInterface $userInterface){}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $teachers = $this->teacherInterface->all(['*'], ['user', 'services']);

        return Inertia::render('TeachersArea/Teacher/All/Index', [
            'teachers' => $teachers,
        ]);

    

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // return Inertia::render('TeachersArea/Teacher/Create/Index');
        $userId = auth()->id();
        $teacher = $this->teacherInterface->findByColumn(['user_id'=> $userId]);

        if ($teacher) {
            return redirect()->route('teachers.edit', $teacher->id)
                ->with('message', 'You already have a profile. You can edit it here.');
        }

        return Inertia::render('TeachersArea/Teacher/Create/Index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'bio' => 'required|string',
            'position' => 'required|string',
            'user_id' => 'required|exists:users,id'
        ]);

        $teacher = $this->teacherInterface->create($validated);

        return redirect()->route('teachers.index');
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
        $teacher = $this->teacherInterface->findById($id, ['*'], ['user']);
        
        return Inertia::render('TeachersArea/Teacher/Edit/Index', [
            'teacher' => $teacher,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'bio' => 'required|string',
            'position' => 'required|string',
        ]);

        $teacher = $this->teacherInterface->update($id, $validated);

        return redirect()->route('teachers.show', $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
