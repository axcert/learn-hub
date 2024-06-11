<?php


namespace App\Http\Controllers\StudentsArea\Teacher;


use App\Http\Controllers\Controller;
use App\Repositories\All\Services\ServiceInterface;
use App\Repositories\All\Teachers\TeacherInterface;
use Illuminate\Http\Request;
use App\Models\Teacher;
use Inertia\Inertia;


class StudentTeacherController extends Controller

{
    public function __construct(protected TeacherInterface $teacherInterface, 
    protected ServiceInterface $serviceInterface){}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $teachers = $this->teacherInterface->all(['*'], ['user', 'services']);
        $services = $this->serviceInterface->getByColumn(['status' => 'approved']);

        return Inertia::render('StudentArea/Teacher/All/Index', [
            'teachers' => $teachers,
            'services' => $services
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


    public function show($id)
    {   
        $teacher = $this->teacherInterface->findById($id, ['*'], ['user', 'services']);
        if (!$teacher) {
            abort(404, 'Teacher not found');
        }          
        $approvedServices = $teacher->services->filter(function($service) {
            return $service->status === 'approved';
        });
        $teacher->setRelation('services', $approvedServices);

        return Inertia::render('StudentArea/Teacher/Show/Index', [
            'teacher' => $teacher,
            
        ]);
    }

    
}
