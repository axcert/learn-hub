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

    public function search(Request $request){
       
        $users = $this->userInterface->all()->load('user');
        $search = $request->input('search');
        
        if ($search) {
            $users = $users->filter(function ($user) use ($search) {
                return stripos($user->name, $search) !== false ||
                       stripos($user->email, $search) !== false ||
                       stripos($user->phone, $search) !== false;
            });
        }
        
        return Inertia::render('AdminsArea/Admin/Admin', [
            'search' => $search,
            'users' => $users,
        ]);
    }


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
