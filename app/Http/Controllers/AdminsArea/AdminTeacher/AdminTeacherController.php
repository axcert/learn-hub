<?php

namespace App\Http\Controllers\AdminsArea\AdminTeacher;

use App\Http\Controllers\Controller;
use App\Repositories\All\Teachers\TeacherInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminTeacherController extends Controller
{

    public function __construct(
        protected TeacherInterface $teacherInterface
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teachers = $this->teacherInterface->all()->load('user');

        return Inertia::render('AdminsArea/Teacher/Teacher', [
            'teacherCount' => $this->teacherInterface->all()->count(),
            'teachers' => $teachers,
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
    public function show(string $id)
    {
        //
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
