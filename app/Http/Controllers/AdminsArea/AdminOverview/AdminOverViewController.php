<?php

namespace App\Http\Controllers\AdminsArea\AdminOverview;

use App\Http\Controllers\Controller;
use App\Repositories\All\Students\StudentInterface;
use App\Repositories\All\Teachers\TeacherInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOverViewController extends Controller
{

    public function __construct(
        protected StudentInterface $studentInterface,
        protected TeacherInterface $teacherInterface
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('AdminsArea/Overview/Overview', [
            'studentCount' => $this->studentInterface->all()->count(),
            'teacherCount' => $this->teacherInterface->all()->count(),

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
