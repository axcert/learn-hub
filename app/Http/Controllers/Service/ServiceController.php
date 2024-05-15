<?php

namespace App\Http\Controllers\Service;

use App\Models\Service;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Repositories\All\Services\ServiceInterface;
use Inertia\Inertia;
class ServiceController extends Controller
{
    public function __construct(protected ServiceInterface $serviceInterface){}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia::render('Services/All/Index', ['services'=>$this->serviceInterface->all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
        return Inertia::render('Services/Create/Index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRequest $request, Service $service)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        //
    }
}
