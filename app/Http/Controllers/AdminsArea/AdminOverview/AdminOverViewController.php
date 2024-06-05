<?php

namespace App\Http\Controllers\AdminsArea\AdminOverview;


use App\Http\Controllers\Controller;
use App\Models\Service;
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
        protected TeacherInterface $teacherInterface,
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

        $services = $this->serviceInterface->all();
        $adminServices = $services->filter(function($services){
            return $services->status === 'pending' ;
        });
       
        $studentCount = $studentUsers->count();
        $teacherCount = $teacherUsers->count();

        $adminServices->load('teacher.user');

        return Inertia::render('AdminsArea/Overview/Overview', [
            'studentCount' =>  $studentCount,
            'teacherCount' => $teacherCount,
            'adminServices' => $adminServices,
            'userTeachers' => $teacherUsers,
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
     }

     public function accept($id)
     {
         $service = $this-> serviceInterface-> findById($id);
         $service->status = 'approved';
         $service->save();
         return redirect()->route('admins.overview.index');
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
