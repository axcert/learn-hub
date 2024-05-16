<?php

namespace App\Http\Controllers\Service;

use App\Models\Service;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Repositories\All\Services\ServiceInterface;
use App\Http\Controllers\Service\Teacher;
use App\Repositories\All\Teachers\TeacherInterface;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function __construct(protected ServiceInterface $serviceInterface, protected TeacherInterface $teacherInterface){}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia::render('Services/All/Index', ['services'=>$this->serviceInterface->all(['*'], ['teacher'])]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $teacherInterface = app()->make(TeacherInterface::class);
        return Inertia::render('Services/Create/Index', ['teachers'=>$teacherInterface->all()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceRequest $request)
    {
        $this->serviceInterface->create($request->all());
        return redirect()->route('services.index');
        
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        $id = $service->id; // Assign the id of the service
        $service = Service::with('teacher')->findOrFail($id);
        return Inertia::render('Services/Show/Index', ['service' => $service,]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        // $serviceInterface = app()->make(ServiceInterface::class);
        // $serviceInterface->findById($id);
        return Inertia::render('Services/Edit/Index', ['service' => $service]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRequest $request, Service $service)
    {
        $service->update([
            $this->serviceInterface->update($service->id, $request->all())
        ]);
        return redirect()->route('services.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        $this->serviceInterface->deleteById($service->id);
        return redirect()->route('services.index');
    }
}
