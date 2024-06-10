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
    // public function index(Request $request)
    // {
    //     $users = $this->userInterface->all()->load('user');

    //     $studentUsers = $users->filter(function ($user) {
    //         return $user->role === 'student';
    //     });
    //     $studentCount = $studentUsers->count();

    //     return Inertia::render('AdminsArea/Student/Student',[
    //         'studentCount' => $studentCount,
    //         'userStudents' => $studentUsers,
    //     ]);
    // }


    public function index(Request $request)
    {
        // $search = $request->input('search');
        // $query = User::query();
    
        // if ($search) {
        //     $query->where(function ($query) use ($search) {
        //         $query->where('name', 'LIKE', "%$search%")
        //               ->orWhere('email', 'LIKE', "%$search%")
        //               ->orWhere('phone', 'LIKE', "%$search%");
        //     });
        // }
        // $query->where('role', 'student');
    
        // $studentUsers = $query->get();
        // $studentCount = $studentUsers->count();
    
        // return Inertia::render('AdminsArea/Student/Student', [
        //     'studentCount' => $studentCount,
        //     'userStudents' => $studentUsers,
        //     'search' => $search,
        // ]);

        $users = $this->userInterface->all()->load('user');

        $search = $request->input('search');
        
        if ($search) {
            $users = $users->filter(function ($user) use ($search) {
                return stripos($user->name, $search) !== false ||
                       stripos($user->email, $search) !== false ||
                       stripos($user->phone, $search) !== false;
            });
        }
        
        $studentUsers = $users->filter(function ($user) {
            return $user->role === 'student';
        });
        
        $studentCount = $studentUsers->count();
        
        return Inertia::render('AdminsArea/Student/Student', [
            'studentCount' => $studentCount,
            'userStudents' => $studentUsers,
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
