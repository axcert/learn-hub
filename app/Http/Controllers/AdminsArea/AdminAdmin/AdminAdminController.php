<?php

namespace App\Http\Controllers\AdminsArea\AdminAdmin;

use App\Http\Controllers\Controller;
use App\Repositories\All\Services\ServiceInterface;
use App\Repositories\All\Teachers\TeacherInterface;
use Illuminate\Http\Request;
use App\Models\Teacher;
use App\Repositories\All\Admins\AdminInterface;
use App\Repositories\All\Users\UserInterface;
use Inertia\Inertia;

class AdminAdminController extends Controller

{
    public function __construct(
        protected AdminInterface $adminInterface,
        protected UserInterface $userInterface,
    ) {
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $users = $this->userInterface->all()->load('user');
        $adminUsers = $users->filter(function ($user) {
            return $user->role === 'admin';
        });
        $adminCount = $adminUsers->count();

        return Inertia::render('AdminsArea/Admin/Admin', [
            'adminCount' => $adminCount,
            'admins' => $adminUsers,
            'users' => $this->userInterface->all()->load('user'),
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
    public function show($id)
    {
      
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $admins = $this->userInterface->findById($id);
        return Inertia::render('AdminsArea/Admin/Edit/Edit',[
            'admins' => $admins,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $dataToUpdate = $request->except(['name', 'email', 'phone']);
        $this->userInterface->update($id, $dataToUpdate);
        return redirect()->route('admin.adminPanels.index');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->userInterface->deleteById($id);
    }
}
