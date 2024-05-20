import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { FormEventHandler, useEffect } from 'react';

export default function teachers({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: "",
        name: "",
        subjects: "",
    });

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('teachers.store'));
        alert("Details Added Success Fully!")
        console.log("Details Added Success Full!");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div><h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Create Teacher
            </h2>
            </div>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6 space-y-4">
                            <div>
                                <InputLabel htmlFor="user_id" value="user_id" />

                                <TextInput
                                    id="user_id"
                                    name="text"
                                    value={data.user_id}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('user_id', e.target.value)}
                                />

                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="subjects" value="Subjects" />

                                <TextInput
                                    id="subjects"
                                    name="subjects"
                                    value={data.subjects}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('subjects', e.target.value)}
                                />

                                <InputError
                                    message={errors.subjects}
                                    className="mt-2" />
                            </div>
                            <div>
                                <button type='submit'
                                    className="bg-yellow-500 duration-300 ease-in-out transition-all text-white px-6 py-2 rounded-lg hover:bg-yellow-700">
                                    SUBMIT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
