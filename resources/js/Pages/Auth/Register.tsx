import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'student', // Default role
        phone: '',
        bio: '', // Bio for teacher
        position: '', // Position for teacher
        image: null, // Image
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone" value="Phone" />

                    <TextInput
                        id="phone"
                        type="tel"
                        name="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        autoComplete="tel"
                        onChange={(e) => setData('phone', e.target.value)}
                        required
                    />

                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="role" value="Role" />

                    <div className="mt-1 block">
                        <label className="mr-4">
                            <input
                                type="radio"
                                name="role"
                                value="student"
                                checked={data.role === 'student'}
                                onChange={(e) => setData('role', e.target.value)}
                                required
                            />
                            Student
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="teacher"
                                checked={data.role === 'teacher'}
                                onChange={(e) => setData('role', e.target.value)}
                                required
                            />
                            Teacher
                        </label>
                    </div>

                    <InputError message={errors.role} className="mt-2" />
                </div>

                {data.role === 'teacher' && (
                    <>
                        <div className="mt-4">
                            <InputLabel htmlFor="bio" value="Bio" />

                            <TextInput
                                id="bio"
                                name="bio"
                                value={data.bio}
                                className="mt-1 block w-full"
                                autoComplete="bio"
                                onChange={(e) => setData('bio', e.target.value)}
                                required
                            />

                            <InputError message={errors.bio} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="position" value="Position" />

                            <TextInput
                                id="position"
                                name="position"
                                value={data.position}
                                className="mt-1 block w-full"
                                autoComplete="position"
                                onChange={(e) => setData('position', e.target.value)}
                                required
                            />

                            <InputError message={errors.position} className="mt-2" />
                        </div>
                    </>
                )}

                {/* <div className="mt-4">
                    <InputLabel htmlFor="image" value="Profile Image" />

                    <input
                        id="image"
                        type="file"
                        name="image"
                        className="mt-1 block w-full"
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                setData('image', e.target.files[0]);
                            }
                        }}
                        required
                    />

                    <InputError message={errors.image} className="mt-2" />
                </div> */}

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
