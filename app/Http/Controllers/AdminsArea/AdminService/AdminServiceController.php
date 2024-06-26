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
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $services = $this->serviceInterface->all();
        $adminServices = $services->filter(function ($services) {
            return $services->status === 'approved';
        });

        $serviceCount = $adminServices->count();
        $adminServices->load('teacher.user', 'admin.user');

        return Inertia::render('AdminsArea/Service/Service', [
            'adminServices' => $adminServices,
            'serviceCount' =>  $serviceCount,
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
}
