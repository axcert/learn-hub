<?php

namespace App\Http\Controllers\Welcome;

use App\Http\Controllers\Controller;
use App\Repositories\All\Services\ServiceInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{

    public function __construct(
        private ServiceInterface $serviceInterface,
    ){}
    /**
     * Display a listing of the resource.
     */
    public function index()
    
    {

        $services = $this->serviceInterface->getByColumn(['status' => 'approved'],['*'], ['teacher.user']);
        foreach ($services as $service) {
            $service->average_rating = $service->getAverageRatingAttribute();
        }


        return Inertia::render('PublicArea/All/Index',[
            'services' => $services,
        ]);
    }


    // public function search(Request $request)
    // {
    //     $search = $request->input('search');
    //     $services = $this->serviceInterface->all()->load('teacher');

    //     if ($search) {
    //         $services = $services->filter(function ($service) use ($search) {
    //             return stripos($service->name, $search) !== false ||
    //                 stripos(optional($service->teacher)->tname, $search) !== false ||
    //                 stripos((string)$service->hourly_rate, $search) !== false;
    //         });
    //     }
    //     return Inertia::render('PublicArea/All/Index', [
    //         'search' => $search,
    //         'services' => $services,
    //     ]);
    // }
}
