<?php

namespace App\Http\Controllers\AdminsArea\AdminStudent;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\All\Students\StudentInterface;
use App\Repositories\All\Users\UserInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminStudentController extends Controller
{

    public function __construct(
        protected UserInterface $userInterface
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
        $studentCount = $studentUsers->count();
        return Inertia::render('AdminsArea/Student/Student',[
            'studentCount' => $studentCount,
            'userStudents' => $studentUsers,
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
        
        $studentCount = $users->count();
        return Inertia::render('AdminsArea/Student/Student', [
            'search' => $search,
            'users' => $users,
            'studentCount' => $studentCount,
        ]);
    }
}
