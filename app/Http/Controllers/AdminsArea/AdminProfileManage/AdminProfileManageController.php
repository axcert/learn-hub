<?php

namespace App\Http\Controllers\AdminsArea\AdminProfileManage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminProfileManageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('AdminsArea/ProfileManage/Edit');
    }

   
}
