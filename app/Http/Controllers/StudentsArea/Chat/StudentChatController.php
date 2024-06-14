<?php

namespace App\Http\Controllers\StudentsArea\Chat;

use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Repositories\All\Chats\ChatsInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentChatController extends Controller
{
    public function __construct(
        protected ChatsInterface $chatsInterface,

    ) {
    }
    public function index()
    {
        $user = auth()->user();
        $chats = $user->chats()->with('teacher.user')->get();
    
        return Inertia::render('StudentArea/Chat/All/Index', [
            'chats' => $chats,
        ]);
        // $chats = Chat::with('teacher.user')->get();
        // return Inertia::render('StudentArea/Chat/All/Index',[
        //     "chats"=>$chats,
        // ]);
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

     
        return Inertia::render('StudentArea/Chat/All/Chat', [
            'id' => $id,
        ]);
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
