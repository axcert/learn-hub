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
        $serviceCount = $adminServices->count();

        $adminServices->load('teacher.user');

        return Inertia::render('AdminsArea/Overview/Overview', [
            'studentCount' =>  $studentCount,
            'teacherCount' => $teacherCount,
            'serviceCount' => $serviceCount,
            'adminServices' => $adminServices,
            'userTeachers' => $teacherUsers,
        ]);
    }


    public function search(Request $request)
    {
        $search = $request->input('search');
        $services = $this->serviceInterface->all()->load('teacher');

        if ($search) {
            $services = $services->filter(function ($service) use ($search) {
                return stripos($service->name, $search) !== false ||
                    stripos(optional($service->teacher)->tname, $search) !== false ||
                    stripos((string)$service->hourly_rate, $search) !== false;
            });
        }

        $serviceCount = $services->count();
        return Inertia::render('AdminsArea/Service/Service', [
            'search' => $search,
            'services' => $services,
            'serviceCount' => $serviceCount,
        ]);
    }
    
     public function accept($id)
     {
         $service = $this-> serviceInterface-> findById($id);
         $service->status = 'approved';
         $service->save();
         return redirect()->route('admins.overview.index');
     }

     public function reject($id)
     {
         $service = $this-> serviceInterface-> findById($id);
         $service->status = 'rejected';
         $service->save();
         return redirect()->route('admins.overview.index');
     }
    
}
