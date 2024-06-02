<?php

namespace App\Http\Controllers\AdminsArea\AdminOverview;

use App\Http\Controllers\Controller;
use App\Repositories\All\Services\ServiceInterface;
use App\Repositories\All\Students\StudentInterface;
use App\Repositories\All\Teachers\TeacherInterface;
use App\Repositories\All\Users\UserInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOverViewController extends Controller
{

    public function __construct(
        protected ServiceInterface $serviceInterface,
        protected UserInterface $userInterface,
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $users = $this->userInterface->all()->load('user');
        $studentUsers = $users->filter(function ($user) {
            return $user->role === 'student';
        });
        $teacherUsers = $users->filter(function ($user) {
            return $user->role === 'teacher';
        });

        $studentCount = $studentUsers->count();
        $teacherCount = $teacherUsers->count();

        return Inertia::render('AdminsArea/Overview/Overview', [
            'studentCount' =>  $studentCount,
            'teacherCount' => $teacherCount,
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
