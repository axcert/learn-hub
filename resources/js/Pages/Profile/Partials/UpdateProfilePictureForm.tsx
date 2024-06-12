import { useForm, usePage } from '@inertiajs/react';
import React from 'react';

export default function UpdateProfilePictureForm({ user, className }:any) {
    const { data, setData, post, errors } = useForm<{
        image: File | undefined;
        _method: 'POST' | 'PATCH';
    }>({
        image: undefined,
        _method: 'POST',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
        }
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        patch(route('profile.update-picture'), {
            forceFormData: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className={className}>
            <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Profile Picture
                </label>
                <div className="mt-1 flex items-center">
                    <img
                        className="h-12 w-12 rounded-full"
                        src={user.image_path ? `/storage/${user.image_path}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4oz0KdCvHj_hvY5exy-qFr06SPFjyA4ZoPg&s'}
                        alt={`${user.name}'s profile`}
                    />
                    <input
                        type="file"
                        id="image"
                        onChange={handleChange}
                        className="ml-5 rounded-md shadow-sm border-gray-300"
                    />
                </div>
                {errors.image && <div className="text-red-600">{errors.image}</div>}
            </div>

            <div className="mt-4">
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition"
                >
                    Save
                </button>
            </div>
        </form>
    );
}

function patch(arg0: string, arg1: { forceFormData: boolean; }) {
    throw new Error('Function not implemented.');
}

