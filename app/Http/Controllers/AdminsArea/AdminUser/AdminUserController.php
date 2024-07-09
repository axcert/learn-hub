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

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $role)
    {
        $this->userInterface->findByColumn(['role' =>$role]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'role' => 'required|string|in:admin,teacher,student',
        ]);
    
        $this->userInterface->update($id, ['role' => $request->input('role')]);
    
        return redirect()->back()->with('success', 'Role updated successfully');
    }
}
