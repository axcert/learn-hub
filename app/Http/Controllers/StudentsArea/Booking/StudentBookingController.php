<?php

namespace App\Http\Controllers\StudentsArea\Booking;

use App\Http\Controllers\controller;
use App\Models\Booking;
use Inertia\Inertia;
use App\Repositories\All\Bookings\BookingInterface;
use App\Repositories\All\Services\ServiceInterface;
use Illuminate\Http\Request;

class StudentBookingController extends Controller
{

    public function __construct(protected ServiceInterface $serviceInterface, protected BookingInterface $bookingInterface){}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        $user_id = auth()->id();
        $bookings = $this->bookingInterface->findByUserId($user_id, ['service.teacher.user']);
        return Inertia::render('StudentArea/Booking/All/Index', ['bookings' => $bookings]);
        

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($service_id)
    {
        $service = $this->serviceInterface->findById($service_id);

        return Inertia::render('StudentArea/Booking/Create/Index', [
            'service' => $service,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $data['status'] = $data['status'] ?? 'pending'; 

        $this->bookingInterface->create($data);
        return redirect()->route('students.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        $booking->load('service.teacher');
        return Inertia::render('StudentArea/Booking/Show/Index', ['booking' => $booking]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
        $booking->load('service.teacher');
        return Inertia::render('StudentArea/Booking/Edit/Index', ['booking' => $booking]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking)
    {
        $data = $request->all();
        $booking->update($data);
        return redirect()->route('bookings.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        $booking->delete();
        return redirect()->route('bookings.index');
    }
}
