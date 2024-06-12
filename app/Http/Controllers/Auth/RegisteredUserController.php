<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => 'required|regex:/^[0-9]+$/|max:15',
            'role' => 'required|string|in:admin,teacher,student',
            'bio' => 'nullable|string',
            'position' => 'nullable|string',
            'image' => 'nullable|image|max:1024',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone'=> $request->phone,
            'role' => $request->role,
            'bio' => $request->bio,
            'position' => $request->position,
            'image' => $imagePath,
        ]);

        event(new Registered($user));

        Auth::login($user);

        Session::flash('success', 'You have registered successfully!');

        
        switch ($user->role) {
            case 'admin':
                return redirect()->route('admins.overview.index');
            case 'teacher':
                return redirect()->route('teacher.overviews.index');
            case 'student':
                return redirect()->route('students.index');
            default:
                return redirect()->route('dashboard');
            }
        
    }
}
