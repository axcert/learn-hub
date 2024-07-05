<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
    //     $request->user()->fill($request->validated());

    //     if ($request->user()->isDirty('email')) {
    //         $request->user()->email_verified_at = null;
    //     }

    //     if($request->hasFile('image')){
    //         //delete old image if exists
    //         $user = $request->user();
    //         if($user->image_path){
    //             Storage::disk('public')->delete($user->image_path);
    //         }

    //         $path = $request->file('image')->store('user', 'public');
    //         $user->image_path = $path;
    //     }


    //     $request->user()->save();

    //     return Redirect::route('profile.edit');
    // }

    $user = $request->user();

        // Fill the user model with validated data
        $user->fill($request->validated());

        // Check if the email has been changed
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        // Handle image upload if a new image is provided
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($user->image_path) {
                Storage::disk('public')->delete($user->image_path);
            }

            // Store the new image
            $path = $request->file('image')->store('user', 'public');
            $user->image_path = $path;
        }

        // Save the updated user profile
        $user->save();

        // Redirect back to profile edit page with a success message
        return Redirect::route('profile.edit')->with('success', 'Profile updated successfully.');
   
    }



    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        // Delete user's image if it exists
        if ($user->image_path) {
            Storage::disk('public')->delete($user->image_path);
        }

        // Delete the user
        $user->delete();

        // Invalidate session and regenerate token
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redirect to the home page after deletion
        return Redirect::to('/')->with('success', 'Account deleted successfully.');
    }

    public function updatePicture(Request $request): RedirectResponse
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        $user = $request->user();

        // Delete old image if it exists
        if ($user->image) {
            Storage::disk('public')->delete($user->image);
        }

        // Store the new image
        $path = $request->file('image')->store('user', 'public');
        $user->image = $path;

        // Save the updated user profile
        $user->save();

        return Redirect::route('profile.edit')->with('success', 'Profile picture updated successfully.');
    }



}












