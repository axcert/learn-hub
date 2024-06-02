<?php

namespace App\Http\Controllers\AdminsArea\AdminUser;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Repositories\All\Users\UserInterface;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function __construct(
        protected UserInterface $userInterface
    ) {
    }

    public function index()
    {
        dd("user");
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
    public function edit(string $role)
    {
      
        // $this->userInterface->findByColumn(['role' =>$role , 'id'=>$id]);
        $this->userInterface->findByColumn(['role' =>$role]);
        dd($role);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // $this->userInterface->update($id, $request->all());
        $request->validate([
            'role' => 'required|string|in:admin,teacher,student',
        ]);
    
        $this->userInterface->update($id, ['role' => $request->input('role')]);
    
        return redirect()->back()->with('success', 'Role updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
