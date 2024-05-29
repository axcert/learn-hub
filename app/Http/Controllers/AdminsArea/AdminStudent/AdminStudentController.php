<?php

namespace App\Http\Controllers\AdminsArea\AdminStudent;

use App\Http\Controllers\Controller;
use App\Repositories\All\Students\StudentInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminStudentController extends Controller
{

    public function __construct(
        protected StudentInterface $studentInterface
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('AdminsArea/Student/Student',[
            'studentCount' => $this->studentInterface->all()->count(),
            'students' => $this->studentInterface->all()->load('user'),
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
