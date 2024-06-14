<?php

namespace App\Http\Controllers\TeachersArea\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use App\Repositories\All\Services\ServiceInterface;
use App\Repositories\All\Teachers\TeacherInterface;
use App\Repositories\All\Users\UserInterface;
use Illuminate\Http\Request;
use App\Models\Teacher;
use Inertia\Inertia;

class TeacherTeacherController extends Controller
{
    public function __construct(protected TeacherInterface $teacherInterface, 
                                protected ServiceInterface $serviceInterface,
                                protected UserInterface $userInterface){}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $teachers = $this->teacherInterface->all(['*'], ['user', 'services']);

        foreach ($teachers as $teacher) {
            $teacher->average_rating = $teacher->getAverageRatingAttribute();
        }

        return Inertia::render('TeachersArea/Teacher/All/Index', [
            'teachers' => $teachers,
            
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
        return Inertia::render('StudentArea/Teacher/All/Index', [
            'search' => $search,
            'services' => $services,
            'serviceCount' => $serviceCount,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // return Inertia::render('TeachersArea/Teacher/Create/Index');
        $userId = auth()->id();
        $teacher = $this->teacherInterface->findByColumn(['user_id'=> $userId]);

        if ($teacher) {
            return redirect()->route('teachers.edit', $teacher->id)
                ->with('message', 'You already have a profile. You can edit it here.');
        }

        return Inertia::render('TeachersArea/Teacher/Create/Index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeacherRequest $request)
    {
        
        $validated = $request->validated();
        $teacher = $this->teacherInterface->create($validated);

        return redirect()->route('teachers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {   
        $teacher = $this->teacherInterface->findById($id, ['*'], ['user', 'services.bookings.user']);
        if (!$teacher) {
            abort(404, 'Teacher not found');
        }
        
        $approvedServices = $teacher->services->filter(function($service) {
            return $service->status === 'approved';
        });
        $teacher->setRelation('services', $approvedServices);

        $comments = [];
        foreach ($approvedServices as $service) {
            foreach ($service->bookings as $booking) {
                if ($booking->rating !== null) {
                    $comments[] = [
                        'comment' => $booking->comment,
                        'rating' => $booking->rating,
                        'service' => $service->name,
                        'student' => $booking->user->name,
                    ];
                }
            }
        }
        $averageRating = $teacher->average_rating;

        return Inertia::render('TeachersArea/Teacher/Show/Index', [
            'teacher' => $teacher,
            'averageRating' => $averageRating,
            'comments' => $comments,
        ]);
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $teacher = $this->teacherInterface->findById($id, ['*'], ['user']);
        
        return Inertia::render('TeachersArea/Teacher/Edit/Index', [
            'teacher' => $teacher,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeacherRequest $request, string $id)
    {
        
        $validated = $request->validated();
        $teacher = $this->teacherInterface->update($id, $validated);

        return redirect()->route('teachers.show', $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
