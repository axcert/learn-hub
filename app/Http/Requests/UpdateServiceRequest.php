<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
           'name' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'hourly_rate' => ['nullable', 'numeric'],
            'experience' => ['nullable', 'string'],
            'status' => ['nullable', 'string', 'in:pending,approved,rejected,completed,ongoing,upcoming,unenrolled'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ];

    }
}
