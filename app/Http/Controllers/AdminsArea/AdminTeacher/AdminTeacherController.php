<?php

namespace App\Http\Controllers\AdminsArea\AdminTeacher;

use App\Http\Controllers\Controller;
use App\Repositories\All\Teachers\TeacherInterface;
use App\Repositories\All\Users\UserInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminTeacherController extends Controller
{

    public function __construct(
        protected UserInterface $userInterface,
        protected TeacherInterface $teacherInterface,
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $users = $this->userInterface->all()->load('user');
        $teacherUsers = $users ->filter(function($users){
            return $users->role === "teacher";
        });

        // $teacherUsers->load(['teacher' => function($query) {
        //     $query->select('id', 'user_id', 'bio', 'position');
        // }]);
        
        $teacherUsers->load('teacher');

        $teacherCount = $teacherUsers->count();
        return Inertia::render('AdminsArea/Teacher/Teacher', [
            'teacherCount' => $teacherCount,
            'userTeachers' => $teacherUsers,
        ]);
    }

    public function search(Request $request){
       
        $users = $this->userInterface->all()->load('user');
        $search = $request->input('search');
        
        if ($search) {
            $users = $users->filter(function ($user) use ($search) {
                return stripos($user->name, $search) !== false ||
                       stripos($user->email, $search) !== false ||
                       stripos($user->phone, $search) !== false;
            });
        }
        
        $teacherCount = $users->count();
        return Inertia::render('AdminsArea/Teacher/Teacher', [
            'search' => $search,
            'users' => $users,
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
