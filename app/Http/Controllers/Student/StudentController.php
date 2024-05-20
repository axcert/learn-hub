<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Repositories\All\Students\StudentInterface;
use Illuminate\Http\Request;
use App\Http\Request\StudentRequest;
use Inertia\Inertia;
class StudentController extends Controller
{
    public function __construct(protected StudentInterface $studentInterface,){}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        return Inertia::render('StudentArea/Student/All/Index', ['students'=> $this->studentInterface->all()]);
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
    public function show(string $id)
    {
        $student = $this->studentInterface->findById($student->id, ['*']);
        return Inertia::render('Students/Show/Index', ['student' => $student]);
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
        $this->studentInterface->update($student->id, $request->all());
        return redirect()->route('students.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->studentInterface->deleteById($student->id);
        return redirect()->route('students.index');
    }
}
