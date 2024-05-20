import { FormEventHandler, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

interface EditProps {
    teacher: {
        id: number;
        name: string;
        subjects: string;
    };
}

export default function Edit({ auth, teacher }: any) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: teacher.name,
        details: teacher.subjects,
    });

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        post(route('categories.update', teacher.id));
    };

    return (
        <Authenticated user={auth.user} header={
            <h2>Hello</h2>
        }>
            <Head title="Edit Details" />
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="details" value="details" />
                    <TextInput
                        id="details"
                        name="details"
                        value={data.details}
                        className="mt-1 block w-full"
                        autoComplete="details"
                        onChange={(e) => setData('details', e.target.value)}
                        required
                    />
                    <InputError message={errors.details} className="mt-2" />
                </div>
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton type="submit" className="ms-4" disabled={processing}>
                        Update Category
                    </PrimaryButton>
                </div>
            </form>
        </Authenticated>
    );
}
