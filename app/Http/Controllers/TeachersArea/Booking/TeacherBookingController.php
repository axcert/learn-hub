<?php

namespace App\Http\Controllers\TeachersArea\Booking;

use App\Http\Controllers\controller;
use App\Http\Requests\UpdateBookingRequest;
use App\Models\Booking;
use Inertia\Inertia;
use App\Repositories\All\Bookings\BookingInterface;
use App\Repositories\All\Services\ServiceInterface;
use Illuminate\Http\Request;


class TeacherBookingController extends Controller
{

    public function __construct(protected ServiceInterface $serviceInterface, protected BookingInterface $bookingInterface){}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        $user_id = auth()->id();
        $bookings = $this->bookingInterface->findByUserId($user_id, ['service.teacher']);
        return Inertia::render('TeachersArea/Booking/All/Index', ['bookings' => $bookings]);
        
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($service_id)
    {   
        $service = $this->serviceInterface->findById($service_id);

        return Inertia::render('TeachersArea/Booking/Create/Index', [
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
        return redirect()->route('teacher.overviews.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        $booking = $this->bookingInterface->findById($booking->id,['*'], ['service.teacher.user']);
        return Inertia::render('TeachersArea/Booking/Show/Index', ['booking' => $booking]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
        $booking->load('service.teacher');
        return Inertia::render('TeachersArea/Booking/Edit/Index', ['booking' => $booking]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookingRequest $request, Booking $booking)
    {

        
        // $data = $request->validated();
        // $booking->update($data);
        $this->bookingInterface->update($booking->id, $request->all());
        return redirect()->route('teacher.overviews.index')->with('success', 'Booking updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        $booking->delete();
        return redirect()->route('teacher.overviews.index');
    }

    public function accept(Booking $booking)
    {
        $booking->update(['status' => 'accepted']);
        return redirect()->back()->with('success', 'Booking accepted.');
    }

    public function reject(Booking $booking)
    {
        $booking->update(['status' => 'rejected']);
        return redirect()->back()->with('success', 'Booking rejected.');
    }

    public function markAsCompleted(Booking $booking)
    {
        $booking->update(['status' => 'completed']);
        return redirect()->back()->with('success', 'Booking completed.');
    }

}
