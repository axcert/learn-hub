<?php

namespace App\Http\Controllers\TeachersArea\Service;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Service;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Repositories\All\Services\ServiceInterface;
use App\Http\Controllers\Teacher;
use App\Repositories\All\Teachers\TeacherInterface;


class TeacherServiceController extends Controller
{
    public function __construct(protected ServiceInterface $serviceInterface, protected TeacherInterface $teacherInterface){}
    /**
     * Display a listing of the resource.
     */
       
    public function index(Request $request)
    {    
        $teacherId = $request->user()->id;
        $filters = $request->all();

        $services = $this->serviceInterface->getByColumn(['teacher_id' => $teacherId]);

        return Inertia::render('TeachersArea/Service/All/Index', [
            'services' => $services,
            'filters' => $filters,
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {   
        $teachers = $this->teacherInterface->all();
        return Inertia::render('TeachersArea/Service/Create/Index', ['teachers'=> $teachers]);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceRequest $request)
    {
    
        $data = $request->all();
        $data['teacher_id'] = $request->user()->id;

        $this->serviceInterface->create($data);
        return redirect()->route('teacher.services.index');
        
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        
        $service = $this->serviceInterface->findById($service->id, ['*'], ['teacher']);
        return Inertia::render('TeachersArea/Service/Show/Index', ['service' => $service]);
       
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        $service = $this->serviceInterface->findById($service->id);
        return Inertia::render('TeachersArea/Service/Edit/Index', ['service' => $service]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRequest $request, Service $service)
    {

        $data = $request->all();
        $this->serviceInterface->update($service->id, $data);
        return redirect()->route('teacher.services.index');
        }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        $this->serviceInterface->deleteById($service->id);
        return redirect()->route('teacher.services.index');
    }
}
