<?php

namespace App\Http\Controllers\TeachersArea\Service;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Service;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Repositories\All\Services\ServiceInterface;
use App\Repositories\All\Teachers\TeacherInterface;
use App\Models\Admin;


class TeacherServiceController extends Controller
{
    public function __construct(protected ServiceInterface $serviceInterface, protected TeacherInterface $teacherInterface){}
    /**
     * Display a listing of the resource.
     */
       
    public function index(Request $request)
    {    
        $teacherId = $this->teacherInterface->findByUserId($request->user()->id)->id;

        $services = $this->serviceInterface->getByColumn(['teacher_id' => $teacherId]);

        return Inertia::render('TeachersArea/Service/All/Index', [
            'services' => $services,
            
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
        $data = $request->validated();
        $teacher = $this->teacherInterface->findByUserId($request->user()->id);
        $data['teacher_id'] = $teacher->id;
        $data['status'] = 'pending';

        // if($request->hasFile('image')){
        //     $data['image'] = $request->file('image')->store('services', 'public');
            
        // }

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('services', 'public');
            $data['image'] = $imagePath;
        }

        $admin = User::where('role', 'admin')->first();

        if(!$admin){
            return redirect()->route('teacher.services.index')->with('error', 'No admin available to approve the service');
        }
        $data['admin_id'] = $admin->id;

        $this->serviceInterface->create($data);
        return redirect()->route('teacher.services.index')->with('success', 'Service Store successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        
        $service = $this->serviceInterface->findById($service->id, ['*'], ['teacher.user']);
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
        $data['status'] = 'pending';

        if($request->hasFile('image')){
            $imagePath = $request->file('image')->store('services', 'public');
            $data['image'] = $imagePath;
        }
        else {
                
            $data['image'] = $service->image;
        }

        $this->serviceInterface->update($service->id, $data);
        return redirect()->route('teacher.services.index')->with('success', 'Service updated successfully.');
        }


    public function destroy(Service $service)
    {
        $this->serviceInterface->deleteById($service->id);
        return redirect()->route('teacher.services.index')->with('success', 'Service deleted successfully.');
    }
}
