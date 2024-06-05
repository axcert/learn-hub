<?php

namespace App\Http\Controllers\AdminsArea\AdminService;

use App\Http\Controllers\Controller;
use App\Repositories\All\Services\ServiceInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminServiceController extends Controller
{

public function __construct(
    protected ServiceInterface $serviceInterface,
)
{
    
}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {   

        $services = $this->serviceInterface->all();
        $adminServices = $services->filter(function($services){
            return $services->status === 'approved' ;
        });

        $serviceCount = $adminServices->count();
        $adminServices->load('teacher.user' ,'admin.user');

        return Inertia::render('AdminsArea/Service/Service',[
                'adminServices' => $adminServices,
                'serviceCount' =>  $serviceCount,
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
